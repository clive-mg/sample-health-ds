import React from "react";
import { Checkbox } from "../forms/Checkbox.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Untitled UI PRO — Table. columns:[{key, header, render?, width?, align?, sortable?}] · data:[].
 * Card-wrapped with header row, hover rows and 1px dividers. Supports two sizes,
 * divider or alternating row fills, row selection, sortable headers, a pagination
 * footer and empty / error body states.
 */
const PAD = { sm: "var(--spacing-md-px)", md: "var(--spacing-xl-px)" };
const HEAD_PAD = { sm: "var(--spacing-md-px)", md: "var(--spacing-lg-px)" };
const INSET = "var(--spacing-xl-px)";

export function Table({
  columns = [], data = [], title, description, actions,
  size = "md", fill = "divider", selectable = false,
  selected, defaultSelected, onSelectionChange, rowKey,
  sort, onSort, rowDisabled, pagination, footer, state = "ready", empty, error, annotate = false,
  style = {}, ...rest
}) {
  const part = (name) => (annotate ? name : undefined);
  const [internalSel, setInternalSel] = React.useState(defaultSelected || []);
  const [hoverKey, setHoverKey] = React.useState(null);
  const sel = selected != null ? selected : internalSel;
  const keyOf = (row, i) => (rowKey ? rowKey(row) : (row && row.id != null ? row.id : i));
  const setSel = (next) => { if (selected == null) setInternalSel(next); if (onSelectionChange) onSelectionChange(next); };
  const isSel = (k) => sel.indexOf(k) !== -1;
  const allKeys = data.map(keyOf);
  const allOn = allKeys.length > 0 && allKeys.every(isSel);
  const cellPad = PAD[size] || PAD.md;
  const headPad = HEAD_PAD[size] || HEAD_PAD.md;
  const zebra = fill === "alternating";
  const bodyState = state !== "ready";
  const span = columns.length + (selectable ? 1 : 0);

  const headCell = (content, c, i) => {
    const sorted = sort && c && c.key && sort.key === c.key;
    const sortable = c && c.sortable && onSort;
    return (
      <th key={i} scope="col" data-sh-part={sortable ? part("sorthead") : i === 0 ? part("headcell") : undefined} style={{ textAlign: (c && c.align) || "left", padding: headPad + " " + INSET, fontSize: 14, fontWeight: 600, lineHeight: "20px", color: sorted ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-quaternary-500)", width: c && c.width, whiteSpace: "nowrap" }}>
        {sortable ? (
          <button type="button" onClick={() => onSort(c.key, sorted && sort.dir === "asc" ? "desc" : "asc")} style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs-px)", padding: 0, border: "none", background: "none", font: "inherit", color: "inherit", cursor: "pointer" }}>
            {content}
            <Icon name={sorted && sort.dir === "desc" ? "ArrowDown" : "ArrowUp"} size={16} style={{ opacity: sorted ? 1 : 0.4 }} />
          </button>
        ) : content}
      </th>
    );
  };

  return (
    <div data-sh-part={part("card")} style={{ border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", overflow: "hidden", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      {(title || actions) && (
        <div data-sh-part={part("titlebar")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)", padding: "var(--spacing-2xl-px) " + INSET }}>
          <div>
            {title && <div style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, lineHeight: "22px", color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
            {description && <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
          </div>
          {actions}
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" }}>
        {!bodyState && <thead>
          <tr data-sh-part={part("head")} style={{ background: "var(--colors-background-bg-secondary)", borderTop: "1px solid var(--colors-border-border-secondary)", borderBottom: "1px solid var(--colors-border-border-secondary)" }}>
            {selectable && (
              <th scope="col" style={{ width: 1, padding: headPad + " 0 " + headPad + " " + INSET }}>
                <Checkbox size="sm" checked={allOn} indeterminate={!allOn && sel.length > 0} onChange={(on) => setSel(on ? allKeys : [])} aria-label="Select all rows" />
              </th>
            )}
            {columns.map((c, i) => headCell(c.header, c, i))}
          </tr>
        </thead>}
        <tbody>
          {bodyState ? (
            <tr><td colSpan={span} data-sh-part={part("statebody")} style={{ padding: "var(--spacing-6xl-px) " + INSET }}>{state === "error" ? error : empty}</td></tr>
          ) : data.map((row, ri) => {
            const k = keyOf(row, ri);
            const off = rowDisabled ? rowDisabled(row) : false;
            const on = selectable && isSel(k);
            const striped = zebra && ri % 2 === 1;
            const hot = hoverKey === k && !off && !on;
            return (
              <tr key={k} data-selected={on || undefined} data-disabled={off || undefined}
                onMouseEnter={() => setHoverKey(k)} onMouseLeave={() => setHoverKey(null)}
                data-sh-part={on ? part("rowsel") : off ? part("rowoff") : striped ? part("rowalt") : ri === 0 ? part("row") : undefined}
                style={{
                  background: on ? "var(--colors-background-bg-brand-primary)" : hot ? "var(--colors-background-bg-secondary-hover)" : striped ? "var(--colors-background-bg-secondary)" : "transparent",
                  borderBottom: !zebra && ri < data.length - 1 ? "1px solid var(--colors-border-border-secondary)" : "none",
                  color: off ? "var(--colors-text-text-disabled)" : undefined
                }}>
                {selectable && (
                  <td data-sh-part={ri === 0 ? part("selectcell") : undefined} style={{ padding: cellPad + " 0 " + cellPad + " " + INSET, verticalAlign: "middle" }}>
                    <Checkbox size="sm" checked={on} disabled={off} onChange={(v) => setSel(v ? sel.concat([k]) : sel.filter((x) => x !== k))} aria-label="Select row" />
                  </td>
                )}
                {columns.map((c, ci) => (
                  <td key={ci} data-sh-part={ri === 0 && ci === 0 ? part("cell") : undefined} style={{ textAlign: c.align || "left", padding: cellPad + " " + INSET, fontSize: 14, lineHeight: "20px", color: off ? "var(--colors-text-text-disabled)" : "var(--colors-text-text-secondary-700)", verticalAlign: "middle", whiteSpace: "nowrap" }}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {footer && !pagination ? (
        <div data-sh-part={part("footer")} style={{ borderTop: "1px solid var(--colors-border-border-secondary)" }}>{footer}</div>
      ) : null}
      {pagination && (
        <div data-sh-part={part("footer")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)", padding: "var(--spacing-lg-px) " + INSET, borderTop: "1px solid var(--colors-border-border-secondary)" }}>
          <Button hierarchy="secondary" size="sm" disabled={pagination.page <= 1} onClick={pagination.onPrev} iconLeading={<Icon name="ArrowLeft" size={16} />}>Previous</Button>
          <span data-sh-part={part("pagelabel")} style={{ fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{"Page " + pagination.page + " of " + pagination.pages}</span>
          <Button hierarchy="secondary" size="sm" disabled={pagination.page >= pagination.pages} onClick={pagination.onNext} iconTrailing={<Icon name="ArrowRight" size={16} />}>Next</Button>
        </div>
      )}
    </div>
  );
}
export default Table;
