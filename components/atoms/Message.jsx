import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Message (internal). Full chat message: avatar, name, time, bubble. */
export function Message({ text, author = "Olivia", time = "now", initials = "OL", side = "in", style = {}, ...rest }) {
  const out = side === "out";
  return (
    <div style={{ display: "flex", flexDirection: out ? "row-reverse" : "row", gap: 12, alignItems: "flex-end", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {!out && <Avatar size="sm" initials={initials} />}
      <div style={{ maxWidth: 360 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 4, justifyContent: out ? "flex-end" : "flex-start", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}><span style={{ fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{author}</span><span>{time}</span></div>
        <div style={{ padding: "10px 14px", borderRadius: out ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: out ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-secondary)", color: out ? "#fff" : "var(--colors-text-text-primary-900)", fontSize: 14, lineHeight: "20px" }}>{text}</div>
      </div>
    </div>
  );
}
export default Message;
