import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Sample Health — Accordion.
 *
 * A disclosure list: a row of headers, one panel open beneath the one you press.
 * Four containers (dividers, one card round the list, a card per item, a filled
 * panel per item), three indicators, and either one panel open at a time or
 * several. Items carry a title, optional supporting text and any content.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const RADIUS = "var(--radius-md-px)";
const SUBTLE = "var(--colors-border-border-secondary)";
const RESET = { appearance: "none", border: "none", margin: 0, font: "inherit", textAlign: "left", cursor: "pointer" };

const asList = (v) => (v == null || v === false ? [] : Array.isArray(v) ? v.slice() : [v]);

export function Accordion({
  items = [],
  variant = "dividers",
  indicator = "chevron",
  align = "start",
  multiple = false,
  defaultOpen = 0,
  onOpenChange,
  style = {},
  ...rest
}) {
  const uid = React.useMemo(() => "acc-" + Math.random().toString(36).slice(2, 8), []);
  const [open, setOpen] = React.useState(() => asList(defaultOpen));
  const [hot, setHot] = React.useState(-1);
  const [ring, setRing] = React.useState(-1);

  const isOpen = (i) => open.indexOf(i) > -1;
  const toggle = (i) => {
    const next = isOpen(i) ? open.filter((x) => x !== i) : multiple ? open.concat(i) : [i];
    setOpen(next);
    if (onOpenChange) onOpenChange(multiple ? next : next.length ? next[0] : null);
  };

  const dividers = variant === "dividers";
  const cards = variant === "cards";
  const filled = variant === "filled";
  const card = variant === "card";

  const pad = dividers ? sp("none") : sp("xl");
  const headPad = sp("xl") + " " + pad;
  const bodyPad = "0 " + pad + " " + sp("xl");
  const hoverBg = filled ? "var(--colors-gray-light-mode-100)" : "var(--colors-background-bg-primary-hover)";

  const root = {
    display: "flex",
    flexDirection: "column",
    gap: cards ? sp("md") : filled ? sp("md") : 0,
    ...(card ? { border: "1px solid " + SUBTLE, borderRadius: RADIUS, background: "var(--colors-background-bg-primary)", overflow: "hidden" } : {}),
    ...style
  };

  return (
    <div data-sh-part="root" style={root} {...rest}>
      {items.map((it, i) => {
        const on = isOpen(i);
        const off = Boolean(it.disabled);
        const lit = !off && (hot === i || ring === i);
        const itemStyle = {
          ...(dividers || card ? { borderTop: i === 0 ? "none" : "1px solid " + SUBTLE } : {}),
          ...(cards ? { border: "1px solid " + SUBTLE, borderRadius: RADIUS, background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", overflow: "hidden" } : {}),
          ...(filled ? { borderRadius: RADIUS, background: "var(--colors-background-bg-secondary)", overflow: "hidden" } : {}),
          ...(card ? { overflow: "hidden" } : {})
        };
        const glyph = indicator === "plusMinus" ? (on ? "Minus" : "Plus") : "ChevronDown";
        const inline = indicator === "chevronInline";
        const mark = (
          <span data-sh-part="indicator" aria-hidden="true" style={{
            display: "inline-flex", flexShrink: 0, height: 20,
            color: off ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-tertiary-600)",
            transform: indicator === "plusMinus" || !on ? "none" : "rotate(180deg)",
            transition: "transform 200ms ease, color 120ms ease"
          }}><Icon name={glyph} size={20} /></span>
        );

        return (
          <div key={i} data-sh-part="item" style={itemStyle}>
            <button type="button" id={uid + "-h" + i} data-sh-part="header"
              aria-expanded={on} aria-controls={uid + "-p" + i} aria-disabled={off || undefined} disabled={off}
              onClick={off ? undefined : () => toggle(i)}
              onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(-1)}
              onFocus={() => setRing(i)} onBlur={() => setRing(-1)}
              style={{
                ...RESET, display: "flex", alignItems: align === "center" ? "center" : "flex-start", gap: inline ? sp("md") : sp("xl"), width: "100%", boxSizing: "border-box",
                flexDirection: indicator === "chevronLeft" ? "row-reverse" : "row",
                justifyContent: inline ? "flex-start" : "space-between", padding: headPad,
                background: lit ? hoverBg : "transparent",
                cursor: off ? "default" : "pointer",
                outline: "none",
                boxShadow: ring === i && !off ? "inset 0px 0px 0px 2px var(--colors-effects-focus-rings-focus-ring)" : "none",
                transition: "background 120ms ease, box-shadow 120ms ease"
              }}>
              <span data-sh-part="text" style={{ display: "flex", flexDirection: "column", gap: sp("xxs"), minWidth: 0, flex: inline ? "0 1 auto" : 1 }}>
                <span data-sh-part="title" style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "20px", fontWeight: 600, color: off ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-primary-900)" }}>{it.title}</span>
                {it.supportingText ? <span data-sh-part="supporting" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: off ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-tertiary-600)" }}>{it.supportingText}</span> : null}
              </span>
              {mark}
            </button>
            <div data-sh-part="panel" id={uid + "-p" + i} role="region" aria-labelledby={uid + "-h" + i} aria-hidden={!on}
              style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", transition: "grid-template-rows 220ms ease" }}>
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div style={{ padding: bodyPad, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Accordion;
