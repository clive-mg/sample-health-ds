import React from "react";
import { MarketingPageHeader } from "./MarketingPageHeader.jsx";

/** Untitled UI PRO — Contact page header (internal). Eyebrow + title + intro for a contact page. */
export function ContactPageHeader({ eyebrow = "Contact us", title = "Get in touch", description = "We'd love to hear from you. Our team is here to help.", style = {}, ...rest }) {
  return <MarketingPageHeader eyebrow={eyebrow} title={title} description={description} style={style} {...rest} />;
}
export default ContactPageHeader;
