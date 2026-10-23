import * as React from "react";
export type BadgeColor = "white" | "gray" | "brand" | "error" | "warning" | "success" | "blue" | "indigo" | "purple" | "pink" | "orange" | "blue-light" | "blue-dark" | "gray-blue";
/**
 * Badge — compact status / category label.
 */
export interface BadgeProps {
  size?: "sm" | "md" | "lg";
  color?: BadgeColor;
  type?: "color" | "pill-color" | "modern";
  dot?: boolean;
  /** A trailing quantity, rendered in its own chip inside the badge. */
  count?: React.ReactNode;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
