import React from "react";

/** Untitled UI PRO — Activity gauge legend (internal). Labeled color keys for a gauge/pie. */
export function ActivityGaugeLegend({ items = [], style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-body)", ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: it.color }} />
          <span style={{ flex: 1, color: "var(--colors-text-text-secondary-700)" }}>{it.label}</span>
          <span style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{it.value}</span>
        </div>
      ))}
    </div>
  );
}
export default ActivityGaugeLegend;
