import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Contact section (split) (internal). Two-column contact info + map placeholder. */
import { ContactText } from "./ContactText.jsx";
export function ContactSectionSplit({ methods = [], style = {}, ...rest }) {
  const defaults = methods.length ? methods : [
    { icon: "Mail01", label: "Email", value: "hi@untitledui.com" },
    { icon: "Phone", label: "Phone", value: "+1 (555) 000-0000" },
    { icon: "MarkerPin02", label: "Office", value: "100 Smith St, Melbourne" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>{defaults.map((m, i) => <ContactText key={i} icon={m.icon} label={m.label} value={m.value} />)}</div>
      <div style={{ borderRadius: "var(--radius-md-px)", background: "var(--colors-gray-light-mode-100)", minHeight: 240 }} />
    </div>
  );
}
export default ContactSectionSplit;
