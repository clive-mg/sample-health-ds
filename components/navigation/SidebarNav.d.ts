import type { NavTheme } from "./NavUtilityBar";

export type SidebarNavViewport = "desktop" | "tablet" | "mobile";

export interface SidebarNavItem {
  label: string;
  /** Icon name from the Sample Health icon set. Top level only — and required to appear in the rail. */
  icon?: string;
  /** Count chip on the right of the row. */
  badge?: number | string;
  /** Discloses children. Legal inside a group only; ignored on a top-level row. */
  children?: SidebarNavItem[];
  /** Docs only: marks this element for a token-map annotation. */
  part?: string;
}

export interface SidebarNavGroup {
  /** Title above the group. Becomes a divider in the collapsed rail. */
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarNavProps {
  theme?: NavTheme;
  /** Plain list. No collapsible parents — pass `groups` for those. */
  items?: SidebarNavItem[];
  /** Groups under titles. Takes precedence over `items`. */
  groups?: SidebarNavGroup[];
  /** Label of the current destination. Sets aria-current="page". */
  current?: string;
  onSelect?: (label: string) => void;
  /**
   * The user's answer to the top bar's toggle. Desktop and tablet: the 280px
   * panel when open, the 64px rail when closed, both in flow so the page moves
   * with them \u2014 tablet just starts closed. Mobile: drawer + scrim when open,
   * nothing when closed.
   */
  open?: boolean;
  /** Scrim click on mobile. Wire it to the same state the toggle sets. */
  onClose?: () => void;
  /** Fires when the breakpoint changes — the top bar needs it to pick the toggle's default. */
  onViewportChange?: (viewport: SidebarNavViewport) => void;
  /** Pins the viewport instead of measuring the window. Docs specimens only. */
  viewport?: SidebarNavViewport;
  /** Labels of collapsible parents open on first render. */
  expanded?: string[];
  /** Panel width in px. Default 280. */
  width?: number;
  /** Collapsed rail width in px. Default 64. */
  railWidth?: number;
  part?: string;
  style?: React.CSSProperties;
}

/**
 * Vertical navigation: destinations only. The logo, the search and the user
 * belong to TopNav. The mobile form is absolutely positioned, so the app-shell
 * element wrapping the bar and the page must be `position: relative`.
 */
export function SidebarNav(props: SidebarNavProps): JSX.Element;
export default SidebarNav;
