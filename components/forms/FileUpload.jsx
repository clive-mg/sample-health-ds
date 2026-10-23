import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { FieldHelpIcon } from "../atoms/FieldHelpIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
import { FileUploadItem } from "./FileUploadItem.jsx";

/**
 * Untitled UI PRO — File upload. A dropzone that also owns its list: pass
 * `files` and it renders a FileUploadItem per entry beneath the zone. The zone
 * wears the same label, help icon, hint and error line as Input, so an upload
 * field lines up with every other field in the form. Disabled is a lighter step
 * of each part rather than an opacity pass, so the zone keeps its own colour.
 */
const sp = (k) => `var(--spacing-${k}-px)`;

export function FileUpload({
  label,
  hint = "PDF, JPG, PNG, ZIP or XLS \u00b7 up to 10 MB",
  helpText,
  required = false,
  error = false,
  errorText,
  disabled = false,
  multiple = true,
  accept,
  files = [],
  onFiles,
  onRemove,
  onRetry,
  style = {},
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const live = over && !disabled;
  const border = disabled
    ? "var(--colors-border-border-secondary)"
    : error
    ? "var(--colors-border-border-error)"
    : live
    ? "var(--colors-border-border-brand)"
    : "var(--colors-border-border-secondary)";
  const fill = disabled
    ? "var(--colors-background-bg-secondary)"
    : live
    ? "var(--colors-background-bg-brand-primary)"
    : hovered
    ? "var(--colors-background-bg-primary-hover)"
    : "var(--colors-background-bg-primary)";
  const chipOverride = disabled
    ? { background: "var(--colors-background-bg-primary)", color: "var(--colors-text-text-disabled)", border: "1px solid var(--colors-border-border-secondary)" }
    : {};
  const ctaColor = disabled ? "var(--colors-brand-300)" : "var(--colors-brand-600)";
  const bodyColor = disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-tertiary-600)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: sp("sm"), ...style }}>
      {label && (
        <div data-sh-part="label-row" style={{ display: "flex", alignItems: "center", gap: sp("sm") }}>
          <label data-sh-part="label" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 600, color: disabled ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-secondary-700)" }}>
            {label}
            {required && <span data-sh-part="req" style={{ color: "var(--colors-error-600)" }}> *</span>}
          </label>
          {helpText && <FieldHelpIcon text={helpText} ariaLabel={typeof label === "string" ? "More information about " + label : undefined} />}
        </div>
      )}
      <label
        data-sh-part="zone"
        onDragOver={(e) => { if (disabled) return; e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { if (disabled) return; e.preventDefault(); setOver(false); if (onFiles) onFiles(e.dataTransfer.files); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: sp("lg"),
          padding: `${sp("xl")} ${sp("3xl")}`, textAlign: "center", boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "pointer",
          border: `1px solid ${border}`, borderRadius: "var(--radius-xl-px)", background: fill,
          transition: "background 120ms ease, border-color 120ms ease",
        }}
        {...rest}
      >
        <FeaturedIcon data-sh-part="chip" color="gray" size="sm" shape="square" style={chipOverride}><Icon name="UploadCloud02" /></FeaturedIcon>
        <div data-sh-part="cta" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: bodyColor }}>
          <span style={{ fontWeight: 600, color: ctaColor }}>Click to upload</span> or drag and drop
        </div>
        {hint && <div data-sh-part="hint" style={{ fontFamily: "var(--font-body)", fontSize: 12, lineHeight: "18px", fontWeight: 500, color: bodyColor }}>{hint}</div>}
        <input type="file" multiple={multiple} accept={accept} disabled={disabled} style={{ display: "none" }}
          onChange={(e) => { if (onFiles) onFiles(e.target.files); }} />
      </label>
      {errorText && (
        <span data-sh-part="error" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-error-primary-600)" }}>{errorText}</span>
      )}
      {files.length > 0 && (
        <div data-sh-part="list" style={{ display: "flex", flexDirection: "column", gap: sp("lg"), marginTop: sp("sm") }}>
          {files.map((f, i) => (
            <FileUploadItem key={f.id != null ? f.id : i} name={f.name} size={f.size} status={f.status} progress={f.progress} error={f.error}
              onRemove={onRemove ? () => onRemove(f, i) : undefined}
              onRetry={onRetry ? () => onRetry(f, i) : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
export default FileUpload;
