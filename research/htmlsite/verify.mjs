#!/usr/bin/env node
/* ============================================================
   verify.mjs - acceptance check for a built Research site (the SPEC.md section 9 contract,
   made executable). Zero npm deps; runs offline. Usage:
       node ~/.claude/skills/research/htmlsite/verify.mjs [target-folder]

   STATIC tier (always; no browser) asserts:
     - every inline [N] Citation resolves to a Source row in the same Doc   (0 broken)
     - every (local: sources/...) path in a Source row exists on disk
     - every relative ![alt](...) figure embed (assets/figures/...) exists on disk
     - every cross-doc *.md link resolves to a known Doc or an on-disk file
     - assets/content.js exists and window.VIZ is non-empty (interactive-first)
     - every Doc view carries ≥1 ANCHORED interactive panel - a kind:'chart'
       VIZ panel or a registered demo whose `at` resolves. Mermaid panels stay
       supported but do NOT satisfy the minimum; README/overview is exempt.
     - Content globals agree with the Docs: VIZ keys are real views, VIZ `at`
       anchors match a heading, SITE.docs enrichment keys match the manifest,
       stat-tile arity, MATRIX cell counts, GLOSSARY category ids
     - assets/demos.js (if present) is statically parsed - each register(id, {at})
       gets the same checks VIZ panels get (unknown view id = error, unmatched
       `at` = warning). Static parsing keeps verify zero-dep and offline: demos
       are browser IIFEs the globals.mjs sandbox can't evaluate.
     - FULL CONTENT VISIBILITY (SPEC section 6): engine.css AND the CSS authored in
       content.js/demos.js/glossary.js string literals must let containers grow
       to fit - -webkit-line-clamp, text-overflow: ellipsis, and overflow(-y):
       hidden combined with a fixed height/max-height in the same rule block
       are ERRORS unless the rule carries a `no-crop-exempt: reason` comment.
   It reuses the SAME Source contract the engine uses (assets/contract.js) - the
   verifier is the second adapter at that seam, so the rule has one home.

   JSDOM tier (only if `jsdom` is installed) additionally boots index.html with
   mermaid/Chart stubbed and asserts 0 JS errors + every view builds. Skipped
   silently when jsdom is absent - htmlsite stays zero-dependency by default.

   Exit code: non-zero iff any ERROR. Warnings never fail the run.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { docManifest, hasOverview } from "./manifest.mjs";
import { loadGlobals } from "./globals.mjs"; // shared Content-globals loader (also used by build.mjs)

const BASE = path.dirname(fileURLToPath(import.meta.url));
const TARGET = path.resolve(process.argv[2] || process.cwd());
const require = createRequire(import.meta.url);
const Contract = require("./assets/contract.js"); // UMD -> CommonJS module.exports branch

const errors = [],
  warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);
const rel = (p) => path.relative(process.cwd(), p) || ".";
const read = (f) => fs.readFileSync(path.join(TARGET, f), "utf8");

const manifest = docManifest(TARGET);
const docIds = new Set(manifest.map((d) => d.id));
const docFiles = new Set([...manifest.map((d) => d.file), "README.md"]);
let citeTotal = 0,
  localTotal = 0,
  figTotal = 0,
  demoTotal = 0,
  cssRuleTotal = 0,
  docsChecked = 0;

/* ---------- markdown helpers (no marked needed for the contract checks) ----------
   Headings (levels 1-3), skipping fenced code - one home for the parse rule;
   headingsOf() and splitSources() both consume it. */
