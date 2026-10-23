import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Filter tag (internal). Removable applied-filter chip with label:value. */
export function FilterTag({ field, value, onRemove, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: "var(--radius-sm-px)", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {field && <span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{field}:</span>}<b style={{ fontWeight: 600 }}>{value}</b>
      {onRemove && <button type="button" onClick={onRemove} aria-label="Remove" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex", padding: 0, marginLeft: 2 }}><Icon name="XClose" size={14} /></button>}
    </span>
  );
}
export default FilterTag;
