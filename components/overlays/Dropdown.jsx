import React from "react";

/**
 * Untitled UI PRO — Dropdown menu. A trigger plus a floating list of actions.
 * items: [{ label, icon, shortcut, onClick, divider, header, destructive,
 * disabled, selected }].
 *
 * The menu is color.surface.default on shadow.lg inside a color.border.subtle
 * hairline, padded spacing.xs. Items are spacing.md / spacing.lg over a 20px
 * line, so every item is 36px tall — the same control step as a sm button.
 * Hover, keyboard focus, selected and disabled are item states; a header item
 * opens a labelled section and a divider closes one.
 *
 * `inline` renders the panel in normal flow instead of floating it under a
 * trigger — same surface, padding and items, for documentation and for menus
 * that are already inside a positioned container.
 */
const sp = (k) => `var(--spacing-${k}-px)`;

export function Dropdown({ trigger, items = [], align = "left", open: openProp, inline = false, style = {}, ...rest }) {
  const controlled = openProp != null;
  const [openState, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const [focus, setFocus] = React.useState(-1);
  const open = controlled ? openProp : openState;
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (controlled) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [controlled]);

  const itemColor = (it) =>
    it.disabled ? "var(--colors-text-text-disabled)"
      : it.destructive ? "var(--colors-text-text-error-primary-600)"
        : "var(--colors-text-text-secondary-700)";

  return (
    <span ref={ref} data-sh-part="root" style={{ position: inline ? "static" : "relative", display: inline ? "block" : "inline-flex", ...style }} {...rest}>
      {trigger && <span data-sh-part="trigger" onClick={() => !controlled && setOpen((o) => !o)}>{trigger}</span>}
      {open && (
        <div
          data-sh-part="menu"
          role="menu"
          onKeyDown={(e) => { if (e.key === "Escape" && !controlled) setOpen(false); }}
          style={{
            position: inline ? "static" : "absolute",
            ...(inline ? {} : { top: "100%", [align]: 0, marginTop: sp("md"), zIndex: 60 }),
            width: inline ? "max-content" : undefined,
            minWidth: 240,
            background: "var(--colors-background-bg-primary)",
            border: "1px solid var(--colors-border-border-secondary)",
            borderRadius: "var(--sh-dropdown-radius, var(--radius-md-px))",
            boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
            padding: sp("xs"),
          }}
        >
          {items.map((it, i) => {
            if (it.divider) return <div key={i} data-sh-part="divider" style={{ height: 1, background: "var(--colors-border-border-secondary)", margin: `${sp("xs")} 0` }} />;
            if (it.header) return (
              <div
                key={i}
                data-sh-part="header"
                style={{
                  padding: `${sp("md")} ${sp("lg")} ${sp("xs")}`,
                  fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 700,
                  letterSpacing: "var(--tracking-wide)", textTransform: "uppercase",
                  color: "var(--colors-text-text-tertiary-600)",
                }}
              >{it.header}</div>
            );
            const live = !it.disabled && (hover === i || focus === i);
            return (
              <button
                key={i}
                data-sh-part="item"
                type="button"
                role="menuitem"
                disabled={it.disabled}
                aria-checked={it.selected ? true : undefined}
                onClick={() => { if (it.disabled) return; it.onClick && it.onClick(); if (!controlled) setOpen(false); }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(-1)}
                style={{
                  display: "flex", alignItems: "center", gap: sp("md"), width: "100%",
                  padding: `${sp("md")} ${sp("lg")}`, border: "none", borderRadius: "var(--radius-sm-px)",
                  textAlign: "left", cursor: it.disabled ? "default" : "pointer", outline: "none",
                  fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: it.selected ? 600 : 400,
                  color: itemColor(it),
                  background: it.selected
                    ? "var(--colors-background-bg-brand-primary)"
                    : live ? "var(--colors-background-bg-primary-hover)" : "transparent",
                  boxShadow: focus === i && !it.disabled ? "0 0 0 2px var(--colors-effects-focus-rings-focus-ring)" : "none",
                }}
              >
                {it.icon && <span data-sh-part="item-icon" style={{ display: "inline-flex", color: it.disabled || it.destructive ? "currentColor" : "var(--colors-text-text-tertiary-600)" }}>{it.icon}</span>}
                <span data-sh-part="item-label" style={{ flex: 1 }}>{it.label}</span>
                {it.shortcut && <span data-sh-part="shortcut" style={{ fontSize: 12, lineHeight: "18px", fontWeight: 500, color: "var(--colors-text-text-tertiary-600)" }}>{it.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </span>
  );
}
export default Dropdown;
