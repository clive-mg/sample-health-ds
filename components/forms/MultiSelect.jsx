import React from "react";
import { FieldHelpIcon } from "../atoms/FieldHelpIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Checkbox } from "./Checkbox.jsx";

/**
 * Untitled UI PRO — Multiselect. Field-shaped trigger reporting a count, over a
 * menu of checkbox rows. Padding, radius, type and height follow Input and
 * Select: sm 8/12 over a 20px line = 36px, md 8/16 over a 24px line = 40px,
 * with the 1px border as an inset shadow. Checked rows take the brand tint.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const MS_SIZES = {
  sm: { py: "md", px: "lg", font: 14, line: "20px", chevron: 16 },
  md: { py: "md", px: "xl", font: 16, line: "24px", chevron: 20 },
};

export function MultiSelect({
  size = "md",
  label,
  hint,
  helpText,
  placeholder = "Select",
  options = [],
  value,
  defaultValue = [],
  disabled = false,
  required = false,
  defaultOpen = false,
  showAll = true,
  clearable = true,
  allLabel = "All",
  clearLabel = "Clear all",
  onChange,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hovered, setHovered] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = value !== undefined ? value : internal;
  const s = MS_SIZES[size] || MS_SIZES.md;
  const text = { fontFamily: "var(--font-body)", fontSize: s.font, lineHeight: s.line };
  const vals = options.map((o) => o.value ?? o);
  const all = vals.length > 0 && selected.length === vals.length;
  const some = selected.length > 0 && !all;

  const commit = (next) => {
    if (value === undefined) setInternal(next);
    onChange && onChange(next);
  };
  const toggle = (v) => commit(selected.indexOf(v) === -1 ? selected.concat([v]) : selected.filter((x) => x !== v));

  const fill = disabled
    ? "var(--colors-background-bg-disabled)"
    : hovered && !open
    ? "var(--colors-background-bg-primary-hover)"
    : "var(--colors-background-bg-primary)";
  const row = (checked) => ({
    ...text,
    display: "flex", alignItems: "center", gap: sp("md"),
    padding: `${sp("md")} ${sp("lg")}`,
    borderRadius: "var(--radius-sm-px)",
    cursor: "pointer",
    fontWeight: checked ? 600 : 400,
    color: "var(--colors-text-text-primary-900)",
    background: checked ? "var(--colors-brand-50)" : "transparent",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: sp("sm"), position: "relative", ...style }} {...rest}>
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
        data-sh-part="field"
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...text,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("md"),
          padding: `${sp(s.py)} ${sp(s.px)}`, boxSizing: "border-box",
          background: fill,
          border: "none",
          borderRadius: "var(--radius-md-px)",
          boxShadow: `${open ? "0 0 6px 1px var(--colors-brand-50), " : ""}inset 0 0 0 1px ${open ? "var(--colors-border-border-brand)" : "var(--colors-border-border-primary)"}, 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)`,
          color: disabled ? "var(--colors-text-text-disabled)" : selected.length ? "var(--colors-text-text-primary-900)" : "var(--colors-text-text-placeholder)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "box-shadow 120ms ease, background 120ms ease",
        }}
      >
        <span data-sh-part="text" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected.length ? selected.length + " selected" : placeholder}
        </span>
        <span data-sh-part="chevron" style={{ display: "inline-flex", flexShrink: 0, color: "var(--colors-text-text-placeholder)" }}>
          <Icon name="ChevronDown" size={s.chevron} />
        </span>
      </button>
      {open && (
        <div data-sh-part="menu" style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: sp("xs"), zIndex: 20, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)", overflow: "hidden" }}>
          <div className="uui-scroll-slim" style={{ padding: sp("xs"), maxHeight: 264, overflowY: "auto" }}>
            {showAll && (
              <div data-sh-part="all" onClick={() => commit(all ? [] : vals.slice())} style={row(all)}>
                <span data-sh-part="box" style={{ display: "inline-flex", flexShrink: 0 }}>
                  <Checkbox size="md" checked={all} indeterminate={some} />
                </span>
                <span>{allLabel}</span>
              </div>
            )}
            {options.map((o, i) => {
              const val = o.value ?? o;
              const lbl = o.label ?? o;
              const on = selected.indexOf(val) !== -1;
              return (
                <div key={i} data-sh-part={on ? "item-selected" : "item"} onClick={() => toggle(val)} style={row(on)}>
                  <span style={{ display: "inline-flex", flexShrink: 0 }}>
                    <Checkbox size="md" checked={on} />
                  </span>
                  <span>{lbl}</span>
                </div>
              );
            })}
          </div>
          {clearable && (
            <div style={{ borderTop: "1px solid var(--colors-border-border-secondary)", padding: sp("xs") }}>
              <button data-sh-part="clear" type="button" disabled={!selected.length} onClick={() => commit([])}
                style={{ ...text, display: "block", width: "100%", textAlign: "left", padding: `${sp("md")} ${sp("lg")}`, borderRadius: "var(--radius-sm-px)", border: "none", background: "transparent", fontWeight: 600, cursor: selected.length ? "pointer" : "not-allowed", color: selected.length ? "var(--colors-text-text-brand-tertiary-600)" : "var(--colors-text-text-disabled)" }}
                onMouseEnter={(e) => { if (selected.length) e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)"; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                {clearLabel}
              </button>
            </div>
          )}
        </div>
      )}
      {hint && <span data-sh-part="hint" style={{ ...text, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{hint}</span>}
    </div>
  );
}
export default MultiSelect;
