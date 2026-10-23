import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Integration row (internal). List row: logo, name, status, connect button. */
import { Button } from "../buttons/Button.jsx";
import { Badge } from "../data-display/Badge.jsx";
export function IntegrationRow({ name = "GitHub", description = "Sync issues & pull requests.", icon = "Codepen", connected = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--colors-background-bg-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-quaternary-500)" }}><Icon name={icon} size={22} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</span>{connected && <Badge color="success" size="sm" dot>Connected</Badge>}</div>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>
      </div>
      <Button hierarchy={connected ? "secondary" : "primary"} size="sm">{connected ? "Manage" : "Connect"}</Button>
    </div>
  );
}
export default IntegrationRow;
