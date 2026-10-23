import React from "react";

/**
 * Untitled UI PRO — Tooltip. Dark gray-950 surface, white 14px text, optional
 * supporting line and an optional 8px arrow. The copy is regular; it only turns
 * semibold when a supporting line makes it a title. `open` forces the tooltip
 * visible in addition to hover — used by focusable triggers like the field help
 * icon.
 */
export function Tooltip({ children, title, supportingText, placement = "top", open = false, arrow = false, style = {}, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  }[placement];
  const arrowPos = {
    top: { top: "100%", left: "50%", marginLeft: -4, marginTop: -4 },
    bottom: { bottom: "100%", left: "50%", marginLeft: -4, marginBottom: -4 },
    left: { left: "100%", top: "50%", marginTop: -4, marginLeft: -4 },
    right: { right: "100%", top: "50%", marginTop: -4, marginRight: -4 },
  }[placement];
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} {...rest}>
      {children}
      {(show || open) && (
        <span data-sh-part="tip" style={{
          position: "absolute", zIndex: 40, ...pos,
          background: "var(--colors-background-bg-primary-solid)",
          borderRadius: "var(--sh-tooltip-radius, var(--radius-md-px))", padding: "8px 12px",
          boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
          maxWidth: 260, width: "max-content",
        }}>
          <span data-sh-part="tip-title" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: supportingText ? 600 : 400, lineHeight: "20px", color: "var(--colors-text-text-primary-on-brand)" }}>{title}</span>
          {supportingText && <span data-sh-part="tip-supporting" style={{ display: "block", marginTop: 4, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--component-colors-components-tooltips-tooltip-supporting-text)" }}>{supportingText}</span>}
          {arrow && <span data-sh-part="tip-arrow" style={{ position: "absolute", width: 8, height: 8, transform: "rotate(45deg)", background: "var(--colors-background-bg-primary-solid)", ...arrowPos }} />}
        </span>
      )}
    </span>
  );
}
export default Tooltip;
