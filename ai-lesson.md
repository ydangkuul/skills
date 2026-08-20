---
name: ai-lesson
description: Extract and maintain lessons from a conversation - problems solved, dead ends, what worked and why - as topic-scoped docs in ~/ai-lesson/. Use when the user says "save/write/extract lesson", wants to turn a conversation into a learning artifact, wants to update or consolidate existing lessons, or wants to mine past sessions for lessons that were missed.
argument-hint: "[lesson focus]"
---

# AI Lesson Extractor

Capture what a conversation taught into `~/ai-lesson/`. A **lesson** is the **current truth about a topic**, not a log of a session, so each run reconciles the new finding against what the collection already holds, and leaves every surviving file current.

## Current AI Lessons

```!
mkdir -p ~/ai-lesson
ls -la ~/ai-lesson
```

## Process

1. **Analyze the conversation**: identify the original goal, approaches tried (including dead ends), the root cause / key insight, the final solution, and the reusable takeaways.

2. **Locate the topic.** A lesson is keyed by **topic**, not date. Scan the collection above (filenames + `grep` on tags/titles) for any existing lesson on the same topic.

3. **Reconcile the timeline.** When the topic already exists, read those lessons oldest -> newest. The newest finding that *actually fixed* the issue is the **current truth**; an earlier fix may have introduced exactly what a later one resolves. Fold the topic into one **self-contained** lesson where the current truth leads and each superseded belief stays as version/date-stamped history, so a reader sees what changed and why.

4. **Write, merge, or supersede.**
   - New topic -> write `~/ai-lesson/YYYY-MM-DD-<slug>.md` in the format below.
   - Existing topic -> update it in place, or write the consolidated file and point the siblings at it.
   - **Delete an old lesson once the new one fully contains it**; when each file still holds unique content, cross-link them with a one-line timeline note instead.
   - Done when a reader landing on *any* surviving file for this topic meets the current truth, every stale standalone conclusion is removed or superseded in place.

5. **Confirm**: show the file path(s), a one-line summary, and what was superseded or removed.

**Mining past sessions** (only when the user explicitly asks you to find lessons the collection missed): this reads their whole local transcript history, so confirm the scope first - which projects or date range - rather than sweeping everything by default. Then read human turns + assistant text from the agreed `~/.claude/projects/*/*.jsonl` files, map each substantial session to a topic, and route it through steps 2-4. Fan out with subagents for breadth, deduping against the collection.

## Lesson format

```markdown
# <Title: concise topic / problem>

**Date:** YYYY-MM-DD
**Tags:** <comma-separated keywords for searching>
<!-- when reconciling, add one: -->
**Supersedes:** <old file(s) folded in and removed>
**Timeline:** <what an earlier/later sibling covers, and which wins>

## TL;DR

<2-3 sentences: what happened, what was learned>

## Problem

<What the user was trying to do and what went wrong>

## What was tried

1. **<Approach>** - <what was done> -> <outcome / why it failed>

## Root cause

<The actual underlying issue, explained clearly>

## Solution

<What fixed it, with code/config snippets if relevant. When a past belief was
overturned, keep it beside its version/date so the change stays legible.>

## Lessons learned

- <Reusable insight>
```

## Rules

- Keep it concise, aim for a 2-minute read.
- Focus on **why**, not just what. The reasoning is the value.
- Include code/config snippets only when they clarify the lesson.
- Use plain language, the reader may lack the conversation's context.
- Descriptive slug: `n8n-mcp-optional-fields`, not `fix-1`.
- One file per **topic**: distinct topics -> separate files; the same topic across sessions -> one reconciled file.
- The collection is a living reference, not an append-only log, reconcile or remove rather than accumulate.
- Genericize sensitive data out (API keys, credentials, tokens, internal URLs/hostnames).
