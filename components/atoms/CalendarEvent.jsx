import React from "react";

/** Untitled UI PRO — Calendar event (internal). Colored event chip for day/week views. */
export function CalendarEvent({ title, time, color = "brand", style = {}, ...rest }) {
  return (
    <div style={{ padding: "4px 8px", borderRadius: 6, background: `var(--component-colors-utility-${color}-utility-${color}-50)`, borderLeft: `2px solid var(--component-colors-utility-${color}-utility-${color}-500)`, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 12, fontWeight: 600, color: `var(--component-colors-utility-${color}-utility-${color}-700)` }}>{title}</div>
      {time && <div style={{ fontSize: 12, color: `var(--component-colors-utility-${color}-utility-${color}-600)` }}>{time}</div>}
    </div>
  );
}
export default CalendarEvent;
