import * as React from "react";
/**
 * Testimonial card — rating, quote & author.
 */
export interface TestimonialCardProps {
  quote?: React.ReactNode;
  name?: React.ReactNode;
  title?: React.ReactNode;
  rating?: number;
  initials?: string;
  src?: string;
}
export function TestimonialCard(props: TestimonialCardProps): JSX.Element;
export default TestimonialCard;
