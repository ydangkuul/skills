# Research Output Reference

## Output path

Default: `~/research/{topic-slug}/` (unless user specifies otherwise).

## Folder layout

```
~/research/{topic-slug}/
├── PLAN.md                         # axes with slug, scope line, route tag (planner)
├── .run/
│   ├── state.json                  # run state, written only by the orchestrator
│   └── returns/                    # each subagent return saved verbatim: {phase}-{axis-slug}.md
├── README.md                       # index + cross-axis synthesis (synthesizer)
├── 01-{axis-1-slug}.md             # per-axis docs (compilers)
├── 02-{axis-2-slug}.md
├── verification/                   # claim verdicts per axis (deep runs)
│   └── {axis-slug}.md
├── index.html                      # interactive site (builder) - open in any browser
├── glossary.md                     # emitted from assets/glossary.js (if used)
├── assets/                         # authored: content.js, demos.js (+ optional glossary.js);
│   │                               #   build copies in engine.css, engine.js, contract.js, vendor/
│   └── figures/                    # official/canonical figures, embedded in the docs
│       ├── ATTRIBUTION.md          #   per-file ledger: origin, author, license
│       ├── pgdocs-gin.svg          #   names: {source-prefix}-{what}.{ext}
│       └── wikimedia-btree.svg
└── sources/                        # source pages saved as Markdown via Jina Reader, per axis
    ├── {axis-1-slug}/
    │   ├── 01-short-name.md
    │   └── ...
    └── {axis-2-slug}/
        └── ...
```

The engine (`engine.css`, `engine.js`, `contract.js`), `build.mjs`, `globals.mjs`, `manifest.mjs`, `template.html`, and `verify.mjs` all live in the **htmlsite** (`~/.claude/skills/research/htmlsite/`) and run **from there** - only `index.html`, `glossary.md`, and the `assets/` payload are written into the research folder.

## PLAN.md format

One section per axis, in gather order:

```markdown
# Research plan: {Topic}

Depth: {light|standard|deep} | Axes: {N}

## 01 {axis-1-slug}

- scope: {one line - the question this axis answers}
- route: general

## 02 {axis-2-slug}

- scope: {one line}
- route: security
```

## Run state

File: `.run/state.json`

The orchestrator is the only writer; it updates state.json in the same turn a subagent returns and saves that return under `.run/returns/`.

```json
{
  "topic": "...",
  "depth": "light|standard|deep",
  "phase": "...",
  "axes": [
    {
      "slug": "...",
      "route": "general|security",
      "gathered": false,
      "verified": null,
      "compiled": false,
      "figures": false
    }
  ],
  "synthesized": false,
  "reviewed": false,
  "html": false
}
```

`verified` is `null` on light/standard runs (verification not in scope), boolean on deep runs.

## Route tags

`route: security` marks work concerning **security or low-level coding**: offensive/defensive security, exploits, malware analysis, reverse engineering, kernels, assembly, firmware, cryptography internals, memory corruption, and similar. Some model families get wrongly flagged by safety railguards on this material and return refusals or thin results, which is what the separate route buys. Everything else is `route: general`.

## Subagent return format

Every delegated agent's return is a short structured summary - the products live on disk, the return is the receipt. The orchestrator saves it verbatim to `.run/returns/{phase}-{axis-slug}.md` (run-wide tasks: `{phase}.md`).

- **Paths** - every file written, absolute or run-relative.
- **TL;DR** - 2-4 sentences of what was found/produced.
- **Counts** - sources saved, claims extracted/survived, figures embedded, panels registered, verify exit code - whatever the task counts in.
- **Flags** - gated sources, thin axes, checks needing user input.

Dense and factual, no human-facing preamble.

## Interactive HTML site

Built by the html-build task with the bundled htmlsite at `~/.claude/skills/research/htmlsite/` (see its `README.md` for steps, `SPEC.md` for the full requirements). You author `assets/content.js` and `assets/demos.js` (+ optional `assets/glossary.js`) - and in content.js, `docs[]` is optional _enrichment_ (accent/sub/star); the build derives each doc's id/title from its filename, so you never restate them. `node build.mjs` embeds the docs and produces `index.html`.

