import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Notification (internal). App notification row: avatar/icon, text, time, unread dot. */
import { Avatar } from "../data-display/Avatar.jsx";
export function NotificationItem({ initials = "OR", title, time = "2h ago", unread = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: 12, borderRadius: "var(--radius-lg-px)", background: unread ? "var(--colors-background-bg-secondary-subtle)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} />
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>{title}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{time}</div></div>
      {unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--colors-background-bg-brand-solid)", flexShrink: 0, marginTop: 6 }} />}
    </div>
  );
}
export default NotificationItem;
