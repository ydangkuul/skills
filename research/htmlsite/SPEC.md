# Interactive Research HTML - Requirements Spec

The complete set of requirements htmlsite satisfies (collected from the session that produced it). Use as the acceptance checklist when generating or reviewing a research site.

## 1. Packaging & portability

- **Template/engine contained in the skill** (`engine.css`, `engine.js`, `contract.js`, `template.html`, `build.mjs`, `globals.mjs`, `manifest.mjs`, `verify.mjs`); the builder and verifier run **from the skill** (`node .../htmlsite/build.mjs [target]`, `... /verify.mjs [target]`) and are never copied or edited per topic. The build copies `engine.css`, `engine.js`, `contract.js` + vendor libs into the folder's `assets/`.
- **Multi-file output** (same structure as the reference): `index.html` references `assets/{engine.css, engine.js, contract.js, vendor/*, content.js, demos.js, glossary.js}` (`demos.js` and `glossary.js` optional). The builder copies the engine + libs into the folder's `assets/`; markdown is **embedded** into `index.html` as `<script type="text/markdown">` blocks (no `fetch`, so `file://` works). `</script` neutralised; template fills are `$`-safe (function replacers, so `$&`/`$'` in embedded markdown/titles aren't expanded).
- **Offline**: vendor libs are copied into the folder's `assets/vendor/`, so the finished site needs no internet (optional Google-Fonts `<link>` degrades gracefully).
- **On-demand, cache-first vendoring**: each lib is resolved skill-copy -> `~/.cache/research-htmlsite/vendor/` -> download (then cached), then copied into the folder. First build needs network once; later builds are fully offline. A failed fetch degrades to inert diagrams, not a broken page.
- Rebuildable: editing any `.md`/`assets/content.js`/`assets/glossary.js` + re-running the builder regenerates the site.

## 2. Information architecture

- Fixed **left sidebar** nav grouped: Console (Overview) | Documents (one per `NN-*.md`) | Practice (Drill, if any) | Reference (Glossary, if any).
- **Topbar** console strip (classification, current location, optional metric, "ONLINE").
- Hash routing (`#doc-03`), in-app nav for cross-doc `*.md` links, mobile drawer toggle.
- One **Overview** view: hero + animated stat tiles + (optional) marquee diagrams + (optional) insight cards + (optional) comparison matrix + the full rendered `README.md`.

## 3. Interactive-first: read + interact together (critical)

- **Interactive-first minimum (verify ERROR):** every Doc view (each `NN-*.md`) carries **at least one anchored interactive panel** - a `kind:'chart'` VIZ panel or a demo registered in `assets/demos.js` - whose `at` anchor resolves to a heading in that doc. Mermaid panels remain fully supported but do **not** satisfy the minimum. The overview (`README.md`) is exempt (stat tiles + insights already make it interactive). `assets/content.js` is required and `window.VIZ` must be non-empty.
- Each diagram/chart/demo is **interleaved inline**, anchored to the specific section/heading it illustrates (`at` substring match), **not** dumped in a separate gallery. Unmatched panels fall back to a top "Visualisations" strip (demos append at the end of the doc).
- **Chart.js** charts (bar, line, radar) and **Mermaid** architecture diagrams (flowchart, sequence, ER, state, timeline). Dark theme matching the UI.
- **Interactive demos are first-class:** `assets/demos.js` (start from `assets/demos.example.js`) registers step/click/drag demos per view; `build.mjs` auto-detects it and injects `<script defer src="assets/demos.js">` into `index.html` - no loader snippet in `content.js`. Registration is per-view idempotent, so an old folder still carrying the legacy guarded-loader snippet builds fine and never double-injects. Demos colour only via CSS variables and render SVG/HTML (never `<canvas>`).
- Charts render **lazily when their view is shown** (avoids zero-size canvas when built hidden). Mermaid likewise rendered per active view, once. Demos self-defer until the engine has booted.
- **Official/canonical figures** (research REFERENCE.md -> "Figure rules") are plain markdown image embeds (`![alt](assets/figures/...)` + an italic caption paragraph). The engine styles them automatically - a light panel behind line diagrams so dark-theme strokes stay readable, centered faint captions, `.jpg`/`.jpeg` photos exempt from the panel. They complement the authored VIZ panels, never replace them.

## 4. Citations & sources (must be clickable)

- Inline `[N]` markers become superscript **links that jump** to source `[N]` at the bottom of the doc (target row **flashes**; tooltip shows the URL).
- The `## Sources` block is rebuilt into rows; each row exposes **↗ open source** (live URL, new tab) and **📄 local copy** (the saved `sources/...md|pdf`, new tab).
- Parser is **format-agnostic**: handles `[N] ...` paragraphs, `- [N] ...` bullets, and `N.` ordered lists; matches the real `## Sources` heading exactly (ignores decoys like "primary sources"). This parse rule lives once in `contract.js` (section 8); the engine and `verify.mjs` both consume it.
- All bare URLs in prose auto-link (new tab). Prose "Sources" notes (e.g. README) are left as-is.
- Acceptance: every linkified `[N]` resolves to an on-page anchor (0 broken); every referenced `sources/...` local file exists on disk.

## 5. Study aids

- **Drill** view: Q&A cards, click to reveal a "core" answer + bullets.
- **Glossary** view: searchable + category-filterable term cards with clickable "see-also" jumps; also emitted as `glossary.md`.

## 6. Full content visibility (no cropping - critical)

