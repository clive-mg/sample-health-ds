import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Avatar } from "../data-display/Avatar.jsx";
import { NAV_THEMES } from "./NavUtilityBar.jsx";

/**
 * Sample Health — Sidebar rail (collapsed vertical navigation).
 *
 * The 64px icon-only form of SidebarNav. Two uses: on its own, as a permanent
 * collapsed rail that gives the page back 216px; or with `panel`, as the rail
 * plus a second column listing the current section's children — the shape for
 * products deep enough that one flat list will not hold them.
 *
 * Labels are never dropped, only hidden: each button keeps an aria-label and
 * shows a tooltip on hover and on keyboard focus.
 */
export function SidebarRail({
  theme = "light",
  items = [],
  current,
  onSelect,
  logoSrc,
  footer = [],
  account,
  panel,
  panelCurrent,
  width = 64,
  part = "rail",
  style = {},
  ...rest
}) {
  const t = NAV_THEMES[theme] || NAV_THEMES.light;
  const [hot, setHot] = React.useState(null);
  const label = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" };

  const Btn = ({ it, i, group }) => {
    const on = it.label === current;
    const key = group + i;
    const live = hot === key && !on;
    const p = it.part || (on ? "icon-on" : group === "n" && i === 0 ? "icon-btn" : undefined);
    return (
      <div style={{ position: "relative", display: "flex" }}>
        <button type="button" aria-label={it.label} aria-current={on ? "page" : undefined} data-sh-part={p}
          onMouseEnter={() => setHot(key)} onMouseLeave={() => setHot(null)}
          onFocus={() => setHot(key)} onBlur={() => setHot(null)}
          onClick={() => onSelect && onSelect(it.label)}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40,
            border: "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
            background: on ? t.fillOn : live ? t.fillHover : "transparent",
            color: on ? t.iconOn : t.icon, transition: "background 120ms ease, color 120ms ease"
          }}>
          <Icon name={it.icon} size={20} />
        </button>
        {hot === key ? (
          <span role="tooltip" data-sh-part={group === "n" && i === 0 ? "tip" : undefined} style={{
            position: "absolute", left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)",
            zIndex: 20, whiteSpace: "nowrap", padding: "8px 12px", borderRadius: "var(--radius-md-px)",
            background: "var(--colors-background-bg-primary-solid)", color: "var(--colors-text-text-white)",
            ...label, fontWeight: 600,
            boxShadow: "0 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)"
          }}>{it.label}</span>
        ) : null}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", alignSelf: "stretch", ...style }} {...rest}>
      <div data-sh-part={part} style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: width, flexShrink: 0,
        padding: "20px 12px", boxSizing: "border-box", background: t.surface,
        boxShadow: `inset -1px 0 0 0 ${t.hairline}`
      }}>
        <img data-sh-part="mark" src={logoSrc || (t.inverse ? "assets/logo-nav-mark-white.png" : "assets/logo-nav-mark.png")} alt="Sample Health"
          style={{ width: 32, height: "auto", display: "block" }} />
        <nav aria-label="Primary" style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {items.map((it, i) => <Btn key={i} it={it} i={i} group="n" />)}
        </nav>
        {footer.map((it, i) => <Btn key={i} it={it} i={i} group="f" />)}
        {account ? <Avatar size="sm" src={account.src} initials={account.initials} /> : null}
      </div>

      {panel ? (
        <div data-sh-part="sub" style={{
          display: "flex", flexDirection: "column", gap: 4, width: 236, flexShrink: 0,
          padding: "20px 16px", boxSizing: "border-box", background: t.surface,
          boxShadow: `inset -1px 0 0 0 ${t.hairline}`
        }}>
          <div data-sh-part="sub-title" style={{
            fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "20px", fontWeight: 600,
            color: t.labelOn, padding: "0 12px", marginBottom: 16
          }}>{panel.title}</div>
          {(panel.items || []).map((s, i) => {
            const on = s.label === panelCurrent;
            const live = hot === "p" + i && !on;
            return (
              <button key={i} type="button" aria-current={on ? "page" : undefined}
                data-sh-part={on ? "sub-on" : i === 0 ? "sub-item" : undefined}
                onMouseEnter={() => setHot("p" + i)} onMouseLeave={() => setHot(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, width: "100%", border: "none",
                  padding: "8px 12px", borderRadius: "var(--radius-md-px)", cursor: "pointer", textAlign: "left",
                  ...label, fontWeight: on ? 600 : 400,
                  background: on ? t.fillOn : live ? t.fillHover : "transparent",
                  color: on ? t.labelOn : t.label
                }}>
                <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                {s.badge != null ? (
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 24,
                    padding: "0 8px", borderRadius: "var(--radius-full-px)", fontFamily: "var(--font-body)",
                    fontSize: 12, lineHeight: "18px", fontWeight: 500, background: t.badgeBg, color: t.badgeFg
                  }}>{s.badge}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
export default SidebarRail;
