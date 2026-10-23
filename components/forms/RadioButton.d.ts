import * as React from "react";
export interface RadioButtonProps {
  size?: "sm" | "md";
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  name?: string;
  value?: string;
  onChange?: (value: string | boolean) => void;
}
export function RadioButton(props: RadioButtonProps): JSX.Element;
export default RadioButton;
