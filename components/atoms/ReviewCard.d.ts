import * as React from "react";
export interface ReviewCardProps { name?: string; initials?: string; rating?: number; body?: React.ReactNode; date?: string; }
export function ReviewCard(props: ReviewCardProps): JSX.Element;
export default ReviewCard;
