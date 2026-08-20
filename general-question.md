---
name: general-question
description: Answer general knowledge questions that are not related to the current codebase. Use when the user asks about facts, definitions, history, science, math, language, or any topic that does not require reading, writing, or modifying code in the project. For questions where the user wants to understand how something works, use feynman instead.
user-invocable: true
argument-hint: "<question>"
context: fork
agent: general-purpose
disallowed-tools: Read, Edit, Write, Grep, Glob, NotebookEdit
---

Answer the following general knowledge question directly and concisely. Do NOT read, search, or modify any project files.

If the question requires up-to-date or factual information you are unsure about, use WebSearch and WebFetch to verify rather than guessing.

$ARGUMENTS
