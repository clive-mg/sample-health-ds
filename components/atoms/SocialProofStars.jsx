import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Social proof stars (internal). Star row + rating + count for reviews. */
export function SocialProofStars({ rating = 4.9, count = "1,000+ reviews", style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ display: "inline-flex", gap: 2, color: "var(--colors-warning-400)" }}>{[0,1,2,3,4].map(i => <Icon key={i} name="Star01" size={20} />)}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{rating}</span>
      <span style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{count}</span>
    </div>
  );
}
export default SocialProofStars;
