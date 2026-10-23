import React from "react";

/** Untitled UI PRO — Dropdown list header (internal). Group label / account header in a menu. */
export function DropdownListHeader({ title, subtitle, style = {}, ...rest }) {
  return (
    <div style={{ padding: "12px", borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {subtitle && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{subtitle}</div>}
    </div>
  );
}
export default DropdownListHeader;
