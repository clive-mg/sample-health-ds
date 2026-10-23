import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Number input (internal). Stepper field with +/- controls. */
export function NumberInput({ value = 1, min = 0, max = 99, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(value);
  const v = onChange ? value : internal;
  const set = (nv) => { nv = Math.max(min, Math.min(max, nv)); if (!onChange) setInternal(nv); onChange && onChange(nv); };
  const btn = { width: 36, height: 40, border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", height: 40, border: "1px solid var(--colors-border-border-primary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <button type="button" onClick={() => set(v - 1)} style={btn}><Icon name="Minus" size={18} /></button>
      <span style={{ width: 40, textAlign: "center", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{v}</span>
      <button type="button" onClick={() => set(v + 1)} style={btn}><Icon name="Plus" size={18} /></button>
    </div>
  );
}
export default NumberInput;
