import * as React from "react";
export interface SocialButtonProps { provider?: "google" | "apple" | "github" | "figma"; children?: React.ReactNode; }
export function SocialButton(props: SocialButtonProps): JSX.Element;
export default SocialButton;
