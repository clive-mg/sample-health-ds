import * as React from "react";
/**
 * Pricing tier card — plan, price, features & CTA.
 */
export interface PricingTierCardProps {
  name?: React.ReactNode;
  price?: React.ReactNode;
  period?: React.ReactNode;
  description?: React.ReactNode;
  features?: React.ReactNode[];
  cta?: React.ReactNode;
  featured?: boolean;
}
export function PricingTierCard(props: PricingTierCardProps): JSX.Element;
export default PricingTierCard;
