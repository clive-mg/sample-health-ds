import React from "react";
import { KeyboardKey } from "../data-display/KeyboardKey.jsx";

/** Untitled UI PRO — Command shortcut (internal build-block). Row of keyboard keys, e.g. ⌘ K. */
export function CommandShortcut({ keys = ["⌘", "K"], style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", gap: 4, ...style }} {...rest}>{keys.map((k, i) => <KeyboardKey key={i}>{k}</KeyboardKey>)}</span>;
}
export default CommandShortcut;
