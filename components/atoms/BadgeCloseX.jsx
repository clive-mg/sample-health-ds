import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Badge close X (internal build-block). Dismiss glyph inside a badge. */
export function BadgeCloseX({ size = "md", onClick, style = {}, ...rest }) {
  const d = size === "sm" ? 12 : 14;
  return <button type="button" aria-label="Remove" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", padding: "var(--spacing-none-px)", cursor: "pointer", color: "currentColor", opacity: 0.7, borderRadius: "var(--radius-xxs-px)", ...style }} {...rest}><Icon name="XClose" size={d} /></button>;
}
export default BadgeCloseX;
