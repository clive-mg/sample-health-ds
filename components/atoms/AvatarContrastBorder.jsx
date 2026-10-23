import React from "react";

/** Untitled UI PRO — Avatar contrast border (internal). Overlay ring drawn on top of an avatar. */
export function AvatarContrastBorder({ size = 40, weight = "regular", style = {}, ...rest }) {
  const w = weight === "heavy" ? 2 : weight === "light" ? 0.5 : 1;
  return <span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: `inset 0 0 0 ${w}px var(--component-colors-components-avatars-avatar-contrast-border)`, pointerEvents: "none", ...style }} {...rest} />;
}
export default AvatarContrastBorder;
