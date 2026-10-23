import React from "react";

/** Untitled UI PRO — Donut / pie chart. data:[{label,value,color}]. */
const PALETTE = ["var(--colors-brand-600)", "var(--colors-blue-500)", "var(--colors-cyan-500)", "var(--colors-pink-500)", "var(--colors-warning-500)", "var(--colors-gray-light-mode-300)"];
export function PieChart({ data = [], size = 180, donut = true, style = {}, ...rest }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2, cx = r, cy = r, inner = donut ? r * 0.6 : 0;
  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const a0 = angle, a1 = angle + (d.value / total) * Math.PI * 2;
    angle = a1;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return { d: `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`, color: d.color || PALETTE[i % PALETTE.length] };
  });
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 20, ...style }} {...rest}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
        {donut && <circle cx={cx} cy={cy} r={inner} fill="var(--colors-background-bg-primary)" />}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color || PALETTE[i % PALETTE.length] }} />
            {d.label} <span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PieChart;
