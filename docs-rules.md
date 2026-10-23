# Sample Health — binding rules for consuming projects

**Read this file before designing or writing anything with Sample Health.**

This is the distilled, binding form of the documentation site (`DocSite.html`).
The DocSite is the authority for this system, in full and without exception:
Foundations (colour, type, spacing, radius, shadow, icons) and every per-component
contract. This file restates it so a consuming project does not have to parse
40 page modules to find the rules.

## Precedence — hard rule, no violations

Highest first:

1. **The consuming project's own brief.** What the user asks for in their project wins.
2. **This file / the DocSite.** Binding in full.
3. **Everything else in the design system**: `readme.md`, `SKILL.md`'s cheatsheet,
   `components/**` source, `ui_kits/**`, `.prompt.md` notes, `tokens/fig-tokens.css`.

Where 2 and 3 disagree, 2 is correct and 3 is stale: follow the DocSite and say so in
your summary. Nothing the DocSite forbids ships — not an off-scale size, not a pinned
control height, not an invented token name — even where existing code in this system
still does it. Shipped violations are inventoried in `typography-audit.md` and
`spacing-audit.md`; flag them when you touch a file, never copy them forward.

Where two DocSite pages register the same component, **the detailed page wins** — it
loads later and is what renders. Buttons is `docs/pages/base-a.jsx`; inputs, select and
textareas are `form-fields.jsx`; checkboxes and radios `selection-controls.jsx`; toggles
and tooltips `switches-tooltips.jsx`; avatars and dropdowns `avatars-dropdowns.jsx`;
progress and sliders `progress-sliders.jsx`. The short `base-b/c/d` versions of those
pages are superseded.

---

## Foundations

### Typography

Inter everywhere. Roboto Mono for code samples only. No other family.

Eleven sizes, and nothing between them: **12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72**.
No 11, 13, 15, 17, 19, 21, 22, 26, 28, 32, 40px. When remapping a stray size, floor to
the nearest step (13→12, 15→14, 17→16, 19→18, 22→20, 26→24, 32→30, 40→36).

