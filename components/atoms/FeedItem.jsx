import React from "react";

/** Untitled UI PRO — Feed item (internal build-block). Timeline row: marker, content, connector. */
export function FeedItem({ icon, children, connector = true, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, ...style }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", background: "var(--colors-background-bg-secondary)", border: "1px solid var(--colors-border-border-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-quaternary-500)" }}>{icon}</span>
        {connector && <span style={{ flex: 1, width: 2, background: "var(--colors-border-border-secondary)", margin: "4px 0", minHeight: 24 }} />}
      </div>
      <div style={{ paddingBottom: connector ? 24 : 0, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{children}</div>
    </div>
  );
}
export default FeedItem;
