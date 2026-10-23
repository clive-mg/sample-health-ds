import * as React from "react";
export interface FilterTagProps { field?: React.ReactNode; value?: React.ReactNode; onRemove?: () => void; }
export function FilterTag(props: FilterTagProps): JSX.Element;
export default FilterTag;
