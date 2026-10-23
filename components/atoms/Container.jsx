import React from "react";

/** Untitled UI PRO — Container (internal). Max-width centered page container with responsive padding. */
export function Container({ children, size = "desktop", style = {}, ...rest }) {
  const max = size === "narrow" ? 768 : 1280;
  return <div style={{ maxWidth: max, margin: "0 auto", paddingLeft: 32, paddingRight: 32, width: "100%", boxSizing: "border-box", ...style }} {...rest}>{children}</div>;
}
export default Container;
