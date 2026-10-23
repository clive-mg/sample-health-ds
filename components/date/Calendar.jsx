import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Button } from "../buttons/Button.jsx";
import { DatePickerListItem } from "../atoms/DatePickerListItem.jsx";

/**
 * Untitled UI PRO — Calendar. A 7 x 6 month grid of 40px day cells: single
 * date or a range, one or two months side by side, an optional preset rail and
 * an optional Apply / Cancel footer. Selection is a brand-solid circle; the
 * days between two endpoints take the active surface as a continuous band.
 * Arrow keys move the focused day, PageUp / PageDown move by month.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CELL = 40;

const n = (d) => (d ? d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate() : null);
const same = (a, b) => !!a && !!b && n(a) === n(b);
const addDays = (d, k) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + k);
const monthStart = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const shiftMonth = (d, k) => new Date(d.getFullYear(), d.getMonth() + k, 1);
const fmt = (d) => (d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "");

/** Built-in preset ranges, resolved from a string label. */
function resolvePreset(label) {
  const t = new Date();
  const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  switch (label) {
    case "Today": return { start: today, end: today };
    case "Yesterday": return { start: addDays(today, -1), end: addDays(today, -1) };
    case "Last 7 days": return { start: addDays(today, -6), end: today };
    case "Last 30 days": return { start: addDays(today, -29), end: today };
    case "This month": return { start: monthStart(today), end: today };
    case "Last month": return { start: shiftMonth(today, -1), end: addDays(monthStart(today), -1) };
    case "Year to date": return { start: new Date(today.getFullYear(), 0, 1), end: today };
    default: return null;
  }
}

