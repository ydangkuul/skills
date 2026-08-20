---
name: proofread
description: Proofreads text by fixing typos, grammar, punctuation, and clear wording mistakes while preserving the text owner's wording, voice, structure, and meaning. Use when the user asks to proofread, fix typos, check grammar, correct wording, polish only for correctness, or verify missing words such as "not" without rewriting.
argument-hint: "<text-or-file>"
disable-model-invocation: true
---

# Proofread No Rewrite

## Core rule

Proofread, do not rewrite. Make the smallest local correction that makes the existing sentence correct. Preserve the author's words, sentence order, paragraph order, rhythm, tone, register, and intended meaning.

If the user asks for a rewrite, style upgrade, simplification, expansion, summarization, or stronger wording, stop and ask whether to switch out of this skill.

## Allowed edits

- Typos, misspellings, repeated words, missing words, and obvious dropped small words.
- Grammar, agreement, tense, articles, prepositions, capitalization, spacing, and punctuation.
- Local wording that is objectively wrong for the stated meaning, including a user-confirmed missing or extra negative, wrong pronoun, wrong comparative, or term that contradicts nearby context.
- Formatting fixes only when they preserve the same text structure.

## Forbidden edits

- Rephrasing for elegance, flow, persuasion, brevity, or taste.
- Changing vocabulary when the original word is acceptable.
- Reordering sentences or paragraphs.
- Adding examples, claims, transitions, caveats, or explanations not present in the text.
- Normalizing dialect, voice, style, or non-native wording if the meaning is clear and grammar is acceptable.
- Silently resolving ambiguity.

## Ambiguity gate

Before changing meaning, polarity, intent, or emphasis, require evidence from the user's instruction or the text itself. If evidence is missing or conflicting, grill the user immediately.

Ask one focused question at a time. Quote the exact text. State the competing interpretations. Provide your recommended answer.

Use this format:

```md
Blocking question:
Original: "<exact text>"
Issue: <why correction is not certain>
Options:
A. <minimal correction preserving meaning 1>
B. <minimal correction preserving meaning 2>
Recommended: <A/B and why>
```

Do not edit past the blocked span until resolved.

If the task scope itself is unclear, ask the user what they want before proofreading (if a question-driving skill such as `grill-me` is installed, use it).

## Workflow

1. Identify the text owner if relevant. Respect their wording over your preferences.
2. Read the whole provided text or the full relevant file section before editing.
3. Build a correction list from only allowed edit types.
4. For each candidate, ask: "Can I prove this is a correctness fix, not a rewrite?"
5. If yes, apply the smallest possible edit. If no, leave it unchanged or ask.
6. Return corrected text or a patch plus a concise change log.

## Output

For pasted text, return:

```md
Corrected text:
<text>

Changes:

- "<original>" -> "<corrected>" (<reason>)
```

For files, edit only exact spans and report:

```md
Changed:

- path:line, "<original>" -> "<corrected>" (<reason>)

Questions:

- <blocking question, if any>
```

If there are no safe corrections, say "No safe proofreading changes found."

## Examples

Safe:

- "Their is a bug" -> "There is a bug."
- "I cant log in" -> "I can't log in."
- User says: "I forgot the negative in sentence 2." Then "Users can access admin settings" -> "Users cannot access admin settings."

Unsafe without clarification:

- "The result is bad" -> "The result is unacceptable."
- "We need a simple fix" -> "We need a lightweight, maintainable fix."
- "Users should use it unless they want uploads" -> "Users should use it unless they do not want uploads."
