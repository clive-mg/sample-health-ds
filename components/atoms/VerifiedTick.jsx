import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Verified tick (internal). Small brand verification badge. */
export function VerifiedTick({ size = 20, color = "brand", style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", color: `var(--component-colors-utility-${color}-utility-${color}-600)`, ...style }} {...rest}><Icon name="CheckVerified01" size={size} /></span>;
}
export default VerifiedTick;
