import React from "react";
import { Badge } from "../data-display/Badge.jsx";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Blog post card. Cover image, category, title, excerpt, author row. */
export function BlogPostCard({ image, category = "Design", title, excerpt, author = "Olivia Rhye", date = "20 Jan 2026", initials = "OR", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, ...style }} {...rest}>
      <div style={{ aspectRatio: "16 / 9", borderRadius: "var(--radius-2xl-px)", background: image ? `center/cover no-repeat url(${image})` : "var(--colors-gray-light-mode-200)" }} />
      <div>
        <Badge color="brand" size="sm">{category}</Badge>
        <h3 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, lineHeight: "32px", color: "var(--colors-text-text-primary-900)" }}>{title}</h3>
        {excerpt && <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{excerpt}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <Avatar size="md" initials={initials} />
        <div><div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{author}</div><div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{date}</div></div>
      </div>
    </div>
  );
}
export default BlogPostCard;
