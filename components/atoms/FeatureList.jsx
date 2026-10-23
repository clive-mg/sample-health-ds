import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Feature list (internal). Vertical list of check-marked feature rows. */
import { CheckItemText } from "./CheckItemText.jsx";
export function FeatureList({ items = [], columns = 1, style = {}, ...rest }) {
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16, ...style }} {...rest}>{items.map((it, i) => <CheckItemText key={i}>{it}</CheckItemText>)}</div>;
}
export default FeatureList;
