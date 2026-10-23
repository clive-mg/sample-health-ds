import * as React from "react";
export interface Step {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Replaces the marker glyph on the featured marker. */
  icon?: React.ReactNode;
  /** Overrides the status derived from `current`. */
  status?: "complete" | "current" | "upcoming" | "error" | "disabled";
}
/**
 * Progress steps — multi-step stepper.
 * @startingPoint section="Navigation" subtitle="Horizontal & vertical steppers" viewport="620x120"
 */
export interface ProgressStepsProps {
  steps?: Step[];
  current?: number;
  /** "none" is the markerless rail: a rule above (or beside) the text. */
  marker?: "dot" | "number" | "featured" | "none";
  textPlacement?: "below" | "right" | "none";
  orientation?: "horizontal" | "vertical";
  connector?: boolean;
  /** Puts a "Step 2 of 4" label before the markers. */
  showCount?: boolean;
  /** Makes completed and error steps buttons. */
  onStepClick?: (index: number, step: Step) => void;
}
export function ProgressSteps(props: ProgressStepsProps): JSX.Element;
export default ProgressSteps;
