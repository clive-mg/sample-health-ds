import * as React from "react";
export interface FAQSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; faqs?: { title?: React.ReactNode; content?: React.ReactNode }[]; }
export function FAQSection(props: FAQSectionProps): JSX.Element;
export default FAQSection;
