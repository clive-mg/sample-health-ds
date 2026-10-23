import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Toast progress (internal). Toast with an auto-dismiss progress bar. */
export function ToastProgress({ title, progress = 60, style = {}, ...rest }) {
  return (
    <div style={{ width: 360, borderRadius: "var(--radius-md-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        <Icon name="CheckCircle" size={20} style={{ color: "var(--colors-foreground-fg-success-primary)" }} />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</span>
      </div>
      <div style={{ height: 4, background: "var(--colors-background-bg-tertiary)" }}><div style={{ width: `${progress}%`, height: "100%", background: "var(--colors-background-bg-brand-solid)" }} /></div>
    </div>
  );
}
export default ToastProgress;
