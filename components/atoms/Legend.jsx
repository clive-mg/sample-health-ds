import React from "react";

/** Untitled UI PRO — Legend (internal). Single legend key: swatch + label. */
export function Legend({ color = "var(--colors-brand-600)", label, value, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />{label}{value != null && <span style={{ color: "var(--colors-text-text-tertiary-600)", marginLeft: 4 }}>{value}</span>}
    </span>
  );
}
export default Legend;
