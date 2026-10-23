import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Contact text (block) (internal). Team/office contact block with avatar. */
export function ContactBlock({ name, role, email, initials, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} />
      <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>{role && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{role}</div>}{email && <div style={{ fontSize: 14, color: "var(--colors-text-text-brand-secondary-700)" }}>{email}</div>}</div>
    </div>
  );
}
export default ContactBlock;
