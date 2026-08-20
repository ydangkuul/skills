/* ============================================================
   manifest.mjs - the DOC MANIFEST, one home for the doc-identity rule.
   Rule: a Doc's id is `doc-` + its zero-padded numeric filename prefix,
   ordered by that prefix. README.md is the `overview` Doc (handled separately
   by callers - it is NOT in the doc manifest, since the engine gives it its
   own nav slot).

   Used by:
     - build.mjs   - to embed docs (keyed by id) and emit window.__MANIFEST__
     - verify.mjs  - to validate content globals against the real docs
   The Engine never recomputes this: build.mjs emits the result into the page.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

/* The ordered list of Docs (EXCLUDING the README/overview Doc).
   Each: { id:'doc-NN', code:'NN', file:'NN-*.md', title:'<first H1>' }. */
export function docManifest(folder) {
  return fs
    .readdirSync(folder)
    .filter((f) => /^\d.*\.md$/i.test(f) && !/^glossary\.md$/i.test(f))
    .sort()
    .map((file) => {
      const code = (file.match(/^(\d+)/) || ["", ""])[1];
      return { id: "doc-" + code, code, file, title: firstH1(folder, file) };
    });
}

/* Whether this folder has a README (the overview Doc). */
export function hasOverview(folder) {
  return fs.existsSync(path.join(folder, "README.md"));
}

/* The full embed order: overview first (if present), then the doc manifest.
   Returns [{ key, file }] where key is the embedded-script id ('overview' or 'doc-NN'). */
export function embedOrder(folder) {
  const list = [];
  if (hasOverview(folder)) list.push({ key: "overview", file: "README.md" });
  for (const d of docManifest(folder)) list.push({ key: d.id, file: d.file });
  return list;
}

function firstH1(folder, file) {
  const md = fs.readFileSync(path.join(folder, file), "utf8");
  const h1 = (md.match(/^#\s+(.+)$/m) || [])[1] || file.replace(/\.md$/i, "");
  return h1.replace(/[*_`]/g, "").trim();
}
