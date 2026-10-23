import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Toolbar (internal). App toolbar row: grouped icon buttons + divider. */
export function Toolbar({ groups = [["Bold01", "Italic01"], ["AlignLeft", "AlignCenter"]], style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 6, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <span style={{ width: 1, height: 20, background: "var(--colors-border-border-secondary)", margin: "0 4px" }} />}
          {g.map((ic) => <button key={ic} type="button" style={{ width: 32, height: 32, border: "none", borderRadius: 6, background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={ic} size={20} /></button>)}
        </React.Fragment>
      ))}
    </div>
  );
}
export default Toolbar;
