import * as React from "react";
export interface ButtonGroupItem { label?: React.ReactNode; value?: string; icon?: React.ReactNode; }
export interface ButtonGroupProps {
  items?: ButtonGroupItem[];
  value?: string;
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
  onChange?: (value: string) => void;
}
export function ButtonGroup(props: ButtonGroupProps): JSX.Element;
export default ButtonGroup;
