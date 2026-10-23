import React from "react";

/** Untitled UI PRO — Browser toolbar (internal). Traffic-light + URL bar strip (no content). */
export function BrowserToolbar({ url = "app.untitledui.com", theme = "light", style = {}, ...rest }) {
  const dark = theme === "dark";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: dark ? "var(--colors-gray-light-mode-900)" : "var(--colors-background-bg-secondary)", borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: 6 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}</div>
      <div style={{ flex: 1, height: 28, borderRadius: 6, background: dark ? "var(--colors-gray-light-mode-800)" : "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "var(--font-body)", fontSize: 12, color: dark ? "var(--colors-gray-light-mode-300)" : "var(--colors-text-text-tertiary-600)" }}>{url}</div>
    </div>
  );
}
export default BrowserToolbar;
