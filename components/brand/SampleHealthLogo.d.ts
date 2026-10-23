export interface SampleHealthLogoProps {
  /** Rendered height in px; width follows the 5:2 artwork. Default 64. */
  height?: number;
  /** Any CSS colour. Default var(--colors-brand-600), the theme primary. */
  color?: string;
  /** Accessible name. Default "Sample Health". */
  title?: string;
  style?: React.CSSProperties;
}
export function SampleHealthLogo(props: SampleHealthLogoProps): JSX.Element;
export default SampleHealthLogo;
