import * as React from "react";
export interface SidebarSectionProps { title?: React.ReactNode; children?: React.ReactNode; defaultOpen?: boolean; }
export function SidebarSection(props: SidebarSectionProps): JSX.Element;
export default SidebarSection;
