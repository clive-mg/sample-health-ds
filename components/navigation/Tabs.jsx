import React from "react";

/**
 * Untitled UI PRO — Tabs. Four types:
 *   line       a hairline rule across the tablist with a 2px indicator on it
 *   button     transparent tabs that lift onto the brand tint when selected
 *   segmented  the button treatment inside one framed group
 *   chip       filter chips on a scrolling row at the md radius, solid brand
 *              when selected — for scoping a result set rather than paging a form
 *
 * Line and button run horizontally or as a vertical rail; segmented and chip
 * are horizontal. Labels are 14/20 at sm and 16/24 at md, regular at rest and
 * semibold once selected — the two weights the scale binds to those sizes.
 * Height is never
 * pinned — it derives from block padding + line height (button, segmented and
 * chip 36/48px, line 40/52px, the extra step making room for the indicator).
 *
 * Colours come from the Foundations layer only — color.surface.*,
 * color.border.*, color.text.* — so every value flips with the theme. Six ramp
 * steps are the exception, and none inverts for dark mode: the line indicator
 * (color.primary.600), the focus halo (color.primary.100), and all four chip
 * fills (color.neutral.100/200 at rest and hover, color.neutral.700/800
 * selected — Foundations publishes no surface token at those steps).
 *
 * Accessibility: a `tablist` of `tab` buttons with `aria-selected` and roving
 * tabindex, so the set is one tab stop. Arrow keys move selection and focus
 * (up/down when vertical), Home and End jump to the ends, and disabled tabs are
 * `aria-disabled` and skipped rather than removed. The focus ring shows on
 * keyboard focus only. Icons are decorative and hidden from assistive tech.
 */

const sp = (k) => `var(--spacing-${k}-px)`;

const Z = {
  sm: { py: "md", px: "lg", railTop: "md", railBottom: "lg", railGap: "lg", chipPx: "xl", chipGap: "md", font: 14, line: "20px" },
  md: { py: "lg", px: "xl", railTop: "lg", railBottom: "xl", railGap: "xl", chipPx: "2xl", chipGap: "lg", font: 16, line: "24px" }
};

/* Chip fills. Foundations publishes no surface token that reads as an unselected
   chip against a white page, and none at the dark end that is not the brand or
   the near-black surface.inverse, so all four take neutral ramp steps directly
   and do NOT invert in dark mode — a Foundations gap, not a licence to
   reintroduce the component-token layer. The selected label takes
   color.text.on.brand: the name is a poor fit on a neutral chip, but it is the
   only published text token that stays light in both themes. */
const CHIP_REST = "var(--colors-gray-light-mode-100)";
const CHIP_HOVER = "var(--colors-gray-light-mode-200)";
const CHIP_ON = "var(--colors-gray-light-mode-700)";
const CHIP_ON_HOVER = "var(--colors-gray-light-mode-800)";
/* A count on a chip. The canvas fill the other types use is 2% off the chip's
   own neutral, so the pill disappears; these step one rung above the chip
   beneath them in every state — including hover, where the chip itself moves to
   neutral.200. */
const CHIP_COUNT_ON = "var(--colors-gray-light-mode-500)";
const CHIP_COUNT_REST = "var(--colors-gray-light-mode-200)";
const CHIP_COUNT_HOVER = "var(--colors-gray-light-mode-300)";

const FOCUS_RING = "0 0 6px 1px var(--colors-brand-100)";
const SHADOW_XS = "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)";
const HAIRLINE_SUBTLE = "1px solid var(--colors-border-border-secondary)";
const HAIRLINE = "1px solid var(--colors-border-border-primary)";

