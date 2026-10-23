import React from "react";

/** Untitled UI PRO — Toggle with text (internal). Toggle + label + supporting text row. */
import { ToggleBase } from "./ToggleBase.jsx";
export function ToggleText({ label, hint, checked = false, onChange, style = {}, ...rest }) {
  const [on, setOn] = React.useState(checked);
  return (
    <label style={{ display: "flex", gap: 12, alignItems: hint ? "flex-start" : "center", cursor: "pointer", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <ToggleBase checked={on} onClick={() => { const v = !on; setOn(v); onChange && onChange(v); }} />
      <span><span style={{ display: "block", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{label}</span>{hint && <span style={{ display: "block", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{hint}</span>}</span>
    </label>
  );
}
export default ToggleText;
