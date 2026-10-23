import * as React from "react";

/** A start / end pair. `end` is null while the range is half-picked. */
export interface DateRange { start: Date | null; end: Date | null; }
/** A preset row: a built-in label, or an explicit range. */
export type CalendarPreset = "Today" | "Yesterday" | "Last 7 days" | "Last 30 days" | "This month" | "Last month" | "Year to date" | { label: string; start: Date; end: Date };

/**
 * Calendar — month grid with single or range selection.
 */
export interface CalendarProps {
  /** One date, or a start / end range. */
  mode?: "single" | "range";
  value?: Date | DateRange | null;
  defaultValue?: Date | DateRange | null;
  /** Month the grid opens on when nothing is selected. */
  defaultView?: Date;
  onChange?: (value: Date | DateRange) => void;
  /** Months shown side by side. */
  months?: 1 | 2;
  minDate?: Date;
  maxDate?: Date;
  /** Fill the leading and trailing week with the neighbouring months' days. */
  showOutsideDays?: boolean;
  /** Preset rail down the left side. */
  presets?: CalendarPreset[];
  /** Apply / Cancel footer with a readout of the current selection. */
  footer?: boolean;
  onApply?: (value: Date | DateRange) => void;
  onCancel?: () => void;
  /** Docs only — emit data-sh-part hooks for the token map. */
  annotate?: boolean;
  /** Docs only — freeze hover / focus on a day of the first month. */
  demo?: { hover?: number; focus?: number };
}
export function Calendar(props: CalendarProps): JSX.Element;
export default Calendar;
