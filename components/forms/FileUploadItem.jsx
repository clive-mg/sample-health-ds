import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
import { ProgressBar } from "../feedback/ProgressBar.jsx";

/**
 * Untitled UI PRO — File upload item. One row per file: the type chip, the
 * name, a meta line pairing the size with what the file is doing, and a
 * progress bar while there is progress to show. Five statuses — queued,
 * uploading, complete, failed and rejected. A failed row offers a retry; a
 * rejected one never started, so it offers only removal.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const STATUS = {
  queued: { glyph: "Clock", text: "Queued", color: "var(--colors-text-text-tertiary-600)", chip: "gray", bar: false },
  uploading: { glyph: "UploadCloud02", text: "Uploading\u2026", color: "var(--colors-text-text-tertiary-600)", chip: "brand", bar: true },
  complete: { glyph: "CheckCircle", text: "Complete", color: "var(--colors-success-600)", chip: "brand", bar: true },
  failed: { glyph: "XCircle", text: "Failed", color: "var(--colors-text-text-error-primary-600)", chip: "error", bar: false },
  rejected: { glyph: "AlertCircle", text: "Not accepted", color: "var(--colors-text-text-error-primary-600)", chip: "error", bar: false },
};

export function FileUploadItem({
  name = "document.pdf",
  size = "200 KB",
  status = "complete",
  progress = 100,
  error,
  onRemove,
  onRetry,
  style = {},
  ...rest
}) {
  const s = STATUS[status] || STATUS.complete;
  const bad = status === "failed" || status === "rejected";
  const pct = status === "complete" ? 100 : Math.min(100, Math.max(0, progress));
  return (
    <div
      data-sh-part="root"
      style={{
        display: "flex", gap: sp("lg"), padding: sp("xl"), boxSizing: "border-box",
        border: `1px solid ${bad ? "var(--colors-border-border-error)" : "var(--colors-border-border-secondary)"}`,
        boxShadow: bad ? "0 0 0 1px var(--colors-border-border-error)" : "none",
        borderRadius: "var(--radius-xl-px)", background: "var(--colors-background-bg-primary)",
        fontFamily: "var(--font-body)", ...style,
      }}
      {...rest}
    >
      <FeaturedIcon data-sh-part="chip" color={s.chip} shape="square" size="sm"><Icon name="File02" /></FeaturedIcon>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: sp("md") }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: sp("md") }}>
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: sp("xxs") }}>
            <div data-sh-part="name" style={{ fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "var(--colors-text-text-secondary-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
            <div data-sh-part="meta" style={{ display: "flex", alignItems: "center", gap: sp("md"), fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>
              <span>{size}</span>
              <span aria-hidden="true" style={{ width: 1, height: 16, background: "var(--colors-border-border-secondary)" }} />
              <span data-sh-part="status" style={{ display: "inline-flex", alignItems: "center", gap: sp("sm"), color: s.color }}>
                <Icon name={s.glyph} size={16} />{status === "rejected" && error ? error : s.text}
              </span>
            </div>
          </div>
          {onRemove && (
            <button type="button" data-sh-part="remove" onClick={onRemove} aria-label={"Remove " + name}
              style={{ display: "inline-flex", alignSelf: "flex-start", padding: sp("xs"), border: "none", borderRadius: "var(--radius-sm-px)", background: "transparent", cursor: "pointer", color: "var(--colors-text-text-tertiary-600)" }}>
              <Icon name="Trash01" size={16} />
            </button>
          )}
        </div>
        {s.bar && (
          <div style={{ display: "flex", alignItems: "center", gap: sp("lg") }}>
            <div data-sh-part="bar" style={{ flex: 1 }}><ProgressBar value={pct} /></div>
            <span data-sh-part="pct" style={{ fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{Math.round(pct)}%</span>
          </div>
        )}
        {status === "failed" && onRetry && (
          <button type="button" data-sh-part="retry" onClick={onRetry}
            style={{ alignSelf: "flex-start", padding: 0, border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "var(--colors-text-text-error-primary-600)", textDecoration: "underline" }}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
export default FileUploadItem;
