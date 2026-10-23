import React from "react";

/** Untitled UI PRO — Tag count (internal build-block). Small counter chip inside a tag. */
export function TagCount({ children, size = "md", style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 18, height: size === "sm" ? 16 : 18, padding: "0 5px", borderRadius: 4, background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>{children}</span>;
}
export default TagCount;
