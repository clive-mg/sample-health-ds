import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Calendar header (internal). Month label with prev/next nav. */
export function CalendarHeader({ label, onPrev, onNext, style = {}, ...rest }) {
  const btn = { width: 36, height: 36, border: "none", background: "transparent", borderRadius: 8, cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <button type="button" onClick={onPrev} style={btn}><Icon name="ChevronLeft" size={20} /></button>
      <span style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{label}</span>
      <button type="button" onClick={onNext} style={btn}><Icon name="ChevronRight" size={20} /></button>
    </div>
  );
}
export default CalendarHeader;
