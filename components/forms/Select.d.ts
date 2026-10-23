import * as React from "react";
export interface SelectOption { label?: React.ReactNode; value?: string | number; }
/** A non-selectable heading that starts a group of options. */
export interface SelectGroup { group: React.ReactNode; }
export interface SelectProps {
  size?: "sm" | "md";
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Tooltip copy for a help icon after the label. Omit for no icon. */
  helpText?: React.ReactNode;
  placeholder?: string;
  options?: (SelectOption | SelectGroup | string)[];
  value?: string | number | null;
  defaultValue?: string | number | null;
  disabled?: boolean;
  /** Appends a brand-coloured asterisk to the label. */
  required?: boolean;
  /** Renders the menu open on mount — used by the docs diagrams. */
  defaultOpen?: boolean;
  onChange?: (value: string | number) => void;
}
export function Select(props: SelectProps): JSX.Element;
export default Select;
