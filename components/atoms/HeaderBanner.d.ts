import * as React from "react";
export interface HeaderBannerProps { children?: React.ReactNode; cta?: React.ReactNode; onClose?: () => void; }
export function HeaderBanner(props: HeaderBannerProps): JSX.Element;
export default HeaderBanner;
