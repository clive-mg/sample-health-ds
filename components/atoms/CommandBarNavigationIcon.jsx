import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Command bar navigation icon (internal). Round nav control in a command bar. */
export function CommandBarNavigationIcon({ icon = "ArrowLeft", onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} style={{ width: 32, height: 32, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}><Icon name={icon} size={20} /></button>;
}
export default CommandBarNavigationIcon;
