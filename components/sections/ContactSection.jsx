import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Input } from "../forms/Input.jsx";
import { TextArea } from "../forms/TextArea.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Contact section. Contact methods + a simple message form. */
export function ContactSection({ eyebrow = "Contact us", title = "Get in touch", methods = [], style = {}, ...rest }) {
  const defaults = methods.length ? methods : [
    { icon: "Mail01", title: "Email", value: "hi@untitledui.com" },
    { icon: "Phone", title: "Phone", value: "+1 (555) 000-0000" },
    { icon: "MarkerPin02", title: "Office", value: "100 Smith St, Melbourne" },
  ];
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} />
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
            {defaults.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <FeaturedIcon color="brand"><Icon name={m.icon} /></FeaturedIcon>
                <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{m.title}</div><div style={{ fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{m.value}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" placeholder="you@company.com" />
          <TextArea label="Message" placeholder="How can we help?" rows={4} />
          <Button size="lg" style={{ width: "100%" }}>Send message</Button>
        </div>
      </div>
    </section>
  );
}
export default ContactSection;
