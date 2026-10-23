import * as React from "react";
export interface BadgeGroupProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  theme?: "light" | "gray";
  badge?: React.ReactNode;
  /** Extra props spread onto the leading pill. */
  badgeProps?: Record<string, any>;
  iconTrailing?: React.ReactNode;
  children?: React.ReactNode;
}
export function BadgeGroup(props: BadgeGroupProps): JSX.Element;
export default BadgeGroup;
