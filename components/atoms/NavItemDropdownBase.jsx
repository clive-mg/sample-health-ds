import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav item dropdown base (internal). Sidebar row that expands to sub-items. */
export function NavItemDropdownBase({ label, icon, open = false, current = false, children, onToggle, style = {}, ...rest }) {
  return (
    <div style={{ ...style }} {...rest}>
      <button type="button" onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", border: "none", background: current ? "var(--colors-background-bg-active)" : "transparent", cursor: "pointer", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>
        {icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex" }}>{icon}</span>}
        <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
        <Icon name="ChevronDown" size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease", color: "var(--colors-foreground-fg-quaternary-400)" }} />
      </button>
      {open && <div style={{ paddingLeft: 44, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>{children}</div>}
    </div>
  );
}
export default NavItemDropdownBase;
