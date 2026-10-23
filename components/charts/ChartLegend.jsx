import React from "react";

/** Untitled UI PRO — Chart legend. Row/column of colored keys with labels. */
const PALETTE = ["var(--colors-brand-600)", "var(--colors-blue-500)", "var(--colors-cyan-500)", "var(--colors-pink-500)", "var(--colors-warning-500)"];
export function ChartLegend({ items = [], orientation = "horizontal", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: orientation === "vertical" ? "column" : "row", gap: orientation === "vertical" ? 8 : 20, flexWrap: "wrap", ...style }} {...rest}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: it.color || PALETTE[i % PALETTE.length] }} />
          {it.label}{it.value != null && <span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{it.value}</span>}
        </span>
      ))}
    </div>
  );
}
export default ChartLegend;
