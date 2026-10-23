import * as React from "react";
export interface PageHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}
export function PageHeader(props: PageHeaderProps): JSX.Element;
export default PageHeader;
