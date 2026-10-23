# Typography audit — 2026-08-04 scale change

The typography sheet settled the scale: **Display 1/2/3 = 72/60/48**, **H1–H6 = 36/30/24/20/18/16**, **Body Large/Medium/Small = 16/14/12**, caption and overline at 12. Two consequences reach existing code: 18px is now heading-only, and **14px is bound to Regular 400 / Semibold 600** (it used to be Medium 500 / Bold 700).

Updated in this pass: `CLAUDE.md`, `tokens/scale.css`, `tokens/typography.css`, `readme.md`, the Typography page and Developer reference in `DocSite.html` (`docs/v2/*`).

## Changed

**18px body text → Body Large (16px / 24px line).** 18px at Regular 400 is no longer legal, so lead paragraphs, descriptions and large inputs moved down a step in 16 components: `SectionHeaderIcon`, `SectionHeader`, `SectionHeaderCentered`, `SectionHeaderActions`, `MarketingPageHeader`, `LegalPage`, `NotFoundSection`, `BlogPageHeader`, `HeroSection`, `ContentSection`, `CTASection`, `AppDownloadSection`, `StatsSectionDark`, `DesignSystemHeader`, `MegaInputFieldBase`, `SearchBarLarge`.

**`docs/theme.css`** — `.sh-lead` was 18px/400; now 16px / 24px.

## Flagged, not changed

**1. 14px at Medium 500 — the biggest one. RESOLVED 2026-08-06 → Regular 400; see the last section.** Under the new rule 14px takes 400 or 600 only. Medium 500 at 14px is the default weight for nearly every label in the system: form labels (`Input`, `Select`, `TextArea`, `Toggle`, `DatePicker`), menu and list items (`Dropdown`, `CommandMenu`, `DropdownListItem`, `NavAccountCardMenuItem`, `SearchResultItem`, `CommandDropdownMenuItem`, `DatePickerListItem`), calendar cells and headers, `Pagination`, `Divider`, `SectionDivider`, `ProgressBar`, `ProgressBarLabeled`, `FileUploadItem`, `Change`, `ToastSimple`, `TagCheckbox`, metric and stat cards (`MetricItem`, `MetricItemChart`, `BudgetCard`, `BudgetCategory`, `DashboardStatCard`), and the docs chrome (`.sh-navlink`, `.sh-crumbs`, `.sh-search input`, `.sh-toc-list a`, `.sh-type-spec`, `.sh-blank`, `.sh-scale-*`, icon grid). Find them with `fontSize: 14, fontWeight: 500` and `font-size: 14px; font-weight: 500`.

Deciding it is a single call: label weight becomes **400** (labels read lighter) or **600** (labels read heavier than today). Either way it is a visible change across every screen. **Settled 2026-08-06: 400.**

**2. Mono at 18px.** `CreditCardMockup` sets the card number at 18px Roboto Mono. The monospace exception in CLAUDE.md covers the *family*, not the size/weight rule, so 18px mono at 400 is off-rule.

**3. `Button` sizes.** `lg` and `xl` render 16px labels at 600 (legal as Body Large bold); `sm`/`md` render 14px at 600 — legal now, and worth noting it changed meaning (it used to violate the 500/700 rule).

**4. v1 docs. RESOLVED 2026-08-11 → deleted.** The v1 `DocSite.html`, `docs/nav.js` and `docs/pages/elements.jsx` published the old scale (H1 = 72 … Body — Extra Small = 12) and were removed. The v2 site, since renamed `DocSite.html`, is the only docs site.

**5. `ui_kits/**` not audited.** The kit demo pages were left untouched.

**6. MDS template weights.** Rows where the workbook declares a weight the rule forbids (e.g. `style.base.lg.regular` — 400 at 18px) are coerced and flagged in the last column of Developer reference › Typography — styles. Nothing to fix in the template; the flag is the record.

## Token map notes

