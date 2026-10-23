import React from "react";

/** Untitled UI PRO — Activity gauge. Semicircle progress gauge with center value. */
export function ActivityGauge({ value = 68, max = 100, size = 180, label, color = "var(--colors-brand-600)", style = {}, ...rest }) {
  const pct = Math.min(1, Math.max(0, value / max));
  const r = size / 2 - 12;
  const cx = size / 2, cy = size / 2;
  const circ = Math.PI * r; // semicircle length
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", ...style }} {...rest}>
      <svg width={size} height={size / 2 + 12} viewBox={`0 0 ${size} ${size / 2 + 12}`}>
        <path d={`M 12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`} fill="none" stroke="var(--colors-background-bg-tertiary)" strokeWidth="12" strokeLinecap="round" />
        <path d={`M 12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} style={{ transition: "stroke-dashoffset 300ms ease" }} />
      </svg>
      <div style={{ marginTop: -size / 4 - 4, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: size * 0.2, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{Math.round(pct * 100)}%</div>
        {label && <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>}
      </div>
    </div>
  );
}
export default ActivityGauge;
