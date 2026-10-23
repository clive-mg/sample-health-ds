import * as React from "react";
export interface CarouselImageProps { src?: string; caption?: React.ReactNode; size?: "sm" | "lg"; }
export function CarouselImage(props: CarouselImageProps): JSX.Element;
export default CarouselImage;
