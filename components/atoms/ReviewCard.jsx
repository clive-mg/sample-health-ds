import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Review card (internal). User review: avatar, name, stars, body. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function ReviewCard({ name = "Olivia", initials = "OR", rating = 5, body, date, style = {}, ...rest }) {
  return (
    <div style={{ padding: 20, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar size="md" initials={initials} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{name}</div>{date && <div style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{date}</div>}</div>
      </div>
      <div style={{ display: "flex", gap: 2, margin: "12px 0", color: "var(--colors-warning-400)" }}>{Array.from({ length: rating }).map((_, i) => <Icon key={i} name="Star01" size={16} />)}</div>
      {body && <p style={{ margin: 0, fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{body}</p>}
    </div>
  );
}
export default ReviewCard;
