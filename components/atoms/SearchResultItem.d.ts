import * as React from "react";
export interface SearchResultItemProps { icon?: string; title?: React.ReactNode; category?: React.ReactNode; onClick?: () => void; }
export function SearchResultItem(props: SearchResultItemProps): JSX.Element;
export default SearchResultItem;
