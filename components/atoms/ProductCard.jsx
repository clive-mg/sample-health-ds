import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Product card (internal). Image, title, price, add-to-cart. */
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
export function ProductCard({ image, title = "Product name", price = "$49", style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-md-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ aspectRatio: "1 / 1", background: image ? `center/cover no-repeat url(${image})` : "var(--colors-gray-light-mode-100)" }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{price}</span>
          <Button size="sm" iconLeading={<Icon name="ShoppingCart01" size={18} />}>Add</Button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
