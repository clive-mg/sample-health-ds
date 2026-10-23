import React from "react";

/** Untitled UI PRO — Loading indicator (line spinner). sizes sm/md/lg/xl. */
const SZ = { sm: 20, md: 32, lg: 48, xl: 64 };
export function LoadingIndicator({ size = "md", style = {}, ...rest }) {
  const d = SZ[size] || 32;
  const sw = Math.max(2, Math.round(d * 0.1));
  return (
    <span style={{ display: "inline-flex", width: d, height: d, ...style }} {...rest}>
      <svg width={d} height={d} viewBox="0 0 50 50" style={{ animation: "uui-spin 0.7s linear infinite" }}>
        <circle cx="25" cy="25" r={20} fill="none" stroke="var(--colors-border-border-secondary)" strokeWidth={sw} />
        <circle cx="25" cy="25" r={20} fill="none" stroke="var(--colors-foreground-fg-brand-primary-600)" strokeWidth={sw} strokeLinecap="round" strokeDasharray="90 150" />
      </svg>
      <style>{"@keyframes uui-spin{to{transform:rotate(360deg)}}"}</style>
    </span>
  );
}
export default LoadingIndicator;
