import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Play button (internal). Circular media play control (legacy style). */
export function PlayButton({ size = "md", onClick, style = {}, ...rest }) {
  const d = size === "lg" ? 64 : 48;
  return <button type="button" onClick={onClick} aria-label="Play" style={{ width: d, height: d, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--colors-background-bg-primary)", color: "var(--colors-foreground-fg-brand-primary-600)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)", ...style }} {...rest}><Icon name="Play" size={d * 0.42} /></button>;
}
export default PlayButton;
