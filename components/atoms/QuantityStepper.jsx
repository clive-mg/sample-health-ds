import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Quantity stepper (internal). Compact -/count/+ for carts. */
export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(value);
  const v = onChange ? value : internal;
  const set = (nv) => { nv = Math.max(min, Math.min(max, nv)); if (!onChange) setInternal(nv); onChange && onChange(nv); };
  const btn = { width: 32, height: 32, border: "1px solid var(--colors-border-border-primary)", borderRadius: 8, background: "var(--colors-background-bg-primary)", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <button type="button" onClick={() => set(v - 1)} style={btn}><Icon name="Minus" size={16} /></button>
      <span style={{ minWidth: 20, textAlign: "center", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{v}</span>
      <button type="button" onClick={() => set(v + 1)} style={btn}><Icon name="Plus" size={16} /></button>
    </div>
  );
}
export default QuantityStepper;
