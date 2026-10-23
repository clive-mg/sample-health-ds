import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav item button (base) (internal). Compact icon-only sidebar rail button. */
export function NavItemButtonBase({ icon = "Home01", current = false, onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} style={{ width: 44, height: 44, borderRadius: 8, border: "none", cursor: "pointer", background: current ? "var(--colors-background-bg-active)" : "transparent", color: current ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}><Icon name={icon} size={24} /></button>;
}
export default NavItemButtonBase;
