import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Feature tab (horizontal) base (internal). Icon + label pill for feature switchers. */
export function FeatureTabHorizontal({ icon, label, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 16px", cursor: "pointer", border: "none", borderBottom: `2px solid ${active ? "var(--colors-border-border-brand)" : "transparent"}`, background: "transparent", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: active ? "var(--colors-text-text-brand-secondary-700)" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>
      {icon}{label}
    </button>
  );
}
export default FeatureTabHorizontal;
