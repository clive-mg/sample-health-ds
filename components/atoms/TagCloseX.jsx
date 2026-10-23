import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Tag close X (internal build-block). Dismiss glyph inside a tag. */
export function TagCloseX({ size = "md", onClick, style = {}, ...rest }) {
  return <button type="button" aria-label="Remove" onClick={onClick} style={{ display: "inline-flex", border: "none", background: "transparent", padding: 2, cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", borderRadius: 3, ...style }} {...rest}><Icon name="XClose" size={size === "sm" ? 12 : 14} /></button>;
}
export default TagCloseX;
