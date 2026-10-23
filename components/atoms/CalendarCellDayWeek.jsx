import React from "react";

/** Untitled UI PRO — Calendar cell (day/week view) (internal). Time-grid slot, optionally selected. */
export function CalendarCellDayWeek({ selected = false, children, onClick, style = {}, ...rest }) {
  return <div onClick={onClick} style={{ minHeight: 56, padding: 4, borderBottom: "1px solid var(--colors-border-border-secondary)", borderRight: "1px solid var(--colors-border-border-secondary)", background: selected ? "var(--colors-background-bg-brand-primary)" : "transparent", cursor: onClick ? "pointer" : "default", ...style }} {...rest}>{children}</div>;
}
export default CalendarCellDayWeek;
