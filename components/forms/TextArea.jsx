import React from "react";
import { FieldHelpIcon } from "../atoms/FieldHelpIcon.jsx";

/**
 * Untitled UI PRO — Textarea. Padding, radius, type and colour follow Input:
 * sm 8/12 over a 20px line, md 8/16 over a 24px line, with the 1px border as an
 * inset shadow. Height comes from `rows`; the handle resizes vertically only.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const TA_SIZES = {
  sm: { py: "md", px: "lg", font: 14, line: "20px" },
  md: { py: "md", px: "xl", font: 16, line: "24px" },
};

export function TextArea({
  size = "md",
  label,
  hint,
  helpText,
  placeholder,
  rows = 4,
  error = false,
  disabled = false,
  required = false,
  style = {},
  ...rest
}) {
  const s = TA_SIZES[size] || TA_SIZES.md;
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const borderColor = error
    ? "var(--colors-border-border-error)"
    : focused
    ? "var(--colors-border-border-brand)"
    : "var(--colors-border-border-primary)";
  const ring = focused ? (error ? "0 0 6px 1px var(--colors-error-100), " : "0 0 6px 1px var(--colors-brand-50), ") : "";
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
      <textarea
        data-sh-part="field"
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...text,
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          padding: `${sp(s.py)} ${sp(s.px)}`,
          background: fill,
          border: "none",
          borderRadius: "var(--radius-md-px)",
          boxShadow: `${ring}inset 0 0 0 1px ${borderColor}, 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)`,
          outline: "none",
          color: disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-primary-900)",
          transition: "box-shadow 120ms ease, background 120ms ease",
        }}
        {...rest}
      />
      {hint && (
        <span data-sh-part="hint" style={{ ...text, fontWeight: 400, color: error ? "var(--colors-text-text-error-primary-600)" : "var(--colors-text-text-tertiary-600)" }}>{hint}</span>
      )}
    </div>
  );
}
export default TextArea;
