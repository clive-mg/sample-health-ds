import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Select } from "../forms/Select.jsx";
import { Tooltip } from "../data-display/Tooltip.jsx";

/**
 * Untitled UI PRO — Pagination. Four ways to move through a paged list:
 *   numbers  — Previous / page chips / Next, first and last always reachable
 *   toolbar  — a record count, first-prev-jump-next-last, and records per page
 *   compact  — a record count and a single pair of arrows
 *   simple   — Previous / Page X of N / Next
 * Give it `total` pages directly, or `totalItems` and `perPage` and it works
 * the page count out. Disabled arrow icons take `color.neutral.400` rather than
 * an opacity pass; disabled label text stays on `color.text.disabled`. Enabled
 * arrows sit on `color.text.secondary`, matching the Previous/Next labels.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const TEXT = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" };
const PER_PAGE = [10, 20, 50, 100];

export function Pagination({
  variant = "numbers",
  total,
  totalItems,
  perPage,
  perPageOptions = PER_PAGE,
  onPerPageChange,
  page,
  defaultPage = 1,
  onChange,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultPage);
  const [draft, setDraft] = React.useState(null);
  const current = page != null ? page : internal;
  const pages = total != null ? total : totalItems != null && perPage ? Math.max(1, Math.ceil(totalItems / perPage)) : 10;
  const go = (p) => {
    const n = Math.min(pages, Math.max(1, p));
    if (n === current) return;
    if (page == null) setInternal(n);
    if (onChange) onChange(n);
  };
  const first = totalItems != null && perPage ? (current - 1) * perPage + 1 : null;
  const last = totalItems != null && perPage ? Math.min(totalItems, current * perPage) : null;
  const count = first != null ? `Showing ${first}-${last} of ${totalItems}` : null;

  /* ---- shared pieces ---- */
  /* Disabled icons take color.neutral.400 rather than color.text.disabled: the
     latter is neutral 500, one ramp step from the enabled neutral 600, which read
     as barely off. Foundations publishes no icon-disabled semantic token, so this
     references the ramp directly and therefore does NOT invert in dark mode — a
     Foundations gap, logged in typography-audit.md's sibling colour notes.
     Disabled label text is unchanged at color.text.disabled. */
  const ICON_OFF = "var(--colors-gray-light-mode-400)";
  const link = (dir) => {
    const off = dir === "prev" ? current <= 1 : current >= pages;
    const gl = (n) => <Icon name={n} size={20} style={off ? { color: ICON_OFF } : undefined} />;
    return (
      <button type="button" data-sh-part={dir} disabled={off} onClick={() => go(current + (dir === "next" ? 1 : -1))}
        style={{ ...TEXT, display: "inline-flex", alignItems: "center", gap: sp("md"), padding: 0, border: "none", background: "transparent",
          fontWeight: 600, color: off ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-secondary-700)",
          cursor: off ? "not-allowed" : "pointer" }}>
        {dir === "prev" && gl("ArrowLeft")}{dir === "prev" ? "Previous" : "Next"}{dir === "next" && gl("ArrowRight")}
      </button>
    );
  };
  const arrow = (name, glyph, to, tip) => {
    const off = to < 1 || to > pages || to === current;
    const dbl = glyph === "first" || glyph === "last";
    const chev = dbl ? (glyph === "first" ? "ChevronLeft" : "ChevronRight") : glyph;
    return (
      <Tooltip title={tip} placement="top">
        <button type="button" data-sh-part={name} aria-label={tip} disabled={off} onClick={() => go(to)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, padding: 0, border: "none",
            borderRadius: "var(--radius-md-px)", background: "transparent", cursor: off ? "not-allowed" : "pointer",
            color: off ? ICON_OFF : "var(--colors-text-text-secondary-700)" }}>
          {dbl
            ? <span style={{ display: "inline-flex" }}><Icon name={chev} size={20} style={{ marginRight: -12 }} /><Icon name={chev} size={20} /></span>
            : <Icon name={chev} size={20} />}
        </button>
      </Tooltip>
    );
  };
  const label = (t) => <span style={{ ...TEXT, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{t}</span>;
  const countLine = <span data-sh-part="count" style={{ ...TEXT, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{count}</span>;
  const row = (children) => (
    <div data-sh-part="root" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: sp("xl"),
      padding: sp("xl"), boxSizing: "border-box", border: "1px solid var(--colors-border-border-secondary)",
      borderRadius: "var(--radius-xl-px)", background: "var(--colors-background-bg-primary)",
      fontFamily: "var(--font-body)", ...style }} {...rest}>{children}</div>
  );

  /* ---- numbers ---- */
  if (variant === "numbers") {
    const list = [];
    list.push(1);
    const from = Math.max(2, current - 1);
    const to = Math.min(pages - 1, current + 1);
    if (from > 2) list.push("gap-a");
    for (let p = from; p <= to; p++) list.push(p);
    if (to < pages - 1) list.push("gap-b");
    if (pages > 1) list.push(pages);
    return row(<>
      {link("prev")}
      <div data-sh-part="pages" style={{ display: "flex", gap: sp("xxs") }}>
        {list.map((p, i) => typeof p === "string"
          ? <span key={i} data-sh-part="ellipsis" style={{ ...TEXT, width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>…</span>
          : <button key={i} type="button" data-sh-part={p === current ? "current" : "page"} aria-current={p === current ? "page" : undefined} onClick={() => go(p)}
              style={{ ...TEXT, width: 40, height: 40, padding: 0, border: "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
                background: p === current ? "var(--colors-background-bg-brand-primary)" : "transparent",
                fontWeight: p === current ? 600 : 400,
                color: p === current ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-tertiary-600)" }}>{p}</button>)}
      </div>
      {link("next")}
    </>);
  }

  /* ---- toolbar ---- */
  if (variant === "toolbar") {
    const commit = () => {
      const n = parseInt(draft, 10);
      setDraft(null);
      if (!isNaN(n)) go(n);
    };
    return row(<>
      {countLine}
      <div style={{ display: "flex", alignItems: "center", gap: sp("md") }}>
        {arrow("first", "first", 1, "First")}
        {arrow("prev", "ChevronLeft", current - 1, "Previous")}
        {label("Page")}
        <Tooltip title="Enter page number you want to jump to and press enter" placement="top">
          <input data-sh-part="jump" aria-label="Page number"
            value={draft != null ? draft : current}
            onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setDraft(null); }}
            onBlur={() => setDraft(null)}
            style={{ ...TEXT, width: 56, padding: `${sp("md")} ${sp("lg")}`, boxSizing: "border-box", textAlign: "center", fontWeight: 400,
              color: "var(--colors-text-text-primary-900)", background: "var(--colors-background-bg-primary)", border: "none", outline: "none",
              borderRadius: "var(--radius-md-px)",
              boxShadow: "inset 0 0 0 1px var(--colors-border-border-primary), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" }} />
        </Tooltip>
        {label("of " + pages)}
        {arrow("next", "ChevronRight", current + 1, "Next")}
        {arrow("last", "last", pages, "Last")}
      </div>
      <div data-sh-part="perpage" style={{ display: "flex", alignItems: "center", gap: sp("md") }}>
        {label("Records per page:")}
        <Select size="sm" value={perPage} options={perPageOptions.map((n) => ({ label: String(n), value: n }))}
          onChange={(v) => onPerPageChange && onPerPageChange(Number(v))} style={{ flex: "none" }} />
      </div>
    </>);
  }

  /* ---- compact ---- */
  if (variant === "compact") {
    return row(<>
      {countLine}
      <div style={{ display: "flex", alignItems: "center", gap: sp("md") }}>
        {arrow("prev", "ChevronLeft", current - 1, "Previous")}
        {label(`Page ${current} of ${pages}`)}
        {arrow("next", "ChevronRight", current + 1, "Next")}
      </div>
    </>);
  }

  /* ---- simple ---- */
  return row(<>
    {link("prev")}
    {label(`Page ${current} of ${pages}`)}
    {link("next")}
  </>);
}
export default Pagination;
