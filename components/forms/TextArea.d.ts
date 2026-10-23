import * as React from "react";
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md";
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Tooltip copy for a help icon after the label. Omit for no icon. */
  helpText?: React.ReactNode;
  error?: boolean;
  /** Appends a brand-coloured asterisk to the label. */
  required?: boolean;
}
export function TextArea(props: TextAreaProps): JSX.Element;
export default TextArea;
