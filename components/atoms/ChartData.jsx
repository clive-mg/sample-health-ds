import React from "react";

/** Untitled UI PRO — Chart data (internal). Bar/line datum wrapper feeding chart primitives. */
export function ChartData({ label, value, color = "var(--colors-brand-600)", max = 100, style = {}, ...rest }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ width: 80, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>
      <span style={{ flex: 1, height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)" }}><span style={{ display: "block", width: `${pct}%`, height: "100%", borderRadius: 9999, background: color }} /></span>
      <span style={{ width: 44, textAlign: "right", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{value}</span>
    </div>
  );
}
export default ChartData;
