import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Sidebar section (internal). Collapsible sidebar group with heading. */
export function SidebarSection({ title, children, defaultOpen = true, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 12px", border: "none", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--colors-text-text-quaternary-500)" }}>
        {title}<Icon name="ChevronDown" size={16} style={{ transform: open ? "none" : "rotate(-90deg)", transition: "transform 150ms ease" }} />
      </button>
      {open && <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</div>}
    </div>
  );
}
export default SidebarSection;
