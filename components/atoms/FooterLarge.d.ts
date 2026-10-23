export interface FooterLargeColumn { title?: string; links?: string[]; }
export interface FooterLargeProps { brand?: string; columns?: FooterLargeColumn[]; }
export function FooterLarge(props: FooterLargeProps): JSX.Element;
export default FooterLarge;
