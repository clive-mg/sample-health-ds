import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Variables icon (internal). Small token/variable glyph chip. */
export function VariablesIcon({ single = false, size = 20, style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size + 8, height: size + 8, borderRadius: 6, background: "var(--colors-background-bg-secondary)", color: "var(--colors-foreground-fg-brand-primary-600)", ...style }} {...rest}><Icon name={single ? "Circle" : "Colors"} size={size} /></span>;
}
export default VariablesIcon;