| Element | Size / line height | Allowed weights |
|---|---|---|
| Display 1 / 2 / 3 | 72/86 · 60/72 · 48/58 | 600 |
| H1–H5 | 36/44 · 30/36 · 24/28 · 20/24 · 18/22 | 600 |
| H6 | 16/20 | 600 |
| Body Large | 16/24 | 400 · 600 |
| Body Medium | 14/**20** | 400 · 600 |
| Body Small · caption · overline | 12/18 | 500 · 700 |

Weight is bound to size — never use one outside its row. 18px and up: 600 only.
14px: 400 or 600, never 500 or 700. 12px: 500 or 700, never 400 or 600.
**No body text at 18px or above.** Body Medium's line height is 20px, not 21px — it is
the control line height Button, Badge, form fields, menu items and Tooltip all derive
from. Tracking: -2% at 36px and up; overline adds +6% and is uppercase.

**Table headers are minimum 14px Semibold** (Inter 14/20/600 — 700 is not available at
14px). Never 12px. A header follows its table's body size and never sits below its rows.

Reference the semantic classes (`.uui-display-1…3`, `.uui-h1…h6`, `.uui-body-lg/-md/-sm`,
`.uui-caption`, `.uui-overline`) or the `--text-*-size` / `--text-*-line` tokens. The bare
`--text-*` px aliases carry no weight and let you pair a forbidden one — prefer the
semantic layer.

### Spacing, radius, shadow

Every padding, gap and margin comes from the scale — `--spacing-*-px` / `--spacing-*` —
never a raw px value. Steps: **0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96,
128, 160**. An off-scale value rounds to the nearest step; where it sits exactly between
two, pick the one that keeps the component's size ladder monotonic.

Radius comes from `--radius-*-px` (`radius.none`…`radius.4xl`, `radius.full`): controls
`md`, cards `xl`/`2xl`, pills `full`. Elevation comes from `shadow.xs`…`shadow.3xl` —
cards xs–sm, dropdowns and popovers lg, modals xl.

**Never pin a height that contradicts its padding.** Control height derives from block
padding plus line height. That is why Button lands on 36px (sm, md) and 48px (lg, xl),
a menu item and a small input on 36px, and a medium input on 40px — the padding tokens
stay the single source of truth.

### Layout

Pages centre their content in one responsive container: 100% below 1200px, with 16px
padding each side (Small, `breakpoint.sm` ≥992, is still 100%), then 1140 (Medium,
`breakpoint.md` ≥1200) and 1320px (Large, `breakpoint.lg` ≥1400) —
`container.maxWidth.md`, `container.maxWidth.lg`. Max widths include the 16px
`container.gutter`. Use `max-width: var(--container-max-width)` (it steps with the
viewport), `margin: 0 auto`, inline padding `var(--container-gutter-px)`. Header, main
and footer share the container; header and footer backgrounds stay full-bleed
(`TopNav contain="var(--container-max-width)"`).

### Colour

Colours are named by the **Foundations layer only** — the tokens the Colors page
publishes. Ramps are `color.primary.*`, `color.neutral.*`, `color.success.*`,
`color.error.*`, `color.warning.*`, `color.info.*`, at steps 25–950. **Brand is
`color.primary`; gray is `color.neutral`.** Semantics are `color.surface.*`,
`color.border.*`, `color.text.*`, `color.focusRing`.

In code, reference the `--colors-*` variables: semantic
(`--colors-background-bg-primary`, `--colors-border-border-primary`,
`--colors-text-text-secondary-700`) and ramp steps (`--colors-brand-<step>`,
`--colors-gray-light-mode-<step>`, `--colors-success-<step>`, `--colors-error-<step>`,
`--colors-warning-<step>`). Do not introduce new `--component-colors-*` references.

`utility.*` and `component-colors.*` are the Figma component-token layer. They are an
implementation detail of the export and **must never appear** in documentation, token
diagrams, prose, audits or chat.

Primary is blue `#1570EF` (Brand 600), hover `#175CD3` (700). Focus is a 4px brand ring
(`color.focusRing`); error fields ring from the error ramp.

**Dark mode:** semantic variables are redeclared under `:root[data-theme="dark"]` and
flip with the theme. **Ramp variables do not flip** — they are declared once in `:root`
and hold their light-mode value on a dark surface. Prefer a semantic token wherever one
exists; a component that takes a tinted ramp step has no dark-mode inversion.

### Annotation tokens

Every token name used to annotate a UI element — chips and callouts on token maps, spec
diagrams, docs pages, audits, handoff notes — must be a token Foundations actually
publishes. **Never invent a plausible-sounding name.** `color.text.quaternary`,
`color.icon.quaternary` and `color.surface.disabled.subtle` were all invented this way:
they read like real tokens, resolve to a real variable in the raw Figma export, and are
published nowhere. A variable existing in `tokens/fig-tokens.css` is not evidence that a
token exists. An annotation must also be true to the render — the variable named beside
the token must be the one the component applies. A genuine shortfall is a gap in
Foundations: raise it, do not paper over it.

### Icons

Line icons only, the whole icon language — ~2,396 glyphs on a 24×24 grid, painting with
`currentColor`. `<Icon name="ArrowRight" size={20} />`, PascalCase names.
**No emoji anywhere.** Featured contexts wrap a glyph in `FeaturedIcon`.

### Gaps — do not fill them with an invented token

Foundations publishes no accent ramp, no semantic presence colour, no semantic
status-fill for progress, no semantic brand text colour for a current step, no semantic
hover for a filled surface, and no border-width, z-index or motion tokens. Typed date
entry does not exist. In each case the DocSite flags the gap rather than naming
something that is not there. Do the same, and raise it.

---

## Component contracts

### Button

Five hierarchies — `primary`, `secondary`, `tertiary`, `link-gray`, `link-color` — each
with a `-destructive` variant. One primary button per view. Four sizes, padded from the
scale: sm (`spacing.md`/`spacing.lg`, 36px), md (`spacing.md`/`spacing.xl`, 36px),
lg (`spacing.lg`/`spacing.xl`, 48px), xl (`spacing.lg`/`spacing.2xl`, 48px). Height is
never pinned. Link buttons read as inline text: no padding, height or radius. Icon-only
needs `iconOnly` + `iconLeading` and always an `aria-label`.

Tertiary is outlined and flat: a 1px `color.neutral.500` ring, `color.text.secondary`
label, no resting fill and no shadow. That flatness is the whole difference from
secondary, which carries `color.surface.default` plus `shadow.xs`. Because Foundations
publishes no border token at ramp step 500, the ring references the neutral ramp
directly and so does **not** invert in dark mode — a Foundations gap to raise, not to
paper over with a component-layer alias.

### Badge · BadgeGroup

Two shapes, three sizes — sm (`spacing.xxs`/`spacing.md`), md (`spacing.xxs`/`spacing.lg`),
lg (`spacing.xs`/`spacing.lg`) — and six colours: white, gray, brand, error, warning,
success. Every tinted chip takes the same three steps from its ramp: **50 fill, 200
border, 700 label and dot**; white takes `color.surface.default`, `color.border.default`,
`color.text.secondary`. A `count` renders in its own chip one step darker (100). Weight
follows size: 12px sm is 500, 14px md and lg are 600. Height derives from padding, line
height and the 1px border.

BadgeGroup: two themes — light (white + hairline, for the page background) and gray
(`color.neutral.50`, for a white card). Padding is deliberately asymmetric,
`spacing.xs` leading and `spacing.lg` trailing. The leading pill is always a pill Badge
and takes any badge colour.

### Avatar

Six sizes: xs 24, sm 32, md 40, lg 48, xl 56, 2xl 64px. Disc, one piece of content, one
optional dot — a full-radius surface with a hairline inset border. Content in order of
preference: photograph, initials, neutral glyph. The presence dot steps on the spacing
scale (6, 8, 12, 12, 16, 16), not as a fraction of the disc, and sits on a 2px ring of
page surface. Presence is a status: leave it off where the product cannot tell.
Groups ring each disc 2px and collapse the remainder into a +N counter that keeps the
disc and drops the border. With text: name semibold, supporting line regular, 12px right
of the disc, never larger than the name. A clickable avatar needs an accessible name —
the disc supplies none; hover paints a halo, keyboard focus swaps it for the ring on a
gap of page surface.

### Dropdown

Panel hangs 8px below the trigger, padded 4px so the first and last items clear the
corners, minimum 240px, on the lg shadow. Every item is **36px** — 8px block padding on
a 20px line, the same rung as a small button. Six item states, and hover is not focus:
hover fills the surface, focus draws the ring. Selected is a brand-tinted surface plus a
semibold label; disabled drops to the disabled text colour and takes no hover.
An item should not be both selected and destructive. Group with an uppercase 12px
heading **or** a divider, never a heading directly under a divider. `align="right"` keeps
a row-triggered menu inside its table. `open` pins it for a screenshot.

### Input · Select · Textarea

Label, field text and hint share one size and sit 6px apart, so the field reads as one
block of body text. The 1px border is an **inset shadow**, not a real border, so it costs
no height and the padding tokens stay authoritative: 8/16 over a 24px line gives the
40px md field; sm is 36px. A leading icon sits inside the padding box, 8px from the text.
`helpText` puts a 16px question-mark glyph 6px past the label, after the required
asterisk, revealing its tooltip on hover **and** keyboard focus; the field itself does not
change. Hover swaps the fill; focus moves the border to brand and adds a soft brand ring.
Error recolours the border and hint only — fill and padding hold — and focus keeps the
error border with an error ring.

Select reuses the field exactly; only the trailing chevron and the placeholder colour
distinguish it. Its menu sits 4px below the field with a 4px inset frame, and the
selected option takes the brand tint and the bold step of its type style — **no check
mark**. Multiselect reports a count rather than a value, gives each option a 20px
checkbox, reads indeterminate on the All row while only some are chosen, and clears from
the footer.

Textarea is the same field grown: identical padding, radius, type, colour and inset
border. Height comes from `rows`, not a token, and it resizes vertically only.

### Checkbox · Radio

Two sizes, sm 16px and md 20px. Unchecked is a 1px border over the default surface;
checked or indeterminate replaces the border with a solid brand fill and draws the glyph
in the on-brand text colour. Checkbox is a square with a stepped radius; radio is
full-radius with a centred dot one third of its width. Label and hint are both Regular
400 and separated by colour, 8px from the control, 2px apart, with the control offset 2px
from the top of the text block so it sits on the label's optical centre.

### Toggle

Two sizes: 36×20 and 44×24. The track is a full-radius pill and the knob is the track
height less a 2px inset on every side — **never set independently**. Label and hint sit
8px right of the track, 2px apart, stepping 14/20 at sm and 16/24 at md; when a hint is
present the track drops 2px to align with the label's first line. Hover darkens one step;
focus draws a brand ring held off the track by a surface-coloured gap. Disabled is a
lighter step of the same ramp, not an opacity pass. The track is a button with
`role="switch"` and `aria-checked`, toggling on space or enter.

### Tooltip

One size, one surface: a dark inverse bubble 8px from its trigger, padding 8/12, `md`
radius, `lg` shadow — the same elevation as a dropdown. Copy is 14px regular, capped at
260px so a long hint wraps. A second line sits 4px under the title at the same size, and
that is the **only** case where the first line turns semibold. A tooltip is a hint, never
the only place information lives, and its trigger must be focusable — pass `open`
alongside your own focus state. An icon-only button needs one to name its action.

### FeaturedIcon

Two parts and no third: a square chip with a glyph centred at half its size — 40/20,
64/32, 80/40. The chip is sized, not padded, so there is no padding token. One treatment:
**50 fill, 600 glyph** from the colour's own ramp; the neutral chip adds a
`color.border.default` hairline because its fill is the canvas colour. Five colours.
`shape` swaps one radius token — circles for people, status and messages, squares for
files and objects. Both steps are ramp variables, so a chip does not invert in dark mode.

### ProgressBar · ProgressCircle

One track height, 8px, at full radius, filling over 200ms. The percentage sits 12px right
of the track, or 8px under its right edge at full width, in 14px regular secondary text.
Status fills (success, warning, error) are for progress that carries a verdict — used
sparingly, and they are ramp steps that do not invert. The track never changes.

Circles come in 64, 80, 120 and 160px with an 8px stroke. The centred label is a
type-scale step, never a fraction of the diameter: 12/700, then 16, 24 and 30 at 600.
The half gauge is the same ring as a 180° arc in a box half as tall. Both carry
`role="progressbar"` with `aria-valuenow/min/max`.

Bar inline, circle when the percentage itself is the content.

### Slider

An 8px track with a 24px handle centred on it — a white surface with a 1.5px brand
border and the sm shadow. Hover, focus and drag light the same brand halo; only the
cursor changes. Pointer-down moves focus to the handle so a drag can finish on the
keyboard: arrows move one step, PageUp/PageDown ten, Home/End the bounds. Disabled is an
opacity pass. The value tooltip uses the Tooltip surface, padding and shadow. End labels
sit 8px under the track in 14px regular tertiary. Range handles take each other as
limits, in the drag and in aria, so they cannot cross. Ticks draw as 2×4px marks 8px
under the track — keep them to a dozen. The handle reads `color.surface.default` and
`color.border.primary`, not the slider component tokens, so it inverts in dark mode.

### Table

The card owns the border, radius and shadow; the header row sits on the canvas surface
and every row shares one inset. **Column headers are 14px Semibold** (`style.body.md.bold`)
and follow the table's body size; cells are `style.body.md.regular`. Density is the only
difference between the sizes: sm pads rows 8px for 36px rows, md 16px for 52px rows,
against the same 20px line, with header padding stepping 8px and 12px. Rows separate by a
1px divider **or** an alternating fill — never both; hover sits one step darker than the
fill so it reads on either. Sorting emphasises the active header, not the column. The
footer is a separate band. Row actions end three ways: link buttons when the row can carry
labels, icon buttons with tooltips when the column must stay narrow, an overflow menu once
there are more than three actions or one is destructive. Empty, first-run and error bodies
drop the header row and carry the reason plus a way out.

### Tabs

Four types — line for page-level navigation, button inside a card or toolbar, segmented
for two to four short mutually exclusive views, chip for scoping a list or feed. Line puts
a 2px indicator on the hairline rule so the pair reads as one mark. Button tabs sit
transparent at rest, 4px apart at `md` radius, selected on the brand tint. Segmented is
one framed group on the default surface with the xs shadow, hairline dividers, no gap —
**horizontal only**. Chip is `md` radius like button tabs, on a row that scrolls rather
than wraps, 8px apart at sm and 12px at md, resting on `color.neutral.100` and going to
`color.neutral.700` with a `color.text.on.brand` label when selected — also
**horizontal only**. The leading chip is conventionally `All` and is the default, so
selecting it is how the scope clears; there is no separate reset. Two sizes: sm 14/20
in 8/12 (chips 8/16), md 16/24 in 12/16 (chips 12/20); rest labels regular, selected
semibold. Height is never pinned — button, segmented and chip land on 36 and 48px, line
tabs 4px taller for the indicator.
A count follows the label 8px behind in 12/18 medium, the only place a tab drops below
14px, and steps to the next selected surface on a selected tab — except on a chip, where
the count always sits one ramp rung above the chip beneath it so the pill keeps an edge:
`color.neutral.200` at rest, `color.neutral.300` on hover, and `color.neutral.500` with a
`color.text.on.brand` label when selected. A leading icon inherits
the label colour and is hidden from assistive tech. The tablist is one tab stop: arrows
move selection, Home/End jump, disabled tabs are skipped, and the focus ring is
keyboard-only. A `tablist` is single-select by ARIA — a multi-select filter row is a group
of toggle controls, not tabs, and needs its own component.

The four chip fills (`color.neutral.100`/`200` at rest and hover, `color.neutral.700`/`800`
selected) come from the neutral ramp because Foundations publishes no surface token that
reads as an unselected chip against a white page, and none at the dark end that is not the
brand or the near-black `color.surface.inverse`. None inverts in dark mode — a Foundations
gap to raise. The selected label takes `color.text.on.brand`, a poor name on a neutral
chip but the only published text token that stays light in both themes.

### Navigation

`TopNav` across the top, `SidebarNav` down the left, `NavUtilityBar` for the thin
secondary strip — a vertical product needs the first two together. Horizontal suits up to
about seven top-level destinations; vertical suits deeper lists, group headers and counted
rows. Sidebar: 280px expanded, 64px collapsed, 16px padding on all four sides,
so rows sit inset from the panel edge. Rows stack flush at 36px — 8px block padding on a 20px
line — with a 20px icon 12px ahead of the label and a count chip pinned right. Groups sit
24px apart under a 12/18 uppercase title. Keep the expanded rail between 256 and 320px.
Collapsed, labels are hidden not dropped — every row keeps its label as an `aria-label`
and a tooltip, so **every top-level row needs an icon**. `current` drives
`aria-current="page"`, the active surface and the semibold weight from one prop. The brand
theme does not follow dark mode, deliberately. The sub-nav row is chrome, not Tabs. The
utility strip carries locale, contact, help and auth — never a destination.

### Modal

A dialogue is a sentence and a choice, always **480px**, with no hairlines to separate
anything, and at most one field — two means a content modal. A content modal is a working
surface: fixed header and footer separated by a hairline, scrolling body, four widths
(480, 640, 800, 1024) or fullscreen. Both use 24px padding. The scrim is
`color.surface.overlay` at 70% with no blur; fullscreen drops it, along with the radius
and the inset. Centre a panel when the task interrupts; slide it out from the right when
the task sits beside the page — full height, square corners, same four widths, no
fullscreen step. Below 640px every content modal becomes a fullscreen sheet and action
buttons stack primary on top. Escape, the close button and the scrim all dismiss; opt out
with `dismissOnScrim={false}` and `showClose={false}`. The featured icon carries the tone —
brand routine, error destructive, warning reversible bulk, success already done — and a
dialogue with nothing to signal is better with no icon. Count the inputs to choose.
There is no `Drawer`; use `position="right"`.

### Alert

Inline in the content column beside what it describes; a banner across the top for a
condition that affects the whole session. Five statuses: gray, brand, info, warning,
error, success — `info` is an alias of brand, so the informational alert is brand blue.
Each sets a default icon. The action is a `link-color` button in every status, so the one
interactive element reads the same everywhere. Title, message, action and dismiss are
each optional. Error and warning render `role="alert"`, the rest `role="status"`. A banner
tints edge to edge, closes with a hairline rule, and constrains its content to the page
width. Status tints are ramp steps and do not invert.

### Toast

Bottom-right, 24px from each edge, above everything else — the position is fixed for the
whole product. Eight seconds, with a progress bar at the foot; the countdown pauses while
the pointer is over the stack. Three are visible, newest in front, the rest queue and do
not start ageing until they reach the front. Two link actions is the ceiling. A toast
reports something that already happened; a condition that persists is an inline alert.

### Accordion

Four containers — dividers, one card, item cards, filled — and three indicators: a
rotating chevron (default), plus/minus for a long scannable list, leading chevron only for
nested navigation. Type is fixed in every container: titles H6, supporting text and panel
Body Medium regular, the panel in `color.text.secondary`. Dividers pulls the header flush
at 0 inline padding; the other three inset 16px. Hover tints the row with
`color.surface.hover`; the filled container already sits on that tint, so its hover steps
to `color.neutral.100` — a ramp step that does not invert, flagged rather than annotated
with a name that does not exist. One panel at a time by default; `multiple` for short
comparable panels or a filter set. `defaultOpen` takes an index, a list, or null. The
panel animates height over 220ms. Each header is a button with `aria-expanded` and
`aria-controls`, each panel a region labelled by its header, the indicator decorative;
the focused header takes a 2px inset ring.

### Breadcrumbs

A crumb per level, shallowest first, labelled with the name of the level. Every level but
the last is a link; the last is the current page, so it is plain text carrying
`aria-current="page"`. Chevron by default; the slash is for trails that read as a path.
Past four levels the middle collapses behind a … menu — the first and last crumbs always
survive. Labels truncate at 200px rather than wrapping, and the trail never wraps: lower
`maxItems` for a page that does not fit. No Home crumb; the top-level section comes first.
The whole trail sits in a `nav` labelled Breadcrumb.

### Date pickers

One calendar surface, three ways to ask. `DatePicker` for one date, `DateRangePicker` for a
span picked or presetted on a calendar, `DateRangeFields` when the two ends are known facts
or the column is too narrow for a two-month popover. The calendar renders six week rows
whatever the month, so the panel never changes height, filling the edges with neighbouring
days — muted but selectable; outside `minDate`/`maxDate` is not. Today carries a dot under
its number; the selected day is a brand-filled circle. A single date commits on click. A
range is a draft until **Apply** — Cancel restores what the field held. The field pair is
linked: the end cannot open before the start, and moving the start past the end clears the
end rather than inverting the range. The grid is one tab stop: arrows a day, up/down a
week, Home/End the week's ends, PageUp/PageDown a month, Enter or Space selects, Escape
closes. Typed entry does not exist — raise it before shipping a form where people arrive
with the date in hand. The focus ring is `color.primary.50`, a ramp step, so it does not
invert.

### EmptyState

Four parts every time: an icon, a title naming the emptiness, one line explaining it, and
the action that ends it. Three sizes — sm in a panel, md for a section, lg when the empty
state is the page — with the supporting line at 320, 400 or 480px. An action belongs there
only when the person can end the emptiness; when they cannot, name who can in the
supporting line. Icon colour: gray by default because most emptiness is ordinary, brand
for a first run, error for a failure, warning for something blocked; success is for a
finished queue, not an empty one. The bare state centres itself in whatever space the
parent gives it — use the card variant only when it must hold its own edge. An empty state
stands where content would be; if there are rows and something also went wrong, that is an
alert. `EmptySearch` and `EmptyStateIllustration` are retired.

### FileUpload

A dropzone that owns its list. Five zone states, and drag-over is the only one that tints
the whole zone. Disabled is a lighter step of each part, not an opacity pass. Labelled, the
zone matches Input and Select exactly — label, asterisk, help icon, error line below.
Rows carry queued, uploading, complete, failed and rejected; only the two in-flight states
draw a progress bar. Rejected never left the browser and offers only removal with the
reason; failed can be retried. The list sits under the zone, not inside it, so the zone
holds its height. The accepted-formats line lives inside the zone; the line below it is
the error line. The component uploads nothing — it reports through `onFiles` and renders
what you pass back. Long names truncate.

### Pagination

Four variants in one frame — a hairline border, 12px radius, 16px padding: numbers for
scanning and jumping, the toolbar for a table someone works through, compact for a narrow
column, simple where the total is unknown or not worth the space. Numbers always show the
first page, the last page and the current page's two neighbours, with an ellipsis where
the run breaks, so the row changes width near the ends. Previous and Next are plain text,
not buttons. The toolbar adds a record count, first/last arrows and a jump box that takes
digits and clamps on Enter — Escape abandons, blurring reverts, only Enter commits. Every
arrow carries a tooltip. Changing records per page reports through `onPerPageChange` and
does not move the position. The current chip carries `aria-current="page"`.

Disabled arrow icons take `color.neutral.400`, not `color.text.disabled` — the latter is
neutral 500, one ramp step off the enabled arrows, which read as barely disabled. Enabled
arrow icons sit on `color.text.secondary`, matching the Previous/Next labels beside them.
Disabled label text stays on `color.text.disabled`. Foundations publishes no
icon-disabled semantic token, so the arrow references the ramp directly and does **not**
invert in dark mode. A Foundations gap to raise, not to alias around.

### ProgressSteps

Four marker types — dot, number, featured icon, and the rail with no marker at all — three
text placements and both orientations. Complete is a filled brand circle with a check,
current is a 2px `color.primary.600` ring with a dot, upcoming is a grey ring. The
connector runs between markers only, never a stub before the first or after the last, and
markers are opaque so the line reads continuous. Four steps fit horizontally with text
below, five at a squeeze; past that go vertical or use the rail. Error and disabled are set
per step and override the derived state: an error step turns marker and text error red and
is always clickable, wherever it sits; a disabled step never becomes a button. Upcoming
steps are inert — people go back, not ahead. The list is an `ol` with `aria-current="step"`
and a decorative connector. The current step's title uses a brand text colour Foundations
publishes no name for, flagged rather than annotated with an invented one.

### Registered but not in the sidebar

`ratings`, `utility-buttons`, `verification-code-inputs` and `app-store-buttons` resolve if
linked directly but are not published in the DocSite navigation. Treat them as reference,
not as documented contracts: utility buttons are 28 and 32px, secondary bordered and
tertiary borderless; OTP inputs come in four or six boxes with focus advancing on type.

---

## Before you ship

- Every size, weight, spacing, radius and shadow traces to a token on the scales above.
- No control height pinned against its own padding.
- Every token name in an annotation, diagram or note is one Foundations publishes.
- No `utility.*` or `component-colors.*` in anything a person reads.
- Ramp steps used knowingly: they do not invert in dark mode.
- Inter only, Roboto Mono only for code, no emoji, line icons throughout.
- Table headers 14px Semibold or larger.
- Anything you had to violate is named in your summary, not left for the reader to find.
