import * as React from "react";

/**
 * Button — the primary action control of Untitled UI PRO.
 *
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Height & type scale. sm 36px · md 40px · lg 44px · xl 48px. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Visual weight. */
  hierarchy?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "link-gray"
    | "link-color"
    | "primary-destructive"
    | "secondary-destructive"
    | "tertiary-destructive"
    | "link-destructive";
  /** Icon node rendered before the label (or as the sole child when iconOnly). */
  iconLeading?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconTrailing?: React.ReactNode;
  /** Square icon-only button. */
  iconOnly?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
export default Button;
