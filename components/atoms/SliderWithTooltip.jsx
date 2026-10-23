import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Slider with tooltip (internal). Track + handle showing a value bubble. */
export function SliderWithTooltip({ value = 40, min = 0, max = 100, onChange, style = {}, ...rest }) {
  const pct = ((value - min) / (max - min)) * 100;
  const ref = React.useRef(null);
  const set = (clientX) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width)); onChange && onChange(Math.round(min + p * (max - min))); };
  return (
    <div ref={ref} onClick={(e) => set(e.clientX)} style={{ position: "relative", height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)", cursor: "pointer", ...style }} {...rest}>
      <div style={{ position: "absolute", inset: 0, width: `${pct}%`, borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)" }} />
      <span style={{ position: "absolute", top: -34, left: `${pct}%`, transform: "translateX(-50%)", padding: "2px 8px", borderRadius: 6, background: "var(--colors-background-bg-primary-solid)", color: "#fff", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{value}</span>
      <span style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: "50%", background: "#fff", border: "1.5px solid var(--component-colors-components-sliders-slider-handle-border)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)" }} />
    </div>
  );
}
export default SliderWithTooltip;
