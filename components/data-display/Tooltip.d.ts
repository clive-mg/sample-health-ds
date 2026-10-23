import * as React from "react";
export interface TooltipProps {
  title?: React.ReactNode;
  supportingText?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  /** Forces the tooltip visible in addition to hover — for focusable triggers. */
  open?: boolean;
  /** Adds an 8px arrow on the edge facing the trigger. */
  arrow?: boolean;
}
export function Tooltip(props: TooltipProps): JSX.Element;
export default Tooltip;
