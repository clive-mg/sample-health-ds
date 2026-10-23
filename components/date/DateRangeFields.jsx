import React from "react";
import { DatePicker } from "./DatePicker.jsx";

/**
 * Untitled UI PRO — Date range fields. Two date pickers, one per end of the
 * range, for spans a person types into a form rather than sweeps out on a
 * calendar. The end field cannot open before the start date and opens on the
 * start month, so the pair can only produce a valid range.
 */
const sp = (k) => `var(--spacing-${k}-px)`;

export function DateRangeFields({
  startLabel = "Start date",
  endLabel = "End date",
  startPlaceholder = "Select date",
  endPlaceholder = "Select date",
  hint,
  helpText,
  required = false,
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  size = "md",
  error = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const empty = { start: null, end: null };
  const [internal, setInternal] = React.useState(defaultValue || empty);
  const range = value !== undefined ? value || empty : internal;
  const inverted = !!(range.start && range.end && range.end < range.start);
  const isError = error || inverted;

  const set = (next) => { if (value === undefined) setInternal(next); if (onChange) onChange(next); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: sp("sm"), ...style }} {...rest}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: sp("xl"), alignItems: "start" }}>
        <DatePicker
          size={size} label={startLabel} helpText={helpText} required={required} placeholder={startPlaceholder}
          value={range.start} error={isError} disabled={disabled} minDate={minDate} maxDate={maxDate}
          onChange={(d) => set({ start: d, end: range.end && range.end < d ? null : range.end })}
        />
        <DatePicker
          size={size} label={endLabel} required={required} placeholder={endPlaceholder}
          value={range.end} error={isError} disabled={disabled}
          minDate={range.start || minDate} maxDate={maxDate}
          defaultView={range.start || undefined}
          onChange={(d) => set({ start: range.start, end: d })}
        />
      </div>
      {(hint || inverted) && (
        <span data-sh-part="hint" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: isError ? "var(--colors-text-text-error-primary-600)" : "var(--colors-text-text-tertiary-600)" }}>
          {inverted ? "The end date must be on or after the start date." : hint}
        </span>
      )}
    </div>
  );
}
export default DateRangeFields;
