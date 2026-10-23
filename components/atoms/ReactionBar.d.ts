export interface Reaction { emoji?: string; count?: number; active?: boolean; }
export interface ReactionBarProps { reactions?: Reaction[]; onAdd?: () => void; }
export function ReactionBar(props: ReactionBarProps): JSX.Element;
export default ReactionBar;
