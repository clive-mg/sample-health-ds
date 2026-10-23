import React from "react";

/** Untitled UI PRO — Radio button. sm 16px, md 20px. */
export function RadioButton({ size = "md", checked, defaultChecked, disabled = false, label, hint, name, value, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isChecked = checked != null ? checked : internal;
  const box = size === "sm" ? 16 : 20;
  return (
    <label style={{ display: "flex", gap: 8, alignItems: hint ? "flex-start" : "center", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, ...style }}>
      <span
        onClick={() => { if (disabled) return; if (checked == null) setInternal(true); onChange && onChange(value != null ? value : true); }}
        style={{
          flexShrink: 0,
          width: box,
          height: box,
          marginTop: hint ? 2 : 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: isChecked ? "none" : "1px solid var(--colors-border-border-primary)",
          background: isChecked ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-primary)",
          transition: "background 120ms ease, border-color 120ms ease",
        }}
        {...rest}
      >
        {isChecked && <span style={{ width: box / 3, height: box / 3, borderRadius: "50%", background: "var(--colors-text-text-primary-on-brand)" }} />}
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
export default RadioButton;
