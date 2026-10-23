import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Integration card (internal). App/integration tile: logo, name, description, toggle. */
import { Toggle } from "../forms/Toggle.jsx";
export function IntegrationCard({ name = "Slack", description = "Send notifications to channels.", icon = "MessageChatCircle", enabled = false, onToggle, style = {}, ...rest }) {
  return (
    <div style={{ padding: 20, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span style={{ width: 44, height: 44, borderRadius: 10, background: "var(--colors-background-bg-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-brand-primary-600)" }}><Icon name={icon} size={24} /></span>
        <Toggle defaultChecked={enabled} onChange={onToggle} />
      </div>
      <div style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
      <div style={{ marginTop: 4, fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>
    </div>
  );
}
export default IntegrationCard;
