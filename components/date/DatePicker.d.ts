import * as React from "react";
/**
 * Date picker — one date. An input-shaped trigger that opens a single-month
 * calendar; picking a day fills the field and closes the popover.
 */
export interface DatePickerProps {
  label?: React.ReactNode;
  /** Helper line under the field; turns error-red when `error` is set. */
  hint?: React.ReactNode;
  /** Tooltip text on a help icon beside the label. */
  helpText?: string;
  required?: boolean;
  placeholder?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  /** Month the calendar opens on when nothing is selected. */
  defaultView?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Inline padding. Both sizes stand 36px tall at Body Medium 14/20. */
  size?: "sm" | "md";
  error?: boolean;
  disabled?: boolean;
  showOutsideDays?: boolean;
  /** Docs only — emit data-sh-part hooks for the token map. */
  annotate?: boolean;
}
export function DatePicker(props: DatePickerProps): JSX.Element;
export default DatePicker;
