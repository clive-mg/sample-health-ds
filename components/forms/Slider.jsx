import React from "react";

/**
 * Untitled UI PRO — Slider. A full-radius 8px track with a brand fill and a
 * 24px circular handle. The handle is a real slider role, so it takes tab focus
 * and arrow keys, and shows the same soft brand focus ring as the other
 * controls. Optional value tooltip, min/max end labels, step ticks and a
 * two-handle range.
 */
const SLIDER_Z = { track: 8, handle: 24 };
const sp = (k) => `var(--spacing-${k}-px)`;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function Slider({
  min = 0, max = 100, step = 1, value, defaultValue, range = false,
  disabled = false, ticks = false, tooltip = "none", endLabels = false,
  formatValue, onChange, style = {}, ...rest
}) {
  const z = SLIDER_Z;
  const fallback = range ? [20, 60] : 40;
  const [internal, setInternal] = React.useState(defaultValue != null ? defaultValue : fallback);
  const [active, setActive] = React.useState(-1);
  const [focused, setFocused] = React.useState(-1);
  const [hovered, setHovered] = React.useState(-1);
  const railRef = React.useRef(null);
  const handleRefs = React.useRef([]);
  const raw = value != null ? value : internal;
  const vals = range ? [Math.min(raw[0], raw[1]), Math.max(raw[0], raw[1])] : [raw];
  const fmt = formatValue || ((v) => String(v));
  const pct = (v) => ((v - min) / (max - min)) * 100;
  const snap = (v) => clamp(Math.round(v / step) * step, min, max);

  const commit = (next) => {
    if (value == null) setInternal(next);
    onChange && onChange(next);
  };
  const setAt = (i, v) => {
    if (!range) return commit(snap(v));
    const next = vals.slice();
    next[i] = snap(v);
    commit(i === 0 ? [Math.min(next[0], next[1]), next[1]] : [next[0], Math.max(next[0], next[1])]);
  };
  const valueFromX = (clientX) => {
    const r = railRef.current.getBoundingClientRect();
    return min + clamp((clientX - r.left) / r.width, 0, 1) * (max - min);
  };
  const onRailPointerDown = (e) => {
    if (disabled || !railRef.current) return;
    const v = valueFromX(e.clientX);
    const i = range && Math.abs(vals[1] - v) < Math.abs(vals[0] - v) ? 1 : 0;
    setActive(i);
    setAt(i, v);
    if (handleRefs.current[i]) handleRefs.current[i].focus();
    const move = (ev) => setAt(i, valueFromX(ev.clientX));
    const up = () => {
      setActive(-1);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onKeyDown = (i) => (e) => {
    if (disabled) return;
    const big = step * 10;
    const map = {
      ArrowRight: vals[i] + step, ArrowUp: vals[i] + step,
      ArrowLeft: vals[i] - step, ArrowDown: vals[i] - step,
      PageUp: vals[i] + big, PageDown: vals[i] - big, Home: min, End: max
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    setAt(i, map[e.key]);
  };

  const tickValues = [];
  if (ticks) for (let v = min; v <= max; v += step) tickValues.push(v);

  const handles = vals.map((v, i) => {
    const lit = !disabled && (active === i || focused === i || hovered === i);
    const showTip = tooltip === "always" || (tooltip === "hover" && lit);
    return (
      <span key={i} style={{ position: "absolute", top: "50%", left: `${pct(v)}%`, transform: "translate(-50%, -50%)" }}>
        {showTip && (
          <span data-sh-part="tooltip" style={{
            position: "absolute", bottom: "50%", left: "50%", transform: "translate(-50%, 0)",
            marginBottom: `calc(${z.handle / 2}px + ${sp("md")})`, whiteSpace: "nowrap",
            padding: `${sp("md")} ${sp("lg")}`, borderRadius: "var(--radius-md-px)",
            background: "var(--colors-background-bg-primary-solid)", color: "var(--colors-text-text-primary-on-brand)",
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px",
            boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
            pointerEvents: "none"
          }}>{fmt(v)}</span>
        )}
        <span
          data-sh-part={i === 0 ? "handle" : "handle-end"}
          role="slider" tabIndex={disabled ? -1 : 0}
          aria-valuemin={range && i === 1 ? vals[0] : min}
          aria-valuemax={range && i === 0 ? vals[1] : max}
          aria-valuenow={v} aria-valuetext={fmt(v)} aria-disabled={disabled || undefined}
          ref={(el) => { handleRefs.current[i] = el; }}
          onKeyDown={onKeyDown(i)}
          onFocus={() => setFocused(i)} onBlur={() => setFocused(-1)}
          onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered(-1)}
          style={{
            display: "block", width: z.handle, height: z.handle, borderRadius: "var(--radius-full-px)",
            background: "var(--colors-background-bg-primary)", border: "1.5px solid var(--colors-border-border-brand)",
            boxShadow: lit
              ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01), 0 0 6px 1px var(--colors-brand-50)"
              : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)",
            outline: "none", cursor: disabled ? "not-allowed" : active === i ? "grabbing" : "grab", touchAction: "none",
            transition: "box-shadow 120ms ease"
          }}
        />
      </span>
    );
  });

  const fillLeft = range ? pct(vals[0]) : 0;
  const fillRight = pct(range ? vals[1] : vals[0]);
  const endText = { fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" };

  return (
    <div data-sh-part="root" style={{ opacity: disabled ? 0.6 : 1, ...style }} {...rest}>
      <div
        ref={railRef} data-sh-part="track" onPointerDown={onRailPointerDown}
        style={{
          position: "relative", height: z.track, borderRadius: "var(--radius-full-px)",
          background: "var(--colors-background-bg-disabled)", cursor: disabled ? "not-allowed" : "pointer", touchAction: "none"
        }}
      >
        <div data-sh-part="fill" style={{
          position: "absolute", top: 0, bottom: 0, left: `${fillLeft}%`, width: `${fillRight - fillLeft}%`,
          borderRadius: "var(--radius-full-px)", background: "var(--colors-background-bg-brand-solid)"
        }} />
        {handles}
      </div>
      {ticks && (
        <div data-sh-part="ticks" style={{ position: "relative", height: 4, marginTop: sp("md") }}>
          {tickValues.map((v) => (
            <span key={v} style={{
              position: "absolute", left: `${pct(v)}%`, transform: "translateX(-50%)", width: 2, height: 4,
              borderRadius: "var(--radius-full-px)", background: "var(--colors-border-border-primary)"
            }} />
          ))}
        </div>
      )}
      {endLabels && (
        <div data-sh-part="ends" style={{ display: "flex", justifyContent: "space-between", marginTop: sp("md") }}>
          <span data-sh-part="min" style={endText}>{fmt(min)}</span>
          <span data-sh-part="max" style={endText}>{fmt(max)}</span>
        </div>
      )}
    </div>
  );
}
export default Slider;
