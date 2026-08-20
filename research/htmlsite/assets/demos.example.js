/* ============================================================
   demos.example.js - TEMPLATE for interactive step/click/drag demos.

   WHY A SEPARATE FILE (not the engine): engine.js is shared by every research
   artifact and verify.mjs hard-fails any VIZ `kind` other than 'mermaid'/'chart'.
   So genuine interactive demos live in an ARTIFACT-LOCAL `assets/demos.js`
   (copy this file, rename, fill in your demos) that the engine never has to know
   about.

   HOW TO USE (per research):
     1. Copy this file to the research folder as `assets/demos.js`.
     2. Replace the sample demo with your own register(...) calls.
     3. Run build.mjs - it AUTO-DETECTS assets/demos.js and injects
        `<script defer src="assets/demos.js">` into index.html. No loader
        snippet in content.js needed (old folders that still carry the guarded
        loader keep working: registration is per-view idempotent, so a double
        load is harmless).

   verify.mjs statically parses the register('view-id', { at: '...' }) calls and
   validates them like VIZ panels: an unknown view id is an ERROR, an `at` that
   matches no heading is a warning. An anchored demo satisfies a Doc's
   interactive-first minimum (SPEC section 3) just like a kind:'chart' panel. Keep
   `at:` as the FIRST key of each spec (as below) so the static parser sees it.

   FOUR RULES that keep demos correct, themeable, and verify-green:
     - COLOUR ONLY via CSS variables (var(--cyan), var(--panel), var(--txt), ...).
       a host page that embeds a report re-themes it by overriding these vars
       inside the iframe; hardcoded hex breaks under its light themes.
     - SVG / HTML / CSS, never <canvas>. A view can initialise hidden (display:none)
       -> a canvas gets 0 width; SVG with a viewBox just scales when revealed.
     - NEVER CROP CONTENT (SPEC section 6): demo/panel markup sizes to its content -
       no fixed height + overflow hidden, no line-clamp, no ellipsis on content
       text in your injected CSS or cssText strings. verify.mjs scans this
       file's string literals and errors on cropping patterns (horizontal
       scroll for wide content is fine when the rule carries a
       "no-crop-exempt: reason" comment).
     - Demos are NOT window.VIZ panels. They register here and this script
       injects them into the built views once the engine has booted.
   ============================================================ */
(function () {
  "use strict";

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- registry: docId ('overview' | 'doc-NN') -> [spec, ...] ---------- */
  var DEMOS = {};
  function register(docId, spec) {
    (DEMOS[docId] || (DEMOS[docId] = [])).push(spec);
  }

  /* ============================================================
     SAMPLE DEMO - delete this and register your own.
     A spec is { at, tag, title, meta, accent, cap, build(bodyEl) }.
       at     : case-insensitive substring of an <h2>/<h3> in the doc; the panel
                is inserted right after that heading (omit -> appended to the doc).
       accent : cyan | ember | amber | violet | green (themed).
       build  : receives the panel body element; wire your interactive UI here.
     ============================================================ */
  register("doc-01", {
    at: "sample section", // heading substring; anchor it - only an ANCHORED demo counts toward the interactive minimum ('' appends at end of the doc)
    tag: "DEMO",
    accent: "cyan",
    title: "Sample demo - click counter",
    meta: "click | interactive",
    cap: "Replace this with your own demo. It shows the shape: state + controls + a render() that repaints from state, using only CSS variables so an embedding host themes it for free.",
    build: function (body) {
      var state = { n: 0 };
      var row = el("div", "dx-row");
      var minus = el("button", "dx-btn", "−");
      var plus = el("button", "dx-btn", "+");
      var out = el("div", "dx-out");
      row.appendChild(minus);
      row.appendChild(out);
      row.appendChild(plus);
      body.appendChild(row);
      function render() {
        out.textContent = state.n;
      }
      minus.addEventListener("click", function () {
        state.n--;
        render();
      });
      plus.addEventListener("click", function () {
        state.n++;
        render();
      });
      render();
    },
  });

  /* ============================================================
     STYLES - inject your own scoped block (here: `.dx-*`). Use CSS variables
     only. Add the rules each of your demos needs; keep selectors prefixed so
     they never collide with engine.css.
     ============================================================ */
  function injectStyles() {
    if (document.getElementById("demos-css")) return;
    var css = `
.dx-row{display:flex;align-items:center;gap:14px}
.dx-btn{font-family:var(--f-mono);font-size:15px;width:38px;height:38px;background:var(--panel-3);color:var(--txt);border:1px solid var(--line-2);border-radius:var(--r-sm);cursor:pointer}
.dx-btn:hover{border-color:var(--cyan);color:var(--cyan)}
.dx-out{font-family:var(--f-display);font-weight:800;font-size:28px;color:var(--cyan);min-width:48px;text-align:center}
`;
    var style = el("style");
    style.id = "demos-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ============================================================
     PANEL - mirrors engine.js vizPanel markup so demos look native (.viz card).
     ============================================================ */
  var ACCENT = {
    cyan: "#2fe3cf",
    ember: "#ff5a4d",
    amber: "#f6b13c",
    violet: "#9d8cff",
    green: "#4ddb8b",
  };
  function buildPanel(spec) {
    var p = el("div", "viz");
    p.style.setProperty(
      "--accent",
      "var(--" +
        (spec.accent || "cyan") +
        ", " +
        (ACCENT[spec.accent] || ACCENT.cyan) +
        ")",
    );
    p.appendChild(
      el(
        "div",
        "vh",
        '<span class="tag">' +
          (spec.tag || "DEMO") +
          "</span><h4>" +
          (spec.title || "") +
          '</h4><span class="meta">' +
          (spec.meta || "") +
          "</span>",
      ),
    );
    var bodyWrap = el("div", "vbody");
    p.appendChild(bodyWrap);
    if (spec.cap) p.appendChild(el("div", "vcap", spec.cap));
    try {
      spec.build(bodyWrap);
    } catch (e) {
      bodyWrap.innerHTML =
        '<div style="color:var(--ember);font-family:var(--f-mono);font-size:12px">demo error: ' +
        escapeHtml((e && e.message) || e) +
        "</div>";
    }
    return p;
  }

  /* ---------- inject: anchor each demo after a heading in its doc view ---------- */
  function injectInto(view, docId) {
    var md = view.querySelector(".md");
    if (!md) return;
    var headings = [].slice.call(md.querySelectorAll("h2, h3"));
    (DEMOS[docId] || []).forEach(function (spec) {
      var panel = buildPanel(spec),
        anchor = null;
      if (spec.at) {
        var at = spec.at.toLowerCase();
        anchor = headings.find(function (h) {
          return h.textContent.toLowerCase().indexOf(at) !== -1;
        });
      }
      if (anchor) anchor.insertAdjacentElement("afterend", panel);
      else md.appendChild(panel);
    });
  }

  function boot() {
    try {
      injectStyles();
      Object.keys(DEMOS).forEach(function (docId) {
        var view = document.getElementById("view-" + docId);
        if (view && !view._demosDone) {
          view._demosDone = true;
          injectInto(view, docId);
        }
      });
    } catch (e) {
      /* never break the page */
    }
  }

  /* ---------- self-defer until the engine has built every view ---------- */
  var tries = 0;
  function whenReady() {
    // __kitBooted is set by the htmlsite engine once it has built the
    // view/.md/.viz DOM.
    if (
      window.__kitBooted &&
      document.getElementById("content")
    ) {
      boot();
      return;
    }
    if (tries++ > 600) return; // ~10s safety cap
    requestAnimationFrame(whenReady);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", whenReady);
  else whenReady();
})();
