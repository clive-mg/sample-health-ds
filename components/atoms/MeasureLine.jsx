import React from "react";

/** Untitled UI PRO — Measure line (internal). Spacing/size annotation line with end caps. */
export function MeasureLine({ length = 120, label, vertical = false, style = {}, ...rest }) {
  const color = "var(--colors-foreground-fg-brand-primary-600)";
  if (vertical) return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", height: length, ...style }} {...rest}>
      <span style={{ width: 8, height: 1, background: color }} /><span style={{ flex: 1, width: 1, background: color }} /><span style={{ width: 8, height: 1, background: color }} />
    </div>
  );
  return (
    <div style={{ display: "inline-flex", alignItems: "center", width: length, ...style }} {...rest}>
      <span style={{ height: 8, width: 1, background: color }} /><span style={{ flex: 1, height: 1, background: color }} /><span style={{ height: 8, width: 1, background: color }} />
      {label && <span style={{ position: "absolute", fontFamily: "var(--font-mono)", fontSize: 12, color }}>{label}</span>}
    </div>
  );
}
export default MeasureLine;
