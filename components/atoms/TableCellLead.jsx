import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Table cell (lead) (internal). Primary cell with avatar + primary/supporting text. */
export function TableCellLead({ title, supportingText, initials, src, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 24px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} src={src} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        {supportingText && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{supportingText}</div>}
      </div>
    </div>
  );
}
export default TableCellLead;
