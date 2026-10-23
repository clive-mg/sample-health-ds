import React from "react";

/** Untitled UI PRO — Radar chart. Multi-axis polygon chart. data:[{label,value}] (0..max). */
export function RadarChart({ data = [], max = 100, size = 220, color = "var(--colors-brand-600)", style = {}, ...rest }) {
  const n = data.length || 1;
  const cx = size / 2, cy = size / 2, r = size / 2 - 28;
  const pt = (i, radius) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)]; };
  const rings = [0.25, 0.5, 0.75, 1];
  const poly = data.map((d, i) => pt(i, (Math.min(d.value, max) / max) * r).join(",")).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ ...style, fontFamily: "var(--font-body)" }} {...rest}>
      {rings.map((rr, i) => <polygon key={i} points={data.map((_, j) => pt(j, r * rr).join(",")).join(" ")} fill="none" stroke="var(--colors-border-border-secondary)" />)}
      {data.map((_, i) => { const [x, y] = pt(i, r); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--colors-border-border-secondary)" />; })}
      <polygon points={poly} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      {data.map((d, i) => { const [x, y] = pt(i, r + 14); return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="var(--colors-text-text-tertiary-600)">{d.label}</text>; })}
    </svg>
  );
}
export default RadarChart;
