import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Email template footer (internal). Legal + social row for emails. */
export function EmailTemplateFooter({ brand = "Untitled UI", socials = ["Codepen", "Figma"], style = {}, ...rest }) {
  return (
    <div style={{ padding: "24px 32px", borderTop: "1px solid var(--colors-border-border-secondary)", textAlign: "center", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", color: "var(--colors-foreground-fg-quaternary-400)", marginBottom: 12 }}>{socials.map((s, i) => <Icon key={i} name={s} size={20} />)}</div>
      <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>© 2026 {brand}. All rights reserved.</div>
    </div>
  );
}
export default EmailTemplateFooter;
