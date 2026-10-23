import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Dropdown list item (internal build-block). Menu row with icon, label, check. */
export function DropdownListItem({ icon, children, selected = false, shortcut, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", textAlign: "left", background: selected ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = selected ? "var(--colors-background-bg-active)" : "transparent")} {...rest}>
      {icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}>{icon}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {shortcut && <span style={{ fontSize: 12, color: "var(--colors-text-text-quaternary-500)" }}>{shortcut}</span>}
      {selected && <Icon name="Check" size={16} style={{ color: "var(--colors-foreground-fg-brand-primary-600)" }} />}
    </button>
  );
}
export default DropdownListItem;
