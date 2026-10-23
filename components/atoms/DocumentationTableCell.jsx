import React from "react";

/** Untitled UI PRO — Documentation table cell (internal). Prop/type/description cell for API docs. */
export function DocumentationTableCell({ type = "text", children, mono = false, style = {}, ...rest }) {
  return <div style={{ padding: "12px 16px", fontFamily: mono || type === "code" ? "var(--font-mono)" : "var(--font-body)", fontSize: 14, color: type === "code" ? "var(--colors-text-text-brand-secondary-700)" : "var(--colors-text-text-secondary-700)", ...style }} {...rest}>{children}</div>;
}
export default DocumentationTableCell;
