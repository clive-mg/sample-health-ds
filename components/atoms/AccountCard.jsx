import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Account card (internal). Sidebar account summary: avatar, name, plan. */
export function AccountCard({ name = "Olivia Rhye", plan = "Pro plan", initials = "OR", src, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} src={src} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{plan}</div>
      </div>
    </div>
  );
}
export default AccountCard;
