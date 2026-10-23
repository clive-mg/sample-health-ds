---
name: sample-health-design
description: Use this skill to generate well-branded interfaces and assets for Sample Health, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI components for prototyping.
user-invocable: true
---

## Rule precedence — hard rule, no violations

The documentation site is the authority for this system. **`docs-rules.md` is its
distilled, binding form — read that file first, before designing or writing anything.**
It restates every rule the DocSite publishes: Foundations (colour, type, spacing, radius,
shadow, icons) and the per-component contracts.

Precedence, highest first:

1. **The consuming project's own brief** — what the user asks for in their project wins.
2. **`docs-rules.md` / the DocSite** (`DocSite.html`) — binding in full, no exceptions.
3. Everything else here: `readme.md`, the cheatsheet below, `components/**` source,
   `ui_kits/**`, the `.prompt.md` notes, `tokens/fig-tokens.css`.

Where 2 and 3 disagree, 2 is correct and 3 is stale — follow the DocSite and say so.
Nothing the DocSite forbids ships: not an off-scale type size, not a pinned control
height, not an invented token name, even where existing code in this system still does
it. Known violations are inventoried in `typography-audit.md` and `spacing-audit.md` —
flag them when you touch a file; never copy them forward.

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map

- `docs-rules.md` — **read first.** The DocSite's rules, distilled and binding.
- `DocSite.html` — the component documentation site (Foundations + Base components + Application components), the primary way to browse everything the system offers.
- `readme.md` — full design guide: content voice, visual foundations, iconography, components.
- `styles.css` — the single global CSS entry point (`@import` it). Pulls in fonts + all tokens + type utilities + the blue brand mapping.
- `tokens/` — `fig-tokens.css` (colors/type/spacing/radius vars), `brand-blue.css` (maps the brand ramp to blue), `scale.css` (px aliases: `--radius-md-px`, `--text-md-size`, `--font-body`…), `typography.css`, `fonts.css` (Inter + Roboto Mono).
- `assets/icons/` — `icon-data.js` (~2,396 glyphs), `Icon.jsx` (`<Icon name="ArrowRight" size={20} />`), `Icon.d.ts` (name index). Icons paint with `currentColor`.
- `components/<group>/` — React primitives (buttons, forms, data-display, feedback, navigation, overlays, layout, charts, date, media, content). Each has `.jsx` + `.d.ts` + a `.prompt.md` usage note.
- `ui_kits/application` & `ui_kits/marketing` — full screens (dashboard, settings, landing, login) showing the primitives composed.
- `assets/logo.png` — the Sample Health logo.

## Using the components

In HTML, load the compiled bundle then read the namespace:
```html
<link rel="stylesheet" href="styles.css" />
<script src="assets/icons/icon-data.js"></script> <!-- registers window.__UUI_ICONS; load before the bundle -->
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Input, Badge, Icon } = window.UntitledUIPRODesignSystem_380e88;
</script>
```
(The `window` namespace is an auto-generated internal identifier — it is never shown to users.) For production React, read `components/<group>/<Name>.jsx` + `<Name>.d.ts` and copy the pattern; style via the CSS custom properties, never hard-coded hex.

## Brand cheatsheet

- Primary: blue **#1570EF** (Brand 600), hover **#175CD3** (700). Neutrals from the gray ramp.
- Type: **Inter** only, **Roboto Mono** for code samples only. Eleven sizes — 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72 — and weight is bound to size: 18px and up are 600, 16 and 14 are 400 or 600, 12 is 500 or 700. No body text at 18px or above. -2% tracking from 36px up.
- Radius from `--radius-*-px` — controls `md`, cards `xl`/`2xl`, pills `full`. Spacing from `--spacing-*-px` only: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160. Never a raw px value, and never a control height pinned against its own padding. Soft low-opacity shadows from `shadow.xs`–`shadow.3xl`; 4px brand focus ring (`color.focusRing`).
- Line icons only — no emoji. Sentence case copy, "you"-voice, no filler.
- Logo: `assets/logo-nav.png` in product chrome (`assets/logo-nav-white.png` reversed on dark and brand surfaces, `assets/logo-nav-mark*.png` where the wordmark will not fit). `assets/logo.png` is the design-system lockup — docs chrome only, never a product nav.
