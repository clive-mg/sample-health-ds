import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Input with addon (internal). Field with a leading label/prefix addon. */
export function InputAddon({ addon = "https://", placeholder = "www.example.com", style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", height: 40, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-primary)", overflow: "hidden", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", background: "var(--colors-background-bg-secondary)", borderRight: "1px solid var(--colors-border-border-primary)", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{addon}</span>
      <input placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 12px", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
    </div>
  );
}
export default InputAddon;
