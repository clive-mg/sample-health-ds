import React from "react";

/** Untitled UI PRO — Command menu header (internal). Section label inside a command palette. */
export function CommandMenuHeader({ children, style = {}, ...rest }) {
  return <div style={{ padding: "8px 12px 4px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>{children}</div>;
}
export default CommandMenuHeader;
