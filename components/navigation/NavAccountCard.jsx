import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav account card. Sidebar footer card: avatar, name, email, menu affordance. */
export function NavAccountCard({ name = "Olivia Rhye", email = "olivia@untitledui.com", initials = "OR", src, onMenu, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", ...style }} {...rest}>
      <Avatar size="md" src={src} initials={initials} status="online" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
      </div>
      <button type="button" aria-label="Account menu" onClick={onMenu} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="LogOut04" size={20} /></button>
    </div>
  );
}
export default NavAccountCard;
