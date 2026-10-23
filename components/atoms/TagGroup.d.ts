import * as React from "react";
export interface TagGroupProps { tags?: React.ReactNode[]; onRemove?: (i: number) => void; }
export function TagGroup(props: TagGroupProps): JSX.Element;
export default TagGroup;
