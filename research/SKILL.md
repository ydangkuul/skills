---
name: research
description: Conduct thorough, multi-source research on any topic through parallel subagents, producing cited research docs plus an interactive offline HTML site. Use when user asks to "research", "investigate", "deep dive", "look into", or "find out about" a topic. Also trigger for "what do we know about X", "survey of X", or any request for comprehensive information gathering on a subject.
argument-hint: "[topic or question]"
allowed-tools: Agent, Read, Write, Bash
---

# Research - conductor

You conduct; subagents play. The main thread scopes with the user, plans the run, launches subagents, keeps `.run/state.json` true, paces batches, and reports. Every research task - planning axes, gathering, claim verification, compiling, figures, synthesis, review, HTML build - **and every retry of one** runs in a subagent: the conductor's hands never touch the instruments. Subagents write their products to disk and return short structured summaries; your context holds the map, the disk holds the detail.

Formats and per-task contracts live in [REFERENCE.md](REFERENCE.md): folder layout, run state, PLAN.md, return format, document structure, citation/source/figure/demo rules. Point delegated agents there rather than restating.

Two worker definitions carry the per-task mechanics:

- **`web-researcher`** - gathers one axis and saves its sources.
- **`research-worker`** - every other task (plan, verify, compile, figures, synthesize, review, html-build), briefed by task name + input paths + output paths.

## Depth

A knob, not a mode - same phases, dialed to the request; move up mid-run if the topic turns out richer than it looked.

- **Light** - quick fact-find. 2-3 axes (one batch); skip grill-me, claim verification, and figures.
- **Standard** (default) - 3-7 axes, figures, synthesis.
- **Deep** - the user asks to go deep / "as deep as possible" / says `ultracode`, or the topic is axis-rich. Up to ~7 axes, more sources per axis, plus adversarial claim verification (Phase 2b) - the one technique that separates a deep run from a merely bigger one.

Every depth ends with the htmlsite build (Phase 6) and the report (Phase 7).

## Disk-first, resume

`~/research/{topic-slug}/.run/state.json` is the run's ground truth and you are its only writer (shape: REFERENCE.md -> "Run state"). In the same turn a subagent returns: save its return verbatim to `.run/returns/` and update state.json.

On any (re)start where state.json already exists: read it plus PLAN.md, `ls` the run dir to confirm state matches disk, and continue from the first incomplete item. Relaunch only missing or thin work, reusing the same axis slugs so re-gathers land in the existing `sources/{axis-slug}/` dirs. Sources already on disk stay as they are - re-fetching is the waste resume exists to prevent.

## Model routing

The environment maps an axis's route to a **variant**, one copy of a worker pinned to one model. Launch `research-worker-{variant}` / `web-researcher-{variant}`, or pass `model:` in the Agent call to override; where the environment defines no routing, use the unsuffixed agents. Route definitions: REFERENCE.md -> "Route tags".

- The planner tags each axis `route: general|security` in PLAN.md; apply the tag to **every** subagent touching that axis (gather, verify, compile, figures). Mixed-topic runs route per axis.
- A run-wide security/low-level topic also puts the planner, synthesizer, reviewer, and builder on the security route.

## Batching, 429 pacing

Wide fan-out trips API 429s; a 429-killed subagent cannot resume itself, but everything it already saved to disk persists - batching keeps the loss small.

- Batch size **2** gather agents (3 for small axes), `run_in_background: true`. After any 429: drop to **1**, wait a beat, continue sequentially, and tell relaunched agents to widen their Jina sleep to 5s.
- **Stagger:** when a gather batch completes, in the same turn (a) launch the next gather batch and (b) dispatch compile subagents for the finished axes. Compile overlaps the next gather.
- Retry = relaunch that one axis as a single-agent batch with a refined brief, same slug, once its original batch has fully returned.
- Verification pacing: at most 2 axes' voter trios in flight (~6 agents).

