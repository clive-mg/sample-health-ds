import React from "react";
import { DateInputField } from "../atoms/DateInputField.jsx";
import { Calendar } from "./Calendar.jsx";

/**
 * Untitled UI PRO — Date picker. One date: an input-shaped trigger that opens a
 * single-month calendar. Picking a day fills the field and closes the popover.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const fmt = (d) => (d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "");

export function DatePicker({
  label,
  hint,
  helpText,
  required = false,
  placeholder = "Select date",
  value,
  defaultValue,
  defaultView,
  onChange,
  minDate,
  maxDate,
  size = "md",
  error = false,
  disabled = false,
  showOutsideDays = true,
  annotate = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue !== undefined ? defaultValue : null);
  const selected = value !== undefined ? value : internal;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", ...style }} {...rest}>
      <DateInputField
        size={size} label={label} hint={hint} helpText={helpText} required={required}
        placeholder={placeholder} value={fmt(selected)} open={open} error={error} disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div data-sh-part={annotate ? "popover" : undefined} style={{ position: "absolute", top: "100%", left: 0, marginTop: sp("md"), zIndex: 40 }}>
          <Calendar
            annotate={annotate}
            value={selected}
            defaultView={defaultView}
            minDate={minDate}
            maxDate={maxDate}
            showOutsideDays={showOutsideDays}
            onChange={(d) => { if (value === undefined) setInternal(d); if (onChange) onChange(d); setOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}
export default DatePicker;