**Interactive-first minimum (verify.mjs ERROR):** every doc view (each `NN-*.md`) carries at least one anchored interactive panel - a `kind:'chart'` VIZ panel or a registered demo. Mermaid panels are supplements and do not satisfy the minimum; `README.md`/overview is exempt. Figures (below) complement the minimum without satisfying it.

This **Source contract is the one the site's linker expects** - keep each doc's `## Sources` list as `[N] Title - URL (local: sources/{axis}/NN-name.md)` with matching inline `[N]` markers in the prose. The engine turns inline `[N]` into clickable jumps and gives every source row **↗ open source** (live URL) + **📄 local copy** (the saved file) buttons. The rule lives in exactly one place - `htmlsite/assets/contract.js` - consumed by both the engine (to build the rows) and `verify.mjs` (to assert every `[N]` resolves and every local file exists). Follow the format below and run `verify.mjs`; nothing else is needed.

## Interactive demos

File: `assets/demos.js`.

First-class citizens of the site: step/click/drag interactions beyond the Mermaid diagrams and Chart.js charts the engine renders from `window.VIZ`. `build.mjs` auto-detects `assets/demos.js` and injects it into the generated `index.html`; `verify.mjs` parses its `register(...)` calls and validates view ids and `at:` anchors like VIZ panels. **Demos count toward the per-doc interactive minimum.**

Copy `htmlsite/assets/demos.example.js` into the research as `assets/demos.js` and replace the sample with your own `register(docId, spec)` calls - a spec is `{ at, tag, title, meta, accent, cap, build(bodyEl) }`, with `at` a case-insensitive substring of an `<h2>`/`<h3>` in the doc. Keep `at` the first key of each spec - verify.mjs reads it statically from the head of the literal. The template injects each registered demo as a `.viz` card right after that heading, so demos look native and theme with the rest of the report.

Two rules keep demos themeable and sandbox-safe:

1. **Colour only via CSS variables** (`var(--cyan)`, `var(--panel)`, `var(--txt)`, and friends). A host page that embeds a report re-themes it by overriding those variables inside its iframe (light and dark themes); hardcoded hex breaks there.
2. **SVG / HTML / CSS, never `<canvas>`.** A doc view can initialise hidden (`display:none`) where a canvas measures zero width; SVG with a viewBox just scales when revealed.

A worked demo set for a database topic runs to six: an MVCC simulator, a transaction-ID wraparound clock, a memory-budget calculator, an isolation-level playground, a bloat simulator, and a buffer clock-sweep. Aim for that density where the material rewards it.

## README.md

```markdown
# {Topic} Research

**{One-line description}**

## Research Files

| File                           | Description         |
| ------------------------------ | ------------------- |
| [01-{axis}.md](./01-{axis}.md) | {Brief description} |
| ...                            | ...                 |

## Cross-Axis Synthesis

[Key insights that cut across multiple axes, contradictions between axes, gaps]

## Downloaded Sources

Total files: {N}. See `./sources/` for offline copies. Gated or skipped URLs are listed per-axis in each file's Sources section.

_Research conducted: {date}_
```

## Per-axis document structure

```markdown
# Research: {Topic / Axis Title}

> Generated: {date} | Sources: {count} | Saved: {N}

## TL;DR

[3-5 sentence executive summary]

## Key Findings

[Bulleted list of the most important discoveries]

## Detailed Analysis

[Findings with inline citations, e.g. "RSC reduces bundle size by up to 30% [1]"]

## Open Questions

[What remains unclear or needs further investigation]

## Sources

[1] Title or description - URL (local: sources/{axis}/01-name.md)
[2] Paper title - URL (local: sources/{axis}/02-paper.md, pdf: sources/{axis}/02-paper.pdf)
[3] Dataset name - URL [binary: saved] (local: sources/{axis}/03-data.csv)
[4] Title or description - URL [gated]
[5] Title - URL [unverified]
```

## Verification verdicts

File: `verification/{axis-slug}.md`, deep runs only.

