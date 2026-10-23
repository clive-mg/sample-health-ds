import React from "react";

/** Untitled UI PRO — Command bar menu section (internal). Titled group wrapper in a command bar. */
export function CommandBarMenuSection({ title, children, style = {}, ...rest }) {
  return (
    <div style={{ padding: 4, ...style }} {...rest}>
      {title && <div style={{ padding: "8px 12px 4px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--colors-text-text-quaternary-500)" }}>{title}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</div>
    </div>
  );
}
export default CommandBarMenuSection;
