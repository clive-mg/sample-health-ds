import React from "react";

/** Untitled UI PRO — Setting row (internal). Label + description + trailing control row. */
export function SettingRow({ label, description, control, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "16px 0", borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{label}</div>{description && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}</div>
      {control}
    </div>
  );
}
export default SettingRow;
