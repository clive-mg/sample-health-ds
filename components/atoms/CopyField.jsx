import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Copy field (internal). Read-only value with a copy button (share links/keys). */
export function CopyField({ value = "https://untitledui.com/i/abc123", onCopy, style = {}, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { try { navigator.clipboard.writeText(value); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1200); onCopy && onCopy(); };
  return (
    <div style={{ display: "flex", alignItems: "center", height: 40, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-primary)", overflow: "hidden", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ flex: 1, padding: "0 12px", fontSize: 14, color: "var(--colors-text-text-secondary-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
      <button type="button" onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: "100%", padding: "0 12px", border: "none", borderLeft: "1px solid var(--colors-border-border-primary)", background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)" }}><Icon name={copied ? "Check" : "Copy01"} size={16} />{copied ? "Copied" : "Copy"}</button>
    </div>
  );
}
export default CopyField;
