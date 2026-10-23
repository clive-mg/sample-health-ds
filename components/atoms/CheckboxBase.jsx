import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Checkbox base (internal build-block). The box glyph without label. */
export function CheckboxBase({ size = "md", checked = false, indeterminate = false, onClick, style = {}, ...rest }) {
  const box = size === "sm" ? 16 : 20;
  const on = checked || indeterminate;
  return (
    <span onClick={onClick} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: box, height: box, borderRadius: size === "sm" ? 4 : 6, cursor: "pointer",
      border: on ? "none" : "1px solid var(--colors-border-border-primary)", background: on ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-primary)", color: "#fff", ...style }} {...rest}>
      {indeterminate ? <Icon name="Minus" size={box - 4} /> : checked ? <Icon name="Check" size={box - 4} /> : null}
    </span>
  );
}
export default CheckboxBase;
