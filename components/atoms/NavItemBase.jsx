import React from "react";

/** Untitled UI PRO — Nav item base (internal). Bare sidebar row surface with states. */
export function NavItemBase({ children, current = false, onClick, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 6, cursor: "pointer", background: current ? "var(--colors-background-bg-active)" : hover ? "var(--colors-background-bg-primary-hover)" : "transparent", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>{children}</div>
  );
}
export default NavItemBase;
