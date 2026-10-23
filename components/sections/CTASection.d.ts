import * as React from "react";
/**
 * CTA section — closing call-to-action band.
 */
export interface CTASectionProps { title?: React.ReactNode; description?: React.ReactNode; primaryCta?: React.ReactNode; secondaryCta?: React.ReactNode; dark?: boolean; onPrimary?: () => void; onSecondary?: () => void; }
export function CTASection(props: CTASectionProps): JSX.Element;
export default CTASection;
