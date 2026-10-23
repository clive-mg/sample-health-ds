import React from "react";

/** Untitled UI PRO — Page header. Title, supporting text and trailing actions. */
export function PageHeader({ title, description, actions, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", paddingBottom: 20, borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, lineHeight: "32px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
        {description && <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}
export default PageHeader;
