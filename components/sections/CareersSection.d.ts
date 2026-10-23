import * as React from "react";
export interface Role { title?: React.ReactNode; team?: string; location?: string; type?: string; tags?: string[]; }
export interface CareersSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; roles?: Role[]; }
export function CareersSection(props: CareersSectionProps): JSX.Element;
export default CareersSection;
