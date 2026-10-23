import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Check icon. Circular check badge in light/outline/dark themes & colors. */
const SZ = { sm: 24, md: 28, lg: 32 };
export function CheckIcon({ size = "md", color = "success", theme = "light", style = {}, ...rest }) {
  const d = SZ[size] || 28;
  const light = theme === "light", dark = theme === "dark";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: d, height: d, borderRadius: "50%", flexShrink: 0,
      background: dark ? `var(--component-colors-utility-${color}-utility-${color}-600)` : light ? `var(--component-colors-utility-${color}-utility-${color}-100)` : "transparent",
      border: theme === "outline" ? `1px solid var(--component-colors-utility-${color}-utility-${color}-200)` : "none",
      color: dark ? "#fff" : `var(--component-colors-utility-${color}-utility-${color}-600)`, ...style }} {...rest}>
      <Icon name="Check" size={d * 0.6} />
    </span>
  );
}
export default CheckIcon;
