import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Cursor (internal). Collaborative cursor pointer with name label. */
export function Cursor({ name = "Olivia", color = "var(--colors-brand-600)", style = {}, ...rest }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }} {...rest}>
      <Icon name="Cursor01" size={20} style={{ color }} />
      {name && <span style={{ position: "absolute", top: 16, left: 14, padding: "2px 8px", borderRadius: 6, background: color, color: "#fff", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{name}</span>}
    </span>
  );
}
export default Cursor;
