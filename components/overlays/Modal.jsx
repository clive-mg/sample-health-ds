import React from "react";
import { CloseButton } from "../buttons/CloseButton.jsx";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";

/**
 * Sample Health — Modal. Two kinds on one component.
 *
 * variant="dialogue" is the fixed 480px decision box: icon, title, a sentence
 * or two, a pair of actions. It has no dividers and no size prop, because a
 * dialogue that needs to be resized is a content modal.
 *
 * variant="content" is the working surface: a header bar, a scrolling body and
 * an optional footer, at 480 / 640 / 800 / 1024 or fullscreen. position="right"
 * turns the same panel into a slide-out; fullscreen is centre-only, so a right
 * slide-out clamps to xl.
 *
 * Padding, gaps and radius come from the spacing scale. Fullscreen drops the
 * radius and the scrim — there is nothing behind it left to dim.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const SIZES = { sm: 480, md: 640, lg: 800, xl: 1024 };
const TITLE = { fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, lineHeight: "22px", letterSpacing: "0", color: "var(--colors-text-text-primary-900)" };
const DESC = { fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" };

function useNarrow(px = 640) {
  const q = "(max-width:" + (px - 1) + "px)";
  const [narrow, setNarrow] = React.useState(() => (typeof window === "undefined" ? false : window.matchMedia(q).matches));
  React.useEffect(() => {
    const m = window.matchMedia(q);
    const on = (e) => setNarrow(e.matches);
    setNarrow(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [q]);
  return narrow;
}

export function Modal({
  open = true,
  onClose,
  variant = "dialogue",
  size = "md",
  position = "center",
  icon = null,
  iconColor = "brand",
  iconAlign = "left",
  title,
  description,
  children,
  actions = null,
  footerLeading = null,
  showClose = true,
  dismissOnScrim = true,
  inline = false,
  style = {},
  ...rest
}) {
  const narrow = useNarrow(640);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setShown(false); return; }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  React.useEffect(() => {
    if (!open || !onClose) return;
    const on = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", on);
    return () => document.removeEventListener("keydown", on);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open || inline || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open, inline]);

  if (!open) return null;

  const content = variant === "content";
  const right = content && position === "right";
  /* Fullscreen is centre-only; a right slide-out takes the widest fixed step. */
  const full = content && !right && (size === "full" || (narrow && content));
  const sheet = content && narrow;
  const width = !content ? SIZES.sm : full ? "100%" : SIZES[size === "full" ? "xl" : size] || SIZES.md;
  const hasFooter = content ? Boolean(actions || footerLeading) : Boolean(actions);
  const centered = !content && iconAlign === "center";
  const iconNode = icon
    ? <span data-sh-part="icon" style={{ display: "inline-flex" }}>
        <FeaturedIcon size={centered ? "md" : "sm"} color={iconColor}>{icon}</FeaturedIcon>
      </span>
    : null;

  const overlay = {
    position: inline ? "absolute" : "fixed", inset: 0, zIndex: 100,
    display: "flex", alignItems: "center",
    justifyContent: right ? "flex-end" : "center",
    padding: full || right || sheet ? 0 : sp("4xl"),
    boxSizing: "border-box",
    background: full || sheet ? "transparent" : "color-mix(in srgb, var(--colors-background-bg-overlay) 70%, transparent)",
    opacity: shown ? 1 : 0, transition: "opacity 160ms ease-out",
  };

  const edge = full || sheet || right;
  const panel = {
    position: "relative", display: "flex", flexDirection: "column",
    width, maxWidth: "100%",
    height: edge ? "100%" : undefined, maxHeight: "100%",
    background: "var(--colors-background-bg-primary)",
    borderRadius: edge ? 0 : "var(--sh-modal-radius, var(--radius-xl-px))",
    boxShadow: full || sheet ? "none" : "0px 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01), 0px 8px 8px -4px var(--colors-effects-shadows-shadow-xl-02)",
    boxSizing: "border-box",
    transform: shown ? "none" : right ? "translateX(24px)" : "scale(0.98)",
    opacity: shown ? 1 : 0,
    transition: "transform 200ms cubic-bezier(.2,.7,.3,1), opacity 160ms ease-out",
    ...style,
  };

  const closeNode = showClose && onClose
    ? <span data-sh-part="close" style={{ display: "inline-flex", flexShrink: 0 }}><CloseButton size="sm" onClick={onClose} aria-label="Close" /></span>
    : null;

  const heading = (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: sp("xs") }}>
      {title && <div data-sh-part="title" style={TITLE}>{title}</div>}
      {description && <div data-sh-part="desc" style={DESC}>{description}</div>}
    </div>
  );

  const actionRow = hasFooter && (
    <div data-sh-part="actions" style={{
      display: "flex", gap: sp("lg"),
      flexDirection: narrow ? "column-reverse" : "row",
      alignItems: narrow ? "stretch" : "center",
      justifyContent: footerLeading ? "space-between" : centered ? "center" : "flex-end",
    }}>
      {footerLeading ? <div style={{ minWidth: 0 }}>{footerLeading}</div> : null}
      {actions ? <div style={{ display: "flex", gap: sp("lg"), flexDirection: narrow ? "column-reverse" : "row", alignItems: narrow ? "stretch" : "center" }}>{actions}</div> : null}
    </div>
  );

  return (
    <div data-sh-part="scrim" style={overlay} onClick={dismissOnScrim && onClose ? onClose : undefined}>
      <div
        data-sh-part="panel"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={panel}
        {...rest}
      >
        {content ? (
          <React.Fragment>
            <div data-sh-part="header" style={{
              display: "flex", gap: sp("xl"), alignItems: "flex-start",
              padding: sp("3xl"), borderBottom: "1px solid var(--colors-border-border-secondary)",
            }}>
              {iconNode}
              {heading}
              {closeNode ? <span style={{ display: "inline-flex", alignItems: "center", height: TITLE.lineHeight, flexShrink: 0 }}>{closeNode}</span> : null}
            </div>
            <div data-sh-part="body" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: sp("3xl") }}>{children}</div>
            {hasFooter && (
              <div data-sh-part="footer" style={{ padding: sp("3xl"), borderTop: "1px solid var(--colors-border-border-secondary)" }}>{actionRow}</div>
            )}
          </React.Fragment>
        ) : (
          <div style={{ padding: sp("3xl"), display: "flex", flexDirection: "column", gap: sp("3xl") }}>
            <div style={{
              display: "flex", gap: sp("xl"),
              flexDirection: centered ? "column" : "row",
              alignItems: centered ? "center" : "flex-start",
              textAlign: centered ? "center" : "left",
            }}>
              {iconNode}
              {heading}
              {!centered && closeNode}
            </div>
            {children ? <div data-sh-part="body" style={{ ...DESC, textAlign: centered ? "center" : "left" }}>{children}</div> : null}
            {actionRow}
            {centered && closeNode ? <span style={{ position: "absolute", top: sp("xl"), right: sp("xl") }}>{closeNode}</span> : null}
          </div>
        )}
      </div>
    </div>
  );
}
export default Modal;
