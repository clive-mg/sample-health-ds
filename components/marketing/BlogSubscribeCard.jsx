import React from "react";
import { Input } from "../forms/Input.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Blog subscribe card. Inline newsletter signup card. */
export function BlogSubscribeCard({ title = "Weekly newsletter", description = "No spam. Just the latest releases and tips, in your inbox weekly.", style = {}, ...rest }) {
  return (
    <div style={{ padding: 32, borderRadius: "var(--radius-2xl-px)", background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {description && <p style={{ margin: "8px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <div style={{ flex: 1 }}><Input placeholder="Enter your email" /></div>
        <Button size="lg">Subscribe</Button>
      </div>
    </div>
  );
}
export default BlogSubscribeCard;
