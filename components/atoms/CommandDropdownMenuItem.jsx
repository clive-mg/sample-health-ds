import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Command dropdown menu item (internal). Result row for a command palette. */
export function CommandDropdownMenuItem({ icon, children, shortcut, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", border: "none", borderRadius: 8, cursor: "pointer", textAlign: "left", background: active ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = active ? "var(--colors-background-bg-active)" : "transparent")} {...rest}>
      {icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}>{icon}</span>}
      <span style={{ flex: 1 }}>{children}</span>
      {shortcut && <span style={{ fontSize: 12, color: "var(--colors-text-text-quaternary-500)" }}>{shortcut}</span>}
    </button>
  );
}
export default CommandDropdownMenuItem;
