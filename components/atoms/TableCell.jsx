import React from "react";

/** Untitled UI PRO — Table cell (internal). Default body cell with primary/supporting text. */
export function TableCell({ children, supportingText, align = "left", style = {}, ...rest }) {
  return (
    <div style={{ padding: "16px 24px", textAlign: align, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>{children}</div>
      {supportingText && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{supportingText}</div>}
    </div>
  );
}
export default TableCell;
