export interface Slide { src?: string; caption?: string; }
/**
 * Carousel — image/slide carousel with arrows & dots.
 * @startingPoint section="Data display" subtitle="Image carousel" viewport="520x320"
 */
export interface CarouselProps { slides?: Slide[]; }
export function Carousel(props: CarouselProps): JSX.Element;
export default Carousel;
