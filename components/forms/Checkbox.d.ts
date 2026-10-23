import * as React from "react";
export interface CheckboxProps {
  size?: "sm" | "md";
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
export default Checkbox;
