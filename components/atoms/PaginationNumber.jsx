import React from "react";

/** Untitled UI PRO — Pagination number (internal). Single page number cell. */
export function PaginationNumber({ children, current = false, shape = "circle", onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ width: 40, height: 40, border: "none", cursor: "pointer", borderRadius: shape === "circle" ? "50%" : "var(--radius-md-px)", background: current ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: current ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>{children}</button>
  );
}
export default PaginationNumber;