One table per axis, written by the orchestrator from the three voter returns:

```markdown
# Claim verdicts: {axis-slug}

| # | Claim | Importance | Valid votes | Refutations | Verdict | Notes |
| - | ----- | ---------- | ----------- | ----------- | ------- | ----- |
| 1 | {statement} | central | 3 | 0 | survives | |
| 2 | {statement} | supporting | 3 | 2 | killed | {voter evidence, one line} |
| 3 | {statement} | supporting | 1 | 0 | unverified | 2 voters errored |
```

Count only **valid** votes - a voter that errored, timed out, or returned no verdict is not a vote. Three outcomes:

- **survives** - at least 2 valid votes AND fewer than 2 refutations. Compile builds on these.
- **killed** - 2+ refutations among valid votes (adjudicated on merit). Compile drops or explicitly flags these.
- **unverified** - fewer than 2 valid votes; an infra failure must never read as a refutation. Relaunch the missing voters once; if still short, record `unverified` and compile keeps the claim as an ordinary finding marked `[unverified]`, never treats it as killed.

An axis that loses every claim on merit gets a short doc flagged as needing deeper research - a 100% kill is either a genuine refutation or a thin gather. An axis whose claims are mostly `unverified` is an infra problem, not a content verdict: flag it for a voter re-run.

## Saved-source file structure (`sources/{axis}/NN-name.md`)

Every saved page is written as Markdown with frontmatter:

