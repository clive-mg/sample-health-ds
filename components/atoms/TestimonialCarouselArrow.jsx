import React from "react";
import { CarouselArrow } from "./CarouselArrow.jsx";

/** Untitled UI PRO — Testimonial carousel arrow (internal). Prev/next arrow for testimonial sliders. */
export function TestimonialCarouselArrow({ dir = "left", type = "default", onClick, style = {}, ...rest }) {
  return <CarouselArrow dir={dir} onClick={onClick} style={style} {...rest} />;
}
export default TestimonialCarouselArrow;
