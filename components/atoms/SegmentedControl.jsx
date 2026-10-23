import React from "react";

/** Untitled UI PRO — Segmented control (internal). Compact 2–3 option toggle group. */
export function SegmentedControl({ options = [], value, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(options[0]);
  const active = value != null ? value : internal;
  return (
    <div style={{ display: "inline-flex", padding: 4, gap: 2, borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => { if (value == null) setInternal(o); onChange && onChange(o); }} style={{ padding: "6px 12px", border: "none", borderRadius: "var(--radius-sm-px)", cursor: "pointer", background: o === active ? "var(--colors-background-bg-primary)" : "transparent", boxShadow: o === active ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" : "none", fontSize: 14, fontWeight: 700, color: o === active ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-quaternary-500)" }}>{o}</button>
      ))}
    </div>
  );
}
export default SegmentedControl;
