import * as React from "react";
export interface PaginationNumberProps { children?: React.ReactNode; current?: boolean; shape?: "circle" | "square"; onClick?: () => void; }
export function PaginationNumber(props: PaginationNumberProps): JSX.Element;
export default PaginationNumber;
