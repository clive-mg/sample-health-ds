import React from "react";

/** Untitled UI PRO — Divider text (internal). Vertical spacer divider with centered "or" text. */
export function DividerText({ children = "or", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }} {...rest}>
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-quaternary-500)" }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
    </div>
  );
}
export default DividerText;
