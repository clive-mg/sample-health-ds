import * as React from "react";
export interface MessageBubbleProps { text?: React.ReactNode; side?: "in" | "out"; author?: React.ReactNode; time?: React.ReactNode; initials?: string; }
export function MessageBubble(props: MessageBubbleProps): JSX.Element;
export default MessageBubble;
