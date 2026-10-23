import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { FeaturedIcon } from "./FeaturedIcon.jsx";
import { CloseButton } from "../buttons/CloseButton.jsx";

/**
 * Untitled UI PRO — Alert. Two variants share one component:
 *
 *  inline — a bordered, tinted callout that sits in the content column.
 *  banner — a full-width band pinned across the top of a page, its content
 *           constrained to the page width.
 *
 * Colours come from the Foundations layer. The neutral alert uses semantic
 * surface/border tokens, so it flips with the theme; the status alerts take
 * ramp steps (color.<status>.50 / .200), which are declared once in :root and
 * therefore keep their light-mode value on a dark surface.
 */
const MAP = {
  gray: { icon: "InfoCircle", ramp: "gray-light-mode", chip: "gray" },
  brand: { icon: "InfoCircle", ramp: "brand", chip: "brand" },
  info: { icon: "InfoCircle", ramp: "brand", chip: "brand" },
  warning: { icon: "AlertTriangle", ramp: "warning", chip: "warning" },
  error: { icon: "AlertCircle", ramp: "error", chip: "error" },
  success: { icon: "CheckCircle", ramp: "success", chip: "success" },
};

export function Alert({
  variant = "inline", color = "brand", title, children, actions, icon, onClose,
  sticky = false, contentWidth = 1280, role, annotate = false, style = {}, ...rest
}) {
  const m = MAP[color] || MAP.brand;
  const neutral = color === "gray";
  const part = (n) => (annotate ? n : undefined);
  const tint = neutral ? "var(--colors-background-bg-secondary)" : `var(--colors-${m.ramp}-50)`;
  const edge = neutral ? "var(--colors-border-border-secondary)" : `var(--colors-${m.ramp}-200)`;
  const live = role || (color === "error" || color === "warning" ? "alert" : "status");

  const chip = (
    <FeaturedIcon data-sh-part={part("chip")} size="sm" color={m.chip} style={{
      background: "var(--colors-background-bg-primary)",
      border: "1px solid var(--colors-border-border-secondary)",
    }}>
      <Icon name={icon || m.icon} />
    </FeaturedIcon>
  );
  const close = onClose
    ? <CloseButton data-sh-part={part("close")} size="sm" onClick={onClose} aria-label="Dismiss" style={{ flexShrink: 0 }} />
    : null;

  if (variant === "banner") {
    return (
      <div data-sh-part={part("root")} role={live} style={{
        boxSizing: "border-box", width: "100%", background: tint,
        borderBottom: `1px solid ${edge}`,
        ...(sticky ? { position: "sticky", top: 0, zIndex: 40 } : null),
        ...style,
      }} {...rest}>
        <div data-sh-part={part("inner")} style={{
          display: "flex", alignItems: "center", gap: "var(--spacing-xl-px)",
          boxSizing: "border-box", maxWidth: contentWidth, margin: "0 auto",
          padding: "var(--spacing-xl-px) var(--spacing-3xl-px)",
        }}>
          {chip}
          <div data-sh-part={part("text")} style={{
            flex: 1, minWidth: 0, fontFamily: "var(--font-body)", fontSize: 14,
            fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)",
            textWrap: "pretty",
          }}>
            {title ? <strong data-sh-part={part("title")} style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</strong> : null}
            {title && children ? " " : null}
            {children}
          </div>
          {actions ? <div data-sh-part={part("action")} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)", flexShrink: 0 }}>{actions}</div> : null}
          {close}
        </div>
      </div>
    );
  }

  return (
    <div data-sh-part={part("root")} role={live} style={{
      display: "flex", alignItems: title || actions ? "flex-start" : "center", gap: "var(--spacing-lg-px)",
      padding: "var(--spacing-xl-px)", boxSizing: "border-box",
      background: tint, border: `1px solid ${edge}`, borderRadius: "var(--sh-alert-radius, var(--radius-md-px))",
      ...style,
    }} {...rest}>
      {chip}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--spacing-xs-px)" }}>
        {title ? <div data-sh-part={part("title")} style={{
          fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px",
          color: "var(--colors-text-text-primary-900)",
        }}>{title}</div> : null}
        {children ? <div data-sh-part={part("text")} style={{
          fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px",
          color: "var(--colors-text-text-tertiary-600)", textWrap: "pretty",
        }}>{children}</div> : null}
        {actions ? <div data-sh-part={part("action")} style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "var(--spacing-xl-px)", marginTop: "var(--spacing-md-px)",
        }}>{actions}</div> : null}
      </div>
      {close}
    </div>
  );
}
export default Alert;
