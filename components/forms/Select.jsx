import React from "react";
import { FieldHelpIcon } from "../atoms/FieldHelpIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Untitled UI PRO — Select / dropdown trigger. Padding and type follow Input:
 * sm 8/12 over a 20px line = 36px, md 8/16 over a 24px line = 40px, with the
 * 1px border as an inset shadow. Presentational menu. An option of the form
 * { group: "Label" } renders a non-selectable group heading.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const SELECT_SIZES = {
  sm: { py: "md", px: "lg", font: 14, line: "20px", chevron: 16 },
  md: { py: "md", px: "xl", font: 16, line: "24px", chevron: 20 },
};

export function Select({ size = "md", label, hint, helpText, placeholder = "Select", options = [], value, defaultValue, disabled = false, required = false, defaultOpen = false, onChange, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hovered, setHovered] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? null);
  const rootRef = React.useRef(null);
  /* defaultOpen exists so the docs diagrams can render the menu open and annotate
     it — those must not collapse on the first stray click, so outside-dismiss only
     arms once the user has actually operated the trigger. */
  const pinnedOpen = React.useRef(defaultOpen);
  const fieldRef = React.useRef(null);
  /* Open upward when the space below — to the viewport or the nearest clipping
     ancestor (a Table card's overflow:hidden, say) — can't hold the menu. */
  const [up, setUp] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!open || !fieldRef.current) { setUp(null); return; }
    const r = fieldRef.current.getBoundingClientRect();
    let lo = window.innerHeight, hi = 0;
    for (let el = fieldRef.current.parentElement; el && el !== document.body; el = el.parentElement) {
      const cs = getComputedStyle(el);
      if (/(hidden|auto|scroll|clip)/.test(cs.overflowY + cs.overflow)) { const b = el.getBoundingClientRect(); lo = Math.min(lo, b.bottom); hi = Math.max(hi, b.top); }
    }
    const need = Math.min(260, options.length * 40 + 8) + 4;
    const below = lo - r.bottom, above = r.top - hi;
    setUp(below < need && above > below ? fieldRef.current.offsetTop : null);
  }, [open, options.length]);
  React.useEffect(() => {
    if (!open || pinnedOpen.current) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown, true); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const selected = value !== undefined ? value : internal;
  const s = SELECT_SIZES[size] || SELECT_SIZES.md;
  const text = { fontFamily: "var(--font-body)", fontSize: s.font, lineHeight: s.line };
  const label2 = selected != null ? (options.find((o) => !(o && o.group != null) && (o.value ?? o) === selected)?.label ?? selected) : null;
  const fill = disabled
    ? "var(--colors-background-bg-disabled)"
    : hovered && !open
    ? "var(--colors-background-bg-primary-hover)"
    : "var(--colors-background-bg-primary)";
  return (
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", gap: sp("sm"), position: "relative", ...style }} {...rest}>
      {label && (
        <div data-sh-part="label-row" style={{ display: "flex", alignItems: "center", gap: sp("sm") }}>
          <label data-sh-part="label" style={{ ...text, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>
            {label}
            {required && <span data-sh-part="req" style={{ color: "var(--colors-error-600)" }}> *</span>}
          </label>
          {helpText && <FieldHelpIcon text={helpText} ariaLabel={typeof label === "string" ? "More information about " + label : undefined} />}
        </div>
      )}
      <button
        ref={fieldRef}
        data-sh-part="field"
        type="button"
        disabled={disabled}
        onClick={() => { pinnedOpen.current = false; setOpen((o) => !o); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...text,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("md"),
          padding: `${sp(s.py)} ${sp(s.px)}`, boxSizing: "border-box",
          background: fill,
          border: "none",
          borderRadius: "var(--sh-input-radius, var(--radius-md-px))",
          boxShadow: `${open ? "0 0 6px 1px var(--colors-brand-50), " : ""}inset 0 0 0 1px ${open ? "var(--colors-border-border-brand)" : "var(--colors-border-border-primary)"}, 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)`,
          color: disabled ? "var(--colors-text-text-disabled)" : label2 ? "var(--colors-text-text-primary-900)" : "var(--colors-text-text-placeholder)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "box-shadow 120ms ease, background 120ms ease",
        }}
      >
        <span data-sh-part="text" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label2 ?? placeholder}</span>
        <span data-sh-part="chevron" style={{ display: "inline-flex", flexShrink: 0, color: "var(--colors-text-text-placeholder)" }}>
          <Icon name="ChevronDown" size={s.chevron} />
        </span>
      </button>
      {open && (
        <div data-sh-part="menu" style={{ position: "absolute", left: 0, right: 0, ...(up != null ? { bottom: `calc(100% - ${up}px)`, marginBottom: sp("xs") } : { top: "100%", marginTop: sp("xs") }), zIndex: 20, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--sh-dropdown-radius, var(--radius-md-px))", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)", padding: sp("xs"), maxHeight: 260, overflowY: "auto" }}>
          {options.map((o, i) => {
            if (o && o.group != null) return (
              <div key={i} role="presentation" data-sh-part="group" style={{ position: "sticky", top: `calc(-1 * ${sp("xs")})`, zIndex: 1, fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 700, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--colors-text-text-tertiary-600)", background: "var(--colors-background-bg-primary)", padding: `${sp("md")} ${sp("lg")}`, ...(i > 0 ? { borderTop: "1px solid var(--colors-border-border-secondary)", marginTop: sp("xs") } : null) }}>{o.group}</div>
            );
            const val = o.value ?? o;
            const lbl = o.label ?? o;
            const sel = val === selected;
            return (
              <div key={i} data-sh-part={sel ? "item-selected" : "item"}
                onClick={() => { if (value === undefined) setInternal(val); onChange && onChange(val); setOpen(false); }}
                style={{ ...text, display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("md"), padding: `${sp("md")} ${sp("lg")}`, borderRadius: "var(--radius-sm-px)", cursor: "pointer", fontWeight: sel ? 600 : 400, color: "var(--colors-text-text-primary-900)", background: sel ? "var(--colors-brand-50)" : "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = sel ? "var(--colors-brand-50)" : "transparent")}>
                <span>{lbl}</span>
              </div>
            );
          })}
        </div>
      )}
      {hint && <span data-sh-part="hint" style={{ ...text, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{hint}</span>}
    </div>
  );
}
export default Select;
