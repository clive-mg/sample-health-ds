import React from "react";

/** Untitled UI PRO — Kbd combo (internal). Sequence of keyboard keys separated by "then". */
import { KeyboardKey } from "../data-display/KeyboardKey.jsx";
export function KbdCombo({ sequence = [["⌘", "K"]], style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>
      {sequence.map((combo, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>then</span>}
          <span style={{ display: "inline-flex", gap: 4 }}>{combo.map((k, j) => <KeyboardKey key={j}>{k}</KeyboardKey>)}</span>
        </React.Fragment>
      ))}
    </span>
  );
}
export default KbdCombo;
