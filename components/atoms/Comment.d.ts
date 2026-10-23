import * as React from "react";
export interface CommentProps { author?: string; initials?: string; time?: string; body?: React.ReactNode; }
export function Comment(props: CommentProps): JSX.Element;
export default Comment;
