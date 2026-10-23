import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Table row (internal). Complete data row: checkbox, lead cell, cells, actions. */
import { CheckboxBase } from "./CheckboxBase.jsx";
export function TableRow({ title, supportingText, initials, cells = [], checked = false, onCheck, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "16px 24px", borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <CheckboxBase checked={checked} onClick={onCheck} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
        <Avatar size="md" initials={initials} />
        <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>{supportingText && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{supportingText}</div>}</div>
      </div>
      {cells.map((c, i) => <div key={i} style={{ fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>{c}</div>)}
      <button type="button" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="DotsVertical" size={20} /></button>
    </div>
  );
}
export default TableRow;
