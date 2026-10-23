import React from "react";

/** Untitled UI PRO — Bar chart. Simple SVG column chart. data:[{label,value}]. */
export function BarChart({ data = [], height = 200, color = "var(--colors-brand-600)", style = {}, ...rest }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height, padding: "0 4px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 8, height: "100%" }}>
            <div style={{ width: "100%", maxWidth: 40, height: `${(d.value / max) * 100}%`, background: color, borderRadius: "6px 6px 0 0", transition: "height 240ms ease" }} title={`${d.value}`} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, padding: "8px 4px 0", borderTop: "1px solid var(--colors-border-border-secondary)" }}>
        {data.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{d.label}</div>)}
      </div>
    </div>
  );
}
export default BarChart;
