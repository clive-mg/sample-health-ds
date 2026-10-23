import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Notification card (internal). Rich notification with icon, title, body, actions. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Button } from "../buttons/Button.jsx";
export function NotificationCard({ icon = "Bell01", title, body, actions, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: 16, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <FeaturedIcon color="brand" size="md"><Icon name={icon} /></FeaturedIcon>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        {body && <div style={{ marginTop: 2, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{body}</div>}
        {actions && <div style={{ display: "flex", gap: 12, marginTop: 12 }}>{actions}</div>}
      </div>
    </div>
  );
}
export default NotificationCard;
