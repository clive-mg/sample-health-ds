import React from "react";

/** Untitled UI PRO — Calendar cell (month view) (internal). Month-grid day cell with events. */
export function CalendarCellMonth({ day, muted = false, today = false, children, onClick, style = {}, ...rest }) {
  return (
    <div onClick={onClick} style={{ minHeight: 96, padding: 8, borderBottom: "1px solid var(--colors-border-border-secondary)", borderRight: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", cursor: onClick ? "pointer" : "default", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", fontSize: 14, fontWeight: today ? 700 : 500, background: today ? "var(--colors-background-bg-brand-solid)" : "transparent", color: today ? "#fff" : muted ? "var(--colors-text-text-quaternary-500)" : "var(--colors-text-text-primary-900)" }}>{day}</div>
      <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>{children}</div>
    </div>
  );
}
export default CalendarCellMonth;
