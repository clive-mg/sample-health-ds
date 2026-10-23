import * as React from "react";
export interface ChatListItemProps { name?: string; preview?: React.ReactNode; time?: string; unread?: number; initials?: string; active?: boolean; onClick?: () => void; }
export function ChatListItem(props: ChatListItemProps): JSX.Element;
export default ChatListItem;
