import React from "react";

/** Untitled UI PRO — Logo strip (internal). Horizontal row of muted company wordmarks. */
export function LogoStrip({ logos = ["Acme", "Globex", "Initech", "Umbrella"], dark = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", alignItems: "center", ...style }} {...rest}>
      {logos.map((l) => <span key={l} style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-quaternary-500)", opacity: 0.8 }}>{l}</span>)}
    </div>
  );
}
export default LogoStrip;
