import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Rating star (internal). Single star for rating inputs. */
export function RatingStar({ filled = false, half = false, size = 20, onClick, style = {}, ...rest }) {
  return <span onClick={onClick} style={{ display: "inline-flex", cursor: onClick ? "pointer" : "default", color: filled ? "var(--colors-warning-400)" : "var(--colors-border-border-primary)", ...style }} {...rest}><Icon name="Star01" size={size} /></span>;
}
export default RatingStar;
