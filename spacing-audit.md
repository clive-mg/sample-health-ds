# Spacing audit — off-scale padding, margin and gap

Scanned 384 component `.jsx` files on 2026-08-04. **52 files carry 60 off-scale declarations.** Two rows (`atoms/DateInputField.jsx`, `date/DatePicker.jsx`) were cleared on 2026-08-12; 50 files, 58 declarations remain.

The spacing scale is 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160 (`--spacing-*-px`). Anything else is a violation of the spacing rule in `CLAUDE.md`.

Nothing in this list has been changed. Fix a row when you next touch that file, and follow the Button precedent for ties: pick the step that keeps the component's size ladder monotonic.

## Fixed already

`atoms/DateInputField.jsx` and `date/DatePicker.jsx` — both carried `padding: 0 14px` over a pinned 40px height. Rewritten 2026-08-12 with the date picker revamp: the trigger now takes Input's construction exactly — `spacing.md` block, `spacing.xl` inline at md (`spacing.lg` at sm), no pinned height, 1px border as an inset shadow. `date/Calendar.jsx` was rebuilt on the scale at the same time (20px panel padding, 12px header gap, 24px between months, 40px cells).

`buttons/Button.jsx` — padding was sm 8/12, md 10/14, lg 10/16, xl 12/18. Now sm `spacing.md`/`spacing.lg`, md `spacing.md`/`spacing.xl`, lg `spacing.lg`/`spacing.xl`, xl `spacing.lg`/`spacing.2xl`. The fixed heights (36/40/44/48) were dropped; height derives from block padding + line height, so sm and md are 36px and lg and xl are 48px.

## Off-scale values in use

| Value | Occurrences | Nearest step |
|---|---|---|
| 10px | 39 | 8 or 12px |
| 14px | 10 | 12 or 16px |
| 56px | 5 | 48 or 64px |
| 5px | 4 | 4 or 6px |
| 1px | 2 | 0 or 2px |
| 18px | 2 | 16 or 20px |
| 72px | 2 | 64 or 80px |
| 44px | 1 | 40 or 48px |
| -9px | 1 | -8px |
| -1px | 1 | -0 or 2px |

`10` dominates: it is the single most common off-scale value in the kit, mostly as `gap: 10` (which should be `spacing.lg`, 12) and as the block padding of dense rows and menu items (`10px 12px`, `10px 14px` — both from the same source as the old Button padding).

## Every occurrence

