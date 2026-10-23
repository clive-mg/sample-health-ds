import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Dropdown header navigation button (internal). Icon-only header nav control. */
export function DropdownHeaderNavigationButton({ icon = "SearchLg", open = false, onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} style={{ width: 40, height: 40, borderRadius: 8, border: "none", cursor: "pointer", background: open ? "var(--colors-background-bg-active)" : "transparent", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}><Icon name={icon} size={20} /></button>;
}
export default DropdownHeaderNavigationButton;
