import React from "react";

/** Untitled UI PRO — Browser mockup. Chrome toolbar with traffic lights + URL bar around content. */
export function BrowserMockup({ url = "app.untitledui.com", children, style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-md-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", background: "var(--colors-background-bg-primary)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--colors-background-bg-secondary)", borderBottom: "1px solid var(--colors-border-border-secondary)" }}>
        <div style={{ display: "flex", gap: 6 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ flex: 1, height: 28, borderRadius: 6, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{url}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
export default BrowserMockup;
