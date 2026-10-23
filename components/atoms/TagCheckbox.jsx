import React from "react";
import { CheckboxBase } from "./CheckboxBase.jsx";

/** Untitled UI PRO — Tag checkbox (internal build-block). Selectable bordered chip with checkbox. */
export function TagCheckbox({ children, checked = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", cursor: "pointer", borderRadius: "var(--radius-sm-px)", border: `1px solid ${checked ? "var(--colors-border-border-brand)" : "var(--colors-border-border-primary)"}`, background: checked ? "var(--colors-background-bg-brand-primary)" : "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <CheckboxBase size="sm" checked={checked} />
      {children}
    </button>
  );
}
export default TagCheckbox;
