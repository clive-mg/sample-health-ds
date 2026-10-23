import * as React from "react";
export interface BannerProps {
  theme?: "brand" | "gray";
  actions?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}
export function Banner(props: BannerProps): JSX.Element;
export default Banner;
