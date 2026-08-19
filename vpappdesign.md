---
name: vpappdesign
description: VP mobile app's onboarding/rewards visual style — screen chrome, mascot illustration system, color/type tokens, and component catalog — verified directly against the 'intro-flow' and 'first-network&contact' Figma flows in the 'Draft pool' file.
---

# VP App Design Style (intro-flow + first-network&contact)

This skill distills the visual style of the VP app's mobile flows from two Figma boards in the **"Draft pool"** file (also the source for the project's `/vpdesignsys` skill):

- **Flow 1 — "intro-flow"**: `https://www.figma.com/design/Jznca6B8f4Kt6l8SCHDb4l/Draft-pool?node-id=754-1375` (node `754:1375`) — onboarding: refer merchants → estimate income → avatar setup → milestone rewards (1,000 → 4,000 pts) → invite video.
- **Flow 2 — "first-network&contact"**: `https://www.figma.com/design/Jznca6B8f4Kt6l8SCHDb4l/Draft-pool?node-id=754-1376` (node `754:1376`) — check-in streak → referral/network dashboard → contact sync → contact selection → invite → earnings summary.

File key: `Jznca6B8f4Kt6l8SCHDb4l`. Node `754:1376` is too large for `get_metadata`/`get_design_context` to expand (returns a sparse stub) — use `get_screenshot` at high `maxDimension` for that one, or drill into its sub-frames once you have concrete child node IDs.

Every value below (hex codes, font, radii, component specs) was pulled directly from Figma (`get_variable_defs`, `get_design_context`, or inspecting live node properties via `use_figma`) — not guessed or templated. If you need a value not covered here, pull it live from Figma rather than inventing one.

## How to use this

1. When building or modifying a VP app screen/flow, read the relevant section below for the pattern that applies (chrome, mascot pose, component, color, type).
2. Reuse the hex values and Be Vietnam Pro type styles as-is — don't invent new colors or fonts for VP app screens.
3. Before adding a new component pattern not covered here, pull it from Figma with `get_design_context` (load `figma-design-to-code` first) against the two node IDs above, or their sub-frames, rather than guessing.
4. Every new flow must still follow the project's action-by-action rule (one action per screen, mascot celebration on completion, documented in the project `CLAUDE.md`). This skill supplies the *look*, that rule supplies the *structure*; both apply together.

## Screen chrome (every screen)

- **Frame**: iPhone-shaped canvas, 390×844, corner radius 40px, soft ambient shadow `0px 20px 48px rgba(0,0,0,0.28)`.
- **Status bar**: placeholder iOS bar — "9:41" (SemiBold 14px white) + signal/wifi/battery glyphs, sits inside the header band.
- **Header, two variants**:
  - *Onboarding variant* (used across all of Flow 1 and the first screens of Flow 2): plain navy band, centered white "vietpay" logo only. Background `#0d2c52` (`pri-deep`), height 100px (status bar 40px + 60px logo band).
  - *In-app variant* (used once the user is inside network/contacts/check-in screens): same navy band, but 3-slot row — back chevron `‹` (left), "vietpay" logo (center), home/building icon (right). Same `#0d2c52` background.
- **Footer progress bar**: a thin rounded pill (~132–140px wide, 5px tall, `#0d3c7d` at ~40% opacity) centered just above the home indicator — a lightweight flow-progress affordance, not step dots and not a tab bar. Pure celebration screens (points reveal) may omit it.
- **Home indicator**: standard iOS bar, `#1c1d1b`, 134×5px, rounded, centered.
- **Safe-area content padding**: 24px horizontal margins throughout; primary CTA sits in a footer region with 20px bottom padding.

## Mascot & illustration system

A single recurring illustrated character (dark-haired woman, mustard/tan blazer, white top, navy pants) appears on nearly every screen — she *is* the app's guidance and feedback mechanism, not decoration:

- **Pointing pose**: arm extended outward, forearm rendered as a horizontal **dashed guide line ending at her fingertip**, literally pointing down/across at the interactive element beneath her (reward card, stepper, avatar picker, radio group). Used on informational/input screens. Asset name pattern: `point down 3`.
- **Jumping/celebrating pose**: mid-air jump with scattered confetti pieces (pink/blue/purple torn-paper shapes), used on every pure-reward/points-milestone screen (e.g. "1,000 points", "2,000 points" … "4,000 points", "3-day streak" milestones). No other content competes on these screens — mascot + confetti + big point number + progress bar only.
- **Idle/context pose**: smaller, upper-portion placement, arm relaxed, used on dashboard-style screens (My Network, Earnings) where she sits above a data card rather than pointing at a single control.
- Treat the mascot + confetti pairing as the mandatory "celebration" visual for the action-by-action rule's per-step celebration requirement — don't substitute a generic checkmark/toast for it on milestone screens (a plain green checkmark + "Congratulations!" text is reserved for lighter confirmations like a daily check-in or a reminder/nudge sent, not real point-value milestones).

