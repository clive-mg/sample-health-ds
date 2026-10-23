import * as React from "react";
/**
 * Blog post card — cover, category, title, excerpt & author.
 */
export interface BlogPostCardProps { image?: string; category?: React.ReactNode; title?: React.ReactNode; excerpt?: React.ReactNode; author?: string; date?: string; initials?: string; }
export function BlogPostCard(props: BlogPostCardProps): JSX.Element;
export default BlogPostCard;
