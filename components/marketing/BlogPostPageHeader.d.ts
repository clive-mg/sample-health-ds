import * as React from "react";
export interface BlogPostPageHeaderProps { category?: React.ReactNode; title?: React.ReactNode; readTime?: string; date?: string; author?: string; initials?: string; }
export function BlogPostPageHeader(props: BlogPostPageHeaderProps): JSX.Element;
export default BlogPostPageHeader;
