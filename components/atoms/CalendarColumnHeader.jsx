import React from "react";

/** Untitled UI PRO — Calendar column header (internal). Weekday label cell. */
export function CalendarColumnHeader({ children, style = {}, ...rest }) {
  return <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>{children}</div>;
}
export default CalendarColumnHeader;
