import * as React from "react";
/**
 * Toast — floating notification card.
 */
export interface ToastProps {
  color?: "gray" | "brand" | "success" | "warning" | "error";
  title?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: string;
  onClose?: () => void;
  /** Tag internal parts with data-sh-part for documentation diagrams. */
  annotate?: boolean;
  children?: React.ReactNode;
}
export function Toast(props: ToastProps): JSX.Element;
export default Toast;
