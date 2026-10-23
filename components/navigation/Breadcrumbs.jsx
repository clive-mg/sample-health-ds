import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Untitled UI PRO — Breadcrumbs. A trail of plain-text crumbs: every level but
 * the last is a link, the last is the page you are on and carries
 * aria-current="page". Past `maxItems` levels the middle collapses behind a …
 * that opens the hidden crumbs as a menu, so a deep trail keeps its first and
 * last levels — the two that orient you — without wrapping to a second line.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const CRUMB = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" };

export function Breadcrumbs({ items = [], divider = "chevron", maxItems = 4, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  /* First crumb, then the ellipsis, then the tail. Anything in between hides. */
  const collapse = maxItems > 2 && items.length > maxItems;
  const hidden = collapse ? items.slice(1, items.length - (maxItems - 2)) : [];
  const shown = collapse ? [items[0]].concat(items.slice(items.length - (maxItems - 2))) : items;
  const ellipsisAt = collapse ? 1 : -1;

  const Divider = () => (
    <span data-sh-part="divider" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, color: "var(--colors-text-text-tertiary-600)" }}>
      {divider === "slash" ? <span style={{ ...CRUMB, fontWeight: 400 }}>/</span> : <Icon name="ChevronRight" size={16} />}
    </span>
  );

  const crumb = (it, i, current) => {
    const hot = hover === i && !current;
    const shared = { ...CRUMB, display: "inline-flex", alignItems: "center", gap: sp("sm"), maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
    if (current) return (
      <span key={"c" + i} data-sh-part="current" aria-current="page" style={{ ...shared, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{it.icon}{it.label}</span>
    );
    return (
      <a key={"c" + i} data-sh-part="crumb" href={it.href || "#"}
        onClick={(e) => { if (!it.href) e.preventDefault(); if (it.onClick) it.onClick(e); }}
        onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
        style={{ ...shared, fontWeight: 400, textDecoration: "none", borderRadius: "var(--radius-xs-px)", outlineOffset: 2,
          color: hot ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-tertiary-600)" }}>
        {it.icon}{it.label}
      </a>
    );
  };

  return (
    <nav aria-label="Breadcrumb" ref={ref} style={{ display: "flex", alignItems: "center", gap: sp("md"), position: "relative", ...style }} {...rest}>
      {shown.map((it, i) => {
        const last = i === shown.length - 1;
        return (
          <React.Fragment key={i}>
            {crumb(it, i, last)}
            {i === ellipsisAt - 1 && (
              <>
                <Divider />
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <button type="button" data-sh-part="more" aria-label="Show hidden levels" aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, border: "none", borderRadius: "var(--radius-xs-px)", cursor: "pointer",
                      background: open ? "var(--colors-background-bg-active)" : "transparent", color: "var(--colors-text-text-tertiary-600)" }}>
                    <Icon name="DotsHorizontal" size={16} />
                  </button>
                  {open && (
                    <div data-sh-part="menu" style={{ position: "absolute", top: "100%", left: 0, marginTop: sp("xs"), zIndex: 40, minWidth: 180, padding: sp("sm"),
                      display: "flex", flexDirection: "column", gap: sp("xxs"),
                      background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)",
                      boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)" }}>
                      {hidden.map((h, hi) => (
                        <a key={hi} href={h.href || "#"} onClick={(e) => { if (!h.href) e.preventDefault(); if (h.onClick) h.onClick(e); setOpen(false); }}
                          style={{ ...CRUMB, fontWeight: 400, display: "block", padding: `${sp("md")} ${sp("lg")}`, borderRadius: "var(--radius-sm-px)", textDecoration: "none", color: "var(--colors-text-text-secondary-700)", whiteSpace: "nowrap" }}>
                          {h.label}
                        </a>
                      ))}
                    </div>
                  )}
                </span>
              </>
            )}
            {!last && <Divider />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
export default Breadcrumbs;
