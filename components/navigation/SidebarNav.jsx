import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { NAV_THEMES } from "./NavUtilityBar.jsx";

/**
 * Sample Health — Sidebar navigation (vertical).
 *
 * Destinations only. No logo, no search, no account card: the logo and the
 * search live in the top bar, and so does the user. The list takes one of
 * three shapes — a plain list, groups under titles, or groups whose rows can
 * disclose children. Collapsible parents are legal inside a group and nowhere
 * else; a top-level `children` array is ignored.
 *
 * The bar is responsive on its own, and `open` is the user's override of what
 * the breakpoint would do:
 *   desktop ≥1280  open ⇒ 280px panel      closed ⇒ 64px rail   (default open)
 *   tablet 768+    the same two forms, both in flow              (default closed)
 *   mobile <768    open ⇒ drawer + scrim   closed ⇒ nothing      (default closed)
 *
 * Only the mobile form is absolutely positioned, so the app-shell element
 * around the bar and the page MUST be `position: relative`.
 *
 * Spacing scale only (4, 8, 12, 16, 20, 24). Row height derives from block
 * padding + line height: 8 + 20 + 8 = 36px.
 */

const BP = { desktop: 1280, tablet: 768 };
const readViewport = (w) => (w >= BP.desktop ? "desktop" : w >= BP.tablet ? "tablet" : "mobile");

