import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — iPhone status bar (internal). Faux status bar: time, signal, wifi, battery. */
export function IPhoneStatusBar({ time = "9:41", dark = false, style = {}, ...rest }) {
  const c = dark ? "#fff" : "var(--colors-text-text-primary-900)";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", fontFamily: "var(--font-body)", color: c, ...style }} {...rest}>
      <span style={{ fontSize: 14, fontWeight: 700 }}>{time}</span>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="Signal01" size={16} /><Icon name="Wifi" size={16} /><Icon name="BatteryFull" size={20} /></span>
    </div>
  );
}
export default IPhoneStatusBar;
