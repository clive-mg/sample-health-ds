import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Color select (internal build-block). Selectable color swatch with ring when active. */
export function ColorSelect({ color = "var(--colors-brand-600)", selected = false, onClick, size = 24, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} aria-label="Select color" style={{ width: size, height: size, borderRadius: "50%", border: "none", cursor: "pointer", background: color, boxShadow: selected ? `0 0 0 2px var(--colors-background-bg-primary), 0 0 0 4px ${color}` : "inset 0 0 0 1px rgba(0,0,0,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", ...style }} {...rest}>
      {selected && <Icon name="Check" size={size * 0.55} />}
    </button>
  );
}
export default ColorSelect;
