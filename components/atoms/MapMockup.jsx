import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Map mockup (internal). Stylized static map panel with a center pin. */
export function MapMockup({ height = 240, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", height, borderRadius: "var(--radius-md-px)", overflow: "hidden", background: "var(--colors-gray-light-mode-100)", backgroundImage: "linear-gradient(var(--colors-border-border-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--colors-border-border-secondary) 1px, transparent 1px)", backgroundSize: "32px 32px", ...style }} {...rest}>
      <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-100%) rotate(45deg)", width: 32, height: 32, borderRadius: "50% 50% 50% 0", background: "var(--colors-background-bg-brand-solid)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)" }}>
        <span style={{ transform: "rotate(-45deg)", color: "#fff", display: "inline-flex" }}><Icon name="MarkerPin02" size={16} /></span>
      </span>
    </div>
  );
}
export default MapMockup;
