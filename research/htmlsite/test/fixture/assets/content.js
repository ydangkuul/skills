/* Fixture content.js - exercises the new enrichment model + every lint path.
   Note: docs[] carries NO titles/ids-as-source-of-truth - just enrichment keyed
   by the manifest's ids. Titles come from each file's first H1 via the manifest. */
window.SITE = {
  brand: "HTMLSITE-TEST",
  classification: "FIXTURE",
  title: "Fixture <b>Research</b>",
  subtitle: "self-test",
  description: "Tiny site to self-test htmlsite.",
  foot: ["SCOPE  2 docs", "BUILT  2026-06-09"],
  metric: { label: "SRC", value: "4" },
  hero: {
    kicker: "Self-test",
    headline:
      'A <span class="g">fixture</span> for the <span class="e">htmlsite</span>.',
    lede: "Exercises manifest, citations, viz anchors, and lint.",
  },
  stats: [
    ["2", "documents", "fixture", "cyan"],
    ["4", "sources", "offline", "ember"],
  ],
  // Doc enrichment only - accent / sub / star, keyed by manifest id:
  docs: [
    { id: "doc-01", accent: "cyan", sub: "foundations", star: true },
    { id: "doc-02", accent: "ember", sub: "patterns" },
  ],
};

window.INSIGHTS = [
  {
    ix: "01",
    a: "cyan",
    t: "Alpha grounds Beta",
    p: "The two axes agree on the thesis.",
    ref: "docs 01 | 02",
  },
];

window.MATRIX = {
  filters: [{ label: "All", value: "all" }],
  columns: ["Name", "Kind", "Note"],
  rows: [
    {
      cat: "a",
      cells: [
        { name: "Alpha", sub: "axis" },
        { pill: "yes", text: "core" },
        "grounding",
      ],
    },
  ],
};

window.VIZ = {
  overview: [
    {
      kind: "mermaid",
      accent: "ember",
      tag: "MAP",
      title: "Overview",
      meta: "flowchart",
      cap: "Alpha feeds Beta.",
      def: `flowchart TB\n  A["Alpha"] --> B["Beta"]`,
    },
  ],
  "doc-01": [
    {
      kind: "mermaid",
      accent: "cyan",
      tag: "FLOW",
      title: "Split",
      meta: "flowchart",
      at: "Architecture",
      cap: "Two independent halves.",
      def: `flowchart LR\n  X["app"] --> Y[("data")]`,
    },
    {
      // the anchored chart that satisfies doc-01's interactive-first minimum
      kind: "chart",
      accent: "amber",
      tag: "CHART",
      title: "Layer split",
      meta: "bar",
      at: "Architecture",
      cap: "Illustrative weights per half.",
      chart: {
        type: "bar",
        data: {
          labels: ["app", "data"],
          datasets: [
            {
              label: "weight",
              data: [7, 3],
              backgroundColor: ["#2fe3cf", "#f6b13c"],
              borderRadius: 6,
            },
          ],
        },
        options: { plugins: { legend: { display: false } } },
      },
    },
  ],
};

window.DRILL = [
  {
    n: "Q1",
    q: "What does Alpha establish?",
    core: "The foundation the Beta axis builds on.",
    bullets: ["grounding thesis", "data layer independence"],
  },
];
