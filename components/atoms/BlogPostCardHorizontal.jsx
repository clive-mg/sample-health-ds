import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Blog post card (horizontal) (internal). Side-by-side image + text variant. */
export function BlogPostCardHorizontal({ image, category = "Design", title, excerpt, date = "20 Jan 2026", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 24, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ flex: "0 0 40%", aspectRatio: "16 / 10", borderRadius: "var(--radius-md-px)", background: image ? `center/cover no-repeat url(${image})` : "var(--colors-gray-light-mode-200)" }} />
      <div style={{ flex: 1 }}>
        <Badge color="brand" size="sm">{category}</Badge>
        <h3 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</h3>
        {excerpt && <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{excerpt}</p>}
        <div style={{ marginTop: 12, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{date}</div>
      </div>
    </div>
  );
}
export default BlogPostCardHorizontal;
