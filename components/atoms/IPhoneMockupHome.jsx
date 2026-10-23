import React from "react";

/** Untitled UI PRO — iPhone mockup home (internal). Full phone home screen scaffold. */
import { IPhoneStatusBar } from "./IPhoneStatusBar.jsx";
export function IPhoneMockupHome({ children, style = {}, ...rest }) {
  return (
    <div style={{ width: 280, height: 566, borderRadius: 44, padding: 10, background: "var(--colors-gray-light-mode-900)", boxShadow: "0px 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01)", boxSizing: "border-box", ...style }} {...rest}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 34, overflow: "hidden", background: "var(--colors-background-bg-primary)" }}>
        <IPhoneStatusBar />
        <div style={{ height: "calc(100% - 44px)", overflow: "auto" }}>{children}</div>
      </div>
    </div>
  );
}
export default IPhoneMockupHome;
