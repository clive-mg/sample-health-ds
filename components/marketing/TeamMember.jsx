import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Team member card. Photo, name, role and social links. */
export function TeamMember({ name, role, bio, initials, src, socials = ["Codepen", "Figma"], style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "center" }}><Avatar size="2xl" initials={initials} src={src} /></div>
      <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
      <div style={{ fontSize: 16, color: "var(--colors-text-text-brand-secondary-700)" }}>{role}</div>
      {bio && <p style={{ margin: "12px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{bio}</p>}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, color: "var(--colors-foreground-fg-quaternary-400)" }}>
        {socials.map((s, i) => <Icon key={i} name={s} size={20} />)}
      </div>
    </div>
  );
}
export default TeamMember;
