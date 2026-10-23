import * as React from "react";
export interface PageHeaderTabsProps { title?: React.ReactNode; description?: React.ReactNode; tabs?: { label: React.ReactNode }[]; actions?: React.ReactNode; }
export function PageHeaderTabs(props: PageHeaderTabsProps): JSX.Element;
export default PageHeaderTabs;
