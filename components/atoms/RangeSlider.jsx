import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Range slider (internal). Dual-handle min/max range track. */
export function RangeSlider({ low = 20, high = 70, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)", ...style }} {...rest}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${low}%`, right: `${100 - high}%`, borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)" }} />
      {[low, high].map((p, i) => <span key={i} style={{ position: "absolute", top: "50%", left: `${p}%`, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: "50%", background: "#fff", border: "1.5px solid var(--component-colors-components-sliders-slider-handle-border)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)" }} />)}
    </div>
  );
}
export default RangeSlider;
