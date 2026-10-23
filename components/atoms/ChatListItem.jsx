import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Chat conversation item (internal). Inbox list row: avatar, name, preview, time, unread. */
export function ChatListItem({ name = "Olivia", preview, time = "2h", unread = 0, initials = "OR", active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", gap: 12, width: "100%", textAlign: "left", padding: 12, border: "none", borderRadius: "var(--radius-lg-px)", cursor: "pointer", background: active ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} status="online" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{name}</span><span style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{time}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 2 }}><span style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{preview}</span>{unread > 0 && <span style={{ flexShrink: 0, minWidth: 18, height: 18, borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)", color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{unread}</span>}</div>
      </div>
    </button>
  );
}
export default ChatListItem;
