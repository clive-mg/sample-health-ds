import React from "react";

/** Untitled UI PRO — Team member (mobile) (internal). Stacked member card for narrow screens. */
import { Avatar } from "../data-display/Avatar.jsx";
export function TeamMemberMobile({ name, role, initials, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="lg" initials={initials} />
      <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-brand-secondary-700)" }}>{role}</div></div>
    </div>
  );
}
export default TeamMemberMobile;
