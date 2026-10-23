import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Content item (internal). Article link row: title, excerpt, arrow. */
export function ContentItem({ title, excerpt, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%", textAlign: "left", padding: "16px 0", border: "none", borderBottom: "1px solid var(--colors-border-border-secondary)", background: "transparent", cursor: "pointer", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span><span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</span>{excerpt && <span style={{ display: "block", marginTop: 2, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{excerpt}</span>}</span>
      <Icon name="ArrowRight" size={20} style={{ color: "var(--colors-foreground-fg-quaternary-400)", flexShrink: 0 }} />
    </button>
  );
}
export default ContentItem;
