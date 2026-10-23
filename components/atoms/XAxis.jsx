import React from "react";

/** Untitled UI PRO — X-axis (internal). Horizontal chart axis with tick labels. */
export function XAxis({ labels = [], style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      {labels.map((l, i) => <span key={i} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{l}</span>)}
    </div>
  );
}
export default XAxis;
