export interface MessageReactionProps { emoji?: string; count?: number; active?: boolean; onClick?: () => void; }
export function MessageReaction(props: MessageReactionProps): JSX.Element;
export default MessageReaction;
