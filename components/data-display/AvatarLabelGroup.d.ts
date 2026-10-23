import * as React from "react";
export interface AvatarLabelGroupProps {
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
  initials?: string;
  status?: "online" | "offline";
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}
export function AvatarLabelGroup(props: AvatarLabelGroupProps): JSX.Element;
export default AvatarLabelGroup;