- **Containers grow to fit their content.** No card, panel, tile, or view may crop, clip, or truncate what it renders: no fixed `height`/`max-height` combined with hidden overflow on cards/panels/tiles/viz containers, no `-webkit-line-clamp`, no `text-overflow: ellipsis` on content text - card bodies, stat tiles, insight cards, drill answers, glossary entries, captions. Applies to `engine.css` **and** to any CSS authored in `content.js` / `demos.js` / `glossary.js` (injected `<style>` blocks, inline `style="..."` strings, `cssText`).
- **Exemptions** - each marked with a `/* no-crop-exempt: reason */` comment on the rule: (a) **horizontal scroll** for wide code blocks/tables (`overflow-x: auto` - scrolling reveals everything, nothing is lost); (b) **purely decorative layers** (background grid/grain/glow, a clipped corner accent - `overflow: hidden` without a height cap only rounds decoration into the corners); (c) the **mobile nav drawer** (navigation chrome, not content); (d) **collapsed reveal states** (drill answers) whose *open* state reaches full content height (`grid-template-rows: 1fr`, never a `max-height` cap). Ellipsis is acceptable only on single-line chrome (e.g. the topbar location strip), never on content.
- The Chart.js `.chart-wrap` fixed box is **not** a crop: the chart scales responsively to fit it; nothing overflows or is clipped.
- `verify.mjs` enforces this statically as an **ERROR** (section 9); a pattern match without the exemption comment fails the build.

## 7. Aesthetics (default theme)

- "Security-ops dossier": near-black ink background, atmospheric grid + grain + dual radial glow; ember (critical) + cyan (data) accents, amber/violet/green secondaries.
- Type: Archivo (display) / Hanken Grotesk (body) / JetBrains Mono (mono/labels) via Google Fonts with system fallbacks.
- Staggered load animation, hover micro-interactions, animated stat counters. Responsive (sidebar collapses to a drawer). Print-friendly.

## 8. Genericity

- Zero topic content in `engine.js` / `engine.css` / `contract.js` / `template.html` / `build.mjs` / `manifest.mjs` / `verify.mjs`. All per-topic content lives in `content.js` (+ `demos.js`, `glossary.js`).
- **Doc identity has one home:** the build (`manifest.mjs`) derives `doc-NN` ids/order from filenames and emits the manifest into the page; the engine consumes it and never re-derives. `SITE.docs` is optional _enrichment_ (accent/sub/star/title) keyed by id - authors never restate ids.
- **The Source contract has one home:** `contract.js` (parse Sources, find citations, pick the Sources heading), consumed by both the engine (DOM adapter) and `verify.mjs` (assertion adapter).
- The **engine** degrades gracefully - it still renders "nav + prose + citations" from markdown alone. The **contract** does not: `verify.mjs` errors without `content.js` + a non-empty `VIZ` + the section 3 per-doc interactive minimum. Everything beyond that (INSIGHTS, MATRIX, DRILL, GLOSSARY, demos) stays optional.

## 9. Verification (`verify.mjs` - executable)

- `node ~/.claude/skills/research/htmlsite/verify.mjs [folder]` asserts this spec **with zero dependencies, offline**, and exits non-zero on any error (soft issues are warnings).
- **Static tier (always):** every inline `[N]` resolves to a Source row (0 broken); every `(local: sources/...)` path exists on disk; every relative figure embed (`![alt](assets/figures/...)`) exists on disk; cross-doc `*.md` links resolve; content globals agree with the docs - VIZ keys are real views, `at` anchors match a heading, `SITE.docs` enrichment keys match the manifest, stat-tile arity, MATRIX cell counts, glossary categories.
- **Interactive-first tier (ERRORs, section 3):** `assets/content.js` missing; `window.VIZ` absent or empty; any Doc view with no anchored interactive panel (chart or demo - mermaid doesn't count, overview exempt); a demo `register(...)` whose view id isn't `overview` or a known Doc id. A demo `at` that matches no heading is a warning (the demo appends at the end of the doc), same as an unmatched VIZ `at`.
- **Demos are parsed statically** (`register('view-id', { at: '...' })` extracted by pattern, `at` read from the head of the spec literal) because `demos.js` is a browser IIFE the sandboxed globals loader can't evaluate - the verifier stays zero-dependency and offline. Keep `at:` the first key of each spec.
- **Full-content-visibility tier (ERRORs, section 6):** a rule-block scan over `assets/engine.css` (the built copy that ships, or the skill copy pre-build) plus every string literal in `assets/content.js`/`demos.js`/`glossary.js` that carries CSS. Flags `-webkit-line-clamp`, `text-overflow: ellipsis`, and `overflow: hidden`/`overflow-y: hidden`/`clip` combined with a fixed `height:`/`max-height:` in the same rule block. A `/* no-crop-exempt: reason */` comment on the rule (or inside the string literal) exempts it. The scan is static because jsdom does **no layout** - `scrollHeight`-based overflow detection is impossible offline, so the pattern gate is the enforceable check; no always-passing jsdom assertion is shipped in its place.
- It reuses the **same Source contract the engine uses** (`assets/contract.js`) - the verifier is the _second adapter_ at that seam, so the rule is enforced from one home rather than re-specified in prose.
- **Optional jsdom tier (only if `jsdom` is installed):** supplies the few browser globals jsdom lacks (`structuredClone`, `scrollTo`, file-safe history, canvas), boots `index.html`, and confirms all views/nav build with **0 engine JS errors** and that source rows render. Jsdom-environment noise is suppressed so only genuine engine throwables fail. Skipped silently when jsdom is absent - htmlsite stays zero-dependency. (Headless Chromium screenshots are preferred when available but often can't run in minimal containers.)
- `test/fixture/` is a committed self-test (source inputs only). `node verify.mjs test/fixture` passes; `node build.mjs test/fixture && node verify.mjs test/fixture` is the full round-trip. See `test/README.md`.
