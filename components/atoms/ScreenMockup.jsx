import React from "react";

/** Untitled UI PRO — Screen mockup (internal). Generic device screen frame with border. */
export function ScreenMockup({ children, style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "6px solid var(--component-colors-components-mockups-screen-mockup-border)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", ...style }} {...rest}>{children}</div>
  );
}
export default ScreenMockup;
