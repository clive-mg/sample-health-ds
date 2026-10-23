import * as React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | string;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
export default Card;
