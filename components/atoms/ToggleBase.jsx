import React from "react";

/** Untitled UI PRO — Toggle base (internal build-block). The switch track+knob without label. */
export function ToggleBase({ size = "md", checked = false, onClick, style = {}, ...rest }) {
  const w = size === "sm" ? 36 : 44, h = size === "sm" ? 20 : 24, knob = h - 4;
  return (
    <span onClick={onClick} style={{ display: "inline-block", position: "relative", width: w, height: h, borderRadius: 9999, cursor: "pointer", background: checked ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-tertiary)", ...style }} {...rest}>
      <span style={{ position: "absolute", top: 2, left: checked ? w - knob - 2 : 2, width: knob, height: knob, borderRadius: "50%", background: "#fff", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)", transition: "left 150ms ease" }} />
    </span>
  );
}
export default ToggleBase;
