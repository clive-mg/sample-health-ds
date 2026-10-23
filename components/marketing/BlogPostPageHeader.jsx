import React from "react";
import { Badge } from "../data-display/Badge.jsx";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Blog post page header. Category, title, meta and author for an article. */
export function BlogPostPageHeader({ category = "Design", title, readTime = "8 min read", date = "20 Jan 2026", author = "Olivia Rhye", initials = "OR", style = {}, ...rest }) {
  return (
    <header style={{ padding: "64px 32px 32px", maxWidth: 720, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Badge color="brand" size="sm">{category}</Badge>
      <h1 style={{ margin: "16px 0 0", fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "60px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
        <Avatar size="md" initials={initials} />
        <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{author}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{date} · {readTime}</div></div>
      </div>
    </header>
  );
}
export default BlogPostPageHeader;
