import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Header dropdown trigger (internal, icon+label). Header nav button variant. */
export function HeaderDropdownButton({ icon, children, open = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {icon}{children}<Icon name="ChevronDown" size={16} style={{ transform: open ? "rotate(180deg)" : "none", color: "var(--colors-foreground-fg-quaternary-400)" }} />
    </button>
  );
}
export default HeaderDropdownButton;