- `font.size.xl` moved from 24px to **20px** (H4 introduces the step), so `2xl`–`6xl` each shift one rung: 24, 30, 36, 48, 60.
- `font.size.7xl` = 72px is **added beyond the template ladder** — the workbook stops at `6xl`, but Display 1 needs 72.
- `font.size.2xs` stays blank (below the 12px floor).
- The "Heading scale — pick one" picker is gone; the sheet settled it.

## Fixed — 2026-08-05, badges

`Badge` and `BadgeGroup` were part of the 14px / Medium 500 group in item 1 above.
They are now resolved, ahead of the system-wide call:

- `data-display/Badge.jsx` — `sm` 12px stays at 500; `md` and `lg` 14px move from **500 to 600**. A badge label is a label, so it takes the heavier end of the 14px row and matches Button's `sm`/`md`.
- `data-display/BadgeGroup.jsx` — the trailing text moves from **500 to 400** at 14px, and its line height from 20px to 18px at `sm` (12px). It is supporting prose beside the pill, not a label, so it takes the lighter end.
- Line heights stay 18px at 12px and 20px at 14px, matching Button rather than the then-current 14/21 body row. **Settled 2026-08-07: the body row moved to 14/20 system-wide.**

This settles two components of item 1. The rest of the list is untouched.

## Fixed — 2026-08-06, checkbox and radio

`Checkbox` and `RadioButton` were part of the 14px / Medium 500 group in item 1.
Both are resolved, and the call for item 1 is **Regular 400**:

