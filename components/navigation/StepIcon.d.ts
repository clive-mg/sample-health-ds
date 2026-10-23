import * as React from "react";
/**
 * StepIcon — the circular status marker used by ProgressSteps.
 */
export interface StepIconProps {
  status?: "complete" | "current" | "upcoming" | "error" | "disabled";
  marker?: "dot" | "number" | "featured";
  /** Replaces the glyph. Ignored in the error state. */
  icon?: React.ReactNode;
  /** Shown when marker is "number". */
  index?: number;
  hovered?: boolean;
  focused?: boolean;
}
export function StepIcon(props: StepIconProps): JSX.Element;
export default StepIcon;
