import * as React from "react";
import { DateRange } from "./Calendar";
/**
 * Date range fields — two date pickers, one per end of the range. The end
 * field cannot open before the start date and opens on the start month, so
 * the pair can only produce a valid range.
 */
export interface DateRangeFieldsProps {
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
  startPlaceholder?: string;
  endPlaceholder?: string;
  /** Helper line under both fields. Replaced by the order message when the range is inverted. */
  hint?: React.ReactNode;
  /** Tooltip text on a help icon beside the start label. */
  helpText?: string;
  required?: boolean;
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Inline padding. Both sizes stand 36px tall at Body Medium 14/20. */
  size?: "sm" | "md";
  error?: boolean;
  disabled?: boolean;
}
export function DateRangeFields(props: DateRangeFieldsProps): JSX.Element;
export default DateRangeFields;
