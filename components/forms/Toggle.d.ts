import * as React from "react";
export interface ToggleProps {
  size?: "sm" | "md";
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}
export function Toggle(props: ToggleProps): JSX.Element;
export default Toggle;
