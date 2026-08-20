#!/usr/bin/env node
/* ============================================================
   RESEARCH HTMLSITE - builder (engine lives in the skill; runs FROM the skill).
   Usage:  node ~/.claude/skills/research/htmlsite/build.mjs [target-folder]
           (target defaults to the current working directory)

   The TEMPLATE/ENGINE is contained in this skill (engine.css, engine.js,
   template.html). The builder copies the runtime assets into the research
   folder and generates a multi-file site there - the same structure as the
   reference output (index.html + assets/...). Nothing about the engine needs to
   be authored or edited per topic.

   Inputs in the TARGET research folder:
     README.md, NN-*.md          the research docs (embedded into index.html)
     assets/content.js           per-topic config (window.SITE + VIZ + optional INSIGHTS/MATRIX/DRILL)
     assets/demos.js             optional interactive demos - auto-detected and
                                 injected into index.html (no loader snippet needed)
     assets/glossary.js          optional (window.GLOSSARY)
     sources/...                   saved source files (for 📄 local-copy links)

   Output (written to TARGET):
     index.html                  references assets/ (engine.css, vendor libs, content.js, glossary.js, engine.js)
     assets/engine.css, engine.js, vendor/*   copied in from the skill
     glossary.md                 emitted from assets/glossary.js (if present)

   Vendor libs (marked/mermaid/chart) are resolved on demand:
       1) skill copy  assets/vendor/   (if present)
       2) local cache ~/.cache/research-htmlsite/vendor/
       3) download    (then saved to the cache)
   ...then copied into the research folder's assets/vendor/ so the output is portable.
   ============================================================ */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { docManifest, embedOrder } from "./manifest.mjs";
import { loadGlobals } from "./globals.mjs"; // shared Content-globals loader (also used by verify.mjs)

const BASE = path.dirname(fileURLToPath(import.meta.url));
const TARGET = path.resolve(process.argv[2] || process.cwd());
const CACHE = path.join(os.homedir(), ".cache", "research-htmlsite", "vendor");
const kp = (...a) => path.join(BASE, ...a);
const tp = (...a) => path.join(TARGET, ...a);
const ok = (f) => {
  try {
    return fs.statSync(f).size > 1000;
  } catch {
    return false;
  }
};

const VENDORS = {
  marked: {
    file: "marked.min.js",
    url: "https://cdn.jsdelivr.net/npm/marked@12/marked.min.js",
  },
  mermaid: {
    file: "mermaid.min.js",
    url: "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js",
  },
  chart: {
    file: "chart.umd.min.js",
    url: "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",
  },
};

// Resolve each vendor lib to an absolute path: skill copy -> cache -> download (then cache).
async function resolveVendors() {
  fs.mkdirSync(CACHE, { recursive: true });
  const out = {};
  for (const [name, v] of Object.entries(VENDORS)) {
    const bundled = kp("assets/vendor", v.file);
    const cached = path.join(CACHE, v.file);
    if (ok(bundled)) {
      out[name] = bundled;
      if (!ok(cached)) {
        try {
          fs.copyFileSync(bundled, cached);
        } catch {}
      }
      console.log(`  ${name}: skill copy`);
      continue;
    }
    if (ok(cached)) {
      out[name] = cached;
      console.log(`  ${name}: cache hit`);
      continue;
    }
    process.stdout.write(`  ${name}: downloading ... `);
    try {
      const r = await fetch(v.url);
      if (!r.ok) throw new Error("HTTP " + r.status);
      fs.writeFileSync(cached, Buffer.from(await r.arrayBuffer()));
      out[name] = cached;
      console.log("ok (cached)");
    } catch (e) {
      console.log("FAILED (" + e.message + ")");
      out[name] = null;
    }
  }
  return out;
}

const readKit = (rel) =>
  fs.existsSync(kp(rel)) ? fs.readFileSync(kp(rel), "utf8") : "";

function embedDocs() {
  const order = embedOrder(TARGET); // overview + doc manifest - the one home for the doc-id rule (manifest.mjs)
  let blocks = "",
    total = 0;
  for (const { key, file } of order) {
    let md = fs.readFileSync(tp(file), "utf8");
    total += md.length;
    md = md.replace(/<\/script/gi, "<\\/script");
    blocks += `<script type="text/markdown" id="md-${key}">\n${md}\n</script>\n`;
  }
  return { blocks, count: order.length, total };
}

