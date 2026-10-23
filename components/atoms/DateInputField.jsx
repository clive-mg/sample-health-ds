import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { FieldHelpIcon } from "./FieldHelpIcon.jsx";

/**
 * Untitled UI PRO — Date input field (internal). The trigger every date picker
 * opens from: the same construction as Input — label, hint, help icon, 1px
 * border drawn as an inset shadow so it costs no height — with a calendar
 * glyph and a text value in place of the typed input. Label, value and hint all
 * sit at Body Medium 14/20, so both sizes stand 36px tall on 8px block padding
 * — the Button ladder, which the sm and md dropdowns beside them also follow.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const FIELD_SIZES = { sm: { py: "md", px: "lg", font: 14, line: "20px" }, md: { py: "md", px: "xl", font: 14, line: "20px" } };

export function DateInputField({
  size = "md",
  label,
  hint,
  helpText,
  placeholder = "Select date",
  value,
  open = false,
  error = false,
  disabled = false,
  required = false,
  onClick,
  style = {},
  ...rest
}) {
  const s = FIELD_SIZES[size] || FIELD_SIZES.md;
  const [hovered, setHovered] = React.useState(false);
  const borderColor = error
    ? "var(--colors-border-border-error)"
    : open
    ? "var(--colors-border-border-brand)"
    : "var(--colors-border-border-primary)";
  const ring = open ? (error ? "0 0 6px 1px var(--colors-error-100), " : "0 0 6px 1px var(--colors-brand-50), ") : "";
  const fill = disabled
    ? "var(--colors-background-bg-disabled)"
    : hovered && !open
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
      <button
        type="button"
        data-sh-part="field"
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: sp("md"),
          width: "100%",
          padding: `${sp(s.py)} ${sp(s.px)}`,
          boxSizing: "border-box",
          textAlign: "left",
          background: fill,
          border: "none",
          borderRadius: "var(--radius-md-px)",
          boxShadow: `${ring}inset 0 0 0 1px ${borderColor}, 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)`,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "box-shadow 120ms ease, background 120ms ease",
        }}
        {...rest}
      >
        <span
          data-sh-part="text"
          style={{
            ...text,
            flex: 1,
            minWidth: 0,
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: disabled
              ? "var(--colors-text-text-disabled)"
              : value
              ? "var(--colors-text-text-primary-900)"
              : "var(--colors-text-text-placeholder)",
          }}
        >
          {value || placeholder}
        </span>
        <Icon data-sh-part="icon" name="Calendar2" size={20} style={{ flexShrink: 0, color: "var(--colors-text-text-placeholder)" }} />
      </button>
      {hint && (
        <span data-sh-part="hint" style={{ ...text, fontWeight: 400, color: error ? "var(--colors-text-text-error-primary-600)" : "var(--colors-text-text-tertiary-600)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}
export default DateInputField;
