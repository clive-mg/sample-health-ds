import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Check item text (internal). Checklist row: check icon + text. */
export function CheckItemText({ children, color = "brand", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <span style={{ color: `var(--component-colors-utility-${color}-utility-${color}-600)`, display: "inline-flex", flexShrink: 0 }}><Icon name="CheckCircle" size={24} /></span>{children}
    </div>
  );
}
export default CheckItemText;
