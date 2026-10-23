import * as React from "react";
/**
 * Email template — branded transactional email body.
 */
export interface EmailTemplateProps { brand?: string; heading?: React.ReactNode; cta?: React.ReactNode; children?: React.ReactNode; }
export function EmailTemplate(props: EmailTemplateProps): JSX.Element;
export default EmailTemplate;
