import React from "react";

const sp = (k) => `var(--spacing-${k}-px)`;

/**
 * Untitled UI PRO — Badge. sizes sm/md/lg · types color / pill-color / modern ·
 * 13 colors (gray, brand, error, warning, success, + utility hues), with an
 * optional trailing count.
 * Every padding and gap is a step on the spacing scale, and each size takes the
 * weight its type size is bound to (12px → 500, 14px → 600). Height is not
 * pinned — it derives from block padding + line height (sm 22, md 24, lg 28).
 */
const SIZES = {
  sm: { py: "xxs", px: "md", font: 12, line: "18px", weight: 500, gap: "xs", dot: 6, icon: 12 },
  md: { py: "xxs", px: "lg", font: 14, line: "20px", weight: 600, gap: "sm", dot: 8, icon: 12 },
  lg: { py: "xs", px: "lg", font: 14, line: "20px", weight: 600, gap: "sm", dot: 8, icon: 12 },
};

/* Colours come from the Foundations ramps: color.primary is --colors-brand-*,
   color.neutral is --colors-gray-light-mode-*, the rest carry their own name. */
const RAMP = { brand: "brand", gray: "gray-light-mode" };
const ramp = (color, step) => `var(--colors-${RAMP[color] || color}-${step})`;

function palette(color) {
  /* "white" is a colour like any other: a white fill, a neutral hairline and a
     neutral label, so it can be picked wherever a tinted chip would clash. It
     is the one colour built from semantic tokens, so it follows the theme. */
  if (color === "white")
    return { bg: "var(--colors-background-bg-primary)", fg: "var(--colors-text-text-secondary-700)", bd: "var(--colors-border-border-primary)", dot: ramp("gray", "500"), cnt: ramp("gray", "100") };
  return { bg: ramp(color, "50"), fg: ramp(color, "700"), bd: ramp(color, "200"), dot: ramp(color, "500"), cnt: ramp(color, "100") };
}

export function Badge({ size = "md", color = "gray", type = "color", children, dot = false, count = null, iconLeading = null, iconTrailing = null, style = {}, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const p = palette(color);
  const modern = type === "modern";
  const pill = type === "pill-color" || type === "pill";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: sp(s.gap),
      padding: `${sp(s.py)} ${sp(s.px)}`, boxSizing: "border-box",
      fontFamily: "var(--font-body)", fontWeight: s.weight, fontSize: s.font, lineHeight: s.line,
      borderRadius: pill ? "var(--sh-badge-radius, var(--radius-full-px))" : "var(--sh-badge-radius, var(--radius-sm-px))",
      background: modern ? "var(--colors-background-bg-primary)" : p.bg,
      color: modern ? "var(--colors-text-text-secondary-700)" : p.fg,
      border: modern ? "1px solid var(--colors-border-border-primary)" : `1px solid ${p.bd}`,
      boxShadow: modern ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" : "none",
      whiteSpace: "nowrap",
      ...style,
    }} {...rest}>
      {dot && <span data-sh-part="dot" style={{ width: s.dot, height: s.dot, borderRadius: "var(--radius-full-px)", background: modern ? p.dot : "currentColor", flexShrink: 0 }} />}
      {iconLeading}
      {children}
      {count != null && <span data-sh-part="count" style={{
        display: "inline-flex", alignItems: "center", flexShrink: 0,
        padding: `${sp("none")} ${sp("xs")}`,
        borderRadius: "var(--radius-xs-px)",
        background: modern ? ramp("gray", "100") : p.cnt,
      }}>{count}</span>}
      {iconTrailing}
    </span>
  );
}
export default Badge;
