import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Calendar view dropdown (internal). Day/Week/Month view switcher trigger. */
export function CalendarViewDropdown({ value = "Month", open = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {value}<Icon name="ChevronDown" size={16} style={{ transform: open ? "rotate(180deg)" : "none" }} />
    </button>
  );
}
export default CalendarViewDropdown;
