import React from "react";

/** Untitled UI PRO — Timeline item (internal). Dated vertical timeline entry. */
export function TimelineItem({ date, title, description, last = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--colors-background-bg-brand-solid)", border: "3px solid var(--colors-background-bg-brand-primary)" }} />
        {!last && <span style={{ flex: 1, width: 2, background: "var(--colors-border-border-secondary)", margin: "4px 0", minHeight: 32 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 24 }}>
        {date && <div style={{ fontSize: 12, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)" }}>{date}</div>}
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        {description && <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
      </div>
    </div>
  );
}
export default TimelineItem;
