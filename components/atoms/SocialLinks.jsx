import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Social button group (marketing) (internal). Row of round social icon links. */
export function SocialLinks({ icons = ["Codepen", "Figma", "Chrome"], dark = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", gap: 12, color: dark ? "var(--colors-brand-200)" : "var(--colors-foreground-fg-quaternary-400)", ...style }} {...rest}>
      {icons.map((ic, i) => <a key={i} href="#" onClick={(e) => e.preventDefault()} style={{ color: "inherit", display: "inline-flex" }}><Icon name={ic} size={22} /></a>)}
    </div>
  );
}
export default SocialLinks;
