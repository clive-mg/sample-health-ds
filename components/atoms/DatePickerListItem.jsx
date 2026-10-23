import React from "react";

/** Untitled UI PRO — Date picker list item (internal). Preset range row (Today, Last 7 days…).
    Selected reads as a brand-tinted row with brand text, not a trailing check. */
export function DatePickerListItem({ children, selected = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 12px", border: "none", borderRadius: "var(--radius-sm-px)", cursor: "pointer", background: selected ? "var(--colors-background-bg-brand-primary)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: selected ? 600 : 400, color: selected ? "var(--colors-text-text-brand-secondary-700)" : "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {children}
    </button>
  );
}
export default DatePickerListItem;
