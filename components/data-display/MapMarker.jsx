import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Map location marker. Pin with pulse ring for maps. */
export function MapMarker({ label, active = false, style = {}, ...rest }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", ...style }} {...rest}>
      {label && <span style={{ marginBottom: 6, padding: "4px 10px", borderRadius: 8, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", whiteSpace: "nowrap" }}>{label}</span>}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50% 50% 50% 0", transform: "rotate(45deg)", background: "var(--colors-background-bg-brand-solid)", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)" }}>
        <span style={{ transform: "rotate(-45deg)", color: "#fff", display: "inline-flex" }}><Icon name="MarkerPin02" size={20} /></span>
      </span>
    </span>
  );
}
export default MapMarker;
