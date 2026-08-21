---
name: vpwebdoc
description: "Loads the backbone reference doc for the VietPay website project — Google Doc 'Additional Requirements' (sitemap/IA, page-level, CMS/technical, measurement/acceptance criteria + full comment log), Notion 'Web presence - Business requirements' (intent, actors, flows, capabilities, rules, open decisions), and Figma 'Vietpay website project' (Option 1 'Product-Led' fully read section-by-section — 16/16 sections with Purpose/Key message/Content/CTA annotations — vs Option 2 'Trust & Business-first' overview + 4 hero concepts, plus all 5 reviewer comments/notes). Trigger on '/vpwebdoc', or whenever the user asks about VietPay website requirements, sitemap/navigation, design direction, page copy, or comments from Anh Vo/Hoàng Minh/Tomeziy/minh.nguyen/vl/Do Anh Quang/Phạm Hoàng Ngân without naming a source."
disable-model-invocation: false
---

# VietPay Website Project — Backbone Doc Reference

This skill points to the canonical, multi-source backbone reference for the **VietPay website project**, kept at:

- **Source of truth**: `/Users/dangvany/Documents/vp-web/CLAUDE.md`
- **Source 1 — Google Doc** "Additional Requirements for Design & Build": https://docs.google.com/document/d/1Lq65L0ziKnFyy74sAlBape1q6dG1uZTRKRmJWuRTGSY/edit?tab=t.0 (owner: kho do)
- **Source 2 — Notion** "Web presence - Business requirements": https://app.notion.com/p/zxstimlabs/Web-presence-Business-requirements-3b6d4deb717c8000b844ef7a6cd16d90 (workspace ZxStimLabs)
- **Source 3 — Figma** "Vietpay website project": https://www.figma.com/design/XCbWxnWtS4bv48wRNHxW9I/Vietpay-website-project?node-id=15-158 (frame "Option 1 and 2" — 2 design directions compared side by side)

## What's inside `CLAUDE.md`

1. **Nguồn 1 (Google Doc)** — doc metadata; all six requirement groups in full (01 Sitemap/IA, 02 Page-Level, 03 Product Content, 04 Conversion & Form, 05 CMS & Technical, 06 Measurement/Acceptance Criteria), plus the "Minimum Requirement Set" status table (12 items, mostly MISSING/INCOMPLETE — confirms the project is still very early-stage) and the closing "Bottom line" summary; Victor Luong's confirmed tech decisions (Next.js, Sanity CMS, Everything API self-service); the full comment log (open + resolved, verbatim, author/timestamp/anchor) covering Sales requirements (Hoàng Minh Nguyễn Đức, Aug 9), detailed nav/form/CRM/security requirements (Anh Vo, Aug 10), and gap-analysis comments resolved by Tomeziy Nguyen.
2. **Nguồn 2 (Notion)** — full verbatim body: Intent, Actors & dependencies, Flows, Capabilities, Rules & constraints (content/brand, pricing, legal, localization, security), non-functional expectations, Open decisions, To-confirm items. No comments exist on this page.
3. **Nguồn 3 (Figma)** — Option 1 "Product-Led" read in full: all 16 nav sections (Direction, Sitemap, Homepage H1-H8, Products, Solutions, Developers, Partners, Resources, Company, Contact, Conversion flows, CMS/technical, SEO/AI, Analytics, Compliance, Open questions/TBD) with verbatim headlines, body copy, and Purpose/Key message/Content/CTA/Destination annotations per block; Option 2 "Trust & Business-first" — only the overview + 4 alternative hero concepts read so far (Product Showcase/Merchant Story/Business Outcomes/VietPay Ecosystem), full section-by-section read still pending; the full comment/note log (5 total: minh.nguyen on Partners scope, vl favoring the business-first angle, tomeziy.nguyen's "Customer Success & Social Proof Hub" proposal, Do Anh Quang's visual/UX feedback, Ms Phạm Hoàng Ngân's Square/Pinterest reference suggestion — the last two are pasted screenshot images, not live Figma comment-pins); notes that `designsystem`/`styleguide` frames in this file are currently empty; confirms the page is built as a single live "StreamableComponent" per option (AI-generated site code), not flat mockup images.
4. **Nhận định tổng hợp** per source — who's contributing what, known gaps, cross-references between sources (e.g. Figma's Partners scope note clarifies Anh Vo's partnership types in the Google Doc).

## Direct Notion reference

For the original business intent, actors/dependencies, end-to-end flows, capabilities, rules, non-functional expectations, and open decisions, read [references/notion-business-requirements.md](references/notion-business-requirements.md). This retained transcription is usable even when the live Notion integration is connected to a different workspace.

## How to use this

When the user calls `/vpwebdoc`, or asks about the VietPay website requirements/design, its sitemap, form/CRM/lead requirements, design direction, or "what did Anh Vo / Hoàng Minh / Tomeziy / minh.nguyen / vl / Do Anh Quang comment about X":

1. Read `/Users/dangvany/Documents/vp-web/CLAUDE.md` in full when it is accessible — it is the combined source of truth for all 3 sources. For Notion-specific questions, also read `references/notion-business-requirements.md`; if macOS privacy or workspace access blocks the combined file/live page, this retained reference is the authority for the Notion body as read on 2026-08-21.
2. Known gaps to flag if relevant: Figma Option 2 has not been read section-by-section yet (only its overview + 4 hero concepts) — if the user needs Option 2 detail to the same depth as Option 1, re-open the file and repeat the same method (click each "Section" layer under the "OPTION 2..." frame in the Layers panel, Shift+2 to zoom, read Purpose/Key message/Content/CTA/Destination). (The Google Doc and Figma Option 1 have both been read in full — no known gaps there.)
3. Comments on the Google Doc and Figma are **not readable via WebFetch** (neither platform exposes comments in exported/public view) — reading or refreshing them requires Claude in Chrome browser automation on the live, authenticated file. The Notion page has no comments as of last read.
4. When the user supplies new information (new comments, more doc body, new source, design decisions) or asks you to re-sync, **update `/Users/dangvany/Documents/vp-web/CLAUDE.md` directly** rather than creating a second copy elsewhere — append to the relevant "Nguồn N" section (or add a new "Nguồn 4 — ..." section), preserving the existing structure.
5. This is an internal working document — don't publish its contents externally (artifacts, email, etc.) unless the user explicitly asks.
6. Treat the website as a Marketing/Growth-owned top-of-funnel asset measured by conversion. It hands merchant/developer sign-ups to Identity & Access, trials to Sandbox, and qualified enquiries to Sales; it is not itself a payment capability.
7. The public site must hold no sensitive or regulated customer data. Use PVComBank, licensing, compliance, performance, and other regulated trust claims only with accurate, current, compliance-reviewed wording.
