import * as React from "react";
export interface ContentItemProps { title?: React.ReactNode; excerpt?: React.ReactNode; onClick?: () => void; }
export function ContentItem(props: ContentItemProps): JSX.Element;
export default ContentItem;
