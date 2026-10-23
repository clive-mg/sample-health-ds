import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Account card (desktop) (internal). Sidebar footer card with menu chevron. */
export function AccountCardDesktop({ name = "Olivia Rhye", email = "olivia@untitledui.com", initials = "OR", onMenu, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} status="online" />
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div></div>
      <button type="button" onClick={onMenu} aria-label="Menu" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="ChevronSelectorVertical" size={20} /></button>
    </div>
  );
}
export default AccountCardDesktop;
