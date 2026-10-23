import React from "react";

/** Untitled UI PRO — Color picker (internal). Grid of selectable color swatches. */
import { ColorSelect } from "./ColorSelect.jsx";
export function ColorPicker({ colors = ["var(--colors-brand-600)", "var(--colors-blue-500)", "var(--colors-success-500)", "var(--colors-warning-500)", "var(--colors-error-500)", "var(--colors-pink-500)"], value, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(colors[0]);
  const active = value != null ? value : internal;
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", ...style }} {...rest}>
      {colors.map((c) => <ColorSelect key={c} color={c} selected={c === active} onClick={() => { if (value == null) setInternal(c); onChange && onChange(c); }} />)}
    </div>
  );
}
export default ColorPicker;
