export interface RatingProps { value?: number; max?: number; size?: number; onChange?: (value: number) => void; }
export function Rating(props: RatingProps): JSX.Element;
export default Rating;
