import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav menu item (internal). Header mega-menu row: icon tile, title, description. */
export function NavMenuItem({ icon = "Zap", title, description, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", gap: 12, width: "100%", textAlign: "left", padding: 12, border: "none", borderRadius: 8, cursor: "pointer", background: "transparent", fontFamily: "var(--font-body)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")} {...rest}>
      <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 8, background: "var(--colors-background-bg-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-brand-primary-600)" }}><Icon name={icon} size={20} /></span>
      <span><span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</span>{description && <span style={{ display: "block", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</span>}</span>
    </button>
  );
}
export default NavMenuItem;
