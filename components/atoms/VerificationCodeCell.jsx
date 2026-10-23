import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Verification code cell (internal). Single OTP box. */
export function VerificationCodeCell({ value = "", active = false, style = {}, ...rest }) {
  return <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-md-px)", border: `1px solid ${active ? "var(--colors-border-border-brand)" : "var(--colors-border-border-primary)"}`, boxShadow: active ? "0 0 0 4px var(--colors-brand-100)" : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)", ...style }} {...rest}>{value}</div>;
}
export default VerificationCodeCell;
