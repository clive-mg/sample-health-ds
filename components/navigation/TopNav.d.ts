import type { NavTheme, NavUtilityItem } from "./NavUtilityBar";

export interface TopNavMenuItem {
  label: string;
  icon?: string;
  /** Trailing hint text, e.g. a shortcut or a count. */
  hint?: string;
}

export interface TopNavItem {
  label: string;
  /** Present ⇒ the item opens a dropdown instead of navigating. */
  children?: TopNavMenuItem[];
  /** Docs only: marks this element for a token-map annotation. */
  part?: string;
}

export interface TopNavAccount {
  name: string;
  email: string;
  initials?: string;
  src?: string;
  /** Show an "Account ⌄" text trigger instead of the avatar — marketing bars do, app bars don't. Takes the active surface while its menu is open. */
  showLabel?: boolean;
  short?: string;
  menu?: TopNavMenuItem[];
}

export interface TopNavProps {
  theme?: NavTheme;
  items?: TopNavItem[];
  /** Label of the current destination. Sets aria-current="page". */
  current?: string;
  /** Label of a destination whose dropdown starts open. Must have `children`. */
  defaultOpen?: string;
  onSelect?: (label: string) => void;
  /** Overrides the theme's logo. Path is relative to the HOST page. */
  logoSrc?: string;
  logoHeight?: number;
  /** Secondary strip above the bar. Same item shape as NavUtilityBar. */
  utility?: { left?: NavUtilityItem[]; right?: NavUtilityItem[] };
  /** Second-level row below the bar. Labels only. */
  subnav?: string[];
  subnavCurrent?: string;
  /** Search affordance — in the primary row, or in the sub-nav row if present. */
  search?: boolean;
  /** Single high-emphasis action. Inverse themes render it white-on-bar. */
  cta?: { label: string; icon?: string };
  /** Help, settings + notifications icon buttons. */
  actions?: boolean;
  account?: TopNavAccount;
  /** Swaps the account cluster for Log in / Register. */
  signedOut?: boolean;
  /** Small-screen form: leading slot + logo, then search/actions in their smallest form. The account menu moves into the hamburger drawer. The hamburger is dropped when there are no `items` and no `account`. */
  compact?: boolean;
  /** Horizontal page inset in px. Default 32. */
  /** Page inset in px. Halves to 16 when the bar is under 720px. */
  inset?: number;
  /** Page container max-width, e.g. "var(--container-max-width)". Surfaces stay full-bleed; each row's content centres inside it with the 16px container gutter (container.gutter), overriding `inset`. */
  contain?: string;
  /** Node pinned before the logo — an app shell's sidebar collapse toggle. Rendered in the compact form too. */
  leading?: React.ReactNode;
  part?: string;
  style?: React.CSSProperties;
}

/** Horizontal application/marketing header: utility strip, primary row, sub-nav. */
export function TopNav(props: TopNavProps): JSX.Element;
export default TopNav;
