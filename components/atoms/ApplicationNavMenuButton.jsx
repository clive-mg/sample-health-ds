import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Application nav menu button (internal). Collapsible sidebar section toggle. */
export function ApplicationNavMenuButton({ label, open = false, icon, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex" }}>{icon}</span>}
      <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
      <Icon name="ChevronDown" size={20} style={{ color: "var(--colors-foreground-fg-quaternary-400)", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }} />
    </button>
  );
}
export default ApplicationNavMenuButton;
