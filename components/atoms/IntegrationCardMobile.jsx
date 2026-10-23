import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Integration card (mobile) (internal). Compact stacked integration tile. */
import { Button } from "../buttons/Button.jsx";
export function IntegrationCardMobile({ name = "Slack", description = "Notifications", icon = "MessageChatCircle", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-lg-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--colors-background-bg-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-brand-primary-600)" }}><Icon name={icon} size={22} /></span>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div></div>
      <Button hierarchy="secondary" size="sm">Add</Button>
    </div>
  );
}
export default IntegrationCardMobile;
