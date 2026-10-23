import React from "react";

/** Untitled UI PRO — Focus ring (internal). Reusable 4px brand focus outline wrapper. */
export function FocusRing({ children, error = false, style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", borderRadius: "var(--radius-md-px)", boxShadow: `0 0 0 4px ${error ? "var(--colors-error-100)" : "var(--colors-brand-100)"}`, ...style }} {...rest}>{children}</span>;
}
export default FocusRing;
