import * as React from "react";
export interface MessageProps { text?: React.ReactNode; author?: string; time?: string; initials?: string; side?: "in" | "out"; }
export function Message(props: MessageProps): JSX.Element;
export default Message;
