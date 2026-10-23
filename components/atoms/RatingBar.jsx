import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Rating bar (internal). Horizontal rating distribution bar with count. */
export function RatingBar({ stars = 5, pct = 80, count, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", fontSize: 14, ...style }} {...rest}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, width: 40, color: "var(--colors-text-text-secondary-700)" }}>{stars}<Icon name="Star01" size={14} style={{ color: "var(--colors-warning-400)" }} /></span>
      <span style={{ flex: 1, height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)" }}><span style={{ display: "block", width: `${pct}%`, height: "100%", borderRadius: 9999, background: "var(--colors-warning-400)" }} /></span>
      {count != null && <span style={{ width: 40, textAlign: "right", color: "var(--colors-text-text-tertiary-600)" }}>{count}</span>}
    </div>
  );
}
export default RatingBar;
