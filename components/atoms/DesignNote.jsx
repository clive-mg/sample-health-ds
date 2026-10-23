import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Design note (internal). Annotation callout used on spec/handoff frames. */
export function DesignNote({ children, number, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "8px 12px", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-brand-primary)", border: "1px solid var(--colors-border-border-brand)", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-brand-secondary-700)", ...style }} {...rest}>
      {number != null && <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", background: "var(--colors-background-bg-brand-solid)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{number}</span>}
      {children}
    </div>
  );
}
export default DesignNote;
