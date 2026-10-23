import React from "react";

/** Untitled UI PRO — Background grid check block (internal). Checkerboard grid cell for decor. */
export function BackgroundGridCheckBlock({ filled = false, size = 32, style = {}, ...rest }) {
  return <div aria-hidden="true" style={{ width: size, height: size, background: filled ? "var(--colors-background-bg-secondary)" : "transparent", ...style }} {...rest} />;
}
export default BackgroundGridCheckBlock;
