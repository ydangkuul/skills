# Research htmlsite

Turns a `~/research/{topic}/` folder of markdown docs into an **offline, interactive single-page site** - the "security-ops console" look with inline charts, interactive demos, architecture diagrams, a drill mode, a searchable glossary, and clickable citations/sources.

**The engine/template lives in this skill** (`engine.css`, `engine.js`, `template.html`) and the builder runs **from here** - you never copy or edit it. You author small per-topic files; the build copies the runtime assets in and produces a normal multi-file site (`index.html` + `assets/`).

**The contract is interactive-first:** every doc view must carry at least one anchored interactive panel - a `kind:'chart'` VIZ panel or a registered demo. Mermaid diagrams are supported but don't satisfy that minimum; `verify.mjs` enforces it as an error. See [SPEC.md](SPEC.md) section 3.

**And full-content-visible:** no card, panel, or tile may crop or truncate its content - containers grow to fit; `verify.mjs` errors on line-clamps, ellipsis on content text, and fixed-height + hidden-overflow rules in `engine.css` or authored CSS ([SPEC.md](SPEC.md) section 6 documents the `no-crop-exempt` mechanism).

## Use it (per research topic)

From the research folder root (where `README.md` + `NN-*.md` live):

```bash
# 1. author assets/content.js (REQUIRED - start from the example; give every doc
#    an anchored chart or demo), plus optionally assets/demos.js and assets/glossary.js
mkdir -p assets
cp ~/.claude/skills/research/htmlsite/assets/content.example.js  assets/content.js   # then EDIT
cp ~/.claude/skills/research/htmlsite/assets/demos.example.js    assets/demos.js     # optional; EDIT or delete
cp ~/.claude/skills/research/htmlsite/assets/glossary.example.js assets/glossary.js  # optional; EDIT or delete

# 2. build - copies engine + libs into assets/, embeds docs, writes index.html (+ glossary.md);
#    auto-detects assets/demos.js and injects it into index.html
node ~/.claude/skills/research/htmlsite/build.mjs

# 3. verify - zero-dep, offline: citations resolve, local sources exist, content
#    globals consistent, every doc has an anchored interactive panel
node ~/.claude/skills/research/htmlsite/verify.mjs
```

Then open `index.html` (keep the `assets/` folder beside it). Re-run the build after editing any `.md` or content file, and `verify.mjs` to confirm it's still sound (non-zero exit = something to fix). `verify.mjs` runs the same **Source contract** the engine uses (`assets/contract.js`) - see [SPEC.md](SPEC.md) section 9 for the full checklist and the optional jsdom boot tier. The research folder ends up like the reference output: `*.md`, `sources/`, `index.html`, `glossary.md`, and `assets/{engine.css, engine.js, vendor/, content.js, glossary.js}`.

Vendor libraries (marked/mermaid/chart) are resolved **on demand**: a local cache at `~/.cache/research-htmlsite/` is checked first; only a true cache-miss triggers a download (then it's cached). So the first build needs network once; later builds are offline. The libs are copied into the folder's `assets/vendor/`, so the finished site needs no internet.

## What you author - `assets/content.js` (+ optional `assets/demos.js`)

`content.js` is required and its `VIZ` must be non-empty. See `assets/content.example.js` for the full, commented shape:

- `SITE` - brand, title, hero, stat tiles, and optional **doc enrichment** (`docs[]`: accent/sub/star per doc). The build derives each doc's id/title/order from its `NN-*.md` filename + first H1 and emits that **manifest** into the page, so you never restate ids - list a doc in `docs[]` only to style it.
- `INSIGHTS` - overview "key insight" cards (cross-axis takeaways).
- `MATRIX` - overview comparison table (`columns` + `rows`, with filter chips).
- `VIZ` - **the charts/diagrams**, keyed by view id. Each panel carries an **`at`** string that anchors it right after the heading it illustrates -> _read + visualise together_. `kind:'chart'` (Chart.js config) or `kind:'mermaid'` (def). **Every doc needs at least one anchored `kind:'chart'` panel or a registered demo** - the interactive-first minimum (verify error).
- `DEMOS` (in `assets/demos.js`, start from `assets/demos.example.js`) - step/click/drag **interactive demos**, registered per view with the same `at` anchoring. The build auto-detects the file and injects it into `index.html`; `verify.mjs` validates each `register(...)` like a VIZ panel.
- `DRILL` - Q&A reveal cards (study/interview prep).
- `GLOSSARY` (in `assets/glossary.js`) - searchable terms by category; also emitted to `glossary.md`.

Omit an optional global and the engine just skips that section. The engine itself still renders markdown-only folders (nav + prose + citations), but the **contract** doesn't accept them - verify errors until every doc has an anchored interactive panel.

## What you get for free (engine + build)

- Dark **security-ops console** UI: fixed sidebar nav, topbar, animated stat tiles, atmospheric grid/grain background. Fonts: Archivo / Hanken Grotesk / JetBrains Mono.
- **Markdown** rendered client-side (marked), styled tables/code/callouts.
- **Chart.js** charts + **Mermaid** diagrams, dark-themed, rendered lazily per view, **interleaved inline** with the prose via `at` anchors. **Demos** (`assets/demos.js`) injected the same way, as native-looking `.viz` cards.
- **Official/canonical figures** embedded as plain markdown (`![alt](assets/figures/...)` + an italic caption) are styled automatically - light panel behind line diagrams for dark-theme legibility, centered faint captions, photos exempt. No authoring beyond the markdown; `verify.mjs` asserts each embed exists on disk.
- **Citations & sources**: inline `[N]` become superscript links that jump to the source row (which flashes); each source row gets **↗ open source** (live URL) and **📄 local copy** (the saved `sources/...md`) buttons; all bare URLs auto-link. Works across bracketed, bulleted, and numbered Sources formats.
- **Drill** mode and a **searchable Glossary** (category filters + see-also jumps).
- Cross-doc `*.md` links become in-app navigation; `#hash` routing; mobile drawer.
- **Offline & portable**: the engine and libraries are copied into the folder's `assets/`; markdown is embedded into `index.html` (no `fetch`). Opens from `file://`, no server, no internet (Google-Fonts aside, which degrades gracefully). Same multi-file structure as the reference output.
- **Doc manifest** owned by the build: doc identity/order is computed once (in `manifest.mjs`) and emitted as `window.__MANIFEST__`; the engine consumes it rather than re-deriving - so the doc-id rule has a single home.
- **An executable acceptance check** (`verify.mjs`): zero-dep, offline assertions that citations resolve, local sources exist, content globals are consistent, and every doc meets the interactive-first minimum - the SPEC, made runnable. `test/fixture/` is htmlsite's own regression sample (see `test/README.md`).

See `SPEC.md` for the full requirements htmlsite satisfies.
