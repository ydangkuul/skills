# htmlsite self-test

`fixture/` is a tiny but complete Research folder (overview + 2 Docs, real `[N]`
citations, a `## Sources` block with on-disk `sources/`, a `content.js`
exercising enrichment + `VIZ`/`MATRIX`/`DRILL`/`GLOSSARY`, and a `demos.js`
exercising the first-class demo path). It also exercises the interactive-first
minimum: doc-01 carries an anchored `kind:'chart'` panel, doc-02 an anchored
registered demo. It is htmlsite's regression test: only the **source inputs**
are checked in; build artifacts (`index.html`, `assets/engine.*`,
`assets/vendor/`, `glossary.md`) are regenerable and intentionally absent.

## Run it

```bash
cd ~/.claude/skills/research/htmlsite

# static verify only (no build needed) - citations, locals, content lint:
node verify.mjs test/fixture            # warns "no index.html yet", exits 0

# full round-trip (build, then verify the output too):
node build.mjs  test/fixture            # writes index.html + copies assets/ (+3.5 MB vendor)
node verify.mjs test/fixture            # exits 0 - all green

# cleanup - the build writes into the fixture, so remove what it generated.
# (`git checkout -- test/fixture` also works, but only in a git checkout.)
rm -rf test/fixture/index.html test/fixture/glossary.md \
       test/fixture/assets/vendor \
       test/fixture/assets/engine.css test/fixture/assets/engine.js \
       test/fixture/assets/contract.js
```

Expected green output names the counts: `docs checked: 3 | citations: 4 | local files: 3 | figures: 0 | demos: 1 | css rules: 206`.

## What "broken" looks like

To see the verifier fail, copy the fixture elsewhere and introduce: a citation
`[N]` with no matching Source row; a `(local: sources/...)` path that doesn't
exist; a malformed `SITE.stats` tile; a `VIZ` key or demo `register` view id
that isn't `overview`/a known Doc id; a missing `assets/content.js`; an empty
`window.VIZ`; a Doc left mermaid-only (no anchored chart/demo - the
interactive-first minimum); or a cropping CSS rule in engine.css or authored
JS strings - `.card{max-height:120px;overflow:hidden}`, a `-webkit-line-clamp`,
a `text-overflow: ellipsis` - without a `/* no-crop-exempt: reason */` comment
(the full-content-visibility gate, SPEC section 6). Each is an **error** (non-zero
exit). Soft issues -
an unmatched `VIZ at:`/demo `at:` anchor, a `MATRIX` cell-count mismatch, a
broken cross-doc link, an enrichment id that matches no Doc - are **warnings**
(still exit 0).
