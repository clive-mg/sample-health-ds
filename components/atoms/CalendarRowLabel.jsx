import React from "react";

/** Untitled UI PRO — Calendar row label (internal). Left-column time/label for week views. */
export function CalendarRowLabel({ children, style = {}, ...rest }) {
  return <div style={{ height: 56, paddingRight: 12, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>{children}</div>;
}
export default CalendarRowLabel;