```markdown
---
source_url: https://example.com/article
fetched_at: 2026-04-25
axis: { axis-slug }
title: { page title }
extractor: jina # or: mintlify-md | webfetch | wget
---

# {Page Title}

[Full Markdown rendering of the page content. Headings, lists, code blocks, tables, blockquotes preserved. Images written as `![alt](https://original-image-url)` so they render online when the user opens the file in a Markdown viewer with internet access.]
```

If `extractor: webfetch`, the content is an LLM summary, not the source - flag this in citations and don't quote verbatim.

## Citation rules

- Every factual claim MUST have an inline `[N]` citation linking to the Sources list
- Never paraphrase a source without citing it
- Collect ALL URLs from all subagents into deduplicated, numbered Sources lists
- If a finding cannot be attributed to a specific source, mark it `[unverified]`
- If a source URL was not downloadable (paywall, login, 4xx/5xx, robots-blocked), mark it `[gated]` or `[blocked]` and omit the `(local: ...)` suffix
- Each file has its own Sources section at the bottom

## Source-saving rules

For gather and compile tasks.

- Target folder: `~/research/{topic-slug}/sources/{axis-slug}/`
- Name files `NN-short-slug.md` (always `.md`, zero-padded `NN` for order)
- **HTML pages: default to Jina Reader** - `wget -q --timeout=90 -O <path> "https://r.jina.ai/<source-url>"`. This is "Reader Mode as an API": headless browser + Mozilla Readability + Markdown conversion. Returns verbatim quotable content and handles JS SPAs that defeat raw scraping. Set `extractor: jina` in frontmatter.
- **Rate limits matter:** Jina free tier 429s under load. Run **serially, one in flight, with `sleep 2` between requests**. For batch jobs >50 URLs, expect intermittent 429s; retry once with `sleep 30`.
- **Fallback chain when Jina returns <500 bytes or non-2xx:**
  1. **Mintlify-style raw markdown:** if the host is `code.claude.com`, `platform.claude.com/docs`, `modelcontextprotocol.io`, etc., append `.md` to the path and `wget` directly - these sites serve the original Markdown source. Set `extractor: mintlify-md`.
  2. **WebFetch** (Anthropic harness tool) with prompt: _"Return the full page content as clean Markdown. Preserve headings, lists, code blocks, tables, blockquotes, links. Include image references as `![alt](absolute-url)` keeping original URLs intact. Do not summarize."_ Set `extractor: webfetch` AND prepend `<!-- via WebFetch: this is an LLM summary, not the source. Do not quote verbatim. -->` - WebFetch paraphrases.
  3. **Raw `wget`** with `-U "Mozilla/5.0..."` as final fallback - captures HTML but produces noisy markdown after stripping tags.
- Wrap the returned Markdown with the frontmatter shown above (source_url, fetched_at, axis, title, extractor) before writing.
- **PDFs: save BOTH** - (a) `curl -L --fail -o sources/{axis}/NN-name.pdf <url>` to keep the original for further reading, AND (b) Jina the same URL (`wget -O .../NN-name.md "https://r.jina.ai/<url>"` - Jina handles PDFs) for the text companion. Cite both paths.
- **Other binaries** (datasets, archives, images-as-files): `curl -L --fail -o sources/{axis}/NN-name.<ext> <url>`; mark `[binary: saved]` with the local path.
- Do not attempt to bypass auth/paywalls; record as `[gated]`.
- Keep a running manifest in each axis file's Sources section so the user can verify offline.

## Figure rules

Figures are official/canonical diagrams from authoritative sources embedded in the axis docs - real diagrams, not generated art. They complement the site's interactive panels without counting toward the interactive minimum. Source-saving stance applies: personal study use only.

- **Hunt order:** start from the illustration URLs the gather agent noted in its return (images already living in the fetched sources); then official-docs image repos (use the project _source_ repo - docs-_site_ image URLs often 301 or block scrapers) -> project-official assets -> licensed community sources -> **Wikimedia Commons** for textbook CS concepts. Resolve Commons file URLs **and** licenses via the API - never guess thumbnail URLs (they 400/404 into HTML error pages).
- **Scale 1-4 figures per axis** - skip an axis rather than pad it with a generic or unlicensed image. The htmlsite engine styles figures automatically.
- Target folder: `assets/figures/`; names `{source-prefix}-{what}.{ext}` (e.g. `pgdocs-gin.svg`, `wikimedia-btree.svg`, `patroni-ha-loop.png`).
- **Integrity check after every download** - error pages save as "images". Run:

  ```bash
  python3 - <<'EOF'
  import pathlib
  MAGIC = {b'\x89PNG': 'png', b'<svg': 'svg', b'<?xm': 'svg', b'\xff\xd8\xff': 'jpg', b'GIF8': 'gif', b'RIFF': 'webp'}
  for p in sorted(pathlib.Path('assets/figures').iterdir()):
      if p.suffix == '.md': continue
      head = p.read_bytes()[:512]
      kind = next((k for m, k in MAGIC.items() if head.lstrip().startswith(m) or head.startswith(m)), None)
      bad = kind is None or b'<html' in head.lower() or b'<!doctype html' in head.lower()
      print(('BAD ' if bad else 'ok  ') + f'{p.name}  ({kind})')
  EOF
  ```

  Delete and re-fetch anything flagged `BAD` (for Wikimedia: resolve the real URL via the Commons API, don't guess thumbnails).

- **`assets/figures/ATTRIBUTION.md` format** - one section per origin, one table row per file:

  ```markdown
  # Figure attribution & licensing

  All figures below are stored locally for offline use. Each entry lists origin, author, and license/usage basis.

  ## {Origin name} ({license or usage basis})

  [If non-free-but-permitted: quote the site's stated terms and note that every embed carries credit.]

  | file           | original                                  | shows                        |
  | -------------- | ----------------------------------------- | ---------------------------- |
  | pgdocs-gin.svg | postgres repo doc/src/sgml/images/gin.svg | GIN index internal structure |
  ```

- **Embed after the first paragraph following the matching heading** (prose first; also avoids stacking against panels, which anchor directly after headings).
- **Caption contract:** every embed is `![alt](assets/figures/file)` + a separate `*italic*` caption paragraph ending with `Source: [Title](url), author, license.` Non-free-but-permitted figures (e.g. non-commercial-with-attribution) must carry the credit in the caption itself, not only in ATTRIBUTION.md.
- Wikimedia license lookup: `https://commons.wikimedia.org/w/api.php?action=query&titles=File:{Name}&prop=imageinfo&iiprop=url|extmetadata&format=json` - read `extmetadata.LicenseShortName` and `Artist`.
