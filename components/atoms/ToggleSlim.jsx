import React from "react";

/** Untitled UI PRO — Toggle slim (internal). Thin track toggle variant. */
export function ToggleSlim({ checked = false, onClick, style = {}, ...rest }) {
  return (
    <span onClick={onClick} style={{ display: "inline-block", position: "relative", width: 40, height: 12, borderRadius: 9999, cursor: "pointer", background: checked ? "var(--colors-brand-200)" : "var(--colors-background-bg-tertiary)", ...style }} {...rest}>
      <span style={{ position: "absolute", top: -4, left: checked ? 20 : 0, width: 20, height: 20, borderRadius: "50%", background: checked ? "var(--colors-background-bg-brand-solid)" : "var(--colors-base-white)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)", transition: "left 150ms ease" }} />
    </span>
  );
}
export default ToggleSlim;
