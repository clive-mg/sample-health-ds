import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Command bar footer (internal). Hint row at the base of a command palette. */
export function CommandBarFooter({ style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="CornerDownLeft" size={14} /> to select</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>esc to close</span>
    </div>
  );
}
export default CommandBarFooter;
