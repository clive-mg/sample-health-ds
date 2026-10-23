import React from "react";
import { NavMenuItem } from "./NavMenuItem.jsx";

/** Untitled UI PRO — Full-width header navigation sub menu (internal). Mega-menu grid panel. */
export function FullWidthHeaderNavSubMenu({ items = [], columns = 3, style = {}, ...rest }) {
  return (
    <div style={{ padding: 24, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8, ...style }} {...rest}>
      {items.map((it, i) => <NavMenuItem key={i} icon={it.icon} title={it.title} description={it.description} />)}
    </div>
  );
}
export default FullWidthHeaderNavSubMenu;