| File | Declaration | Off-scale | Nearest step |
|---|---|---|---|
| `atoms/CommandInput.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/CommandInput.jsx` | `padding: 14px 18px` | 14, 18 | 12 or 16, 16 or 20 |
| `atoms/DropdownListItem.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/DropdownListItem.jsx` | `padding: 8px 10px` | 10 | 8 or 12 |
| `atoms/MegaInputFieldBase.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/MegaInputFieldBase.jsx` | `padding: 0 18px` | 18 | 16 or 20 |
| `atoms/NavAccountCardMenuItem.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/NavAccountCardMenuItem.jsx` | `padding: 8px 10px` | 10 | 8 or 12 |
| `atoms/ToastSimple.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/ToastSimple.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `forms/Select.jsx` | `padding: 0 14px` | 14 | 12 or 16 |
| `forms/Select.jsx` | `padding: 8px 10px` | 10 | 8 or 12 |
| `overlays/CommandMenu.jsx` | `gap: 10` | 10 | 8 or 12 |
| `overlays/CommandMenu.jsx` | `padding: 10px 12px` | 10 | 8 or 12 |
| `overlays/Dropdown.jsx` | `gap: 10` | 10 | 8 or 12 |
| `overlays/Dropdown.jsx` | `padding: 8px 10px` | 10 | 8 or 12 |
| `atoms/BudgetCategory.jsx` | `padding: 10px 0` | 10 | 8 or 12 |
| `atoms/ButtonGroupBase.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `atoms/CarouselImage.jsx` | `padding: 4px 10px` | 10 | 8 or 12 |
| `atoms/ChatListItem.jsx` | `padding: 0 5px` | 5 | 4 or 6 |
| `atoms/CommandBarFooter.jsx` | `padding: 10px 16px` | 10 | 8 or 12 |
| `atoms/CommandDropdownMenuItem.jsx` | `padding: 10px 12px` | 10 | 8 or 12 |
| `atoms/CompanyLogo.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/DocumentationUser.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/EmailTemplateHeader.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/IPhoneMockupHome.jsx` | `padding: 10` | 10 | 8 or 12 |
| `atoms/KanbanCard.jsx` | `margin: 10px 0 12px` | 10 | 8 or 12 |
| `atoms/Key.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `atoms/Message.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `atoms/MessageStatusIcon.jsx` | `marginLeft: -9` | -9 | -8 |
| `atoms/NavItemDropdownBase.jsx` | `paddingLeft: 44` | 44 | 40 or 48 |
| `atoms/SearchResultItem.jsx` | `padding: 10px 12px` | 10 | 8 or 12 |
| `atoms/SelectMenuItem.jsx` | `padding: 10px 10px` | 10 | 8 or 12 |
| `atoms/ShadowCard.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/SocialButtonBrand.jsx` | `gap: 10` | 10 | 8 or 12 |
| `atoms/StatsSectionDark.jsx` | `padding: 72px 32px` | 72 | 64 or 80 |
| `atoms/TagCheckbox.jsx` | `padding: 6px 10px` | 10 | 8 or 12 |
| `atoms/TagCount.jsx` | `padding: 0 5px` | 5 | 4 or 6 |
| `atoms/VideoActionTooltip.jsx` | `padding: 0 5px` | 5 | 4 or 6 |
| `content/EmailTemplate.jsx` | `gap: 10` | 10 | 8 or 12 |
| `data-display/Carousel.jsx` | `padding: 4px 10px` | 10 | 8 or 12 |
| `data-display/KeyboardKey.jsx` | `padding: 0 5px` | 5 | 4 or 6 |
| `data-display/MapMarker.jsx` | `padding: 4px 10px` | 10 | 8 or 12 |
| `data-display/MessageBubble.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `forms/TextArea.jsx` | `padding: 10px 14px` | 10, 14 | 8 or 12, 12 or 16 |
| `marketing/Footer.jsx` | `gap: 10` | 10 | 8 or 12 |
| `marketing/HeaderNav.jsx` | `gap: 10` | 10 | 8 or 12 |
| `mockups/AppStoreBadge.jsx` | `gap: 10` | 10 | 8 or 12 |
| `mockups/PhoneMockup.jsx` | `padding: 10` | 10 | 8 or 12 |
| `sections/BlogSection.jsx` | `marginTop: 56` | 56 | 48 or 64 |
| `sections/CTASection.jsx` | `padding: 72px 32px` | 72 | 64 or 80 |
| `sections/FeatureSection.jsx` | `marginTop: 56` | 56 | 48 or 64 |
| `sections/PricingSection.jsx` | `marginTop: 56` | 56 | 48 or 64 |
| `sections/TeamSection.jsx` | `marginTop: 56` | 56 | 48 or 64 |
| `sections/TestimonialSection.jsx` | `marginTop: 56` | 56 | 48 or 64 |

## Not covered by this scan

- Values written as `var(--spacing-*)` or `calc(...)` are skipped — they are already token-bound.
- On-scale but hard-coded numbers (`padding: 8`, `gap: 12`) are not listed. They land on the right value but bypass the token, so they are a second, larger cleanup: roughly every component does this somewhere.
- `%`, `rem` and `em` spacing, and the docs site's own CSS, are out of scope.

## Fixed — 2026-08-05, badges

Cleared while rebuilding the Badges and Badge groups documentation. All three now
take every padding, gap and radius from a token.

| File | Was | Now |
| --- | --- | --- |
| `data-display/Badge.jsx` | `padding: 2px 8px / 2px 10px / 4px 12px`, `gap: 4 / 6 / 6`, `borderRadius: 9999` | sm `spacing.xxs` / `spacing.md`, md `spacing.xxs` / `spacing.lg`, lg `spacing.xs` / `spacing.lg`; gap `spacing.xs` / `spacing.sm`; `radius.sm` and `radius.full` |
| `data-display/BadgeGroup.jsx` | `padding: 2px 10px 2px 4px`, `gap: 6 / 8`, `borderRadius: 9999` | `spacing.xxs` / `spacing.lg` / `spacing.xxs` / `spacing.xs` (lg takes `spacing.xs` block); gap `spacing.sm` / `spacing.md`; `radius.full` |
| `atoms/BadgeCloseX.jsx` | `padding: 1`, `borderRadius: 3` | `spacing.none`, `radius.xxs` |

The 10px horizontal step was a tie between 8 and 12. It rounded **up** so the size
ladder stays monotonic: sm 24px, md 26px, lg 30px, with each size differing from
the next on exactly one edge. No height is pinned; it derives from block padding,
line height and the 1px border. Note the border: unlike Button, every badge type
carries a 1px hairline under `box-sizing: border-box`, so it adds 2px that the
Button formula does not account for. Badge groups land at 30 / 32 / 40px — the
container's block padding, the inner badge, and the container's own border.

## Fixed — 2026-08-06, Input and Select

Both fields pinned a height that contradicted their padding, and both used
off-scale padding:

- `forms/Input.jsx` — was `padding: 10px 14px` with `height: 40` (`sm`: `8px 12px`, `height: 36`). Now `spacing.md` / `spacing.xl` at `md` and `spacing.md` / `spacing.lg` at `sm`, with no pinned height: 8 + 8 + 24 = **40px**, 8 + 8 + 20 = **36px**.
- `forms/Select.jsx` — was `padding: 0 14px` with `height: 36/40`. Now the same two padding pairs as Input, height derived the same way.
- The 1px border moved from a real `border` to an `inset` box-shadow in both, the construction `Button` already used, so the border costs no height and the padding tokens stay the single source of truth.
- Menu options in `Select` were `padding: 8px 10px` with `borderRadius: 6`; now `spacing.md` / `spacing.lg` and `radius.sm`. The menu frame and its offset from the field are `spacing.xs`.

Padding pairs now match Button rung for rung: `sm` 8/12, `md` 8/16.

## Fixed — 2026-08-10, Progress indicators & Sliders

Cleared while rebuilding both documentation pages.

| File | Was | Now |
| --- | --- | --- |
| `feedback/ProgressBar.jsx` | `gap: 12` (label right), `gap: 8` (label bottom), `borderRadius: 9999` | `spacing.lg`, `spacing.md`, `radius.full` |
| `forms/Slider.jsx` | `borderRadius: 9999 / "50%"`, hard-coded label and tick offsets | `radius.full`; track → ticks and track → end labels are `spacing.md`; tooltip offset `spacing.md`, padding `spacing.md` / `spacing.lg`, `radius.md` |

Control dimensions stay off the spacing scale by design: the bar track is 8px, the slider is an 8px track with a 24px handle,
and the circle is 56 / 80 / 120 / 160px with a 5px or 8px stroke. The 1.5px handle border
is unchanged — Foundations publishes no border-width token, so there is nothing to bind
it to. Raised, not papered over.

## Fixed — 2026-08-10, Slider colour and keyboard

- Colour: the handle read `--component-colors-components-sliders-slider-handle-bg` and
  `-handle-border`. It now takes `color.surface.default` and `color.border.primary`, both
  semantic and both theme-flipping, so the handle still inverts in dark mode without the
  component layer. Dark mode changes appearance: it was a solid brand disc with a dark ring,
  it is now a dark disc with a light brand ring — consistent with every other control.
- Still open: `ProgressBar`'s status fills take `color.success.600` / `warning.600` /
  `error.600`, ramp steps that do not invert. Foundations publishes no semantic status-fill
  token. Flagged on the Progress indicators page.
- Track surface: both components read `--colors-background-bg-tertiary`, which Foundations
  does not name. They now take `color.surface.disabled` (`--colors-background-bg-disabled`)
  instead — the same neutral in both themes (gray 100 / gray 800), so nothing changes on
  screen and the annotation names a published token. The name is a poor fit for a track;
  a dedicated track surface is still a gap worth raising.
- Keyboard: the slider was a `div` with mouse handlers. Each handle is now
  `role="slider"` with `tabIndex`, `aria-valuemin/max/now/text`, arrow / page / home / end
  keys, and the brand halo the other controls use for focus.

## 2026-08-11 — Table

`layout/Table.jsx` was rewritten to take every padding and gap from the scale:
row inset `spacing.3xl` (24px), row block padding `spacing.lg` (12px) at `size="sm"`
and `spacing.xl` (16px) at `md`, header block padding `spacing.lg`, title bar
`spacing.2xl` (20px), footer `spacing.lg`, empty / error body `spacing.6xl` (48px).
Row heights are derived (padding + 20px line = 36px and 52px), not pinned.

## 2026-08-11 — Tabs

`navigation/Tabs.jsx` was rebuilt for its three types (line, button, segmented), and every
padding, gap and radius now comes from the scale: item padding `spacing.md` / `spacing.lg`
at `sm` and `spacing.lg` / `spacing.xl` at `md`, gaps `spacing.xs` between button tabs
and `spacing.lg` / `spacing.xl` between rail tabs, track and frame inset `spacing.xs`,
item radius `radius.sm` / `radius.md`, container `radius.md`, badge `radius.full`.
Heights are derived (36px at `sm`, 48px at `md`), not pinned.

The flagged `marginBottom: -1` is gone. The 2px indicator is now its own absolutely
positioned bar; on `type="line"` it is offset `-1px` onto the hairline rule so the
two read as one mark. That offset is a border overlap, not a spacing step — the same
reason a 1px hairline is not on the scale.

### Tabs colour follow-up — 2026-08-11

The line indicator and the selected label were `color.border.primary` (brand 500) and
`color.text.brand.primary` (brand 900). Both are now **`color.primary.600`** by request.
Two consequences, raised not papered over:

- `color.primary.600` is a ramp step, so it does **not** invert for dark mode. Foundations
  publishes no semantic brand token at the 600 step; a `color.border.selected` /
  `color.text.selected` pair would close the gap.
- Contrast: brand 600 on the default surface (line tabs) measures 4.55:1 and clears AA.
  On the brand tint used by button and segmented tabs it measures **4.2:1**, just under the
  4.5:1 floor for 14px text. `color.primary.700` measures 5.6:1 on the same tint.

### Link colour button follow-up — 2026-08-14

`Button hierarchy="link-color"` took its rest colour from the component-token layer,
which resolved to brand 700, while the docs annotated the resting link with
`color.text.link.hover`. Both are now the resting pair Foundations publishes:
rest `color.text.link` (`--colors-text-text-brand-tertiary-600`, brand 600),
hover `color.text.link.hover` (`--colors-text-text-brand-secondary-700`, brand 700).
Alerts, Notifications and the Buttons token map were re-annotated to match the render.

Same contrast trade as Tabs above, and it is **open, not resolved**:

- On white the link measures 4.57:1 and clears AA at 14px.
- On the status tints it does not: info 4.25:1, warning 4.38:1, success 4.33:1,
  error 4.2:1. Every `link-color` action inside an inline alert or notification is
  therefore below the 4.5:1 floor at 14px. Brand 700 measures 5.6:1 on the same tints.
- Foundations publishes no on-tint link token — `color.text.link` is defined against
  the default surface only. Closing this needs either a `color.text.link.onTint` step
  at 700, or a rule that link actions on tinted surfaces take the 700 step. Until one
  of those lands, do not annotate the alert action with anything other than
  `color.text.link`; the render and the annotation agree, the token is what is missing.
