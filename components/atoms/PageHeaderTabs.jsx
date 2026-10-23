import React from "react";
import { Tabs } from "../navigation/Tabs.jsx";

/** Untitled UI PRO — Page header with tabs (internal). App page title row + tab bar. */
export function PageHeaderTabs({ title, description, tabs = [], actions, style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div><h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, lineHeight: "32px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>{description && <p style={{ margin: "4px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}</div>
        {actions && <div style={{ display: "flex", gap: 12 }}>{actions}</div>}
      </div>
      {tabs.length > 0 && <div style={{ marginTop: 16 }}><Tabs items={tabs} /></div>}
    </div>
  );
}
export default PageHeaderTabs;
