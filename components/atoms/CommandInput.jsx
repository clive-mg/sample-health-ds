import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Command input (internal). Search field row for a command menu. */
export function CommandInput({ placeholder = "Search…", value, onChange, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      <Icon name="SearchLg" size={20} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />
      <input value={value} onChange={onChange} placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
    </div>
  );
}
export default CommandInput;
