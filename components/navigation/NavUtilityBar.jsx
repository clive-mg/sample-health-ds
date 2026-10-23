import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Sample Health — Nav utility bar (secondary navigation).
 *
 * The thin strip that sits ABOVE a HeaderNav and carries everything that is not
 * product navigation: locale, contact routes, help, and the signed-out auth
 * links. Never put primary destinations here.
 *
 * Every colour is a Foundations token; every padding and gap is a step on the
 * spacing scale (spacing.md 8, lg 12, xl 16, 4xl 32). Height is not pinned — it
 * derives from block padding + line height (8 + 18 + 8 = 34px). Links are
 * style.body.sm.regular (12/18 · 500) — a step below the destination list, so the
 * strip reads as service information rather than a second menu.
 */

/* Shared theme map for all four navigation shells. Three themes:
   light  — semantic surface tokens; flips with data-theme.
   dark   — color.surface.inverse plus the neutral ramp. Ramp steps do not flip,
            which is correct here: an inverse bar is inverse in both themes.
   brand  — color.surface.primary plus the primary ramp, same reasoning. */
export const NAV_THEMES = {
  light: {
    inverse: false,
    surface: "var(--colors-background-bg-primary)",
    utility: "var(--colors-background-bg-secondary)",
    hairline: "var(--colors-border-border-secondary)",
    divider: "var(--colors-gray-light-mode-300)",
    field: "var(--colors-background-bg-primary)",
    fieldLine: "var(--colors-border-border-primary)",
    label: "var(--colors-text-text-secondary-700)",
    labelOn: "var(--colors-text-text-secondary-700)",
    muted: "var(--colors-text-text-tertiary-600)",
    icon: "var(--colors-foreground-fg-quaternary-500)",
    iconOn: "var(--colors-brand-600)",
    fillHover: "var(--colors-background-bg-primary-hover)",
    fillOn: "var(--colors-background-bg-brand-primary)",
    badgeBg: "var(--colors-background-bg-secondary)",
    badgeFg: "var(--colors-text-text-secondary-700)",
    ring: "var(--colors-brand-100)",
    logo: "assets/logo-nav.png"
  },
  dark: {
    inverse: true,
    surface: "var(--colors-background-bg-primary-solid)",
    utility: "var(--colors-gray-light-mode-900)",
    hairline: "var(--colors-gray-light-mode-800)",
    divider: "var(--colors-base-white)",
    field: "var(--colors-gray-light-mode-900)",
    fieldLine: "var(--colors-gray-light-mode-700)",
    label: "var(--colors-gray-light-mode-300)",
    labelOn: "var(--colors-text-text-white)",
    muted: "var(--colors-gray-light-mode-400)",
    icon: "var(--colors-gray-light-mode-400)",
    iconOn: "var(--colors-text-text-white)",
    fillHover: "var(--colors-gray-light-mode-800)",
    fillOn: "var(--colors-gray-light-mode-700)",
    badgeBg: "var(--colors-gray-light-mode-800)",
    badgeFg: "var(--colors-gray-light-mode-300)",
    ring: "var(--colors-gray-light-mode-600)",
    logo: "assets/logo-nav-white.png"
  },
  brand: {
    inverse: true,
    surface: "var(--colors-background-bg-brand-solid)",
    utility: "var(--colors-brand-800)",
    hairline: "var(--colors-brand-700)",
    divider: "var(--colors-base-white)",
    field: "var(--colors-brand-700)",
    fieldLine: "var(--colors-brand-500)",
    label: "var(--colors-text-text-white)",
    labelOn: "var(--colors-text-text-white)",
    muted: "var(--colors-brand-100)",
    icon: "var(--colors-brand-100)",
    iconOn: "var(--colors-text-text-white)",
    fillHover: "var(--colors-brand-700)",
    fillOn: "var(--colors-brand-800)",
    badgeBg: "var(--colors-brand-800)",
    badgeFg: "var(--colors-text-text-white)",
    ring: "var(--colors-brand-300)",
    logo: "assets/logo-nav-white.png"
  }
};

export function NavUtilityBar({
  theme = "light", left = [], right = [], part = "utility",
  inset = 32, style = {}, ...rest
}) {
  const t = NAV_THEMES[theme] || NAV_THEMES.light;
  const fg = t.inverse ? t.label : t.muted;

  const item = (it, i, group) => {
    const Tag = it.href ? "a" : it.onClick || it.menu ? "button" : "span";
    return (
      <Tag key={i} href={it.href} type={Tag === "button" ? "button" : undefined}
        onClick={it.onClick} data-sh-part={it.part || (group === "right" && i === 0 ? "util-item" : undefined)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: 0, border: "none",
          background: "transparent", cursor: it.href || it.onClick || it.menu ? "pointer" : "default",
          fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 500,
          color: fg, textDecoration: "none", whiteSpace: "nowrap"
        }}>
        {it.icon ? <Icon name={it.icon} size={16} aria-hidden="true" /> : null}
        <span>{it.label}</span>
        {it.menu ? <Icon name="ChevronDown" size={16} aria-hidden="true" /> : null}
      </Tag>
    );
  };

  return (
    <div data-sh-part={part} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      padding: `8px ${inset}px`, background: t.utility,
      boxShadow: `inset 0 -1px 0 0 ${t.hairline}`, ...style
    }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0, flex: "0 1 auto", overflow: "hidden" }}>
        {left.map((it, i) => item(it, i, "left"))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto", overflow: "hidden" }}>
        {right.map((it, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <span aria-hidden="true" data-sh-part={i === 1 ? "util-divider" : undefined}
              style={{ width: 1, height: 16, background: t.divider }} /> : null}
            {item(it, i, "right")}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
export default NavUtilityBar;
