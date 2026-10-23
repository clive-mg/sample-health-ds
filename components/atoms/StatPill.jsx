import React from "react";

/** Untitled UI PRO — Stat pill (internal). Small labeled value pill for headers/toolbars. */
export function StatPill({ label, value, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 9999, background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", fontSize: 14, ...style }} {...rest}>
      <span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>
      <b style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{value}</b>
    </span>
  );
}
export default StatPill;
