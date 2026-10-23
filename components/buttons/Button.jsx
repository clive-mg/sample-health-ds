import React from "react";

/**
 * Untitled UI PRO — Button
 * Sizes sm/md/lg/xl · hierarchies primary, secondary (gray), tertiary (outlined),
 * link-gray, link-color, and their destructive counterparts.
 * Colours, padding and radius come from tokens only: every padding and gap is a
 * step on the spacing scale (spacing.md 8, lg 12, xl 16, 2xl 20). Height is not
 * pinned — it derives from block padding + line height (sm/md 36, lg/xl 48).
 */

const sp = (k) => `var(--spacing-${k}-px)`;

const SIZES = {
  sm: { py: "md", px: "lg", font: 14, line: "20px" },
  md: { py: "md", px: "xl", font: 14, line: "20px" },
  lg: { py: "lg", px: "xl", font: 16, line: "24px" },
  xl: { py: "lg", px: "2xl", font: 16, line: "24px" },
};

const SKEUO =
  "inset 0px 0px 0px 1px rgba(0,0,0,0.18), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)";

/* Disabled is a colour swap, never an opacity dim. */
const DISABLED_BY_KIND = {
  solid: {
    background: "var(--colors-background-bg-disabled)",
    color: "var(--colors-text-text-disabled)",
    boxShadow: "none",
  },
  outline: {
    background: "var(--colors-base-white)",
    color: "var(--colors-text-text-disabled)",
    boxShadow:
      "inset 0px 0px 0px 1px var(--colors-border-border-disabled-subtle), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)",
  },
  ghost: { background: "transparent", color: "var(--colors-text-text-disabled)", boxShadow: "none" },
  link: { background: "transparent", color: "var(--colors-text-text-disabled)", boxShadow: "none" },
};

const HIERARCHIES = {
  primary: {
    kind: "solid",
    background: "var(--component-colors-components-buttons-primary-button-primary-bg)",
    color: "var(--component-colors-components-buttons-primary-button-primary-fg)",
    boxShadow: SKEUO,
    hoverBg: "var(--colors-background-bg-brand-solid-hover)",
  },
  secondary: {
    kind: "outline",
    background: "var(--component-colors-components-buttons-secondary-button-secondary-bg)",
    color: "var(--component-colors-components-buttons-secondary-button-secondary-fg)",
    boxShadow:
      "inset 0px 0px 0px 1px var(--component-colors-components-buttons-secondary-button-secondary-border), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)",
    hoverBg: "var(--colors-background-bg-secondary)",
  },
  /* Outlined, flat: a 1px neutral.500 ring with neutral.700 body text and no
     resting fill or shadow — that flatness is what separates it from secondary,
     which carries bg.primary plus shadow.xs. The ring uses the neutral ramp
     because Foundations publishes no border token at step 500 (border.primary
     is 300, border.secondary 200), so it does NOT invert in dark mode. */
  tertiary: {
    kind: "outline",
    background: "transparent",
    color: "var(--colors-text-text-secondary-700)",
    boxShadow: "inset 0px 0px 0px 1px var(--colors-gray-light-mode-500)",
    hoverBg: "var(--colors-background-bg-secondary)",
    disabled: {
      background: "transparent",
      color: "var(--colors-text-text-disabled)",
      boxShadow: "inset 0px 0px 0px 1px var(--colors-border-border-disabled-subtle)",
    },
  },
  "link-gray": {
    kind: "link",
    background: "transparent",
    color: "var(--colors-text-text-tertiary-600)",
    hoverFg: "var(--colors-text-text-tertiary-hover)",
    link: true,
  },
  "link-color": {
    kind: "link",
    background: "transparent",
    color: "var(--colors-text-text-brand-tertiary-600)",
    hoverFg: "var(--colors-text-text-brand-secondary-700)",
    link: true,
  },
  "primary-destructive": {
    kind: "solid",
    background: "var(--colors-background-bg-error-solid)",
    color: "var(--colors-base-white)",
    boxShadow: SKEUO,
    hoverBg: "var(--colors-background-bg-error-solid-hover)",
  },
  "secondary-destructive": {
    kind: "outline",
    background: "var(--colors-base-white)",
    color: "var(--component-colors-components-buttons-tertiary-error-button-tertiary-error-fg)",
    boxShadow:
      "inset 0px 0px 0px 1px var(--colors-border-border-error), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)",
    hoverBg: "var(--colors-background-bg-error-primary)",
  },
  "tertiary-destructive": {
    kind: "ghost",
    background: "transparent",
    color: "var(--component-colors-components-buttons-tertiary-error-button-tertiary-error-fg)",
    hoverBg: "var(--colors-background-bg-error-primary)",
  },
  "link-destructive": {
    kind: "link",
    background: "transparent",
    color: "var(--colors-text-text-error-primary-600)",
    hoverFg: "var(--colors-text-text-error-primary-hover)",
    link: true,
  },
};

export function Button({
  size = "md",
  hierarchy = "primary",
  iconLeading = null,
  iconTrailing = null,
  iconOnly = false,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const h = HIERARCHIES[hierarchy] || HIERARCHIES.primary;
  const dis = h.disabled || DISABLED_BY_KIND[h.kind || "solid"];

  const base = {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: sp("xs"),
    boxSizing: "border-box",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: s.line,
    /* Themes can set --sh-button-radius to another radius step (e.g. radius.full for pills). */
    borderRadius: h.link ? 0 : "var(--sh-button-radius, var(--radius-md-px))",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    background: disabled ? dis.background : h.background,
    color: disabled ? dis.color : h.color,
    boxShadow: disabled ? dis.boxShadow : h.link ? "none" : h.boxShadow || "none",
    padding: h.link ? 0 : iconOnly ? sp(s.py) : `${sp(s.py)} ${sp(s.px)}`,
    width: iconOnly && !h.link ? `calc(${s.line} + ${sp(s.py)} * 2)` : undefined,
    transition: "background 120ms ease, box-shadow 120ms ease, color 120ms ease",
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={base}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (h.hoverBg) e.currentTarget.style.background = h.hoverBg;
        if (h.hoverFg) e.currentTarget.style.color = h.hoverFg;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = h.background;
        e.currentTarget.style.color = h.color;
      }}
      {...rest}
    >
      {iconOnly ? (
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: s.line }}>
          {iconLeading || children}
        </span>
      ) : (
        <>
          {iconLeading}
          {children != null && (
            <span style={{ padding: h.link ? 0 : `0 ${sp("xxs")}` }}>{children}</span>
          )}
          {iconTrailing}
        </>
      )}
    </button>
  );
}

export default Button;
