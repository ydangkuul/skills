---
name: vpdesignsys
description: VietPay Draft pool design system — verified tokens (color/spacing/radius/type) and real components pulled directly from the Figma file. Use for all VietPay VP app implementations.
---

# VietPay Design System (verified from Figma)

Canonical source: Figma file **"Draft pool"**, file key `Jznca6B8f4Kt6l8SCHDb4l`.
- Design system: `https://www.figma.com/design/Jznca6B8f4Kt6l8SCHDb4l/Draft-pool?node-id=693-398`
- Style guide: `https://www.figma.com/design/Jznca6B8f4Kt6l8SCHDb4l/Draft-pool?node-id=693-1249`

**Every value in this file was pulled directly from Figma** (`get_variable_defs`, `use_figma` node inspection, or `get_design_context`) against real screens in the file — not templated or guessed. Where the file doesn't yet have a verified answer (e.g. desktop/web patterns, dark mode, data tables), that's called out explicitly at the bottom instead of inventing one. Before adding anything not covered here, pull it from Figma first — don't reuse generic web-design conventions for this project.

For the VP mobile app's screen-level visual language (mascot, chrome, milestone screens), use the companion skill `/vpappdesign` — it's built from the same source and stays in sync with this one.

## Color tokens

Two local variable collections exist in the file (both valid, used in different screens — prefer whichever a given screen already uses):

### Collection "Colors" (older, `95:xx` ids)
| Name | Hex |
|---|---|
| Primary Blue | `#0073bf` |
| Primary Blue Hover | `#003d8f` |
| Near Black | `#1c1d1b` |
| Charcoal | — (see file, not yet sampled) |
| Light Gray | `#dedede` |
| White | `#ffffff` |
| Deep Blue | `#0d3c7d` |
| Lime Green | `#73bf26` |
| Gold Accent | `#d7a44c` |
| Gray / Text Muted | `#696b68` |
| Light Blue | `#bfe0f5` |
| Interactive / Disabled | `#a9aba8` |
| Off White | — (see file) |

### Collection "Colors" (newer, `511:xx` ids — bound by the local `Button` component set)
| Name | Hex |
|---|---|
| brand/primary | `#0073bf` |
| brand/primary-hover | `#003d8f` |
| brand/near-black | `#1c1d1b` |
| brand/gold | `#d7a44c` |
| neutral/900 | `#1c1d1b` |
| neutral/800 | `#373a36` |
| neutral/500 | `#696b68` |
| neutral/300 | `#dedede` |
| neutral/200 | `#ededed` |
| neutral/100 | `#f5f5f4` |
| neutral/0 | `#ffffff` |
| accent/lime | `#73bf26` |
| accent/gold | `#d7a44c` |
| accent/light-blue | `#bfe0f5` |
| accent/blue-tint | `#eaf6fd` |
| semantic/error-text / -surface | not yet sampled — pull before use |
| semantic/success-text / -surface | not yet sampled — pull before use |
| semantic/warning-text / -surface | not yet sampled — pull before use |
| semantic/info-text / -surface | not yet sampled — pull before use |

### Usage guidelines (observed in real screens, not assumed)
- **Primary Blue / brand-primary**: primary CTA fills, links ("Invite"/"Remind"/"Nudge"), checked-checkbox fill+stroke.
- **Deep Blue**: headline text color, alternate CTA fill, active progress bar.
- **Gold Accent**: point-value emphasis inside CTA labels, milestone numbers, tier badge fill ("Silver"/"Gold" pill).
- **Lime Green**: success checkmark circle, selected radio ring.
- **Interactive/Disabled**: disabled button fill (sampled once as `#a9aba8`, also seen flatter `#6b7370` on a different disabled CTA — check the specific instance).
- **neutral/300 / Light Gray**: card and input borders, unchecked checkbox stroke fallback color.

## Spacing (confirmed Figma variables, both collections agree on values)

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

## Radius (confirmed Figma variables)

| Token | Value |
|---|---|
| radius/sm | 4px |
| radius/md | 6px |
| radius/lg | 8px |
| radius/pill | 999px |

Note: hand-built cards elsewhere in the file also use 12px, 14px, and 24px corner radii that aren't tied to a named variable — match whichever nearby existing screen you're extending rather than picking a new radius.

## Typography

Single family confirmed across every screen inspected: **Be Vietnam Pro** — weights Medium, SemiBold, Bold, ExtraBold. There is no evidence of a system-font (SF Pro/Roboto) fallback anywhere in the file; don't introduce one.

| Style | Spec |
|---|---|
| Screen headline | ExtraBold, 34px / 38px line-height |
| Milestone number | ExtraBold, ~48–64px |
| Heading 3 | SemiBold, 18px / 26px |
| Heading 4 | SemiBold, 14px / 20px |
| Body | SemiBold, 16px / 24px |
| Button label | SemiBold, 16px / 20px |
| Eyebrow/label | Bold, 11px, uppercase, letter-spacing 1.5px |
| Meta/secondary | SemiBold or Medium, 14–18px |

## Real components confirmed in the file

- **Button** (local component set, key resolvable via `figma.getNodeByIdAsync` on the set) — variants `Type={Primary, Secondary, Ghost} × Size={Small, Medium, Large}`. Large: 56px height, 12px radius, fill bound to `brand/primary`, white label. Ghost/Small: transparent fill, `brand/primary` text, SemiBold 12px, padding 16px/8px, radius 8px. Exposes a `Label` text property for overrides.
- **Checkbox** — 20×20px, radius 6px. Checked = `brand/primary` fill+stroke + white checkmark vector. Unchecked = transparent fill + gray stroke (1–1.5px).
- **Avatar (initials)** — 36×36px circle, `accent/light-blue` fill, centered initial letter, SemiBold 14px.
- **Tier/status badge** — pill (radius 999), colored fill (e.g. gold for tier, off-white/shell for status), bold small label.
- **Contact list row** — icon/avatar + label left, value + colored text-link action right, hairline divider between rows.

## Not yet verified — do not assume, pull from Figma first

An earlier draft of this skill (hosted outside this project) included generic web/desktop patterns — modals, data tables, toggle switches, dark mode, CSS breakpoints (mobile/tablet/desktop grid), badge/spinner/skeleton CSS specs, and colors like `#0073CF`/`#001F3F`/`#0066CC` that don't match this file. Those were **removed** rather than corrected, because nothing in the "Draft pool" file as explored so far confirms a desktop/web surface exists at all — every screen found is the 390×844 mobile app. If a task needs any of the following, verify against the real file first instead of reusing that draft:

- Desktop/tablet breakpoints or grid system
- Modal/dialog component
- Data table component
- Dark mode palette
- Toggle switch component
- Any color not listed in the tables above

## When to use this skill

Use `/vpdesignsys` when building or reviewing any VP app screen, token, or component — pair it with `/vpappdesign` for the mobile-specific mascot/screen-chrome patterns.

---
**Last verified**: 2026-08-19, against live Figma data (file `Jznca6B8f4Kt6l8SCHDb4l`) during active design work on intro-flow, first-network&contact, and the contacts-sync / select-contact-to-invite screens.
