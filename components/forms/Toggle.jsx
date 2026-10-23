import React from "react";

/**
 * Untitled UI PRO — Toggle switch. sm = 36×20, md = 44×24; the knob is the track
 * height less a 2px inset on every side. The track is a real switch button, so
 * it takes hover and keyboard focus: hover darkens the track one step, focus
 * draws a brand ring held off the track by a surface-coloured gap. Disabled is
 * a lighter step of the same ramp rather than an opacity pass, so the control
 * keeps its own colour instead of bleeding whatever sits behind it. Label and
 * hint step with the size (sm 14/20, md 16/24), sit spacing.md from the track
 * and spacing.xxs apart.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const TOGGLE_SIZES = {
  sm: { w: 36, h: 20, font: 14, line: "20px" },
  md: { w: 44, h: 24, font: 16, line: "24px" },
};

export function Toggle({ size = "md", checked, defaultChecked, disabled = false, label, hint, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const on = checked != null ? checked : internal;
  const s = TOGGLE_SIZES[size] || TOGGLE_SIZES.md;
  const knob = s.h - 4;
  const live = hovered && !disabled;
  const track = disabled
    ? on ? "var(--colors-brand-200)" : "var(--colors-background-bg-disabled)"
    : on
    ? live ? "var(--colors-background-bg-brand-solid-hover)" : "var(--colors-background-bg-brand-solid)"
    : live ? "var(--colors-background-bg-quaternary)" : "var(--colors-background-bg-tertiary)";
  const text = { fontFamily: "var(--font-body)", fontSize: s.font, lineHeight: s.line, fontWeight: 400 };
  return (
    <div data-sh-part="root" style={{ display: "flex", gap: sp("md"), alignItems: hint ? "flex-start" : "center", ...style }}>
      <button
        data-sh-part="track"
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => { const v = !on; if (checked == null) setInternal(v); onChange && onChange(v); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flexShrink: 0,
          width: s.w,
          height: s.h,
          padding: sp("none"),
          border: "none",
          marginTop: hint ? sp("xxs") : 0,
          borderRadius: "var(--radius-full-px)",
          background: track,
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          boxShadow: focused && !disabled ? "0 0 0 2px var(--colors-background-bg-primary), 0 0 0 4px var(--colors-brand-600)" : "none",
          transition: "background 150ms ease, box-shadow 120ms ease",
        }}
        {...rest}
      >
        <span
          data-sh-part="knob"
          style={{
            position: "absolute",
            top: 2,
            left: on ? s.w - knob - 2 : 2,
            width: knob,
            height: knob,
            borderRadius: "var(--radius-full-px)",
            background: "var(--colors-base-white)",
            boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)",
            transition: "left 150ms ease",
          }}
        />
      </button>
      {(label || hint) && (
        <span data-sh-part="text" style={{ display: "flex", flexDirection: "column", gap: sp("xxs") }}>
          {label && <span data-sh-part="label" style={{ ...text, color: disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-secondary-700)" }}>{label}</span>}
          {hint && <span data-sh-part="hint" style={{ ...text, color: disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-tertiary-600)" }}>{hint}</span>}
        </span>
      )}
    </div>
  );
}
export default Toggle;
