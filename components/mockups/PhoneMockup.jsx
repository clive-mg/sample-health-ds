import React from "react";

/** Untitled UI PRO — Phone mockup. iPhone-style bezel with a notch around screen content. */
export function PhoneMockup({ children, width = 280, style = {}, ...rest }) {
  const h = width * 2.02;
  return (
    <div style={{ width, height: h, borderRadius: 44, padding: 10, background: "var(--colors-gray-light-mode-900)", boxShadow: "0px 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01)", boxSizing: "border-box", ...style }} {...rest}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 34, overflow: "hidden", background: "var(--colors-background-bg-primary)" }}>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 96, height: 26, borderRadius: 16, background: "var(--colors-gray-light-mode-900)", zIndex: 2 }} />
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>{children}</div>
      </div>
    </div>
  );
}
export default PhoneMockup;
