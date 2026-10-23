import React from "react";

/** Untitled UI PRO — Video action tooltip (internal). Small dark label above video controls. */
export function VideoActionTooltip({ children, badge, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: 6, background: "var(--colors-background-bg-primary-solid)", color: "var(--colors-text-text-primary-on-brand)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, ...style }} {...rest}>
      {children}{badge && <span style={{ padding: "0 5px", borderRadius: 4, background: "rgba(255,255,255,0.16)", fontSize: 12 }}>{badge}</span>}
    </span>
  );
}
export default VideoActionTooltip;
