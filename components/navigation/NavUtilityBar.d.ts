export type NavTheme = "light" | "dark" | "brand";

export interface NavUtilityItem {
  label: string;
  /** Icon name from the Sample Health icon set, e.g. "Globe01". */
  icon?: string;
  href?: string;
  onClick?: () => void;
  /** Renders a trailing chevron — use for switchers that open a menu. */
  menu?: boolean;
  /** Docs only: marks this element for a token-map annotation. */
  part?: string;
}

export interface NavUtilityBarProps {
  theme?: NavTheme;
  /** Leading group — locale / region switchers. */
  left?: NavUtilityItem[];
  /** Trailing group — contact routes, help, auth links. Hairline-divided. */
  right?: NavUtilityItem[];
  /** Horizontal page inset in px. Match the HeaderNav below it. Default 32. */
  inset?: number;
  part?: string;
  style?: React.CSSProperties;
}

/** The thin secondary strip above a HeaderNav: locale, contact, help, auth. */
export function NavUtilityBar(props: NavUtilityBarProps): JSX.Element;

/** Shared surface/label/fill map for the four navigation shells. */
export const NAV_THEMES: Record<NavTheme, Record<string, string | boolean>>;

export default NavUtilityBar;
