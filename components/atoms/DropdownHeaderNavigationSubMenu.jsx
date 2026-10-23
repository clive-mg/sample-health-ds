import React from "react";
import { NavMenuItem } from "./NavMenuItem.jsx";

/** Untitled UI PRO — Dropdown header navigation sub menu (internal). Floating menu panel of nav items. */
export function DropdownHeaderNavigationSubMenu({ items = [], style = {}, ...rest }) {
  return (
    <div style={{ padding: 8, minWidth: 280, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", display: "flex", flexDirection: "column", gap: 2, ...style }} {...rest}>
      {items.map((it, i) => <NavMenuItem key={i} icon={it.icon} title={it.title} description={it.description} />)}
    </div>
  );
}
export default DropdownHeaderNavigationSubMenu;
