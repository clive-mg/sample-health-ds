import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Social button (internal, icon-only). Round social/brand icon button. */
export function SocialIconButton({ icon = "Codepen", onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}><Icon name={icon} size={20} /></button>;
}
export default SocialIconButton;
