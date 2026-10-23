import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Comment (internal). Threaded comment: avatar, author, time, body, actions. */
export function Comment({ author = "Olivia", initials = "OR", time = "2h", body, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="sm" initials={initials} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{author}</span><span style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{time}</span></div>
        {body && <p style={{ margin: "4px 0 8px", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{body}</p>}
        <div style={{ display: "flex", gap: 16, fontSize: 12, fontWeight: 700, color: "var(--colors-text-text-tertiary-600)" }}><span>Reply</span><span>React</span></div>
      </div>
    </div>
  );
}
export default Comment;
