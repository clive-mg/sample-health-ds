import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav menu button (internal). Top-nav trigger with chevron for dropdowns. */
export function NavMenuButton({ children, open = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: open ? "var(--colors-text-text-primary-900)" : "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {children}<Icon name="ChevronDown" size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease", color: "var(--colors-foreground-fg-quaternary-400)" }} />
    </button>
  );
}
export default NavMenuButton;
