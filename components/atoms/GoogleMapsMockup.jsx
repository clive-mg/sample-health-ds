import React from "react";

/** Untitled UI PRO — Google maps mockup (internal). Faux map tile with roads + pin. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function GoogleMapsMockup({ height = 280, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", height, borderRadius: "var(--radius-md-px)", overflow: "hidden", background: "#E8EAED", ...style }} {...rest}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <rect width="100%" height="100%" fill="#E8EAED" />
        <path d="M0 80 L400 120" stroke="#fff" strokeWidth="8" />
        <path d="M120 0 L180 300" stroke="#fff" strokeWidth="10" />
        <path d="M0 200 L400 240" stroke="#CDE3B0" strokeWidth="6" />
      </svg>
      <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-100%) rotate(45deg)", width: 32, height: 32, borderRadius: "50% 50% 50% 0", background: "var(--colors-error-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><span style={{ transform: "rotate(-45deg)", color: "#fff", display: "inline-flex" }}><Icon name="MarkerPin02" size={16} /></span></span>
    </div>
  );
}
export default GoogleMapsMockup;
