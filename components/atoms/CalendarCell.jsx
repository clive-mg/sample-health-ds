import React from "react";

/** Untitled UI PRO — Calendar cell (internal build-block). Single day cell with states. */
export function CalendarCell({ day, selected = false, today = false, muted = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ width: 40, height: 40, border: "none", borderRadius: "50%", cursor: "pointer", background: selected ? "var(--colors-background-bg-brand-solid)" : today ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: today ? 700 : 500, color: selected ? "#fff" : muted ? "var(--colors-text-text-quaternary-500)" : "var(--colors-text-text-primary-900)", ...style }} {...rest}>{day}</button>
  );
}
export default CalendarCell;