## Color tokens (confirmed via Figma variables + design context)

| Token | Hex | Use |
|---|---|---|
| `pri-deep` | `#0d2c52` | Header/status-bar band background |
| `Deep Blue` | `#0d3c7d` | Headlines, primary CTA button background, active footer progress bar |
| `Primary Blue` / `brand/primary` | `#0073bf` | Stat highlights (reward amount), plus-button fill, links ("Invite"/"Remind"/"Nudge") |
| `Primary Blue Hover` | `#003D8F` | Pressed/hover state of Primary Blue |
| `Gold Accent` / `brand/gold` / `accent/gold` | `#d7a44c` | Highlighted point values inside CTA labels ("CLAIM **1,000 pt**"), gold milestone number text |
| `Lime Green` / `accent/lime` | `#73bf26` | Success checkmark circle, selected radio ring |
| `Near Black` / `neutral/900` / `Text Primary` | `#1c1d1b` | Primary body text, home indicator |
| `Gray` / `Text Muted` | `#696b68` | Secondary/meta text (e.g. "≈ 15,000,000 ₫", "Level 2") |
| `Interactive / Disabled` | `#a9aba8` | Disabled control state (also seen as a flatter `#6b7370` on a disabled full-width CTA) |
| `Border / Default` / `neutral/300` | `#dfdfdf` (also seen `#dedede`) | Card and input borders |
| `bd` | `#e3e0da` | Warmer alternate border (cream-background screens) |
| `White` / `neutral/0` | `#ffffff` | Page/card background |
| `shell` | `#fdfbf7` | Warm off-white full-screen background (streak/sync screens) |
| `cardBg` | `#f7f8fb` | Neutral card background |
| `accent/blue-tint` | `#eaf6fd` (also seen `#eaf4fc`) | Reward/estimate card background |
| `Light Blue` / `accent/light-blue` | `#bfe0f5` | Streak-day chip background, secondary highlight, avatar circle fill |
| `acc-tint` | `#ffede9` | Peach/coral banner background ("Get 30,000 pts", referral prompts) |
| `semantic/warning-surface` | `#fbeed1` | Pale gold surface (tier badge / bonus callouts) |
| `neutral/500` | `#696b68` | Mid-gray, disabled text |
| `neutral/200` | `#ededed` | Lightest neutral surface |

Shadows are soft and often **color-tinted to match the element**, not flat black:
- Reward card: `0px 12px 16px rgba(0,115,191,0.1)`
- Primary CTA button: `0px 8px 8px rgba(0,115,191,0.13)`
- Stepper control: `0px 2px 2px rgba(0,0,0,0.15)`
- Generic card: `0px 2px 8px rgba(0,0,0,0.078)` (`Shadow/Card` token)
- Phone frame: `0px 20px 48px rgba(0,0,0,0.28)`

## Typography

Single family throughout: **Be Vietnam Pro** (NOT system fonts — do not substitute SF Pro/Roboto), weights Medium / SemiBold / Bold / ExtraBold.

| Style | Spec |
|---|---|
| Screen headline | ExtraBold, 34px / 38px line-height, `Deep Blue`, centered, wraps to 2 lines |
| Milestone number ("2,000 points") | ExtraBold, large (~48–64px), gold gradient/`Gold Accent` |
| Heading 3 | SemiBold, 18px / 26px |
| Heading 4 | SemiBold, 14px / 20px |
| Body | SemiBold, 16px / 24px |
| Button label | SemiBold, 16px / 20px, letter-spacing 1px, uppercase for CTA verb |
| Eyebrow/label (e.g. "YOUR ESTIMATED REWARD") | Bold, 11px, uppercase, letter-spacing 1.5px, `Primary Blue` |
| Meta/secondary text | SemiBold or Medium, 14–18px, `Gray` |

## Component catalog

