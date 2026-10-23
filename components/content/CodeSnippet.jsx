import React from "react";

/** Untitled UI PRO — Code snippet. Dark terminal-style block with a copy affordance. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function CodeSnippet({ code = "npm install @sample-health/react", language = "bash", filename, style = {}, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { try { navigator.clipboard.writeText(code); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return (
    <div style={{ borderRadius: "var(--radius-lg-px)", overflow: "hidden", background: "var(--colors-gray-light-mode-950)", fontFamily: "var(--font-mono)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{filename || language}</span>
        <button type="button" onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-body)" }}>
          <Icon name={copied ? "Check" : "Copy01"} size={16} />{copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: 16, fontSize: 12, lineHeight: "20px", color: "var(--colors-brand-200)", overflowX: "auto" }}>{code}</pre>
    </div>
  );
}
export default CodeSnippet;
