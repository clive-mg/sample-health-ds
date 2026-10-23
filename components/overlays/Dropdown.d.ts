import * as React from "react";
export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
  onClick?: () => void;
  /** Hairline rule between groups. */
  divider?: boolean;
  /** Uppercase section heading above a group of items. */
  header?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  /** Marks the current choice: brand-tinted surface and a semibold label. */
  selected?: boolean;
}
export interface DropdownProps {
  trigger?: React.ReactNode;
  items?: MenuItem[];
  align?: "left" | "right";
  /** Force the menu open — for documentation and controlled use. */
  open?: boolean;
  /** Render the panel in normal flow rather than floating it under a trigger. */
  inline?: boolean;
}
export function Dropdown(props: DropdownProps): JSX.Element;
export default Dropdown;
