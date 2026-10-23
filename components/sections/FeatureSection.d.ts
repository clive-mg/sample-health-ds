import * as React from "react";
export interface Feature { icon?: React.ReactNode; title?: React.ReactNode; text?: React.ReactNode; }
/**
 * Feature section — header + feature grid.
 * @startingPoint section="Sections" subtitle="Feature grid" viewport="960x520"
 */
export interface FeatureSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; features?: Feature[]; columns?: number; }
export function FeatureSection(props: FeatureSectionProps): JSX.Element;
export default FeatureSection;
