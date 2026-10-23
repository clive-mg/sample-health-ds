import React from "react";

/** Untitled UI PRO — Card header. Title, supporting text and trailing actions inside a card. */
export function CardHeader({ title, description, actions, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, ...style }} {...rest}>
      <div style={{ minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, lineHeight: "28px", color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
        {description && <div style={{ marginTop: 2, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}
export default CardHeader;
