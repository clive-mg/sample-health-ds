import React from "react";

/** Untitled UI PRO — Background overlay. Dimming scrim, optional blur, for modals & drawers. */
export function BackgroundOverlay({ blur = true, opacity = 0.7, style = {}, ...rest }) {
  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `color-mix(in srgb, var(--colors-background-bg-overlay) ${opacity * 100}%, transparent)`, backdropFilter: blur ? "blur(4px)" : "none", ...style }} {...rest} />;
}
export default BackgroundOverlay;
