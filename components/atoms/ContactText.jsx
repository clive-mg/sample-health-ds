import React from "react";

/** Untitled UI PRO — Contact text (internal). Icon + label + value block for contact info. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function ContactText({ icon = "Mail01", label, value, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ color: "var(--colors-foreground-fg-brand-primary-600)", display: "inline-flex", marginTop: 2 }}><Icon name={icon} size={20} /></span>
      <div>{label && <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{label}</div>}<div style={{ fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{value}</div></div>
    </div>
  );
}
export default ContactText;
