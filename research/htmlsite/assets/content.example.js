/* ============================================================
   content.js  -  THE MAIN FILE YOU AUTHOR PER RESEARCH TOPIC
   Copy to assets/content.js and fill in. This file is REQUIRED, and VIZ must
   be non-empty (interactive-first contract - verify.mjs errors otherwise).
   The other globals are OPTIONAL - omit one and the engine skips that section.
   Interactive step/click demos live in assets/demos.js (see demos.example.js);
   the build auto-injects it.
   FULL CONTENT VISIBILITY (SPEC section 6): any HTML/CSS you author here (hero/lede/
   insight markup, inline style="..." strings) must NOT crop - no line-clamp, no
   ellipsis on content text, no fixed height + overflow hidden. Size to content;
   verify.mjs errors on cropping patterns.
   Accent palette (use these names anywhere `accent`/`a` is asked):
     cyan | ember | amber | violet | green
   ============================================================ */

window.SITE = {
  brand: "RESEARCH", // tiny mono label, top-left
  classification: "BRIEFING", // topbar "CLASSIFICATION" value
  title: "Topic <b>Name</b>", // sidebar H1 - wrap the keyword in <b> for the cyan accent
  titlePlain: "Topic Name", // OPTIONAL plain title for <title>/SEO (else derived from `title`)
  subtitle: "one-line subtitle", // under the H1, and in <title>
  description: "one sentence for SEO/meta",
  foot: ["SCOPE  N docs | M sources", "BUILT  2026-xx-xx"], // side-foot lines
  metric: { label: "SRC", value: "68" }, // OPTIONAL top-right counter

  hero: {
    // the Overview hero
    kicker: "Kicker line above the headline",
    headline:
      'A bold <span class="g">headline</span> with one <span class="e">accent</span>.', // g = cyan, e = ember
    lede: "One or two sentences framing the whole research. <b>Bold</b> the thesis.",
  },

  stats: [
    // OPTIONAL animated tiles: [number, label, sublabel, accent]
    ["10", "documents", "briefing pack", "cyan"],
    ["68", "primary sources", "offline, cited", "ember"],
    ["13", "systems compared", "", "violet"],
    ["22k", "words", "synthesised", "amber"],
  ],

  sections: {
    // OPTIONAL overview section titles
    map: "The architecture at a glance",
    synthesis: "Key insights",
    compare: "Comparison",
    briefing: "Full briefing (README)",
  },

  // OPTIONAL Doc enrichment. build.mjs emits the doc MANIFEST (id/code/file/title,
  // derived from the NN-*.md filenames + each file's first H1) into the page for you -
  // you do NOT restate ids or titles. List a doc here only to ENRICH it: choose an
  // accent, add a sub-label, star it, or override the title. Key by manifest id
  // ('doc-' + the numeric prefix) or by filename. Omit this entirely and every doc
  // still renders, with a cycled accent.
  docs: [
    { id: "doc-01", accent: "cyan", sub: "short tag", star: true },
    { id: "doc-02", accent: "ember", sub: "short tag" },
    // equivalently: { file:'02-second-axis.md', accent:'ember', title:'Override' }
  ],

  drill: {
    // OPTIONAL header for the Drill view (only shows if window.DRILL set)
    kicker: "Practice | reveal mode",
    headline: 'Drill - <span class="e">N questions</span> to rehearse',
    lede: "Read the prompt, answer aloud, then reveal the model answer.",
  },
  glossaryIntro:
    "Search any term or definition, filter by category, or click a ↳ see-also to jump.",
};

/* OPTIONAL - Overview "insights" cards (cross-axis takeaways). */
window.INSIGHTS = [
  {
    ix: "01",
    a: "cyan",
    t: "Insight title",
    p: "One or two sentences. Keep it sharp.",
    ref: "docs 01 | 03",
  },
  { ix: "02", a: "ember", t: "Another insight", p: "...", ref: "doc 02" },
];

/* OPTIONAL - Overview comparison matrix. Generic: define columns + rows.
   A cell may be: a string, {name,sub} (first column), or {pill,text} (coloured chip).
   pill classes available: yes (green) | no (grey) | pg (cyan) | evt (violet). */
window.MATRIX = {
  filters: [
    { label: "All", value: "all" },
    { label: "Group A", value: "a" },
    { label: "Group B", value: "b", accent: "ember" },
  ],
  columns: ["Name", "Type", "Field", "Note"],
  rows: [
    {
      cat: "a",
      cells: [
        { name: "Thing One", sub: "detail" },
        { pill: "yes", text: "kind" },
        "value",
        "free-text note",
      ],
    },
    {
      cat: "b",
      cells: [
        { name: "Thing Two", sub: "detail" },
        { pill: "no", text: "kind" },
        "value",
        "free-text note",
      ],
    },
  ],
};

/* REQUIRED - Visualisations, keyed by view id ('overview' or a doc id).
   Each panel is mermaid or chart. `at` anchors the panel right after the first
   heading in that doc whose text contains the string (case-insensitive); if it
   doesn't match, the panel collects in a "Visualisations" strip at the top.
   THIS IS HOW "read + visualise together" works - anchor each diagram to its section.
   INTERACTIVE-FIRST MINIMUM (verify ERROR): every doc view needs at least one
   ANCHORED interactive panel - a kind:'chart' panel here, or a demo registered
   in assets/demos.js (auto-injected by the build). Mermaid panels are welcome
   but do not satisfy the minimum; the overview is exempt. */
window.VIZ = {
  overview: [
    {
      kind: "mermaid",
      accent: "ember",
      tag: "MAP",
      title: "System overview",
      meta: "flowchart",
      cap: "One-line caption. <b>Bold</b> the takeaway.",
      def: `flowchart TB
  A["Start"] --> B["Middle"]
  B --> C[("Data store")]`,
    },
  ],
  "doc-01": [
    {
      kind: "mermaid",
      accent: "cyan",
      tag: "FLOW",
      title: "A sequence",
      meta: "sequence",
      at: "First Axis",
      cap: "Caption.",
      def: `sequenceDiagram
  participant X
  participant Y
  X->>Y: request
  Y-->>X: response`,
    },
    {
      kind: "chart",
      accent: "amber",
      tag: "CHART",
      title: "A comparison",
      meta: "bar",
      at: "metrics",
      cap: "Values are illustrative.",
      chart: {
        type: "bar",
        data: {
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "score",
              data: [8, 5, 3],
              backgroundColor: ["#4ddb8b", "#2fe3cf", "#f6b13c"],
              borderRadius: 6,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: "#1d2531" }, ticks: { color: "#5f6b7c" } },
            x: { grid: { display: false }, ticks: { color: "#9aa6b8" } },
          },
        },
      },
    },
  ],
};

/* OPTIONAL - Drill Q&A reveal cards (great for interview/study prep). */
window.DRILL = [
  {
    n: "Q1",
    q: "A question to rehearse?",
    core: "The model core answer in one or two sentences.",
    bullets: ["supporting point", "another point"],
  },
  { n: "Q2", q: "Another question?", core: "...", bullets: ["..."] },
];
