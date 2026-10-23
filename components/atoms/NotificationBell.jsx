import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Notification bell (internal). Bell button with unread count badge. */
export function NotificationBell({ count = 0, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} aria-label="Notifications" style={{ position: "relative", width: 40, height: 40, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}>
      <Icon name="Bell01" size={24} />
      {count > 0 && <span style={{ position: "absolute", top: 6, right: 6, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 9999, background: "var(--colors-background-bg-error-solid)", color: "#fff", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--colors-background-bg-primary)" }}>{count}</span>}
    </button>
  );
}
export default NotificationBell;
