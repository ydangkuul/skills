# Research htmlsite - Context

The domain language for htmlsite that turns a `~/research/{topic}/` folder of markdown into an offline, interactive **Research site**. Its core terms are the **Doc manifest**, **Doc enrichment**, the shared **Source contract** (`contract.js`), and an executable verifier (`verify.mjs`), all of which exist in the code.

## Language

### The site

**Research site**:
The offline, interactive single-page site htmlsite generates from a Research folder.
_Avoid_: report, dashboard, app.

**Research folder**:
`~/research/{topic-slug}/` - the markdown Docs, `sources/`, and (after build) `index.html` + `assets/`.
_Avoid_: project, output dir.

### Content

**Doc**:
One `NN-*.md` research file; `README.md` is the special `overview` Doc.
_Avoid_: page, chapter, article.

**Doc id**:
A Doc's stable handle - `doc-NN` (the zero-padded numeric filename prefix), or `overview`.
_Avoid_: slug, key.

**Doc manifest**:
The ordered list of Docs (`{id, code, file, title}`) for a folder - the single contract tying filenames, embedded markdown, nav, and citations together. The Builder (`manifest.mjs`) is its sole producer and emits it into the page as `window.__MANIFEST__`; the Engine consumes it and never re-derives.
_Avoid_: docs list, table of contents.

**Content globals**:
The per-topic data an author sets on `window` in `content.js`: `SITE`, `VIZ`, `INSIGHTS`, `MATRIX`, `DRILL`, `GLOSSARY`. All optional except the docs. At build/verify time the shared `globals.mjs` loader runs the file in a sandbox and returns its `window` - one home for that VM-execution rule, used by both the Builder and the verifier.
_Avoid_: config, props, data.

**Doc enrichment**:
The optional per-Doc presentation an author layers over the Doc manifest (accent, sub-label, star, title override), keyed by Doc id or file. It is what `SITE.docs[]` now holds - presentation only, no longer a parallel source of truth for identity.
_Avoid_: docs config.

### Visualisation

**Viz panel**:
One mermaid diagram or Chart.js chart, declared in `VIZ` keyed by view id.
_Avoid_: diagram (only one of two kinds), widget, graphic.

**Viz anchor**:
A panel's `at:` string; matches the first heading whose text contains it (case-insensitive) so the panel renders inline beside the section it illustrates. Unmatched panels fall to a top "Visualisations" strip. The match rule is shared via `contract.js` - the Engine matches DOM headings, the verifier matches extracted heading strings.
_Avoid_: position, target, mount point.

### Citations

**Citation**:
An inline `[N]` marker in prose that links to source row N in the same Doc.
_Avoid_: reference, footnote.

**Source contract**:
The format the engine's linker expects - a `## Sources` block of `[N] Title - URL (local: sources/...)` rows that Citations resolve against. It lives in `contract.js`, the one home for the rules both adapters (Engine + verifier) must agree on - alongside **Viz anchor** matching and cross-Doc link parsing.
_Avoid_: bibliography, references format.

### Build

**Engine**:
The generic browser runtime (`engine.js` + `engine.css`) that renders the site from Content globals + embedded markdown. Topic-agnostic; never edited per-topic.
_Avoid_: app, framework, SPA.

**Builder**:
`build.mjs` - the node script that embeds Docs, copies runtime assets, resolves vendor libs, and writes `index.html`.
_Avoid_: compiler, bundler, generator.

**Vendor resolution chain**:
How each browser lib (marked/mermaid/chart) is located: skill copy -> `~/.cache/research-htmlsite/` -> download (then cache).
_Avoid_: dependency install, CDN fetch.

## Relationships

- A **Research folder** contains many **Docs** and produces one **Research site**.
- The **Doc manifest** is derived from the **Docs** (their filenames); every **Doc id** comes from it.
- **Doc enrichment** layers presentation over the **Doc manifest**; both are **Content globals** the **Engine** consumes.
- A **Viz panel** belongs to one view (`overview` or a **Doc**); its **Viz anchor** binds it to a heading.
- A **Citation** resolves against the **Source contract** in the same **Doc**.
- `contract.js` is the one home for the rules the **Engine** and verifier must agree on - the **Source contract**, **Viz anchor** matching, and cross-Doc link parsing; each is consumed by two adapters (browser DOM + node assertions).
- The **Builder** embeds **Docs** and produces the **Doc manifest**; the **Engine** consumes both and no longer re-derives identity - the duplication this review removed. `deriveManifestFallback()` in the Engine is a degraded path (no manifest in the page), not a second owner of the rule.

## Example dialogue

> **Dev:** "If the author writes `id:'doc-1'` in the **Content globals** but the file is `01-auth.md`, what renders?"
> **Maintainer:** "Now? Nothing breaks - the author doesn't write ids at all. The **Builder** owns the **Doc id** (`doc-01`) and emits the manifest; that `id` field would just be ignored enrichment. Before the review, the rule lived in three places and a typo there silently blanked the **Doc**."
> **Dev:** "So if the **Builder** owned the **Doc manifest** and emitted it into the page, the author wouldn't write ids at all?"
> **Maintainer:** "Right - they'd write only **Doc enrichment**, keyed by the manifest's ids. One producer, two consumers."

## Flagged ambiguities

- "docs" meant both the markdown **Docs** on disk and the `SITE.docs` array in **Content globals** - resolved: the on-disk files are **Docs**; the array is **Doc enrichment** over the **Doc manifest**.
- "diagram" was used for both mermaid and Chart.js - resolved: both are **Viz panels**; `kind` distinguishes them.
