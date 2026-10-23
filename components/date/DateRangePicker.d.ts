import * as React from "react";
import { DateRange, CalendarPreset } from "./Calendar";
/**
 * Date range picker — one field for both ends of a range. Preset rail, two
 * months side by side, Apply / Cancel footer. The range is a draft until
 * Apply, so a half-picked range never reaches the form.
 */
export interface DateRangePickerProps {
  label?: React.ReactNode;
  /** Helper line under the field; turns error-red when `error` is set. */
  hint?: React.ReactNode;
  /** Tooltip text on a help icon beside the label. */
  helpText?: string;
  required?: boolean;
  placeholder?: string;
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  /** Fires on Apply only. */
  onChange?: (range: DateRange) => void;
  /** Preset rail rows. Pass [] to drop the rail. */
  presets?: CalendarPreset[];
  /** Months shown side by side. */
  months?: 1 | 2;
  minDate?: Date;
  maxDate?: Date;
  /** Inline padding. Both sizes stand 36px tall at Body Medium 14/20. */
  size?: "sm" | "md";
  error?: boolean;
  disabled?: boolean;
  /** Docs only — emit data-sh-part hooks for the token map. */
  annotate?: boolean;
}
export function DateRangePicker(props: DateRangePickerProps): JSX.Element;
export default DateRangePicker;
