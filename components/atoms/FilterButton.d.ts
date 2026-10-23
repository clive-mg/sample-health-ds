import * as React from "react";
export interface FilterButtonProps { label?: React.ReactNode; count?: number; active?: boolean; onClick?: () => void; }
export function FilterButton(props: FilterButtonProps): JSX.Element;
export default FilterButton;
