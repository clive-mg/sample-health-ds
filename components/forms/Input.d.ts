import * as React from "react";
/**
 * Text input field with label, hint and optional leading icon.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md";
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Tooltip copy for a help icon after the label. Omit for no icon. */
  helpText?: React.ReactNode;
  iconLeading?: React.ReactNode;
  error?: boolean;
  destructive?: boolean;
  /** Appends a brand-coloured asterisk to the label. */
  required?: boolean;
}
export function Input(props: InputProps): JSX.Element;
export default Input;
