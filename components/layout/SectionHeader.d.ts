import * as React from "react";
/**
 * Section header — eyebrow + title + description for marketing sections.
 */
export interface SectionHeaderProps { eyebrow?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; align?: "left" | "center"; }
export function SectionHeader(props: SectionHeaderProps): JSX.Element;
export default SectionHeader;
