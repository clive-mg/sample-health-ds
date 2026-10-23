import * as React from "react";
export interface NotificationItemProps { initials?: string; title?: React.ReactNode; time?: string; unread?: boolean; }
export function NotificationItem(props: NotificationItemProps): JSX.Element;
export default NotificationItem;
