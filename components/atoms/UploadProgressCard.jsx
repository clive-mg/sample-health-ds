import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Upload progress card (internal). File uploading state with cancel. */
export function UploadProgressCard({ name = "file.pdf", pct = 40, onCancel, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}><span style={{ fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{name}</span><span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{pct}%</span></div>
        <div style={{ height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)" }}><div style={{ width: `${pct}%`, height: "100%", borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)" }} /></div>
      </div>
      {onCancel && <button type="button" onClick={onCancel} aria-label="Cancel" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="XClose" size={18} /></button>}
    </div>
  );
}
export default UploadProgressCard;
