import React from "react";
import { StepIcon } from "./StepIcon.jsx";

/**
 * Sample Health — Progress steps.
 *
 * One component across the whole matrix: three marker types (dot, number,
 * featured chip) plus a markerless rail, three text placements (below the
 * marker, beside it, none) and both orientations.
 *
 * The connector runs edge to edge behind the markers, which are opaque and mask
 * the segment they sit on. Completed steps — and any step in error, wherever it
 * sits — are buttons when onStepClick is given; everything else is inert.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const Z = { d: 32, fd: 48, gapX: "lg", gapY: "xl", run: "4xl", title: { s: 16, l: "24px", w: 600 }, desc: { s: 14, l: "20px", w: 400 } };
const TITLE_FG = {
  complete: "var(--colors-text-text-secondary-700)",
  current: "var(--colors-text-text-brand-secondary-700)",
  upcoming: "var(--colors-text-text-quaternary-500)",
  error: "var(--colors-text-text-error-primary-600)",
  disabled: "var(--colors-text-text-disabled)"
};
const DESC_FG = {
  complete: "var(--colors-text-text-tertiary-600)",
  current: "var(--colors-text-text-tertiary-600)",
  upcoming: "var(--colors-text-text-quaternary-500)",
  error: "var(--colors-text-text-error-primary-600)",
  disabled: "var(--colors-text-text-disabled)"
};
const RAIL_FG = {
  complete: "var(--colors-background-bg-brand-solid)",
  current: "var(--colors-background-bg-brand-solid)",
  upcoming: "var(--colors-border-border-secondary)",
  error: "var(--colors-border-border-error)",
  disabled: "var(--colors-border-border-disabled)"
};
const LINE_ON = "var(--colors-background-bg-brand-solid)";
const LINE_OFF = "var(--colors-border-border-secondary)";
const RESET = { appearance: "none", background: "none", border: "none", padding: 0, margin: 0, font: "inherit", color: "inherit", textAlign: "inherit" };

export function ProgressSteps({
  steps = [],
  current = 0,
  marker = "dot",
  textPlacement = "below",
  orientation = "horizontal",
  connector = true,
  showCount = false,
  onStepClick,
  style = {},
  ...rest
}) {
  const [hot, setHot] = React.useState(-1);
  const [ring, setRing] = React.useState(-1);
  const z = Z;
  const vertical = orientation === "vertical";
  const rail = marker === "none";
  const below = !rail && textPlacement === "below" && !vertical;
  const bare = !rail && textPlacement === "none";
  const mD = marker === "featured" ? z.fd : z.d;
  const last = steps.length - 1;

  const statusOf = (s, i) => s.status || (i < current ? "complete" : i === current ? "current" : "upcoming");

  const text = (s, st, align) => (
    <span data-sh-part="text" style={{ display: "flex", flexDirection: "column", gap: sp("xxs"), minWidth: 0, textAlign: align }}>
      <span data-sh-part="title" style={{ fontFamily: "var(--font-body)", fontSize: z.title.s, lineHeight: z.title.l, fontWeight: z.title.w, color: TITLE_FG[st] }}>{s.title}</span>
      {s.description ? <span data-sh-part="desc" style={{ fontFamily: "var(--font-body)", fontSize: z.desc.s, lineHeight: z.desc.l, fontWeight: z.desc.w, color: DESC_FG[st] }}>{s.description}</span> : null}
    </span>
  );

  const track = (i) => {
    /* The line only runs between markers — no stub before the first or after the last. */
    /* Vertically the split sits on the marker centre, not the row's midpoint, so the
       line meets the marker on both sides; horizontally the marker is already centred. */
    const seg = (on, hide, size) => <span style={{ ...(size ? { height: size, flex: "none" } : { flex: 1 }), background: hide ? "transparent" : on ? LINE_ON : LINE_OFF }} />;
    return (
      <span data-sh-part="track" aria-hidden="true" style={vertical
        ? { position: "absolute", left: Math.round(mD / 2) - 1, top: 0, bottom: 0, width: 2, display: "flex", flexDirection: "column", zIndex: 0 }
        : { position: "absolute", left: 0, right: 0, top: Math.round(mD / 2) - 1, height: 2, display: "flex", zIndex: 0 }}>
        {seg(i <= current, i === 0, vertical ? Math.round(mD / 2) : 0)}
        {seg(i < current, i === last)}
      </span>
    );
  };

  const list = steps.map((s, i) => {
    const st = statusOf(s, i);
    const live = Boolean(onStepClick) && (st === "complete" || st === "error");
    const hovered = live && hot === i;
    const focused = live && ring === i;
    const icon = <StepIcon status={st} marker={rail ? "dot" : marker} index={i + 1} icon={rail ? null : s.icon} hovered={hovered} focused={focused} />;
    const wrapProps = live
      ? { as: "button", type: "button", onClick: () => onStepClick(i, s), onMouseEnter: () => setHot(i), onMouseLeave: () => setHot(-1), onFocus: () => setRing(i), onBlur: () => setRing(-1), style: { ...RESET, cursor: "pointer" } }
      : { as: "div", style: {} };
    const Tag = wrapProps.as;
    const base = { ...wrapProps.style, display: "flex", minWidth: 0, width: "100%", boxSizing: "border-box" };

    if (rail) {
      const line = <span data-sh-part="track" aria-hidden="true" style={vertical
        ? { width: 2, alignSelf: "stretch", flexShrink: 0, borderRadius: "var(--radius-full-px)", background: RAIL_FG[st] }
        : { height: 2, width: "100%", borderRadius: "var(--radius-full-px)", background: RAIL_FG[st] }} />;
      return (
        <li key={i} data-sh-part="step" aria-current={st === "current" ? "step" : undefined} style={{ display: "flex", flex: vertical ? "none" : 1, minWidth: 0, paddingBottom: vertical && i < last ? sp("xl") : 0 }}>
          <Tag {...(live ? { type: "button", onClick: () => onStepClick(i, s), onMouseEnter: () => setHot(i), onMouseLeave: () => setHot(-1), onFocus: () => setRing(i), onBlur: () => setRing(-1) } : {})}
            style={{ ...base, flexDirection: vertical ? "row" : "column", gap: sp(vertical ? "xl" : "lg"), alignItems: vertical ? "stretch" : "flex-start" }}>
            {line}
            {text(s, st, "left")}
          </Tag>
        </li>
      );
    }

    if (vertical) {
      const pad = Math.max(0, Math.round((mD - parseInt(z.title.l, 10)) / 2));
      return (
        <li key={i} data-sh-part="step" aria-current={st === "current" ? "step" : undefined} style={{ position: "relative", display: "flex", paddingBottom: i < last ? sp(z.run) : 0 }}>
          {connector && steps.length > 1 ? track(i) : null}
          <Tag {...(live ? { type: "button", onClick: () => onStepClick(i, s), onMouseEnter: () => setHot(i), onMouseLeave: () => setHot(-1), onFocus: () => setRing(i), onBlur: () => setRing(-1) } : {})}
            style={{ ...base, position: "relative", zIndex: 1, gap: sp(z.gapX), alignItems: "flex-start" }}>
            {icon}
            {bare ? null : <span style={{ paddingTop: pad, display: "flex", minWidth: 0 }}>{text(s, st, "left")}</span>}
          </Tag>
        </li>
      );
    }

    const spread = below || connector;
    return (
      <li key={i} data-sh-part="step" aria-current={st === "current" ? "step" : undefined} style={{ position: "relative", display: "flex", flex: spread ? 1 : "0 1 auto", minWidth: 0 }}>
        {connector && (below || bare) && steps.length > 1 ? track(i) : null}
        <Tag {...(live ? { type: "button", onClick: () => onStepClick(i, s), onMouseEnter: () => setHot(i), onMouseLeave: () => setHot(-1), onFocus: () => setRing(i), onBlur: () => setRing(-1) } : {})}
          style={{ ...base, position: "relative", zIndex: 1, flexDirection: below ? "column" : "row", alignItems: "center", gap: sp(below ? z.gapY : z.gapX), justifyContent: below || bare ? "center" : "flex-start" }}>
          {icon}
          {bare ? null : text(s, st, below ? "center" : "left")}
          {!below && !bare && connector && i < last ? <span data-sh-part="track" aria-hidden="true" style={{ flex: 1, minWidth: 24, height: 2, background: i < current ? LINE_ON : LINE_OFF }} /> : null}
        </Tag>
      </li>
    );
  });

  const gap = rail ? (vertical ? 0 : sp("xl")) : vertical || below || (bare && connector) ? 0 : bare ? sp("md") : sp("xl");
  const row = (
    <ol data-sh-part="root" style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "stretch" : bare ? "center" : "flex-start", gap, listStyle: "none", margin: 0, padding: 0, ...(showCount ? {} : style) }} {...(showCount ? {} : rest)}>
      {list}
    </ol>
  );

  if (!showCount) return row;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: sp("xl"), ...style }} {...rest}>
      <span data-sh-part="count" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "var(--colors-text-text-secondary-700)", whiteSpace: "nowrap" }}>
        {"Step " + Math.min(current + 1, steps.length) + " of " + steps.length}
      </span>
      {row}
    </div>
  );
}
export default ProgressSteps;
