import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Toast simple (internal). One-line toast with icon + message. */
export function ToastSimple({ message, color = "gray", style = {}, ...rest }) {
  const map = { gray: "InfoCircle", success: "CheckCircle", error: "AlertCircle", warning: "AlertTriangle" };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-lg-px)", background: "var(--colors-background-bg-primary-solid)", color: "#fff", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, ...style }} {...rest}>
      <Icon name={map[color] || "InfoCircle"} size={18} />{message}
    </div>
  );
}
export default ToastSimple;
