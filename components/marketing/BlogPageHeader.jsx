import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Blog page header. Eyebrow, big title and intro for a blog index. */
export function BlogPageHeader({ eyebrow = "Our blog", title = "Resources and insights", description = "The latest product news, guides and stories from our team.", style = {}, ...rest }) {
  return (
    <header style={{ padding: "64px 32px 40px", textAlign: "center", maxWidth: 768, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>{eyebrow}</div>
      <h1 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "60px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      {description && <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
    </header>
  );
}
export default BlogPageHeader;
