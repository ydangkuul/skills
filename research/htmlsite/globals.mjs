/* ============================================================
   globals.mjs - load a Content-globals file (content.js / glossary.js) in a
   sandbox and return its `window`. One home for the VM-execution rule, shared
   by two node callers:
     - build.mjs   - reads SITE (title/desc) and GLOSSARY (to emit glossary.md)
     - verify.mjs  - lints the content globals against the real docs
   Node-only (uses vm/fs). The browser never runs this - the Engine reads the
   same globals directly off `window` in the page.

   Returns { win, error }:
     file missing -> { win:null, error:null }   (callers decide if that's a warn)
     parse error  -> { win:null, error:'msg' }   (each caller reports its own way)
     success      -> { win:{...},  error:null }
   ============================================================ */
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

export function loadGlobals(absFile) {
  if (!fs.existsSync(absFile)) return { win: null, error: null };
  const sandbox = { window: {}, document: { querySelectorAll: () => [] } };
  try {
    vm.runInNewContext(fs.readFileSync(absFile, "utf8"), sandbox, {
      filename: path.basename(absFile),
    });
    return { win: sandbox.window, error: null };
  } catch (e) {
    return { win: null, error: e.message };
  }
}
