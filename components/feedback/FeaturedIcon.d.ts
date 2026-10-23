import * as React from "react";
/**
 * Featured icon — the icon chip used atop alerts, empty states & feature lists.
 */
export interface FeaturedIconProps {
  size?: "sm" | "md" | "lg";
  color?: "brand" | "gray" | "error" | "warning" | "success";
  shape?: "circle" | "square";
  children?: React.ReactNode;
}
export function FeaturedIcon(props: FeaturedIconProps): JSX.Element;
export default FeaturedIcon;
