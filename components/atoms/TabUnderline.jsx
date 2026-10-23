import React from "react";

/** Untitled UI PRO — Tab underline (internal). Animated active-tab underline indicator. */
export function TabUnderline({ width = 64, offset = 0, style = {}, ...rest }) {
  return <span style={{ display: "block", height: 2, width, marginLeft: offset, background: "var(--colors-foreground-fg-brand-primary-600)", borderRadius: 2, transition: "margin-left 200ms ease, width 200ms ease", ...style }} {...rest} />;
}
export default TabUnderline;
