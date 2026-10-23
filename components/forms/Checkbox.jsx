import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Checkbox. sm 16px, md 20px. Rounded (radius ~sm). */
export function Checkbox({ size = "md", checked, defaultChecked, indeterminate = false, disabled = false, label, hint, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isChecked = checked != null ? checked : internal;
  const box = size === "sm" ? 16 : 20;
  const on = isChecked || indeterminate;
  return (
    <label style={{ display: "flex", gap: 8, alignItems: hint ? "flex-start" : "center", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, ...style }}>
      <span
        onClick={() => { if (disabled) return; const v = !isChecked; if (checked == null) setInternal(v); onChange && onChange(v); }}
        style={{
          flexShrink: 0,
          width: box,
          height: box,
          marginTop: hint ? 2 : 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: size === "sm" ? 4 : 6,
          border: on ? "none" : "1px solid var(--colors-border-border-primary)",
          background: on ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-primary)",
          color: "var(--colors-text-text-primary-on-brand)",
          transition: "background 120ms ease, border-color 120ms ease",
        }}
        {...rest}
      >
        {indeterminate ? <Icon name="Minus" size={box - 4} /> : isChecked ? <Icon name="Check" size={box - 4} /> : null}
      </span>
      {(label || hint) && (
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {label && <span style={{ fontFamily: "var(--font-body)", fontSize: size === "sm" ? 14 : 16, fontWeight: 400, lineHeight: size === "sm" ? "20px" : "24px", color: "var(--colors-text-text-primary-900)" }}>{label}</span>}
          {hint && <span style={{ fontFamily: "var(--font-body)", fontSize: size === "sm" ? 14 : 16, lineHeight: size === "sm" ? "20px" : "24px", color: "var(--colors-text-text-quaternary-500)" }}>{hint}</span>}
        </span>
      )}
    </label>
  );
}
export default Checkbox;
