import React from "react";

/** Untitled UI PRO — Button group. Segmented row of connected buttons; one can be active. */
export function ButtonGroup({ items = [], value, defaultValue, onChange, size = "md", style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && (items[0].value ?? items[0].label)));
  const active = value !== undefined ? value : internal;
  const pad = size === "sm" ? "8px 12px" : "10px 14px";
  const font = size === "lg" ? 16 : 14;
  return (
    <div style={{ display: "inline-flex", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      {items.map((it, i) => {
        const v = it.value ?? it.label;
        const on = v === active;
        return (
          <button key={i} type="button" onClick={() => { if (value === undefined) setInternal(v); onChange && onChange(v); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: pad, fontFamily: "var(--font-body)", fontSize: font, fontWeight: 600, lineHeight: "20px",
              background: on ? "var(--colors-background-bg-active)" : "var(--colors-background-bg-primary)",
              color: "var(--colors-text-text-secondary-700)", border: "1px solid var(--colors-border-border-primary)",
              borderLeftWidth: i === 0 ? 1 : 0,
              borderTopLeftRadius: i === 0 ? "var(--radius-md-px)" : 0, borderBottomLeftRadius: i === 0 ? "var(--radius-md-px)" : 0,
              borderTopRightRadius: i === items.length - 1 ? "var(--radius-md-px)" : 0, borderBottomRightRadius: i === items.length - 1 ? "var(--radius-md-px)" : 0,
              cursor: "pointer" }}>
            {it.icon}{it.label}
          </button>
        );
      })}
    </div>
  );
}
export default ButtonGroup;
