import React from "react";

/** Untitled UI PRO — Content divider (internal). Horizontal rule with optional inline label. */
export function ContentDivider({ label, style = {}, ...rest }) {
  if (!label) return <div style={{ height: 1, background: "var(--colors-border-border-secondary)", width: "100%", ...style }} {...rest} />;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }} {...rest}>
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-quaternary-500)" }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
    </div>
  );
}
export default ContentDivider;
