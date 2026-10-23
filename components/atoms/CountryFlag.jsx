import React from "react";

/** Untitled UI PRO — Country flag (internal). Circular flag glyph from the icon set. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function CountryFlag({ code = "AU", size = 24, style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", width: size, height: size, borderRadius: "50%", overflow: "hidden", ...style }} {...rest}><Icon name={code} size={size} /></span>;
}
export default CountryFlag;
