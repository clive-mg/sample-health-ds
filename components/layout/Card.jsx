import React from "react";

/** Untitled UI PRO — Card. White surface, radius 12, hairline border, xs–sm shadow. */
export function Card({ children, padding = 24, style = {}, ...rest }) {
  return (
    <div style={{ background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", padding, boxSizing: "border-box", ...style }} {...rest}>
      {children}
    </div>
  );
}
export default Card;
