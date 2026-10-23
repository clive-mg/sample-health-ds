import React from "react";

/** Untitled UI PRO — Country (internal). Flag glyph + country name row for selectors. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function Country({ code = "AU", name = "Australia", style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <Icon name={code} size={20} style={{ borderRadius: "50%", overflow: "hidden" }} />{name}
    </span>
  );
}
export default Country;
