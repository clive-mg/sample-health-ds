import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — FAQ item (internal). Single expandable question row. */
export function FAQItem({ question, answer, defaultOpen = false, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ padding: "24px 0", borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", padding: 0, fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>
        {question}
        <Icon name={open ? "MinusCircle" : "PlusCircle"} size={24} style={{ color: "var(--colors-foreground-fg-quaternary-400)", flexShrink: 0 }} />
      </button>
      {open && <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{answer}</p>}
    </div>
  );
}
export default FAQItem;
