import React from "react";
import { DateInputField } from "../atoms/DateInputField.jsx";
import { Calendar } from "./Calendar.jsx";

/**
 * Untitled UI PRO — Date range picker. One field for both ends of a range. The
 * popover carries a preset rail, two months side by side and an Apply / Cancel
 * footer: the range is a draft until Apply, so a half-picked range never
 * reaches the form.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const DEFAULT_PRESETS = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month", "Last month"];
const day = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const full = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** "Jan 6 – Jan 20, 2026" within one year, both years spelled out across a boundary. */
function fmtRange(r) {
  if (!r || !r.start) return "";
  if (!r.end) return full(r.start) + " \u2013 ";
  if (r.start.getFullYear() === r.end.getFullYear()) return day(r.start) + " \u2013 " + full(r.end);
  return full(r.start) + " \u2013 " + full(r.end);
}

export function DateRangePicker({
  label,
  hint,
  helpText,
  required = false,
  placeholder = "Select dates",
  value,
  defaultValue,
  onChange,
  presets = DEFAULT_PRESETS,
  months = 2,
  minDate,
  maxDate,
  size = "md",
  error = false,
  disabled = false,
  annotate = false,
  style = {},
  ...rest
}) {
  const empty = { start: null, end: null };
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue || empty);
  const committed = value !== undefined ? value || empty : internal;
  const [draft, setDraft] = React.useState(committed);
  const ref = React.useRef(null);

  const start = () => { setDraft(committed); setOpen(true); };
  const close = () => setOpen(false);
  const apply = (r) => {
    if (!r || !r.start) return close();
    const next = r.end ? r : { start: r.start, end: r.start };
    if (value === undefined) setInternal(next);
    if (onChange) onChange(next);
    close();
  };
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    const esc = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", ...style }} {...rest}>
      <DateInputField
        size={size} label={label} hint={hint} helpText={helpText} required={required}
        placeholder={placeholder} value={fmtRange(committed)} open={open} error={error} disabled={disabled}
        onClick={() => (open ? close() : start())}
      />
      {open && (
        <div data-sh-part={annotate ? "popover" : undefined} style={{ position: "absolute", top: "100%", left: 0, marginTop: sp("md"), zIndex: 40 }}>
          <Calendar
            mode="range"
            annotate={annotate}
            months={months}
            presets={presets}
            footer
            value={draft}
            defaultView={committed.start || undefined}
            minDate={minDate}
            maxDate={maxDate}
            onChange={setDraft}
            onApply={apply}
            onCancel={close}
          />
        </div>
      )}
    </div>
  );
}
export default DateRangePicker;
