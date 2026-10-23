import * as React from "react";
/**
 * Hero section — marketing page hero.
 */
export interface HeroSectionProps { badge?: { label?: string; text?: React.ReactNode }; title?: React.ReactNode; subtitle?: React.ReactNode; primaryCta?: React.ReactNode; secondaryCta?: React.ReactNode; onPrimary?: () => void; onSecondary?: () => void; }
export function HeroSection(props: HeroSectionProps): JSX.Element;
export default HeroSection;
