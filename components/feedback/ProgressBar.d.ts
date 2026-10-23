export interface ProgressBarProps {
  value?: number;
  max?: number;
  color?: "brand" | "success" | "warning" | "error";
  label?: "none" | "right" | "bottom";
}
export function ProgressBar(props: ProgressBarProps): JSX.Element;
export default ProgressBar;
