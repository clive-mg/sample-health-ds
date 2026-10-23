import React from "react";

/** Untitled UI PRO — Button loading icon (internal). Spinner glyph for loading buttons. */
export function ButtonLoadingIcon({ size = 20, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "uui-spin 0.7s linear infinite" }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <style>{"@keyframes uui-spin{to{transform:rotate(360deg)}}"}</style>
    </span>
  );
}
export default ButtonLoadingIcon;