export function SidebarNav({
  theme = "light",
  items,
  groups,
  current,
  onSelect,
  open = true,
  onClose,
  onViewportChange,
  viewport,
  expanded,
  width = 280,
  railWidth = 64,
  part = "panel",
  style = {},
  ...rest
}) {
  const t = NAV_THEMES[theme] || NAV_THEMES.light;
  const [hover, setHover] = React.useState(null);
  const [tip, setTip] = React.useState(null);
  const [ring, setRing] = React.useState(null);
  const [openKeys, setOpenKeys] = React.useState(() => expanded || []);
  const [auto, setAuto] = React.useState(() => (typeof window === "undefined" ? "desktop" : readViewport(window.innerWidth)));
  const report = React.useRef(onViewportChange);
  report.current = onViewportChange;

  React.useEffect(() => {
    if (viewport) return undefined;
    const check = () => setAuto((p) => { const v = readViewport(window.innerWidth); if (v !== p && report.current) report.current(v); return v; });
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [viewport]);
  React.useEffect(() => { if (viewport && report.current) report.current(viewport); }, [viewport]);

  const vp = viewport || auto;
  const blocks = groups || null;
  const flat = blocks ? null : items || [];
  const label = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" };
  const toggleKey = (k) => setOpenKeys((v) => (v.includes(k) ? v.filter((x) => x !== k) : v.concat(k)));

  const Badge = ({ n }) => (
    <span data-sh-part="badge" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 24,
      padding: "0 8px", borderRadius: "var(--radius-full-px)",
      fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 500,
      background: t.badgeBg, color: t.badgeFg
    }}>{n}</span>
  );

  /* `inGroup` is what makes a parent collapsible — a top-level row never discloses. */
  const renderRow = (it, k, inGroup, depth = 0, first = false) => {
    const parent = inGroup && !!it.children && !depth;
    const on = it.label === current;
    const hot = it.state === "hover" || (hover === k && !on);
    const lit = it.state === "focus" || ring === k;
    const isOpen = parent ? openKeys.includes(it.label) : false;
    const p = it.part || (on ? "item-on" : first ? "item" : undefined);
    return (
      <React.Fragment key={k}>
        <button type="button" data-sh-part={p} aria-current={on ? "page" : undefined}
          aria-expanded={parent ? isOpen : undefined}
          onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)}
          onFocus={(e) => { if (e.target.matches(":focus-visible")) setRing(k); }} onBlur={() => setRing(null)}
          onClick={() => { if (parent) toggleKey(it.label); else onSelect && onSelect(it.label); }}
          style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%", border: "none",
            padding: depth ? "8px 12px 8px 44px" : "8px 12px", borderRadius: "var(--radius-md-px)",
            cursor: "pointer", textAlign: "left", ...label, fontWeight: on ? 600 : 400, outline: "none",
            background: on ? t.fillOn : hot ? t.fillHover : "transparent",
            color: on ? t.labelOn : t.label,
            boxShadow: lit ? `0 0 0 4px ${t.ring}` : "none",
            transition: "background 120ms ease, color 120ms ease, box-shadow 120ms ease"
          }}>
          {it.icon && !depth ? (
            <span data-sh-part={on ? "icon-on" : first ? "icon" : undefined} aria-hidden="true"
              style={{ display: "inline-flex", flexShrink: 0, color: on ? t.iconOn : t.icon }}>
              <Icon name={it.icon} size={20} />
            </span>
          ) : null}
          <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
          {it.badge != null ? <Badge n={it.badge} /> : null}
          {parent ? <Icon name="ChevronDown" size={16} aria-hidden="true" data-sh-part={first ? "chevron" : undefined}
            style={{ flexShrink: 0, color: t.icon, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 140ms ease" }} /> : null}
        </button>
        {parent && isOpen ? it.children.map((c, j) => renderRow(c, k + "-" + j, inGroup, depth + 1)) : null}
      </React.Fragment>
    );
  };

  const listBody = (
    <nav aria-label="Primary" data-sh-part="list" className="uui-scroll-slim" style={{
      display: "flex", flexDirection: "column", gap: blocks ? 24 : 0, flex: 1, minHeight: 0,
      overflowY: "auto", overflowX: "hidden", scrollbarWidth: "thin", scrollbarColor: `${t.hairline} transparent`,
      scrollbarGutter: "stable both-edges"
    }}>
      {blocks
        ? blocks.map((b, bi) => (
          <div key={bi} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {b.label ? (
              <div data-sh-part={bi === 0 ? "group-label" : undefined} style={{
                fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 700,
                letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: t.muted,
                padding: "0 12px", marginBottom: 4
              }}>{b.label}</div>
            ) : null}
            {(b.items || []).map((it, i) => renderRow(it, bi + ":" + i, true, 0, bi === 0 && i === 0))}
          </div>
        ))
        : flat.map((it, i) => renderRow(it, "i" + i, false, 0, i === 0))}
    </nav>
  );

  const panel = (extra) => (
    <div data-sh-part={part} style={{
      display: "flex", flexDirection: "column", width: width, flexShrink: 0, alignSelf: "stretch",
      background: t.surface, boxShadow: `inset -1px 0 0 0 ${t.hairline}`,
      padding: "16px", boxSizing: "border-box", ...extra
    }}>{listBody}</div>
  );

  /* The rail keeps every label as an aria-label and a tooltip; group titles,
     which have nowhere to go at 64px, become the dividers between blocks.
     A row with no `icon` has nothing to be at 64px, so the rail skips it.
     The tooltip carries its own text and the button's viewport rect, and is
     rendered fixed at the end: the rail scrolls, and anything absolute inside
     it gets clipped at the rail's 64px edge. */
  const railBtn = (it, k, first) => {
    if (!it.icon) return null;
    const on = it.label === current;
    const live = hover === k && !on;
    const show = (e) => setTip({ k: k, label: it.label, r: e.currentTarget.getBoundingClientRect() });
    const hide = () => setTip((v) => (v && v.k === k ? null : v));
    return (
      <div key={k} style={{ display: "flex" }}>
        <button type="button" aria-label={it.label} aria-current={on ? "page" : undefined}
          data-sh-part={it.part || (on ? "icon-on" : first ? "icon-btn" : undefined)}
          onMouseEnter={(e) => { setHover(k); show(e); }} onMouseLeave={() => { setHover(null); hide(); }}
          onFocus={(e) => { setHover(k); show(e); }} onBlur={() => { setHover(null); hide(); }}
          onClick={() => onSelect && onSelect(it.label)}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40,
            border: "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
            background: on ? t.fillOn : live ? t.fillHover : "transparent",
            color: on ? t.iconOn : t.icon, transition: "background 120ms ease, color 120ms ease"
          }}>
          <Icon name={it.icon} size={20} />
        </button>
      </div>
    );
  };

  const tooltip = tip ? (
    <span role="tooltip" data-sh-part="tip" style={{
      position: "fixed", left: tip.r.right + 8, top: tip.r.top + tip.r.height / 2, transform: "translateY(-50%)",
      zIndex: 60, pointerEvents: "none", whiteSpace: "nowrap", padding: "8px 12px",
      borderRadius: "var(--radius-md-px)",
      background: "var(--colors-background-bg-primary-solid)", color: "var(--colors-text-text-white)",
      ...label, fontWeight: 600,
      boxShadow: "0 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)"
    }}>{tip.label}</span>
  ) : null;

  const rail = (
    <React.Fragment>
    <div data-sh-part="rail" style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: railWidth,
      flexShrink: 0, alignSelf: "stretch", padding: "20px 12px", boxSizing: "border-box",
      background: t.surface, boxShadow: `inset -1px 0 0 0 ${t.hairline}`, overflowY: "auto"
    }}>
      <nav aria-label="Primary" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
        {blocks
          ? blocks.map((b, bi) => (
            <React.Fragment key={bi}>
              {bi > 0 ? <span data-sh-part={bi === 1 ? "divider" : undefined} aria-hidden="true"
                style={{ display: "block", width: 24, height: 1, background: t.hairline, margin: "4px 0" }} /> : null}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {(b.items || []).map((it, i) => railBtn(it, "r" + bi + ":" + i, bi === 0 && i === 0))}
              </div>
            </React.Fragment>
          ))
          : <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {flat.map((it, i) => railBtn(it, "r" + i, i === 0))}
          </div>}
      </nav>
    </div>
    {tooltip}
    </React.Fragment>
  );

  /* Desktop and tablet are the same two forms in flow; only the default differs. */
  if (vp !== "mobile") return <div style={{ display: "flex", alignSelf: "stretch", ...style }} {...rest}>{open ? panel() : rail}</div>;

  return (
    <div style={{ display: "flex", ...style }} {...rest}>
      {open ? (
        <React.Fragment>
          <div data-sh-part="scrim" onClick={onClose} style={{
            position: "absolute", inset: 0, zIndex: 40, background: "var(--colors-background-bg-overlay)", opacity: 0.7
          }} />
          <div data-sh-part="drawer" role="dialog" aria-label="Navigation" style={{
            position: "absolute", top: 0, left: 0, bottom: 0, zIndex: 41, display: "flex",
            boxShadow: "0 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01), 0 8px 8px -4px var(--colors-effects-shadows-shadow-xl-02)"
          }}>
            {panel({ alignSelf: "auto", height: "100%" })}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
export default SidebarNav;
