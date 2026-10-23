import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Sample Health — Step marker. The circular status marker used by ProgressSteps.
 *
 * Three marker types: a dot, a number, or a featured icon chip. Five states:
 * complete, current, upcoming, error and disabled. The marker is 32px, and 48px
 * for the featured chip.
 *
 * Featured chips take their fill from a Foundations ramp step (50 fill, 600
 * glyph) exactly as FeaturedIcon does; ramp variables don't invert for dark
 * mode, so the chip keeps its light-mode value on a dark surface.
 */
const D = 32;
const FD = 48;
const GLYPH = 18;
const FGLYPH = 24;
const NUM = { size: 14, weight: 600 };
const RAMP = { complete: "brand", current: "brand", upcoming: "gray-light-mode", error: "error", disabled: "gray-light-mode" };
const RING = {
  current: "var(--colors-brand-600)",
  upcoming: "var(--colors-border-border-primary)",
  error: "var(--colors-border-border-error)",
  disabled: "var(--colors-border-border-disabled)"
};
const DOT = {
  current: "var(--colors-background-bg-brand-solid)",
  upcoming: "var(--colors-foreground-fg-quaternary-400)",
  error: "var(--colors-error-600)",
  disabled: "var(--colors-foreground-fg-disabled)"
};
const NUM_FG = {
  current: "var(--colors-text-text-brand-secondary-700)",
  upcoming: "var(--colors-text-text-quaternary-500)",
  error: "var(--colors-text-text-error-primary-600)",
  disabled: "var(--colors-text-text-disabled)"
};

export function StepIcon({ status = "current", marker = "dot", index = 1, icon = null, hovered = false, focused = false, style = {}, ...rest }) {
  const featured = marker === "featured";
  const d = featured ? FD : D;
  const complete = status === "complete";
  const error = status === "error";
  const ramp = RAMP[status] || RAMP.upcoming;

  let bg = "var(--colors-background-bg-primary)";
  let border = "none";
  let fg = NUM_FG[status] || NUM_FG.upcoming;

  if (featured) {
    bg = "var(--colors-" + ramp + "-50)";
    fg = "var(--colors-" + ramp + "-600)";
    if (ramp === "gray-light-mode") border = "1px solid var(--colors-border-border-primary)";
  } else if (complete) {
    bg = "var(--colors-background-bg-brand-solid)";
    fg = "var(--colors-text-text-primary-on-brand)";
  } else {
    border = "2px solid " + (RING[status] || RING.upcoming);
    if (status === "disabled") bg = "var(--colors-background-bg-disabled)";
  }

  const glyph = featured ? FGLYPH : GLYPH;
  const num = NUM;
  let content = null;
  if (error) content = <Icon name="AlertCircle" size={glyph} />;
  else if (icon) content = React.isValidElement(icon) ? React.cloneElement(icon, { size: glyph }) : icon;
  else if (complete || featured) content = <Icon name="Check" size={glyph} />;
  else if (marker === "number") content = <span style={{ fontFamily: "var(--font-body)", fontSize: num.size, fontWeight: num.weight, lineHeight: 1 }}>{index}</span>;
  else content = <span style={{ width: Math.round(d / 3), height: Math.round(d / 3), borderRadius: "var(--radius-full-px)", background: DOT[status] || DOT.upcoming }} />;

  const shadow = focused
    ? "0px 0px 0px 4px var(--colors-effects-focus-rings-focus-ring)"
    : hovered
    ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01), 0px 1px 3px 0px var(--colors-effects-shadows-shadow-sm-02)"
    : "none";

  return (
    <span data-sh-part="marker" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      width: d, height: d, borderRadius: "var(--radius-full-px)", boxSizing: "border-box",
      background: bg, border, color: fg, boxShadow: shadow,
      transform: hovered ? "translateY(-1px)" : "none",
      transition: "transform 120ms ease-out, box-shadow 120ms ease-out",
      ...style
    }} {...rest}>{content}</span>
  );
}
export default StepIcon;
