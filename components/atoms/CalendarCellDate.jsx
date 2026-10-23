import React from "react";

/** Untitled UI PRO — Calendar cell date (internal). Bare day number token. */
export function CalendarCellDate({ children, muted = false, style = {}, ...rest }) {
  return <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: muted ? "var(--colors-text-text-quaternary-500)" : "var(--colors-text-text-primary-900)", ...style }} {...rest}>{children}</span>;
}
export default CalendarCellDate;
