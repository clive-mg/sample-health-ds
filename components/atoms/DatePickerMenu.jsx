import React from "react";
import { DatePickerListItem } from "./DatePickerListItem.jsx";

/** Untitled UI PRO — Date picker menu (internal). Preset-range list panel for date pickers. */
export function DatePickerMenu({ presets = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month"], value, onSelect, style = {}, ...rest }) {
  return (
    <div style={{ padding: 6, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", minWidth: 180, ...style }} {...rest}>
      {presets.map((p) => <DatePickerListItem key={p} selected={p === value} onClick={() => onSelect && onSelect(p)}>{p}</DatePickerListItem>)}
    </div>
  );
}
export default DatePickerMenu;
