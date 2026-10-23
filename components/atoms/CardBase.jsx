import React from "react";

/** Untitled UI PRO — Card (internal, plain). Bare white surface with border + xs shadow. */
export function CardBase({ children, style = {}, ...rest }) {
  return <div style={{ background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>{children}</div>;
}
export default CardBase;