- `forms/Checkbox.jsx`, `forms/RadioButton.jsx` — the label moves from **500 to 400** at 14px (`sm`) and 16px (`md`), and its colour from `color.text.secondary` to `color.text.primary` so the darker value carries the hierarchy the weight used to.
- Hint text was already 400. Label and hint now share one weight and are told apart by colour alone: the hint moves from `color.text.tertiary` to `color.text.quaternary` (#717680, 4.6:1 on the default surface — the lightest step that still clears AA for body text).
- Line heights stay 20px at 14px and 24px at 16px, matching Button and Badge. **The 14/21 body row was settled 2026-08-07 at 14/20.**

The rest of item 1 is untouched: form labels (`Input`, `Select`, `TextArea`, `Toggle`, `DatePicker`), menu and list items, calendar cells, `Pagination`, `Divider`, `ProgressBar`, `FileUploadItem`, `ToastSimple`, `TagCheckbox`, the metric and stat cards, and the docs chrome. They now differ from the two settled components.

## Fixed — 2026-08-06, item 1 across the system

Item 1 is settled at **Regular 400**, and the sweep is done. Every 14px and 16px
occurrence of Medium 500 in `components/**` and `docs/**` now reads 400 — 32 inline
style declarations and 19 CSS rules across 34 files:

- **Forms** — `Input`, `Select`, `TextArea`, `Toggle`, `ToggleText`, `FileUploadItem`, `TagCheckbox`, `DatePicker`, `DatePickerListItem`.
- **Menus and lists** — `Dropdown`, `DropdownListItem`, `CommandMenu`, `CommandDropdownMenuItem`, `NavAccountCardMenuItem`, `SearchResultItem`.
- **Calendar** — `CalendarCellDate`, `CalendarColumnHeader`.
- **Data and feedback** — `ProgressBar`, `ProgressBarLabeled`, `Pagination`, `PaginationNumber`, `Divider`, `SectionDivider`, `ToastSimple`, `Change`, `MetricItem`, `MetricItemChart`, `BudgetCard`, `BudgetCategory`, `DashboardStatCard`.
- **Docs chrome** — `docs/theme.css`, `docs/v2/theme.css`, `docs/pages/base-c.jsx`, `docs/pages/app-e.jsx`, the `.sh-boot` line in `DocSite.html`, and the token-table value column in `docs/v2/token-pages.jsx` (14px rows to 400; the 12px monospace shadow rows keep 500).

**12px stayed at 500** — the scale binds Body Small, caption and overline to 500 or 700,
so 24 occurrences were correctly left alone.

### Still open

`data-display/Avatar.jsx` renders initials at one weight (500) across six sizes:
12, 14, 16, 18, 20 and 24px. No single weight is legal across that range — 12px takes
500, 14 and 16 take 400 or 600, and 18px and up take 600 only. It needs a per-size
weight map, which is a design call rather than a sweep. Left as-is.

`ui_kits/**` is still out of scope (item 5).

## Fixed — 2026-08-07, Body Medium line height

The 14px body row moved from a 21px line to **20px**, matching the control line
height already used by Button, Badge, the form fields and every 14px label in the
system. 14px text now has one line height everywhere.

- `tokens/scale.css` — `--text-sm-line` and `--text-body-md-line` are 20px.
  `.uui-body-md` / `-bold` in `tokens/typography.css` pick it up through the token.
- `CLAUDE.md` — the Body Medium row reads 14/20, and the 1.5× note carries the exception.
- `data-display/Tooltip.jsx` — the only component still rendering a 21px line; title and
  supporting text are now 20px.
- Docs — the tooltip token maps in `docs/pages/switches-tooltips.jsx`, the Body Medium row
  in `docs/v2/elements.jsx`, and the `font.lineHeight.normal` note plus `BODY_LINE` map in
  `docs/v2/tokens.js`.

`font.lineHeight.normal` (1.5) no longer describes Body Medium exactly — 14/20 is 1.43×.
The token keeps its value and the note names the exception; a separate `font.lineHeight`
step for 1.43 was not added.

`docs/pages/elements.jsx` and `DocSite.html` published the v1 scale (item 4); both were
deleted on 2026-08-11.

## Fixed — 2026-08-09, Avatars & Dropdown revamp

Both components were restyled onto the scale while their docs pages were rebuilt,
because a token map may only annotate published `style.*` steps and these rendered
sizes that no step covers.

- `data-display/Avatar.jsx` — initials were 500 at every size, which the scale allows
  only at 12px. Now 12/18 · 500 at xs and semibold from sm up: 14/20, 16/24, 18/22,
  20/24, 24/28 (`style.body.sm`, `body.md.bold`, `body.lg.bold`, `heading.h5`, `h4`, `h3`).
- `data-display/AvatarGroup.jsx` — the +N counter sized itself at 32% of the disc, landing
  on 7.7 / 10.2 / 12.8 / 15.4px. Now 12/18 · 700 at xs and sm, 14/20 · 600 at md and lg.
- `data-display/AvatarLabelGroup.jsx` — an 18px title and a 16px subtitle both ran on a
  20px line. Now sm/md 14/20 · 600 over 14/20 · 400, lg 16/20 · 600 over 14/20 · 400,
  xl 18/22 · 600 over 16/24 · 400.
- `overlays/Dropdown.jsx` — the shortcut hint was 12px at the inherited 400. Now 12/18 · 500,
  and the new section heading is `style.overline` (12/18 · 700 · +6% · uppercase).

## Fixed — 2026-08-09, Avatar & Dropdown spacing and colour

Same pass, recorded here so the spacing and colour changes travel with the type ones.

- Spacing: Avatar's presence dot was `max(8, 25% of the disc)` — 10px at md, 14px at xl.
  It now steps 6 / 8 / 12 / 12 / 16 / 16 and its ring is 2px, not 1.5px. AvatarGroup's overlap
  was 30% of the disc (−7.2 / −9.6 / −12 / −14.4) and now steps −8 / −8 / −12 / −16.
  Dropdown items were 8px/10px with a 10px gap; they are now `spacing.md`/`spacing.lg` with a
  `spacing.md` gap, which puts the item at the 36px control height.
- Colour: Avatar dropped `--component-colors-components-avatars-avatar-bg` and
  `-avatar-contrast-border` for `color.surface.canvas` and `color.border.subtle`, and the
  invented `color.text.quaternary` for `color.text.tertiary`. Dropdown dropped
  `--colors-foreground-fg-quaternary-400` and `--colors-text-text-quaternary-500` for
  `color.text.tertiary`, and the destructive icon now takes the label's
  `color.text.status.error` rather than a separate foreground variable.
- Still open: the presence dot uses `color.success.500` and `color.neutral.300`, ramp steps
  that do not invert in dark mode. Foundations publishes no semantic presence colour. Flagged
  on the Avatars page rather than papered over.
- Still open elsewhere: `docs/pages/switches-tooltips.jsx` annotates Toggle's hint as
  `color.text.quaternary` and its track as `color.surface.tertiary` / `.quaternary`. None of
  the three is published. `docs/theme.css` also styles its own chrome from
  `--colors-text-text-quaternary-500`, which is docs furniture rather than an annotation.

## Fixed — 2026-08-10, Progress indicators & Sliders revamp

- `feedback/ProgressCircle.jsx` — the centred percentage was `size × 0.22`, landing on
  12.3 / 17.6 / 26.4 / 35.2px at sm / md / lg / xl, none of them a step, all at 600 (which
  12px does not allow). It now steps 12/18 · 700, 16/24 · 600, 24/28 · 600, 30/36 · 600
  (`style.body.sm.bold`, `style.heading.h6`, `h3`, `h2`).
- `feedback/ProgressBar.jsx` and `forms/Slider.jsx` — labels, end labels and the value
  tooltip are 14/20 · 400 (`style.body.md`), the same reading the token maps annotate.

## Fixed — 2026-08-11, table headers to the 14px floor

CLAUDE.md now sets a table-header rule: column headers are minimum 14px and bold, sized to
follow the table's body text. 700 is not available at 14px, so the bold weight is 600.

- Docs (`docs/v2/theme.css`) — `.sh-type-head`, `.sh-scale-head`, `.sh-tok-head` were
  12/18 · 700, now 14/20 · 600 (`style.body.md` semibold). Covers Typography, Spacing,
  Radius, Colors, Shadows and every reference table.
- Shipped components — `layout/Table.jsx`, `atoms/TableHeaderCell.jsx` and
  `atoms/TableHeaderLabel.jsx` were 12/18 · 700, now 14/20 · 600. Their body cells are
  14/20, so the header no longer sits below its rows. This is a visible change to shipped
  components, made on the explicit instruction to apply the rule throughout.
- Header colour is unchanged (`--colors-text-text-quaternary-500`) and the sort arrow stays
  at 12px.

## Fixed — 2026-08-11, Table revamp

- `layout/Table.jsx` — the card title was 18/28 · 600; 28px is not the line height for
  18px. Now 18/22 · 600 (`style.heading.h5`). Description and cells stay 14/20 · 400
  (`style.body.md.regular`); the header row is 14/20 · 600 (`style.body.md.bold`).
- Flagged, not changed: the workbook's `style.table.header` and `style.table.cell` both
  resolve to 16px (size key `md`). No table in the product renders at 16px, so the docs
  annotate the header and cells with the Body md pair and note the discrepancy. If 16px is
  the intent, the component and the docs both need to move.
- Flagged, not changed: the resting column-header colour is
  `--colors-text-text-quaternary-500`, which Foundations does not name. The token maps
  print the variable rather than an invented `color.text.quaternary`.

## 2026-08-11 — Tabs

`navigation/Tabs.jsx` used 14px at weight **700**, a pairing the scale does not allow
(14px is 400 or 600). Labels are now `style.body.md` / `style.body.lg` at rest (14/20/400, 16/24/400) and
`style.body.md.bold` / `style.body.lg.bold` when selected (600) — both weights are the
ones the scale binds to those sizes, so selection reads through weight, colour and the
indicator together. The count badge
was 12px with no weight set; it is now 12/18/500 (Body Small Medium).

Colour, in the same pass: the badge read `--component-colors-utility-brand-*`. It now
takes `color.surface.selected` and `color.text.brand.primary`, both semantic and both
theme-flipping. Resting labels moved from `--colors-text-text-quaternary-500` — which
Foundations does not publish — to `color.text.tertiary`.
