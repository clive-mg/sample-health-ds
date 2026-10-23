import * as React from "react";
export interface MultiSelectOption { label?: React.ReactNode; value?: string | number; }
export interface MultiSelectProps {
  size?: "sm" | "md";
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Tooltip copy for a help icon after the label. Omit for no icon. */
  helpText?: React.ReactNode;
  /** Shown when nothing is selected; otherwise the field reports "N selected". */
  placeholder?: string;
  options?: (MultiSelectOption | string)[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  disabled?: boolean;
  /** Appends a brand-coloured asterisk to the label. */
  required?: boolean;
  /** Renders the menu open on mount — used by the docs diagrams. */
  defaultOpen?: boolean;
  /** Select-all row at the top of the menu. Indeterminate when only some are selected. */
  showAll?: boolean;
  /** Footer action that empties the selection. */
  clearable?: boolean;
  allLabel?: string;
  clearLabel?: string;
  onChange?: (values: (string | number)[]) => void;
}
export function MultiSelect(props: MultiSelectProps): JSX.Element;
export default MultiSelect;
