import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Assignee select (internal). Compact avatar + name assignee chip. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function AssigneeSelect({ name = "Unassigned", initials, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 8px", borderRadius: 9999, border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {initials ? <Avatar size="xs" initials={initials} /> : <Icon name="User01" size={16} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />}
      {name}
    </button>
  );
}
export default AssigneeSelect;