function emitGlossaryMd() {
  const G = (loadGlobals(tp("assets/glossary.js")).win || {}).GLOSSARY;
  if (!G || !G.terms) return 0;
  const slug = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  let md = `# Glossary\n\n> ${G.terms.length} terms across ${(G.cats || []).length} categories. The interactive, searchable version is the **Glossary** tab in \`index.html\`.\n\n`;
  md +=
    (G.cats || []).map((c) => `- [${c.label}](#${slug(c.label)})`).join("\n") +
    "\n";
  for (const c of G.cats || []) {
    const items = G.terms
      .filter((t) => t.c === c.id)
      .sort((a, b) => a.t.localeCompare(b.t));
    md += `\n## ${c.label}\n\n`;
    for (const t of items) {
      const see =
        t.see && t.see.length ? ` _(See also: ${t.see.join(", ")}.)_` : "";
      md += `**${t.t}** - ${t.d}${see}\n\n`;
    }
  }
  fs.writeFileSync(tp("glossary.md"), md, "utf8");
  return G.terms.length;
}

async function main() {
  console.log("Research htmlsite - build");
  console.log(`  base:    ${BASE}`);
  console.log(`  target: ${TARGET}`);
  const vendors = await resolveVendors();

  // copy runtime assets from the skill into the research folder (engine + libs the output references)
  fs.mkdirSync(tp("assets/vendor"), { recursive: true });
  fs.copyFileSync(kp("assets/engine.css"), tp("assets/engine.css"));
  fs.copyFileSync(kp("assets/engine.js"), tp("assets/engine.js"));
  fs.copyFileSync(kp("assets/contract.js"), tp("assets/contract.js")); // shared Source contract (engine + verify)
  for (const [name, v] of Object.entries(VENDORS)) {
    if (vendors[name])
      fs.copyFileSync(vendors[name], tp("assets/vendor", v.file));
    else
      console.warn(
        `  warn: ${name} unavailable - diagrams/charts will be inert`,
      );
  }

  if (!fs.existsSync(tp("assets/content.js")))
    console.warn(
      "  note: no assets/content.js - engine will derive a basic docs list from the markdown.",
    );
  const cg = loadGlobals(tp("assets/content.js"));
  if (cg.error) console.warn(`  warn: could not parse content.js: ${cg.error}`);
  const site = (cg.win || {}).SITE || {};
  const title =
    (site.titlePlain || (site.title || "Research").replace(/<[^>]+>/g, "")) +
    (site.subtitle ? " - " + site.subtitle : "");
  const desc = (
    site.description ||
    site.subtitle ||
    "Interactive research briefing."
  ).replace(/"/g, "&quot;");

  const { blocks, count, total } = embedDocs();

  // Builder is the SOLE producer of the doc manifest; emit it into the page so the
  // engine consumes (never recomputes) doc identity/order. SITE.docs only enriches.
  const manifestJson = JSON.stringify(docManifest(TARGET)).replace(
    /<\/script/gi,
    "<\\/script",
  );
  const hasDemos = fs.existsSync(tp("assets/demos.js"));
  const contentScripts =
    `<script>window.__MANIFEST__=${manifestJson};</script>` +
    `\n<script src="assets/content.js"></script>` +
    (fs.existsSync(tp("assets/glossary.js"))
      ? `\n<script src="assets/glossary.js"></script>`
      : "") +
    // demos.js is first-class: auto-injected here (defer -> runs after the DOM
    // exists; it still self-defers on __kitBooted). No content.js loader snippet
    // needed - registration in demos.js is per-view idempotent, so an old
    // guarded-loader snippet double-loading it stays harmless.
    (hasDemos ? `\n<script defer src="assets/demos.js"></script>` : "");
  if (hasDemos) console.log("  demos:   assets/demos.js detected - injected");

  // function replacers -> $-safe (markdown / titles may contain `$`, `$&`, `$'`)
  const sub = (str, needle, value) => str.replace(needle, () => value);
  let out = readKit("template.html");
  out = sub(out, "__TITLE__", title);
  out = sub(out, "__DESC__", desc);
  out = sub(out, "<!--CONTENT_SCRIPTS-->", contentScripts);
  out = sub(out, "<!--DOCS_MARKDOWN-->", blocks); // engine.css / vendor / engine.js stay referenced as in the template

  fs.writeFileSync(tp("index.html"), out, "utf8");
  console.log(
    `  index.html - ${count} docs embedded, ${(out.length / 1024).toFixed(0)} KB (md ${(total / 1024).toFixed(0)} KB) + assets/ copied`,
  );
  const g = emitGlossaryMd();
  if (g) console.log(`  glossary.md - ${g} terms`);
  console.log(
    "Done. Open index.html (with its assets/ folder) in any browser.",
  );
}
main();
