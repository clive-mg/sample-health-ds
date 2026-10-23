# Sample Health — project rules

## Spacing (NON-NEGOTIABLE)

Every padding, gap and margin in a component comes from the spacing scale — `--spacing-*-px` (or `--spacing-*`) — never a raw px value. The steps are 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160.

- An off-scale value rounds to the nearest step. Where it sits exactly between two steps, pick the one that keeps the component's size ladder monotonic — Button rounds 10→8, 14→16, 18→20, giving sm 8/12, md 8/16, lg 12/16, xl 12/20.
- Never pin a height that contradicts its padding. Control height derives from block padding + line height (Button: sm/md 36px, lg/xl 48px).
- Same rule for radius (`--radius-*-px`) and shadows (`shadow.*`).
- Known violations are inventoried in `spacing-audit.md`. Flag them when you touch the file; do not mass-restyle without agreement. **Do not introduce new ones.**

## Typography (NON-NEGOTIABLE)

All text uses **Inter**. The ONLY monospace exception is code / code samples (Roboto Mono via `--font-mono`). No other font families, and no font sizes or weights outside the table below — ever. This applies to the design system, its components, the docs site (`DocSite.html`, `docs/**`), templates, and any future work.

### The only allowed sizes, and their bound weights

| Element            | Font  | Size | Line height | Allowed weights            |
|--------------------|-------|------|-------------|----------------------------|
| Display 1          | Inter | 72px | 86px        | Semibold 600               |
| Display 2          | Inter | 60px | 72px        | Semibold 600               |
| Display 3          | Inter | 48px | 58px        | Semibold 600               |
| H1                 | Inter | 36px | 44px        | Semibold 600               |
| H2                 | Inter | 30px | 36px        | Semibold 600               |
| H3                 | Inter | 24px | 28px        | Semibold 600               |
| H4                 | Inter | 20px | 24px        | Semibold 600               |
| H5                 | Inter | 18px | 22px        | Semibold 600               |
| H6                 | Inter | 16px | 20px        | Semibold 600               |
| Body — Large       | Inter | 16px | 24px        | Regular 400 · Semibold 600 |
| Body — Medium      | Inter | 14px | 20px        | Regular 400 · Semibold 600 |
| Body — Small       | Inter | 12px | 18px        | Medium 500 · Bold 700      |
| Caption / Overline | Inter | 12px | 18px        | Medium 500 · Bold 700      |

**Weights are strictly bound to size** — do not use a weight outside its row:
- 18–72px (Display 1–3, H1–H5): **600 only**. Body text never goes above 16px.
- 16px: **600** as H6, **400 or 600** as Body Large.
- 14px (Body Medium): **400** or **600**. Never 500 or 700.
- 12px (Body Small, caption, overline): **500** or **700**. Never 400 or 600.

Line heights are 1.2× the size for display and headings, 1.5× for body — except Body Medium, which is **20px** (the control line height used by Button, Badge, form fields and Tooltip), not 21px. Tracking: **-2%** (`--tracking-tight`) at 36px and up; overline adds **+6%** (`--tracking-wide`) and is uppercase.

### Table headers (NON-NEGOTIABLE)

Column-header rows in any table — docs, foundations, token references, component
prop tables — are **minimum 14px** and bold: Inter **14px / 20px / 600** (Body Medium
Semibold). 700 is not available at 14px, so 600 is the bold weight here. Never 12px.
Header size follows the body text size of the table: if the table's cells step up to
16px, the header steps up with them (16px / 24px / 600) — it never sits below its rows.

### Forbidden
- No off-scale sizes: **no 11, 13, 15, 17, 19, 21, 22, 26, 28, 32, 40px**, etc. The eleven steps are 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72.
- No weights other than 400 / 500 / 600 / 700, and none outside its row.
- No font family other than Inter, except monospace for code.
- No body text at 18px or above — that range belongs to headings.

When remapping a stray size, floor to the nearest allowed step (13→12, 15→14, 17→16, 19→18, 22→20, 26→24, 32→30, 40→36).

### How to reference in code
- CSS: prefer the semantic classes from `tokens/typography.css` — `.uui-display-1…3`, `.uui-h1…h6`, `.uui-body-lg`/`-md`/`-sm` (+ `-bold`), `.uui-caption`, `.uui-overline` — each carries size, line height, weight and tracking. Or use the matching `--text-h3-size` / `--text-body-md-line` tokens from `tokens/scale.css`. Family via `var(--font-body)` (Inter) or `var(--font-mono)` (code only).
- The older `--text-*` / `.uui-text-*` px aliases still exist for legacy code; they carry no weight, so they can be paired with a weight the scale forbids. Prefer the semantic layer.
- Inline JSX styles: `fontFamily: "var(--font-body)"`, `fontSize:` one of the allowed px values, `fontWeight:` the size-appropriate value.
- MDS theme tokens: `style.display.1/2/3`, `style.heading.h1…h6`, `style.body.lg/md/sm.regular|bold`, `style.caption`, `style.overline`.

