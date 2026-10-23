import React from "react";

/** Untitled UI PRO — Scroll bar (internal). Thin custom scrollbar track + thumb. */
export function ScrollBar({ progress = 30, height = 200, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", width: 6, height, borderRadius: 9999, background: "var(--colors-background-bg-secondary)", ...style }} {...rest}>
      <div style={{ position: "absolute", top: `${progress}%`, left: 0, width: 6, height: "30%", borderRadius: 9999, background: "var(--colors-background-bg-quaternary)" }} />
    </div>
  );
}
export default ScrollBar;
