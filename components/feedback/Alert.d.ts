import * as React from "react";
/**
 * Alert — status callout, inline in the content column or as a full-width
 * page banner.
 */
export interface AlertProps {
  /** inline callout (default) or full-width page banner. */
  variant?: "inline" | "banner";
  /** `info` is an alias of `brand` — both take the color.primary ramp. */
  color?: "gray" | "brand" | "info" | "error" | "warning" | "success";
  title?: React.ReactNode;
  /** Icon name; overrides the default icon for the color. */
  icon?: string;
  actions?: React.ReactNode;
  onClose?: () => void;
  /** banner only: pins the band to the top of the scroll container. */
  sticky?: boolean;
  /** banner only: width the inner row is constrained to. Default 1280. */
  contentWidth?: number | string;
  /** Overrides the ARIA live role (`alert` for error/warning, else `status`). */
  role?: string;
  /** Docs only: stamps data-sh-part hooks for annotated token maps. */
  annotate?: boolean;
  children?: React.ReactNode;
}
export function Alert(props: AlertProps): JSX.Element;
export default Alert;
