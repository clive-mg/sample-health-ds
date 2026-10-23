import React from "react";

/** Untitled UI PRO — Blur card (internal). Frosted-glass surface panel. */
export function BlurCard({ children, style = {}, ...rest }) {
  return <div style={{ padding: 24, borderRadius: "var(--radius-2xl-px)", background: "var(--component-colors-alpha-alpha-white-70, rgba(255,255,255,0.7))", backdropFilter: "blur(16px)", border: "1px solid var(--colors-border-border-secondary-alt)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", ...style }} {...rest}>{children}</div>;
}
export default BlurCard;