export function Tabs({
  items = [], value, defaultValue, type = "line", orientation = "horizontal",
  size = "sm", id, onChange, style = {}, ...rest
}) {
  const z = Z[size] || Z.sm;
  const line = type === "line";
  const chip = type === "chip";
  const vertical = orientation === "vertical" && type !== "segmented" && !chip;
  const keyOf = (it, i) => it.value ?? (typeof it.label === "string" ? it.label : String(i));

  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && keyOf(items[0], 0)));
  const [hover, setHover] = React.useState(-1);
  const [focus, setFocus] = React.useState(-1);
  const refs = React.useRef([]);
  const active = value !== undefined ? value : internal;
  const select = (v) => { if (value === undefined) setInternal(v); onChange && onChange(v); };

  const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
  const activeIndex = items.findIndex((it, i) => keyOf(it, i) === active);
  /* Exactly one tab is in the page's tab order: the selected one, or the first
     enabled tab when the selection is disabled or missing. */
  const roving = activeIndex >= 0 && !items[activeIndex].disabled ? activeIndex : enabled[0];

  const move = (i) => {
    if (i == null) return;
    select(keyOf(items[i], i));
    const el = refs.current[i];
    if (el) el.focus();
  };
  const onKeyDown = (e) => {
    const fwd = vertical ? "ArrowDown" : "ArrowRight";
    const back = vertical ? "ArrowUp" : "ArrowLeft";
    if (["Home", "End", fwd, back].indexOf(e.key) < 0 || !enabled.length) return;
    e.preventDefault();
    const cur = enabled.indexOf(roving);
    const at = e.key === "Home" ? 0
      : e.key === "End" ? enabled.length - 1
        : e.key === fwd ? (cur + 1) % enabled.length
          : (cur - 1 + enabled.length) % enabled.length;
    move(enabled[at]);
  };

  const list = {
    display: line && !vertical ? "flex" : vertical ? "flex" : "inline-flex",
    flexDirection: vertical ? "column" : "row",
    alignItems: vertical ? "stretch" : "center",
    justifyContent: "flex-start",
    gap: line ? sp(z.railGap) : type === "segmented" ? 0 : chip ? sp(z.chipGap) : sp("xs"),
    width: line && !vertical ? "100%" : undefined
  };
  if (line) Object.assign(list, vertical ? { borderLeft: HAIRLINE_SUBTLE } : { borderBottom: HAIRLINE_SUBTLE });
  /* Chips scroll rather than wrap: a filter row is read left to right and a
     second line buries the tail. The 6px inset is the focus halo's bleed, so
     the ring on the end chips is not clipped by the scroller. */
  if (chip) Object.assign(list, {
    display: "flex", width: "100%", overflowX: "auto", padding: sp("sm"),
    scrollbarWidth: "none", msOverflowStyle: "none"
  });
  if (type === "segmented") Object.assign(list, {
    background: "var(--colors-background-bg-primary)", border: HAIRLINE,
    borderRadius: "var(--radius-md-px)", boxShadow: SHADOW_XS, overflow: "hidden"
  });

  const firstOff = items.findIndex((it, i) => keyOf(it, i) !== active);

  return (
    <div role="tablist" aria-orientation={orientation} data-sh-part="list" onKeyDown={onKeyDown}
      style={{ ...list, ...style }} {...rest}>
      {items.map((it, i) => {
        const v = keyOf(it, i);
        const on = v === active;
        const off = !!it.disabled;
        const hot = hover === i && !on && !off;
        const part = it.part || (on ? "item-on" : i === firstOff ? "item" : undefined);

        const btn = {
          position: "relative", display: "flex", alignItems: "center",
          justifyContent: vertical ? "flex-start" : "center", gap: sp("md"),
          textAlign: vertical ? "left" : "center", whiteSpace: "nowrap",
          fontFamily: "var(--font-body)", fontSize: z.font, fontWeight: on ? 600 : 400, lineHeight: z.line,
          border: "none", background: "transparent", outline: "none",
          cursor: off ? "not-allowed" : "pointer",
          color: off ? "var(--colors-text-text-disabled)"
            : on ? "var(--colors-brand-600)"
              : hot ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-tertiary-600)",
          transition: "background 120ms ease, color 120ms ease, box-shadow 120ms ease",
          boxShadow: focus === i ? FOCUS_RING : "none"
        };

        if (line) {
          Object.assign(btn, vertical
            ? { padding: `${sp(z.py)} ${sp(z.px)}` }
            : { padding: `${sp(z.railTop)} ${sp("xs")} ${sp(z.railBottom)}` });
        } else if (chip) {
          Object.assign(btn, {
            padding: `${sp(z.py)} ${sp(z.chipPx)}`,
            flex: "0 0 auto",
            borderRadius: "var(--radius-md-px)",
            background: off ? "var(--colors-background-bg-disabled)"
              : on ? (hover === i ? CHIP_ON_HOVER : CHIP_ON)
                : hot ? CHIP_HOVER : CHIP_REST,
            color: off ? "var(--colors-text-text-disabled)"
              : on ? "var(--colors-text-text-primary-on-brand)" : "var(--colors-text-text-secondary-700)"
          });
        } else {
          Object.assign(btn, {
            padding: `${sp(z.py)} ${sp(z.px)}`,
            borderRadius: type === "segmented" ? 0 : "var(--radius-md-px)",
            background: off ? "transparent"
              : on ? "var(--colors-background-bg-brand-primary)"
                : hot ? "var(--colors-background-bg-primary-hover)" : "transparent"
          });
          if (type === "segmented" && i < items.length - 1) btn.borderRight = HAIRLINE;
        }

        /* The indicator is its own bar so it can sit on top of the rule; at
           -1px it covers the hairline instead of stacking above it. */
        const indicator = Object.assign(
          { position: "absolute", background: "var(--colors-brand-600)" },
          vertical ? { top: 0, bottom: 0, width: 2, left: -1 } : { left: 0, right: 0, height: 2, bottom: -1 }
        );

        return (
          <button key={v} type="button" role="tab" ref={(el) => { refs.current[i] = el; }}
            id={id ? id + "-tab-" + v : undefined} aria-selected={on} aria-controls={it.controls}
            aria-disabled={off || undefined} tabIndex={i === roving ? 0 : -1}
            data-sh-part={part} style={btn}
            onClick={() => !off && select(v)}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
            onFocus={(e) => {
              let keyed = true;
              try { keyed = e.target.matches(":focus-visible"); } catch (err) { keyed = true; }
              if (keyed && !off) setFocus(i);
            }}
            onBlur={() => setFocus(-1)}>
            {line && on && <span data-sh-part="indicator" style={indicator} />}
            {it.icon && <span aria-hidden="true" data-sh-part={on ? "icon-on" : i === firstOff ? "icon" : undefined}
              style={{ display: "inline-flex", color: "currentColor" }}>{it.icon}</span>}
            {it.label}
            {it.count != null && (
              <span data-sh-part={on ? "count-on" : i === firstOff ? "count" : undefined}
                aria-label={it.countLabel}
                style={{
                  padding: `0 ${sp("md")}`, borderRadius: "var(--radius-full-px)",
                  fontSize: 12, fontWeight: 500, lineHeight: "18px",
                  background: off ? "var(--colors-background-bg-disabled)"
                    : on ? (chip ? CHIP_COUNT_ON : "var(--colors-background-bg-brand-secondary)")
                      : chip ? (hot ? CHIP_COUNT_HOVER : CHIP_COUNT_REST)
                        : "var(--colors-background-bg-secondary)",
                  color: off ? "var(--colors-text-text-disabled)"
                    : on ? (chip ? "var(--colors-text-text-primary-on-brand)" : "var(--colors-brand-600)")
                      : "var(--colors-text-text-secondary-700)"
                }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
export default Tabs;
