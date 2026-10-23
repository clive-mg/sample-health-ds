import React from "react";

/** Untitled UI PRO — Y-axis (internal). Vertical chart axis with tick labels. */
export function YAxis({ labels = [], height = 200, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height, paddingRight: 8, ...style }} {...rest}>
      {labels.map((l, i) => <span key={i} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)", textAlign: "right" }}>{l}</span>)}
    </div>
  );
}
export default YAxis;
