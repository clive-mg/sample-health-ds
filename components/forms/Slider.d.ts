export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  /** number, or [start, end] when range is set */
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  range?: boolean;
  disabled?: boolean;
  ticks?: boolean;
  tooltip?: "none" | "hover" | "always";
  endLabels?: boolean;
  formatValue?: (value: number) => string;
  onChange?: (value: number | [number, number]) => void;
}
export function Slider(props: SliderProps): JSX.Element;
export default Slider;
