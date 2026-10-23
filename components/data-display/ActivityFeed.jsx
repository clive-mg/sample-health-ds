import React from "react";

/** Untitled UI PRO — Activity feed. Timeline of events with connector line. items:[{icon,title,time}]. */
export function ActivityFeed({ items = [], style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", background: "var(--colors-background-bg-secondary)", border: "1px solid var(--colors-border-border-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-quaternary-500)" }}>{it.icon}</span>
              {!last && <span style={{ flex: 1, width: 2, background: "var(--colors-border-border-secondary)", margin: "4px 0" }} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : 24 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{it.title}</div>
              {it.time && <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{it.time}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ActivityFeed;
