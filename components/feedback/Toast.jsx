import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Untitled UI PRO — Toast / notification. Floating card with icon, title, text,
 * actions and a dismiss control. Colours come from the Foundations layer: the
 * status glyph takes its ramp's 600 step, which is declared once in :root and
 * therefore keeps its light-mode value on a dark surface.
 */
const MAP = {
  gray: { icon: "InfoCircle", ramp: "gray-light-mode" },
  brand: { icon: "InfoCircle", ramp: "brand" },
  success: { icon: "CheckCircle", ramp: "success" },
  warning: { icon: "AlertTriangle", ramp: "warning" },
  error: { icon: "AlertCircle", ramp: "error" },
};
export function Toast({ color = "gray", title, children, actions, icon, onClose, annotate = false, style = {}, ...rest }) {
  const m = MAP[color] || MAP.gray;
  const part = (n) => (annotate ? n : undefined);
  return (
    <div data-sh-part={part("root")} role="status" style={{ display: "flex", gap: "var(--spacing-lg-px)", width: 360, maxWidth: "100%", padding: "var(--spacing-xl-px)", boxSizing: "border-box", background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--sh-notification-radius, var(--radius-md-px))", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)", ...style }} {...rest}>
      <span data-sh-part={part("glyph")} style={{ flexShrink: 0, marginTop: "var(--spacing-xxs-px)", color: `var(--colors-${m.ramp}-600)`, display: "inline-flex" }}><Icon name={icon || m.icon} size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div data-sh-part={part("title")} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
        {children && <div data-sh-part={part("text")} style={{ marginTop: "var(--spacing-xxs-px)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)", textWrap: "pretty" }}>{children}</div>}
        {actions && <div data-sh-part={part("action")} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--spacing-lg-px)", marginTop: "var(--spacing-lg-px)" }}>{actions}</div>}
      </div>
      {onClose && <button data-sh-part={part("close")} type="button" aria-label="Dismiss" onClick={onClose} style={{ border: "none", background: "transparent", padding: "var(--spacing-xxs-px)", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", alignSelf: "flex-start", display: "inline-flex" }}><Icon name="XClose" size={16} /></button>}
    </div>
  );
}
export default Toast;