export function Calendar({
  mode = "single",
  value,
  defaultValue,
  defaultView,
  onChange,
  months = 1,
  minDate,
  maxDate,
  showOutsideDays = true,
  presets,
  footer = false,
  onApply,
  onCancel,
  annotate = false,
  demo,
  style = {},
  ...rest
}) {
  const isRange = mode === "range";
  const today = React.useMemo(() => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }, []);
  const [internal, setInternal] = React.useState(defaultValue !== undefined ? defaultValue : isRange ? { start: null, end: null } : null);
  const selected = value !== undefined ? value : internal;
  const range = isRange ? selected || { start: null, end: null } : null;

  const anchor = defaultView || (isRange ? range.start : selected) || today;
  const [view, setView] = React.useState(() => monthStart(anchor));
  const [hover, setHover] = React.useState(null);
  const [preset, setPreset] = React.useState(null);
  const [focusDate, setFocusDate] = React.useState(null);
  const [ringOn, setRingOn] = React.useState(false);
  const cellRefs = React.useRef({});

  const lastMonthEnd = new Date(view.getFullYear(), view.getMonth() + months, 0);
  const disabledDay = (d) => (minDate && n(d) < n(minDate)) || (maxDate && n(d) > n(maxDate));

  /* While one endpoint is set, the hovered day previews the other end. */
  const lo = isRange ? range.start : null;
  const hi = isRange ? (range.end || (range.start && hover && n(hover) > n(range.start) ? hover : null)) : null;

  const commit = (next) => { if (value === undefined) setInternal(next); if (onChange) onChange(next); };
  const pick = (d) => {
    if (disabledDay(d)) return;
    setPreset(null);
    if (!isRange) return commit(d);
    if (!range.start || range.end || n(d) < n(range.start)) return commit({ start: d, end: null });
    commit({ start: range.start, end: d });
  };
  const takePreset = (label) => {
    const r = typeof label === "string" ? resolvePreset(label) : { start: label.start, end: label.end };
    if (!r) return;
    setPreset(typeof label === "string" ? label : label.label);
    setView(monthStart(months > 1 ? shiftMonth(r.end || r.start, -(months - 1)) : r.start));
    commit(isRange ? r : r.start);
  };

  const nav = (k) => setView((v) => shiftMonth(v, k));
  const ensureVisible = (d) => {
    if (n(d) < n(view)) setView(monthStart(d));
    else if (n(d) > n(lastMonthEnd)) setView(shiftMonth(monthStart(d), -(months - 1)));
  };
  const tabDate = focusDate || (isRange ? range.start : selected) || (n(today) >= n(view) && n(today) <= n(lastMonthEnd) ? today : view);
  React.useEffect(() => {
    if (!focusDate) return;
    const el = cellRefs.current[n(focusDate)];
    if (el) el.focus();
  }, [focusDate && n(focusDate)]);
  const onKeyDown = (e) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    let next = null;
    if (step) next = addDays(tabDate, step);
    else if (e.key === "Home") next = addDays(tabDate, -tabDate.getDay());
    else if (e.key === "End") next = addDays(tabDate, 6 - tabDate.getDay());
    else if (e.key === "PageUp") next = shiftMonth(tabDate, -1);
    else if (e.key === "PageDown") next = shiftMonth(tabDate, 1);
    if (!next) return;
    e.preventDefault();
    setRingOn(true);
    ensureVisible(next);
    setFocusDate(next);
  };

  const mark = { day: false, band: false, sel: false, outside: false, dow: false, dis: false };
  const p = (name) => (annotate ? name : undefined);
  const once = (name) => { if (!annotate || mark[name]) return undefined; mark[name] = true; return name; };

  function renderMonth(mi) {
    const mv = shiftMonth(view, mi);
    const lead = new Date(mv.getFullYear(), mv.getMonth(), 1).getDay();
    const first = addDays(new Date(mv.getFullYear(), mv.getMonth(), 1), -lead);
    return (
      <div key={mi} style={{ display: "flex", flexDirection: "column", gap: sp("lg") }}>
        <div data-sh-part={mi === 0 ? p("header") : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("md") }}>
          {mi === 0
            ? <button type="button" aria-label="Previous month" data-sh-part={p("nav")} onClick={() => nav(-1)} style={navBtn}><Icon name="ChevronLeft" size={20} /></button>
            : <span style={{ width: CELL }} />}
          <span data-sh-part={mi === 0 ? p("caption") : undefined} style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>
            {MONTH_NAMES[mv.getMonth()]} {mv.getFullYear()}
          </span>
          {mi === months - 1
            ? <button type="button" aria-label="Next month" onClick={() => nav(1)} style={navBtn}><Icon name="ChevronRight" size={20} /></button>
            : <span style={{ width: CELL }} />}
        </div>
        <div role="grid" onKeyDown={onKeyDown} data-sh-part={mi === 0 ? p("grid") : undefined} style={{ display: "grid", gridTemplateColumns: `repeat(7, ${CELL}px)` }}>
          {DAY_LABELS.map((d) => (
            <div key={d} data-sh-part={once("dow")} style={{ height: CELL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, lineHeight: "18px", fontWeight: 500, color: "var(--colors-text-text-secondary-700)" }}>{d}</div>
          ))}
          {Array.from({ length: 42 }, (_, i) => {
            const d = addDays(first, i);
            const outside = d.getMonth() !== mv.getMonth();
            if (outside && !showOutsideDays) return <div key={i} style={{ width: CELL, height: CELL }} />;
            const dis = disabledDay(d);
            const isStart = isRange && same(d, lo);
            const isEnd = isRange && same(d, hi);
            const sel = isRange ? isStart || isEnd : same(d, selected);
            const band = isRange && lo && hi && n(lo) !== n(hi) && n(d) >= n(lo) && n(d) <= n(hi);
            const isToday = same(d, today);
            const forceHover = demo && demo.hover === d.getDate() && !outside && mi === 0;
            const forceFocus = demo && demo.focus === d.getDate() && !outside && mi === 0;
            const hot = !dis && !sel && (n(hover) === n(d) || forceHover);
            const ring = (ringOn && n(tabDate) === n(d)) || forceFocus;
            return (
              <div key={i} style={{ position: "relative", width: CELL, height: CELL }}>
                {band && (
                  <span data-sh-part={once("band")} style={{
                    position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
                    background: "var(--colors-background-bg-brand-primary)",
                    borderTopLeftRadius: isStart ? "var(--radius-full-px)" : 0, borderBottomLeftRadius: isStart ? "var(--radius-full-px)" : 0,
                    borderTopRightRadius: isEnd ? "var(--radius-full-px)" : 0, borderBottomRightRadius: isEnd ? "var(--radius-full-px)" : 0,
                  }} />
                )}
                <button
                  type="button"
                  ref={(el) => { cellRefs.current[n(d)] = el; }}
                  tabIndex={n(tabDate) === n(d) ? 0 : -1}
                  aria-pressed={sel || undefined}
                  aria-disabled={dis || undefined}
                  data-sh-part={sel ? once("sel") : forceFocus ? p("focus") : forceHover ? p("hover") : isToday ? p("today") : dis ? once("dis") : outside ? once("outside") : once("day")}
                  onClick={() => pick(d)}
                  onMouseEnter={() => setHover(d)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setFocusDate(d)}
                  onBlur={() => setRingOn(false)}
                  style={{
                    position: "relative", width: CELL, height: CELL, border: "none", borderRadius: "var(--radius-full-px)", padding: 0,
                    cursor: dis ? "not-allowed" : "pointer", outline: "none",
                    fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: sel || isToday ? 600 : 400,
                    background: sel ? "var(--colors-background-bg-brand-solid)" : hot ? "var(--colors-background-bg-primary-hover)" : "transparent",
                    color: sel ? "var(--colors-text-text-white)" : dis ? "var(--colors-text-text-disabled)" : outside ? "var(--colors-text-text-tertiary-600)" : "var(--colors-text-text-primary-900)",
                    boxShadow: ring ? "0 0 0 4px var(--colors-brand-50)" : "none",
                  }}
                >
                  {d.getDate()}
                  {isToday && <span style={{ position: "absolute", left: "50%", bottom: sp("sm"), transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "var(--radius-full-px)", background: sel ? "var(--colors-text-text-white)" : "var(--colors-background-bg-brand-solid)" }} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const readout = isRange ? (range.start ? fmt(range.start) + " \u2013 " + (range.end ? fmt(range.end) : "\u2026") : "No dates selected") : fmt(selected) || "No date selected";

  return (
    <div data-sh-part={p("root")} style={{
      display: "inline-flex", flexDirection: "column", boxSizing: "border-box",
      background: "var(--colors-background-bg-primary)",
      border: "1px solid var(--colors-border-border-secondary)",
      borderRadius: "var(--radius-xl-px)",
      boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
      fontFamily: "var(--font-body)", ...style,
    }} {...rest}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {presets && presets.length > 0 && (
          <div data-sh-part={p("rail")} style={{ display: "flex", flexDirection: "column", gap: sp("xxs"), width: 176, padding: sp("lg"), borderRight: "1px solid var(--colors-border-border-secondary)" }}>
            {presets.map((it) => {
              const label = typeof it === "string" ? it : it.label;
              return <DatePickerListItem key={label} selected={preset === label} onClick={() => takePreset(it)} style={{ lineHeight: "20px" }}>{label}</DatePickerListItem>;
            })}
          </div>
        )}
        <div data-sh-part={p("body")} style={{ display: "flex", gap: sp("3xl"), padding: sp("2xl") }}>
          {Array.from({ length: months }, (_, mi) => renderMonth(mi))}
        </div>
      </div>
      {footer && (
        <div data-sh-part={p("footer")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("xl"), padding: sp("xl"), borderTop: "1px solid var(--colors-border-border-secondary)" }}>
          <span style={{ fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{readout}</span>
          <div style={{ display: "flex", gap: sp("lg") }}>
            <Button size="sm" hierarchy="secondary" onClick={() => onCancel && onCancel()}>Cancel</Button>
            <Button size="sm" onClick={() => onApply && onApply(selected)}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: CELL, height: CELL, padding: 0, border: "none", background: "transparent", borderRadius: "var(--radius-md-px)", cursor: "pointer", color: "var(--colors-text-text-tertiary-600)" };

export default Calendar;
