import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — File upload base (internal). The empty dropzone frame without item list. */
export function FileUploadBase({ hint = "SVG, PNG, JPG or GIF (max. 800×400px)", state = "default", style = {}, ...rest }) {
  const active = state === "active";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "16px 24px", textAlign: "center", border: `1px solid ${active ? "var(--colors-border-border-brand)" : "var(--colors-border-border-secondary)"}`, borderRadius: "var(--radius-md-px)", background: active ? "var(--colors-background-bg-brand-primary)" : "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <FeaturedIcon color="gray" size="md" shape="square"><Icon name="UploadCloud02" /></FeaturedIcon>
      <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}><span style={{ fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>Click to upload</span> or drag and drop</div>
      <div style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{hint}</div>
    </div>
  );
}
export default FileUploadBase;
