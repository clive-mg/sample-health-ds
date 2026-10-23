import * as React from "react";
/**
 * Date input field (internal) — the trigger a date picker opens from. Same
 * construction as Input: label, hint, help icon, inset 1px border. Shows a
 * formatted date string rather than accepting typed input.
 */
export interface DateInputFieldProps {
  /** Inline padding. Both sizes stand 36px tall at Body Medium 14/20. */
  size?: "sm" | "md";
  label?: React.ReactNode;
  /** Helper line under the field; turns error-red when `error` is set. */
  hint?: React.ReactNode;
  /** Tooltip text on a help icon beside the label. */
  helpText?: string;
  placeholder?: string;
  /** Formatted value shown in the field. */
  value?: string;
  /** Popover is open — draws the brand border and focus ring. */
  open?: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export function DateInputField(props: DateInputFieldProps): JSX.Element;
export default DateInputField;
