import React from "react";
import { TextEditorIcon } from "./TextEditorIcon.jsx";

/** Untitled UI PRO — Text editor (internal). Rich-text toolbar of formatting toggles. */
export function TextEditor({ style = {}, ...rest }) {
  const groups = [["Bold01", "Italic01", "Underline01"], ["AlignLeft", "AlignCenter", "AlignRight"], ["Link01", "Code01"]];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 6, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <span style={{ width: 1, height: 20, background: "var(--colors-border-border-secondary)", margin: "0 4px" }} />}
          {g.map((ic) => <TextEditorIcon key={ic} icon={ic} />)}
        </React.Fragment>
      ))}
    </div>
  );
}
export default TextEditor;
