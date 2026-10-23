import React from "react";

/** Untitled UI PRO — Design system header (internal). Section title banner used in the DS file. */
export function DesignSystemHeader({ title, subtitle, style = {}, ...rest }) {
  return (
    <div style={{ padding: "24px 0", borderBottom: "2px solid var(--colors-border-border-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {subtitle && <div style={{ marginTop: 8, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{subtitle}</div>}
    </div>
  );
}
export default DesignSystemHeader;
