/* ============================================================
   glossary.js  -  OPTIONAL searchable glossary (copy to assets/glossary.js)
   If present, the engine adds a searchable/filterable Glossary tab and
   build.mjs emits glossary.md from this same data (single source of truth).
   ============================================================ */
window.GLOSSARY = {
  // categories become the filter chips; accent ∈ cyan|ember|amber|violet|green
  cats: [
    { id: "core", label: "Core concepts", accent: "cyan" },
    { id: "ops", label: "Operations", accent: "amber" },
    { id: "context", label: "Domain context", accent: "ember" },
  ],
  // each term: t=term, c=category id, d=one-line definition, see=[related terms]
  terms: [
    {
      t: "Example Term",
      c: "core",
      d: "A crisp one-sentence definition written for the reader.",
      see: ["Related Term"],
    },
    {
      t: "Related Term",
      c: "ops",
      d: "Another definition. Keep them short and interview-useful.",
      see: ["Example Term"],
    },
    {
      t: "Domain Thing",
      c: "context",
      d: "A term specific to this topic's real-world context.",
    },
  ],
};