### Known violations — flag, don't silently fix
The 2026-08-04 scale change (Display 1–3 added, H1–H6 shifted down, body sizes shifted down, 14px re-bound from 500/700 to 400/600) left violations in already-shipped code. They are inventoried in `typography-audit.md`. Flag them when you touch the file; do not mass-restyle without agreement. **Do not introduce new ones.**

## Annotation tokens (NON-NEGOTIABLE)

Every token name used to **annotate a UI element** — the chips and callouts on
token maps, spec diagrams, docs pages, audits and handoff notes — must be a token
that exists in the Foundations definitions. If Foundations does not publish it, it
is not a token and it may not appear in an annotation.

- Colour annotations use the `color.*` names from Foundations › Colors (see below).
  Spacing uses `spacing.*`, radius `radius.*`, type `style.*`, elevation `shadow.*`,
  each exactly as its Foundations page publishes it.
- **Never invent a plausible-sounding name.** `color.text.quaternary`,
  `color.icon.quaternary` and `color.surface.disabled.subtle` were all invented this
  way — they read like real tokens, resolve to a real CSS variable in the raw Figma
  export, and are published nowhere. A variable existing in `tokens/fig-tokens.css`
  is **not** evidence that a token exists; only the Foundations pages are.
- An annotation must also be **true to the render**: the CSS variable named beside
  the token must be the one the component actually applies. When the two disagree,
  fix the component and the annotation together in the same change.
- If a component genuinely needs a value Foundations does not publish, that is a
  **gap in Foundations** — raise it and let the token be added. Do not paper over it
  with an invented annotation.

## Color tokens (NON-NEGOTIABLE)

Colours are named and referenced by the **Foundations layer only** — the tokens
published on Foundations › Colors. Nothing else is a colour name in this project.

### Naming

Use the `color.*` names exactly as the Colors page publishes them:

- **Ramps** — `color.primary.<step>`, `color.neutral.<step>`, `color.success.<step>`, `color.error.<step>`, `color.warning.<step>`, `color.info.<step>`. Steps are 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950. Note the mapping: **brand is `color.primary`** and **gray is `color.neutral`**.
- **Semantic** — `color.surface.*`, `color.border.*`, `color.text.*`, `color.focusRing`.

`utility.*`, `component-colors.*` and any other prefix are the **Figma component-token
layer**. They are an implementation detail of the export and must never appear in
documentation, token diagrams, prose, audits or chat.

### In code

Reference the foundation CSS variables — the `--colors-*` namespace:

- Semantic: `--colors-background-bg-primary`, `--colors-border-border-primary`, `--colors-text-text-secondary-700`, and so on.
- Ramp steps: `--colors-brand-<step>`, `--colors-gray-light-mode-<step>`, `--colors-success-<step>`, `--colors-error-<step>`, `--colors-warning-<step>`.

Do not introduce new `--component-colors-*` references in components.

### Dark mode — read before converting a component

The two layers do not behave alike:

- **Semantic foundation variables flip with the theme.** They are redeclared under `:root[data-theme="dark"]`, so `--colors-background-bg-primary` resolves light or dark automatically.
- **Ramp foundation variables do not flip.** `--colors-brand-50` and `--colors-gray-light-mode-50` are declared once, in `:root`. They are the same value in both themes.
- The `--component-colors-utility-*` aliases were what inverted the ramps for dark mode (`utility-gray-50` → `gray-light-mode-50` in light, `gray-dark-mode-900` in dark).

So a component that took a **tinted ramp step** through the component layer loses its
dark-mode inversion when it moves to the foundation ramp. Prefer a semantic token
where one exists. Where a component genuinely needs a ramp step that must invert,
raise it — do not reintroduce the component layer silently.

### Known violations — flag, don't silently fix

Most components still reference `--component-colors-*`. `Badge`, `BadgeGroup` and
`FeaturedIcon` are converted. Flag the rest when you touch a file; do not mass-convert
without agreement. **Do not introduce new ones.**

## Docs site — "On this page" rail

The right-hand table of contents is universal: every page renders it, and the content
column fills whatever space is left beside it.

- **A page with only one section does not get a rail.** One entry repeats the h1 and
  earns nothing. Hide it and let the content span the full row (`.sh-content-full`).
- Hide the rail below **1600px** — below that there is not enough room for it and the
  content — and let the content span the full row there too.

