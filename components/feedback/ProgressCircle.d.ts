export interface ProgressCircleProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "half";
  showLabel?: boolean;
}
export function ProgressCircle(props: ProgressCircleProps): JSX.Element;
export default ProgressCircle;
