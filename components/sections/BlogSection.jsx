import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { BlogPostCard } from "../marketing/BlogPostCard.jsx";

/** Untitled UI PRO — Blog section. Header + grid of blog post cards. */
export function BlogSection({ eyebrow = "Blog", title = "From the blog", posts = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(posts.length || 1, 3)}, 1fr)`, gap: 32, marginTop: 56, alignItems: "start" }}>
          {posts.map((p, i) => <BlogPostCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  );
}
export default BlogSection;
