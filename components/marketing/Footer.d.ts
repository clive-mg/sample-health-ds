export interface FooterColumn { title?: string; links?: string[]; }
export interface FooterProps { brand?: string; /** Show the Sample Health logo (theme primary). Defaults to true when brand is "Sample Health". */ logo?: boolean; columns?: FooterColumn[]; }
export function Footer(props: FooterProps): JSX.Element;
export default Footer;
