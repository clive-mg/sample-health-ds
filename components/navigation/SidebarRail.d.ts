import type { NavTheme } from "./NavUtilityBar";

export interface SidebarRailItem {
  /** Icon name from the Sample Health icon set. Required — the rail is icons. */
  icon: string;
  /** Never optional: it is the aria-label and the tooltip. */
  label: string;
  /** Docs only: marks this element for a token-map annotation. */
  part?: string;
}

export interface SidebarRailPanelItem {
  label: string;
  badge?: number | string;
}

export interface SidebarRailProps {
  theme?: NavTheme;
  items?: SidebarRailItem[];
  /** Label of the current destination. Sets aria-current="page". */
  current?: string;
  onSelect?: (label: string) => void;
  /** Overrides the theme's logo. Rendered as a 32px mark. */
  logoSrc?: string;
  /** Icon buttons pinned to the bottom — Settings, Support. */
  footer?: SidebarRailItem[];
  account?: { initials?: string; src?: string };
  /** Adds a second column listing the current section's children. */
  panel?: { title: string; items: SidebarRailPanelItem[] };
  panelCurrent?: string;
  /** Rail width in px. Default 64. */
  width?: number;
  part?: string;
  style?: React.CSSProperties;
}

/** The 64px icon-only rail — alone, or paired with a section panel. */
export function SidebarRail(props: SidebarRailProps): JSX.Element;
export default SidebarRail;
