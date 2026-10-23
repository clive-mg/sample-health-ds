import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Table lead cell (primary, with checkbox) (internal). Row lead with select box. */
import { CheckboxBase } from "./CheckboxBase.jsx";
import { Avatar } from "../data-display/Avatar.jsx";
export function TableLeadCellPrimary({ title, supportingText, initials, checked = false, onCheck, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 24px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <CheckboxBase checked={checked} onClick={onCheck} />
      <Avatar size="md" initials={initials} />
      <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>{supportingText && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{supportingText}</div>}</div>
    </div>
  );
}
export default TableLeadCellPrimary;
