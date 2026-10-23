import React from "react";

/** Untitled UI PRO — Feature tab. Selectable vertical tab with title + description (feature switchers). */
export function FeatureTab({ title, description, icon, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", gap: 16, width: "100%", textAlign: "left", padding: "16px 20px", cursor: "pointer",
      border: "none", borderLeft: `2px solid ${active ? "var(--colors-border-border-brand)" : "var(--colors-border-border-secondary)"}`,
      background: active ? "var(--colors-background-bg-brand-primary)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {icon && <span style={{ color: active ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", flexShrink: 0 }}>{icon}</span>}
      <span>
        <span style={{ display: "block", fontSize: 18, fontWeight: 600, color: active ? "var(--colors-text-text-brand-secondary-700)" : "var(--colors-text-text-primary-900)" }}>{title}</span>
        {description && <span style={{ display: "block", marginTop: 4, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</span>}
      </span>
    </button>
  );
}
export default FeatureTab;
