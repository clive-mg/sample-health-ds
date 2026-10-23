import React from "react";

/** Untitled UI PRO — Calendar time marker (internal). "Now" line across the day/week grid. */
export function CalendarTimeMarker({ label = "now", style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", ...style }} {...rest}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--colors-error-500)", flexShrink: 0 }} />
      <span style={{ flex: 1, height: 2, background: "var(--colors-error-500)" }} />
    </div>
  );
}
export default CalendarTimeMarker;
