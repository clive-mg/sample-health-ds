import * as React from "react";
export interface PaginationButtonGroupProps { dir?: "prev" | "next"; label?: React.ReactNode; disabled?: boolean; onClick?: () => void; }
export function PaginationButtonGroup(props: PaginationButtonGroupProps): JSX.Element;
export default PaginationButtonGroup;