- **Primary CTA button** — full-width minus 24px margins, height 56px, radius **14px** (not 28px — mobile buttons here are not pill-shaped), `Deep Blue` background (or `#6b7370`/`Interactive Disabled` when inactive), white bold label; the point-value portion of the label is set in `Gold Accent` and a heavier weight than the verb ("CLAIM **1,000 pt**") — this two-tone CTA label is the standard "claim" pattern. Real component: local `Button` set with variants `Type={Primary,Secondary,Ghost} × Size={Small,Medium,Large}` — Large is 56px tall, radius 12px, fill bound to `brand/primary`.
- **Ghost button** (e.g. "Invite" link inside a list row) — transparent background, `brand/primary` blue text, Be Vietnam Pro SemiBold 12px, padding 16px/8px, radius 8px.
- **Reward/estimate card** — `accent/blue-tint` background, 1px `Border/Default`, radius 14–24px, colored blue drop shadow, centered stacked content: uppercase eyebrow → huge number → muted VND-equivalent subtext.
- **Stepper control** — pill-shaped white container (radius 100px, soft shadow), circular minus button (light gray `cardBg` fill) and circular plus button (`Primary Blue` fill, white glyph) flanking a large bold number.
- **Radio/avatar picker** — white card, radius 24px, top row of labeled radio buttons (36px circle, `Lime Green` fill + blue ring when selected) above a row of circular avatar thumbnails (104px) matching each option.
- **Text input** — white background, 1px `Border/Default`, radius 16px, height 56px, 16px horizontal padding, 18px SemiBold placeholder/value text in `Gray`.
- **Upload card** — bordered card with a circular icon badge (camera), instructional label, and a pill-shaped secondary "Browse photos" button below it.
- **Stat/list row ("My Network")** — icon + label left, value right-aligned, thin divider between rows, a right-aligned `Primary Blue` link ("Invite" / "Remind" / "Nudge") as the row's action.
- **Checkbox** — 20×20px, radius 6px. Checked: fill + stroke `brand/primary` blue, white checkmark icon (2px stroke, ~8×5.5px glyph) centered. Unchecked: transparent fill, 1–1.5px `neutral/500`/`Border Default` gray stroke.
- **Avatar (initials)** — 36×36px circle (radius 18), fill `Light Blue` (`#bfe0f5`), centered initial letter in Be Vietnam Pro SemiBold 14px, `Near Black` text.
- **Contact checklist** — "Select All" header row with a live counter ("4 of 6 Selected"), then rows of circular checkbox (`Primary Blue` when checked) + avatar placeholder + name, divided by hairlines.
- **Share row** — "Share" label above 4 evenly-spaced circular icon buttons (Zalo, Messenger, SMS, Email — each brand-colored) with a caption under each icon.
- **Referral link field** — light card showing the truncated link plus a small copy-icon button.
- **Status/tier badge** — small rounded pill (radius 999, pill-shaped), e.g. "Silver" white bold text on `Gold Accent` (#d7a44c) fill, placed beside the user's name/profile card.
- **Success confirmation (light-weight)** — centered `Lime Green` circular checkmark (48–64px) + bold "Congratulations!"/status headline + muted one-line subtext, often followed by a small "Summary" card (label/value rows). Reserved for confirmations that either carry no point reward (e.g. "Reminder Sent!") or a modest one — NOT for real point milestones (those use the full mascot+confetti pattern instead, per the rule above).
- **Loading/sync state** — centered hourglass/spinner glyph + bold status label ("Synching contacts"), with the primary CTA visible but disabled (`Interactive Disabled`) until the async step completes.
- **Streak/check-in chip row** — horizontal row of day chips (circle, `Light Blue`/`Deep Blue` fill for done/today, white/outline for future) with a day-letter and date, above a single "Check in today" CTA.

## Spacing & radius scale

- Side margins: 24px (near-universal container padding); some list/card screens use 16px — check the specific screen before assuming.
- Stack gaps: 24px between major blocks, 16–20px between related controls, 8px for tight label/value pairs.
- Radius scale (confirmed Figma variables): `radius/sm` 4px, `radius/md` 6–8px, `radius/lg` 8px (small cards, buttons), 24px (feature cards, hand-built), 40px (phone frame), `radius/pill` 999px (pills, stepper, progress bar, chips, badges).
- Spacing scale (confirmed Figma variables): `space/xs` 4px, `space/sm` 8px, `space/md` 16px, `space/lg` 24px, `space/xl` 32px, `space/2xl` 48px, `space/3xl` 64px, `space/4xl` 96px.

## Not yet verified — pull from Figma before relying on it

The GitHub-hosted draft of this skill previously included generic web-app patterns (desktop modals, data tables, dark mode, CSS breakpoints, SF Pro/Roboto fonts, `#0066CC`/`#001F3F` colors) that do **not** match this Figma file and were removed. If a future task needs any of those (e.g. a merchant-portal admin table), verify it directly against the actual "style guide and design system" page (node `693:30`, file `Jznca6B8f4Kt6l8SCHDb4l`) via `get_design_context`/`get_variable_defs` rather than reusing generic web conventions — this app is mobile-only as far as verified content goes.
