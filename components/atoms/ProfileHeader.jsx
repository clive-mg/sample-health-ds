import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Profile header (internal). Cover band + avatar + name + actions. */
export function ProfileHeader({ name = "Olivia Rhye", handle = "@olivia", initials = "OR", style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-md-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ height: 96, background: "linear-gradient(135deg,var(--colors-brand-400),var(--colors-brand-700))" }} />
      <div style={{ padding: "0 24px 20px", marginTop: -32 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <span style={{ borderRadius: "50%", boxShadow: "0 0 0 4px var(--colors-background-bg-primary)" }}><Avatar size="xl" initials={initials} /></span>
          <Button hierarchy="secondary" size="sm">Edit profile</Button>
        </div>
        <div style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{handle}</div>
      </div>
    </div>
  );
}
export default ProfileHeader;
