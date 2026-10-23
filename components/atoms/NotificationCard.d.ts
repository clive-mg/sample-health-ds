import * as React from "react";
export interface NotificationCardProps { icon?: string; title?: React.ReactNode; body?: React.ReactNode; actions?: React.ReactNode; }
export function NotificationCard(props: NotificationCardProps): JSX.Element;
export default NotificationCard;
