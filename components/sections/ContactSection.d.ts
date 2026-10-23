import * as React from "react";
export interface ContactMethod { icon?: string; title?: React.ReactNode; value?: React.ReactNode; }
/**
 * Contact section — contact methods + message form.
 * @startingPoint section="Sections" subtitle="Contact methods + form" viewport="1000x520"
 */
export interface ContactSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; methods?: ContactMethod[]; }
export function ContactSection(props: ContactSectionProps): JSX.Element;
export default ContactSection;
