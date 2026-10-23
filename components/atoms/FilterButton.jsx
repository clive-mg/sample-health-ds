import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Filter dropdown button (internal). Filter chip with count badge. */
export function FilterButton({ label = "Filters", count, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", border: "1px solid var(--colors-border-border-primary)", background: active ? "var(--colors-background-bg-active)" : "var(--colors-background-bg-primary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <Icon name="FilterLines" size={20} />{label}{count != null && <span style={{ padding: "0 6px", borderRadius: 9999, background: "var(--colors-background-bg-secondary)", fontSize: 12 }}>{count}</span>}
    </button>
  );
}
export default FilterButton;