## Phases

Every delegation prompt names: the topic, the task, exact input paths, exact output paths, and (for per-axis tasks) the axis slug + scope line. Model per the axis route tag.

### 0 - Scope (main thread; the one non-delegable job)

If state.json exists, resume instead (above). For a broad or ambiguous topic, narrow it first - ask the user about audience, depth, angles, and the decisions the research informs (if a question-driving skill such as **grill-me** is installed, run it). Create `~/research/{topic-slug}/` with `.run/returns/` and write the initial state.json.
**Done when:** depth is chosen and state.json exists on disk.

### 1 - Plan

`research-worker`, task **plan**. Brief: topic, scope notes, axis count for the depth. Output: `PLAN.md`.
**Done when:** PLAN.md has slug + scope line + route tag for every axis, and state.json lists them.

### 2 - Gather (batched)

`web-researcher` per axis. Brief: topic, axis label + scope line, sources dir `sources/{axis-slug}/`. Deep runs append: _"Additionally, extract up to 6 **falsifiable** claims bearing on this axis - each a concrete checkable statement, a direct supporting quote, the source URL, source quality (primary/secondary/blog/forum), and importance (central/supporting/tangential)."_
**Done when:** every axis is `gathered: true` and its `sources/{axis-slug}/` is non-empty on disk.

### 2b - Verify (deep runs)

Per axis: launch **3** `research-worker` voters, task **verify**, each briefed with the axis's central/supporting claims (from `.run/returns/gather-{axis-slug}.md`) and the sources dir. Tally **valid** returns only - an errored or empty voter is not a vote; relaunch missing voters once, and a claim still short of 2 valid votes is `unverified`, never killed (outcomes: REFERENCE.md -> "Verification verdicts"). Write the verdict table to `verification/{axis-slug}.md` (bookkeeping, like state.json; the votes are the delegated work).
**Done when:** every axis has `verification/{axis-slug}.md` with every claim marked survives, killed, or unverified, and `verified: true`.

### 3 - Compile (staggered behind gather)

`research-worker` per axis, task **compile**. Inputs: `sources/{axis-slug}/`, `.run/returns/gather-{axis-slug}.md`, and `verification/{axis-slug}.md` when present. Output: `NN-{axis-slug}.md`.
**Done when:** every axis doc exists on disk and is `compiled: true`.

### 3b - Figures (standard/deep)

`research-worker` per axis, task **figures**. Inputs: the axis doc + `.run/returns/gather-{axis-slug}.md` (the illustration URLs noted there seed the hunt). Outputs: `assets/figures/` + embeds edited into the axis doc.
**Done when:** every axis is `figures: true` - embedded per the figure rules, or explicitly skipped in the worker's return.

### 4 - Synthesize

`research-worker`, task **synthesize**. Inputs: all `NN-*.md`. Output: `README.md` with a Cross-Axis Synthesis section.
**Done when:** README.md exists and `synthesized: true`.

### 5 - Review

`research-worker`, task **review**. Input: the whole run dir; fixes land in place.
**Done when:** the return confirms every doc was read and every citation/path/figure check is green or flagged for the user, and `reviewed: true`.

### 6 - HTML build (every run, light included)

`research-worker`, task **html-build**. Brief: run dir + engine path - expand `${CLAUDE_SKILL_DIR}/htmlsite` to its literal value, the worker doesn't inherit the variable. The worker authors `assets/content.js` + `assets/demos.js` and iterates build.mjs + verify.mjs until both exit 0; verify enforces the interactive-first minimum (every doc view anchored chart or demo).
**Done when:** the return shows verify.mjs exit 0, index.html is on disk, and `html: true`.

### 7 - Report (main thread)

Tell the user: output path, open `index.html` (keep `assets/` alongside; works from `file://`), axis/source/figure counts, gaps and gated sources, and offer to go deeper.
**Done when:** state.json reads `phase: "done"`.
