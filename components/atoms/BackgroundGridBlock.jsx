import React from "react";

/** Untitled UI PRO — Background grid block (internal). Single filled/empty grid cell for decor grids. */
export function BackgroundGridBlock({ filled = false, size = 48, style = {}, ...rest }) {
  return <div aria-hidden="true" style={{ width: size, height: size, border: "1px solid var(--colors-border-border-secondary)", background: filled ? "var(--colors-background-bg-secondary)" : "transparent", ...style }} {...rest} />;
}
export default BackgroundGridBlock;
