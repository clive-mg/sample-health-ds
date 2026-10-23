import React from "react";
import { FieldHelpIcon } from "../atoms/FieldHelpIcon.jsx";

/**
 * Untitled UI PRO — Input field. Padding comes from the spacing scale and the
 * height derives from it: sm 8/12 over a 20px line = 36px, md 8/16 over a 24px
 * line = 40px. The 1px border is an inset shadow, so it costs no height —
 * the same construction as Button. Label, field text and hint share one size.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const INPUT_SIZES = {
  sm: { py: "md", px: "lg", font: 14, line: "20px" },
  md: { py: "md", px: "xl", font: 16, line: "24px" },
};

export function Input({
  size = "md",
  label,
  hint,
  helpText,
  placeholder,
  value,
  defaultValue,
  iconLeading = null,
  error = false,
  disabled = false,
  destructive = false,
  required = false,
  style = {},
  ...rest
}) {
  const s = INPUT_SIZES[size] || INPUT_SIZES.md;
  const isError = error || destructive;
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const borderColor = isError
    ? "var(--colors-border-border-error)"
    : focused
    ? "var(--colors-border-border-brand)"
    : "var(--colors-border-border-primary)";
  const ring = focused
    ? isError
      ? "0 0 6px 1px var(--colors-error-100), "
      : "0 0 6px 1px var(--colors-brand-50), "
    : "";
  const fill = disabled
    ? "var(--colors-background-bg-disabled)"
    : hovered && !focused
    ? "var(--colors-background-bg-primary-hover)"
    : "var(--colors-background-bg-primary)";
  const text = { fontFamily: "var(--font-body)", fontSize: s.font, lineHeight: s.line };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: sp("sm"), ...style }}>
      {label && (
        <div data-sh-part="label-row" style={{ display: "flex", alignItems: "center", gap: sp("sm") }}>
          <label data-sh-part="label" style={{ ...text, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>
            {label}
            {required && <span data-sh-part="req" style={{ color: "var(--colors-error-600)" }}> *</span>}
          </label>
          {helpText && <FieldHelpIcon text={helpText} ariaLabel={typeof label === "string" ? "More information about " + label : undefined} />}
        </div>
      )}
      <div
        data-sh-part="field"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: sp("md"),
          padding: `${sp(s.py)} ${sp(s.px)}`,
          boxSizing: "border-box",
          background: fill,
          borderRadius: "var(--sh-input-radius, var(--radius-md-px))",
          boxShadow: `${ring}inset 0 0 0 1px ${borderColor}, 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)`,
          transition: "box-shadow 120ms ease, background 120ms ease",
        }}
      >
        {iconLeading && <span data-sh-part="icon" style={{ color: "var(--colors-text-text-placeholder)", display: "inline-flex", flexShrink: 0 }}>{iconLeading}</span>}
        <input
          data-sh-part="text"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...text,
            flex: 1,
            minWidth: 0,
            padding: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            color: disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-primary-900)",
          }}
          {...rest}
        />
      </div>
      {hint && (
        <span data-sh-part="hint" style={{ ...text, fontWeight: 400, color: isError ? "var(--colors-text-text-error-primary-600)" : "var(--colors-text-text-tertiary-600)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

export default Input;
