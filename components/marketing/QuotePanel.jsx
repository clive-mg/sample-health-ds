import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Quote panel. Large pull-quote with attribution, optional dark theme. */
export function QuotePanel({ quote, name, title, initials, dark = false, style = {}, ...rest }) {
  return (
    <div style={{ padding: 48, borderRadius: "var(--radius-2xl-px)", background: dark ? "var(--colors-background-bg-brand-section)" : "var(--colors-background-bg-secondary)", color: dark ? "#fff" : "var(--colors-text-text-primary-900)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, lineHeight: "40px", fontWeight: 600, letterSpacing: "-0.01em" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
        <Avatar size="lg" initials={initials} />
        <div><div style={{ fontSize: 18, fontWeight: 600 }}>{name}</div><div style={{ fontSize: 16, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{title}</div></div>
      </div>
    </div>
  );
}
export default QuotePanel;