function headings(md) {
  const out = [];
  let inFence = false;
  md.split(/\r?\n/).forEach((ln, line) => {
    if (/^```/.test(ln)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    const m = ln.match(/^(#{1,3})\s+(.+?)\s*#*$/);
    if (m) out.push({ level: m[1].length, text: m[2].trim(), line });
  });
  return out;
}
const headingsOf = (md) => headings(md).map((h) => h.text);
// Split a doc into { body, sourcesText } using the SAME heading-selection rule as the engine.
function splitSources(md) {
  const lines = md.split(/\r?\n/);
  const heads = headings(md);
  const si = Contract.pickSourcesHeading(heads.map((h) => h.text));
  if (si < 0) return { body: md, sourcesText: "" };
  const start = heads[si].line,
    lvl = heads[si].level;
  let end = lines.length;
  for (const h of heads) {
    if (h.line > start && h.level <= lvl) {
      end = h.line;
      break;
    }
  }
  const body = lines.slice(0, start).concat(lines.slice(end)).join("\n");
  const sourcesText = lines.slice(start + 1, end).join("\n");
  return { body, sourcesText };
}

/* ---------- per-Doc: citations resolve, locals exist, links resolve ---------- */
function checkDoc(file) {
  const md = read(file);
  const { body, sourcesText } = splitSources(md);
  const rows = sourcesText ? Contract.parseSources(sourcesText) : [];
  const nums = new Set(rows.map((r) => Number(r.num)));
  const cites = Contract.citationRefs(body);
  cites.forEach((n) => {
    if (!nums.has(n)) err(`${file}: citation [${n}] resolves to no Source row`);
  });
  citeTotal += cites.length;
  rows.forEach((r) =>
    r.locals.forEach((loc) => {
      localTotal++;
      if (!fs.existsSync(path.join(TARGET, loc)))
        err(`${file}: source [${r.num}] local file missing on disk - ${loc}`);
    }),
  );
  // cross-doc *.md links - the doc-link rule lives in contract.js (parseDocLink)
  const re = /\]\(([^)\s]+?\.md(?:#[^)\s]*)?)\)/g;
  let m;
  while ((m = re.exec(md))) {
    const t = m[1];
    if (/^https?:/i.test(t)) continue;
    const link = Contract.parseDocLink(t); // { file (basename), hash } | null
    const onDisk = fs.existsSync(path.join(TARGET, t.replace(/#.*$/, "")));
    if ((link && docFiles.has(link.file)) || onDisk) continue;
    warn(`${file}: link '${t}' resolves to no Doc or on-disk file`);
  }
  // embedded figures: every relative ![alt](path) must exist on disk (Phase 4b)
  const imgRe = /!\[[^\]]*\]\(\s*([^)\s]+?)(?:\s+"[^"]*")?\s*\)/g;
  let im;
  while ((im = imgRe.exec(md))) {
    const src = im[1];
    if (/^(https?:|data:|\/\/|#)/i.test(src)) continue; // remote/data image - not our file to check
    figTotal++;
    const clean = src.replace(/^\.\//, "");
    if (!fs.existsSync(path.join(TARGET, clean)))
      err(`${file}: embedded figure missing on disk - ${src}`);
  }
  docsChecked++;
}

/* ---------- demos.js static parse (zero-dep, offline) ----------
   demos.js is a browser IIFE (DOM building, requestAnimationFrame) that the
   globals.mjs sandbox can't evaluate, so extract its register(viewId, {at})
   calls statically. One regex finds each call; a bounded look-ahead into the
   spec literal picks up the `at` anchor (first `at:` key wins - by convention
   it leads the spec, as in demos.example.js). */
function parseDemos() {
  const file = path.join(TARGET, "assets/demos.js");
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf8");
  const out = [];
  const re = /\bregister\(\s*(['"])([^'"]+)\1\s*,\s*\{/g;
  let m;
  while ((m = re.exec(src))) {
    const head = src.slice(m.index, m.index + 600); // spec head - `at` leads by convention
    const at = head.match(
      /[{,\s](?:['"])?at(?:['"])?\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/,
    );
    out.push({ viewId: m[2], at: at ? at[2] : "" });
  }
  demoTotal = out.length;
  return out;
}

/* ---------- full content visibility - the no-crop gate (SPEC section 6) ----------
   Nothing a card/panel/tile renders may be cropped away: containers grow to
   fit. Statically scans CSS text (engine.css + string literals in the authored
   content.js/demos.js/glossary.js) for the cropping patterns - a rule-block
   parser (split on `}`) is enough; jsdom does no layout, so scrollHeight-style
   overflow detection is impossible offline and THIS static gate is the
   enforceable one. A rule carrying a `no-crop-exempt: reason` comment is
   skipped (horizontal code/table scroll, decorative layers, the nav drawer). */
const CROP_LINE = [
  { re: /-webkit-line-clamp\s*:/i, what: "-webkit-line-clamp" },
  { re: /text-overflow\s*:\s*ellipsis/i, what: "text-overflow: ellipsis" },
];
// prefix class covers CSS blocks (`;{` whitespace) AND inline style="..." strings (quotes)
const CROP_HIDDEN = /(?:^|[;{\s"'])overflow(?:-y)?\s*:\s*(?:hidden|clip)/i;
const CROP_HEIGHT =
  /(?:^|[;{\s"'])(max-height|height)\s*:\s*(?!auto\b|none\b|fit-content|min-content|max-content)[^;}]/i;
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

function checkCropDecls(decls, exempt, file, where) {
  if (exempt) return;
  const clean = stripComments(decls);
  CROP_LINE.forEach(({ re, what }) => {
    if (re.test(clean))
      err(
        `${file}: ${where} uses ${what} - content must never truncate; let the container grow (or mark the rule /* no-crop-exempt: reason */)`,
      );
  });
  const h = clean.match(CROP_HEIGHT);
  if (h && CROP_HIDDEN.test(clean))
    err(
      `${file}: ${where} combines overflow hidden with a fixed ${h[1]} - it crops content; let the container grow (or mark the rule /* no-crop-exempt: reason */)`,
    );
}

function scanCssText(cssText, file) {
  // rule-block scan: each `}`-terminated chunk ends one declaration block;
  // the selector is whatever trails the previous block (media prelude split off).
  for (const chunk of cssText.split("}")) {
    const open = chunk.lastIndexOf("{");
    if (open < 0) continue;
    cssRuleTotal++;
    const sel =
      stripComments(chunk.slice(0, open)).split("{").pop().trim() || "?";
    checkCropDecls(
      chunk.slice(open + 1),
      /no-crop-exempt/.test(chunk),
      file,
      `rule '${sel}'`,
    );
  }
}

function scanJsForCss(file) {
  const abs = path.join(TARGET, file);
  if (!fs.existsSync(abs)) return;
  const src = fs.readFileSync(abs, "utf8");
  // scan string literals only - CSS blocks (injected <style> text) get the
  // rule-block scan; brace-less literals (style="..." / el.style.cssText) are
  // checked as one inline declaration block.
  const litRe =
    /`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g;
  let m;
  while ((m = litRe.exec(src))) {
    const lit = m[0].slice(1, -1);
    if (/\{[^}]*\}/.test(lit)) scanCssText(lit, file);
    else if (/[a-z-]\s*:/.test(lit))
      checkCropDecls(
        lit,
        /no-crop-exempt/.test(lit),
        file,
        `inline style "${lit.slice(0, 60)}${lit.length > 60 ? "..." : ""}"`,
      );
  }
}

function checkNoCrop() {
  // the engine itself is gated: prefer the built copy (what actually ships),
  // fall back to the skill copy pre-build.
  const builtCss = path.join(TARGET, "assets/engine.css");
  if (fs.existsSync(builtCss))
    scanCssText(fs.readFileSync(builtCss, "utf8"), "assets/engine.css");
  else
    scanCssText(
      fs.readFileSync(path.join(BASE, "assets/engine.css"), "utf8"),
      "engine.css (skill copy)",
    );
  ["assets/content.js", "assets/demos.js", "assets/glossary.js"].forEach(
    scanJsForCss,
  );
}

/* ---------- Content globals lint (loads content.js via the shared loader) ---------- */
function lintContent() {
  // Headings per view - shared by the VIZ, demo, and interactive-minimum checks.
  const headsByView = {};
  if (hasOverview(TARGET)) headsByView.overview = headingsOf(read("README.md"));
  manifest.forEach((d) => {
    headsByView[d.id] = headingsOf(read(d.file));
  });

  const { win: w, error } = loadGlobals(path.join(TARGET, "assets/content.js"));
  if (error) err(`assets/content.js: parse error - ${error}`);
  else if (!w)
    err(
      "assets/content.js missing - required by the interactive-first contract (start from content.example.js)",
    );
  const { SITE, VIZ, MATRIX, DRILL } = w || {};

  if (SITE && Array.isArray(SITE.docs))
    SITE.docs.forEach((d, i) => {
      if (d.id && !docIds.has(d.id))
        warn(
          `content.js SITE.docs[${i}]: id '${d.id}' matches no Doc - enrichment ignored (manifest ids: ${[...docIds].join(", ") || "none"})`,
        );
      if (d.file && !docFiles.has(d.file))
        warn(`content.js SITE.docs[${i}]: file '${d.file}' matches no Doc`);
    });
  if (SITE && Array.isArray(SITE.stats))
    SITE.stats.forEach((s, i) => {
      if (!Array.isArray(s) || s.length < 2)
        err(
          `content.js SITE.stats[${i}] must be [number, label, sublabel?, accent?]`,
        );
    });

  // Interactive-first: window.VIZ must exist and be non-empty (SPEC section 3).
  const vizPanelCount =
    VIZ && typeof VIZ === "object"
      ? Object.values(VIZ).reduce((n, a) => n + (a || []).length, 0)
      : 0;
  if (w && !vizPanelCount)
    err(
      "content.js: window.VIZ absent or empty - the interactive-first contract requires charts/diagrams (SPEC section 3)",
    );

  // Views satisfying the per-Doc interactive minimum: an ANCHORED chart panel
  // or an anchored registered demo (filled below; mermaid never counts).
  const interactiveOk = new Set();

  if (VIZ && typeof VIZ === "object") {
    for (const key of Object.keys(VIZ)) {
      if (key !== "overview" && !docIds.has(key)) {
        err(`content.js VIZ key '${key}' is not 'overview' or a known Doc id`);
        continue;
      }
      (VIZ[key] || []).forEach((p, i) => {
        const where = `VIZ['${key}'][${i}]`;
        if (p.kind !== "mermaid" && p.kind !== "chart")
          err(`content.js ${where}: kind must be 'mermaid' or 'chart'`);
        if (p.kind === "mermaid" && !p.def)
          err(`content.js ${where}: mermaid panel missing 'def'`);
        if (p.kind === "chart" && !p.chart)
          err(`content.js ${where}: chart panel missing 'chart' config`);
        let anchored = false;
        if (p.at) {
          const hs = headsByView[key] || [];
          anchored = hs.some((h) => Contract.anchorMatches(h, p.at));
          if (!anchored)
            warn(
              `content.js ${where}: at:'${p.at}' matches no heading in ${key} - panel falls to the top Visualisations strip`,
            );
        }
        if (p.kind === "chart" && p.chart && anchored) interactiveOk.add(key);
      });
    }
  }

  // Demos (assets/demos.js) - first-class: validated like VIZ panels, and an
  // anchored demo satisfies the per-Doc interactive minimum.
  for (const d of parseDemos()) {
    const where = `demos.js register('${d.viewId}')${d.at ? ` at:'${d.at}'` : ""}`;
    if (d.viewId !== "overview" && !docIds.has(d.viewId)) {
      err(
        `assets/demos.js: register view id '${d.viewId}' is not 'overview' or a known Doc id`,
      );
      continue;
    }
    let anchored = false;
    if (d.at) {
      const hs = headsByView[d.viewId] || [];
      anchored = hs.some((h) => Contract.anchorMatches(h, d.at));
      if (!anchored)
        warn(
          `assets/${where} matches no heading in ${d.viewId} - demo appends at the end of the doc`,
        );
    }
    if (anchored) interactiveOk.add(d.viewId);
  }

  // Per-Doc interactive minimum (ERROR): every Doc view needs ≥1 anchored
  // interactive panel - chart or demo. Overview/README is exempt.
  manifest.forEach((d) => {
    if (!interactiveOk.has(d.id))
      err(
        `${d.file}: no anchored interactive panel - each Doc needs a kind:'chart' VIZ panel or a registered demo with a resolving 'at' (mermaid does not count)`,
      );
  });

  if (MATRIX && typeof MATRIX === "object") {
    if (!Array.isArray(MATRIX.columns))
      err("content.js MATRIX.columns must be an array");
    (MATRIX.rows || []).forEach((r, i) => {
      if (!Array.isArray(r.cells))
        err(`content.js MATRIX.rows[${i}].cells must be an array`);
      else if (
        Array.isArray(MATRIX.columns) &&
        r.cells.length !== MATRIX.columns.length
      )
        warn(
          `content.js MATRIX.rows[${i}] has ${r.cells.length} cells but ${MATRIX.columns.length} columns`,
        );
    });
  }

  if (Array.isArray(DRILL))
    DRILL.forEach((d, i) => {
      if (!d.q) err(`content.js DRILL[${i}] missing 'q'`);
    });

  const { win: g, error: gErr } = loadGlobals(
    path.join(TARGET, "assets/glossary.js"),
  );
  if (gErr) err(`assets/glossary.js: parse error - ${gErr}`);
  if (g && g.GLOSSARY && Array.isArray(g.GLOSSARY.terms)) {
    const cats = new Set((g.GLOSSARY.cats || []).map((c) => c.id));
    g.GLOSSARY.terms.forEach((t, i) => {
      if (!t.t || !t.d)
        err(`glossary.js terms[${i}] needs 't' (term) and 'd' (definition)`);
      if (t.c && cats.size && !cats.has(t.c))
        warn(
          `glossary.js terms[${i}] '${t.t}': category '${t.c}' is not in cats`,
        );
    });
  }
}

/* ---------- optional JSDOM tier (only if installed) ---------- */
async function jsdomTier() {
  let JSDOM, VirtualConsole;
  try {
    ({ JSDOM, VirtualConsole } = require("jsdom"));
  } catch {
    console.log("  jsdom tier: skipped (not installed) - static checks only");
    return;
  }
  if (!fs.existsSync(path.join(TARGET, "index.html"))) return;
  // jsdom lacks a handful of browser globals the REAL vendor libs + engine touch
  // (structuredClone, scrollTo, history on file://, canvas). Those are ENVIRONMENT
  // gaps, not engine defects - supply them, and suppress any that still leak so the
  // tier fails only on genuine engine/contract/content throwables.
  const ENV_NOISE =
    /structuredClone|replaceState|pushState|scroll(To|IntoView)|Not implemented|matchMedia|getContext|canvas/i;
  let dom;
  try {
    const boot = [];
    const vc = new VirtualConsole(); // capture uncaught script errors; ignore page console noise
    vc.on("jsdomError", (e) => {
      const m = e.message || String(e);
      if (!ENV_NOISE.test(m)) boot.push(m);
    });
    dom = new JSDOM(read("index.html"), {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole: vc,
      url: "file://" + path.join(TARGET, "index.html"),
      beforeParse(win) {
        if (!win.structuredClone)
          win.structuredClone =
            globalThis.structuredClone ||
            ((x) => JSON.parse(JSON.stringify(x)));
        win.scrollTo = () => {};
        win.matchMedia = () => ({
          matches: false,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
        });
        win.requestAnimationFrame = (cb) => setTimeout(() => cb(16), 0);
        try {
          win.history.replaceState = () => {};
          win.history.pushState = () => {};
        } catch {}
        try {
          win.HTMLElement.prototype.scrollIntoView = () => {};
        } catch {}
        try {
          win.HTMLCanvasElement.prototype.getContext = () => null;
        } catch {}
        win.addEventListener("error", (e) => {
          const m = e.message || String(e.error);
          if (!ENV_NOISE.test(m)) boot.push(m);
        });
      },
    });
    // Wait for the engine to boot (extra deferred scripts, e.g. an injected
    // demos.js or a legacy loader snippet, can push it past a fixed delay).
    for (
      let waited = 0;
      !dom.window.__kitBooted && waited < 5000;
      waited += 100
    )
      await new Promise((r) => setTimeout(r, 100));
    await new Promise((r) => setTimeout(r, 400)); // let post-boot rendering settle
    const doc = dom.window.document;
    const views = doc.querySelectorAll(".view").length;
    const navs = doc.querySelectorAll(".nav-item").length;
    const srcRows = doc.querySelectorAll(".src-entry").length;
    boot.forEach((m) => err(`engine boot: ${m}`));
    if (!views)
      warn(
        "jsdom tier: engine built 0 views under jsdom - relying on static checks",
      );
    else
      console.log(
        `  jsdom tier: booted - ${views} views, ${navs} nav items, ${srcRows} source rows, ${boot.length} engine error(s)`,
      );
  } catch (e) {
    warn(`jsdom tier: could not run (${e.message}) - relying on static checks`);
  } finally {
    try {
      dom && dom.window.close();
    } catch {} // release jsdom timers/resources so the process exits
  }
}

/* ---------- run ---------- */
function report() {
  console.log(`\nverify - ${rel(TARGET)}`);
  console.log(
    `  docs checked: ${docsChecked} | citations: ${citeTotal} | local files: ${localTotal} | figures: ${figTotal} | demos: ${demoTotal} | css rules: ${cssRuleTotal}`,
  );
  if (warns.length) {
    console.log(`\n  ${warns.length} warning(s):`);
    warns.forEach((w) => console.log("   ⚠ " + w));
  }
  if (errors.length) {
    console.log(`\n  ${errors.length} error(s):`);
    errors.forEach((e) => console.log("   ✗ " + e));
    console.log("\nFAIL");
    return;
  }
  console.log(
    "\nOK - citations resolve, local sources exist, content globals consistent, every doc interactive, no content cropped.",
  );
}

async function main() {
  if (!fs.existsSync(TARGET)) {
    console.error(`verify: target not found - ${TARGET}`);
    process.exit(2);
  }
  if (!fs.existsSync(path.join(TARGET, "index.html")))
    warn(
      "no index.html yet - run build.mjs first (verifying docs/sources only)",
    );
  if (hasOverview(TARGET)) checkDoc("README.md");
  manifest.forEach((d) => checkDoc(d.file));
  lintContent();
  checkNoCrop();
  await jsdomTier();
  report();
  // The jsdom tier can leave timers/resources open; exit explicitly so the run ends.
  process.exit(errors.length ? 1 : 0);
}
main();
