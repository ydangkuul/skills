/* Fixture demos.js - exercises the first-class demo path: build.mjs auto-injects
   this file into index.html; verify.mjs statically parses the register(...) calls
   and the anchored demo below satisfies doc-02's interactive-first minimum. */
(function () {
  "use strict";

  var DEMOS = {};
  function register(docId, spec) {
    (DEMOS[docId] || (DEMOS[docId] = [])).push(spec);
  }

  register("doc-02", {
    at: "Metrics", // anchors after '## Metrics' in 02-beta.md
    tag: "DEMO",
    accent: "green",
    title: "Throughput counter",
    meta: "click | interactive",
    cap: "Fixture demo - click to bump the count.",
    build: function (body) {
      var state = { n: 0 };
      var btn = document.createElement("button");
      btn.textContent = "+1";
      var out = document.createElement("span");
      out.style.cssText =
        "margin-left:10px;font-family:var(--f-mono);color:var(--green)";
      body.appendChild(btn);
      body.appendChild(out);
      function render() {
        out.textContent = String(state.n);
      }
      btn.addEventListener("click", function () {
        state.n++;
        render();
      });
      render();
    },
  });

  /* ---------- panel + inject (minimal mirror of demos.example.js) ---------- */
  function buildPanel(spec) {
    var p = document.createElement("div");
    p.className = "viz";
    p.style.setProperty("--accent", "var(--" + (spec.accent || "cyan") + ")");
    var h = document.createElement("div");
    h.className = "vh";
    h.innerHTML =
      '<span class="tag">' +
      (spec.tag || "DEMO") +
      "</span><h4>" +
      (spec.title || "") +
      '</h4><span class="meta">' +
      (spec.meta || "") +
      "</span>";
    p.appendChild(h);
    var body = document.createElement("div");
    body.className = "vbody";
    p.appendChild(body);
    if (spec.cap) {
      var cap = document.createElement("div");
      cap.className = "vcap";
      cap.innerHTML = spec.cap;
      p.appendChild(cap);
    }
    try {
      spec.build(body);
    } catch (e) {
      /* never break the page */
    }
    return p;
  }

  function boot() {
    Object.keys(DEMOS).forEach(function (docId) {
      var view = document.getElementById("view-" + docId);
      if (!view || view._demosDone) return; // idempotent - a double load injects nothing twice
      view._demosDone = true;
      var md = view.querySelector(".md");
      if (!md) return;
      var headings = [].slice.call(md.querySelectorAll("h2, h3"));
      DEMOS[docId].forEach(function (spec) {
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
    });
  }

  var tries = 0;
  function whenReady() {
    if (window.__kitBooted && document.getElementById("content")) {
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
