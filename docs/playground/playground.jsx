/* Sample Health docs — Playground. Left: theme switcher + editor for the
   selected theme. Right: a themed preview of a page template. */
(function () {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const UI = window.UntitledUIPRODesignSystem_380e88 || {};
  /* Resolved lazily: the DS bundle may evaluate this file before store.js. */
  const S = new Proxy({}, { get: (_, k) => window.SHThemes[k] });
  const { useState, useEffect, useRef } = React;

  /* Built from the sidebar: every group whose name ends in "templates", in nav
     order, each item resolved to the src its page registers. New template pages
     appear here as soon as they're in the nav and registered. */
  function templateOptions() {
    const out = [], flat = [];
    for (const g of window.SH_NAV || []) {
      if (!/templates$/i.test(g.group)) continue;
      const items = g.items.map((it) => { const d = window.SH.pages && window.SH.pages[it.slug]; return d && d.template ? { label: it.title, value: d.template.src } : null; }).filter(Boolean);
      if (!items.length) continue;
      out.push({ group: g.group }, ...items);
      flat.push(...items);
    }
    return { options: out, flat };
  }
  const DEVICES = { desktop: "100%", tablet: "768px", mobile: "390px" };
  const NEW = "__new";
  const HEX = /^#[0-9a-f]{6}$/i;
  const RAMP = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  function useThemeStore() {
    const [, bump] = useState(0);
    useEffect(() => S.subscribe(() => bump((n) => n + 1)), []);
    return S;
  }
  function useStored(key, initial, allowed) {
    const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s && (!allowed || allowed.includes(s)) ? s : initial; } catch (e) { return initial; } });
    useEffect(() => { try { localStorage.setItem(key, v); } catch (e) {} }, [key, v]);
    return [v, setV];
  }

  /* v2 themes: { v: 2, st } — see SHTheme.V2. The built-in default is the V2 defaults. */
  const D = () => window.SHTheme.V2.DEFAULTS;
  function toForm(t, blankName) {
    const st = t && t.v === 2 ? t.st || {} : {};
    return { name: blankName ? "" : t.name, st: { ...D(), ...st, ov: { ...(st.ov || {}) } } };
  }
  function fromForm(f) {
    return { id: "draft", name: f.name.trim() || "Untitled theme", v: 2, st: f.st };
  }
  /* Export writes only the tokens that differ from the base theme, one key per token. */
  function downloadTheme(t) {
    const st = t && t.v === 2 ? t.st : D();
    const tokens = {}; window.SHTheme.V2.exportRows(st).forEach((r) => (tokens[r.name] = r.value));
    const out = { name: t.name || "Theme", id: (t.name || "theme").toLowerCase().replace(/[^a-z0-9]+/g, "-"), tokens };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: "application/json" }));
    a.download = out.id + ".json"; a.click();
  }
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  function Field(props) {
    return <div className="pg-field">
      <div className="pg-label"><span>{props.label}</span>{props.value != null ? <output>{props.value}</output> : null}</div>
      {props.children}
    </div>;
  }
  function ColorField(props) {
    return <Field label={props.label}>
      <div className="pg-color-row">
        <input type="color" className="pg-color" aria-label={props.label} value={HEX.test(props.value) ? props.value : "#000000"} onChange={(e) => props.onChange(e.target.value)} />
        <div className="pg-grow"><UI.Input size="sm" aria-label={props.label + " hex"} maxLength={7} value={props.value} onChange={(e) => props.onChange(e.target.value)} /></div>
      </div>
      {props.ramp ? <div className="pg-ramp" aria-label="Generated brand scale">{RAMP.map((s) => <i key={s} title={s + " " + props.ramp[s]} style={{ background: props.ramp[s] }}></i>)}</div> : null}
    </Field>;
  }

  /* DS Tooltip rendered in a body portal over the trigger, so scroll and
     overflow containers (the menu, the sidebar) cannot clip it. */
  function FloatingTip(props) {
    const [rect, setRect] = useState(null);
    const show = (e) => { const r = e.currentTarget.getBoundingClientRect(); setRect({ left: r.left, top: r.top, width: r.width, height: r.height }); };
    const hide = () => setRect(null);
    useEffect(() => { if (!rect) return; window.addEventListener("scroll", hide, true); return () => window.removeEventListener("scroll", hide, true); }, [rect]);
    return <span className="pg-tip-trigger" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {props.children}
      {rect ? ReactDOM.createPortal(<div className="pg-tip-anchor" style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}>
        <UI.Tooltip title={props.title} placement={props.placement || "top"} open={true} style={{ width: "100%", height: "100%" }}><span></span></UI.Tooltip>
      </div>, document.body) : null}
    </span>;
  }

  /* Theme dropdown. Mirrors the DS Select (sm) but lets user themes carry inline
     edit / delete actions, revealed on row hover or keyboard focus. */
  function ThemeSelect(props) {
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    const lid = "pg-ts-label-" + React.useId().replace(/:/g, "");
    useEffect(() => {
      if (!open) return;
      const onDown = (e) => {
        if (e.target.closest && e.target.closest(".pg-ts-pop")) return;
        if (root.current && !root.current.contains(e.target)) setOpen(false);
        else if (!(e.target.closest && e.target.closest(".pg-ts-actions"))) setMenuFor(null);
      };
      const onKey = (e) => { if (e.key !== "Escape") return; setMenuFor((m) => { if (m == null) setOpen(false); return null; }); };
      document.addEventListener("pointerdown", onDown, true);
      document.addEventListener("keydown", onKey);
      return () => { document.removeEventListener("pointerdown", onDown, true); document.removeEventListener("keydown", onKey); };
    }, [open]);
    const [menuFor, setMenuFor] = useState(null);
    const [renaming, setRenaming] = useState(null);
    const [draftName, setDraftName] = useState("");
    useEffect(() => { if (!open) setRenaming(null); }, [open]);
    function startRename(id) { const t = props.items.find((x) => x.id === id); setMenuFor(null); setDraftName(t ? t.name : ""); setRenaming(id); }
    function commitRename() { const id = renaming; setRenaming(null); const n = draftName.trim(); if (id && n) props.onRename(id, n); }
    const [menuPos, setMenuPos] = useState(null);
    useEffect(() => { if (!open) setMenuFor(null); }, [open]);
    function openMenu(id, btn) {
      if (menuFor === id) { setMenuFor(null); return; }
      const r = btn.getBoundingClientRect();
      setMenuPos({ left: r.right + 8, top: r.top });
      setMenuFor(id);
    }
    const menuItem = props.items.find((t) => t.id === menuFor);
    const sel = props.items.find((t) => t.id === props.value);
    const act = (fn, id) => (e) => { e.stopPropagation(); setOpen(false); fn(id); };
    return <div className={"pg-ts" + (props.inline ? " is-inline" : "")} ref={root}>
      <label className="pg-label" id={lid}>Theme</label>
      <button type="button" className={"pg-ts-field" + (open ? " is-open" : "")} aria-haspopup="listbox" aria-expanded={open} aria-labelledby={lid} onClick={() => setOpen((o) => !o)}>
        <span className="pg-ts-text">{sel ? sel.name : "Select"}</span>
        <UI.Icon name="ChevronDown" size={16} />
      </button>
      {open ? <div className="pg-ts-menu" role="listbox" aria-labelledby={lid}>
        {props.items.map((t) => {
          const on = t.id === props.value;
          return <div key={t.id} className={"pg-ts-item" + (on ? " is-selected" : "")}>
            {renaming === t.id
              ? <input className="pg-ts-rename" aria-label={"Rename " + t.name} autoFocus value={draftName} maxLength={60}
                  onChange={(e) => setDraftName(e.target.value)} onFocus={(e) => e.target.select()} onBlur={commitRename}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commitRename(); } else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); setRenaming(null); } }} />
              : <button type="button" role="option" aria-selected={on} className="pg-ts-opt" onClick={() => { setOpen(false); props.onChange(t.id); }}><span className="pg-ts-name">{t.name}</span>{t.builtin ? <FloatingTip title="This is your default base theme, which can be used to build other themes."><UI.Badge size="sm" color="gray">Base</UI.Badge></FloatingTip> : null}</button>}
            {t.id !== "__new" && renaming !== t.id ? <span className={"pg-ts-actions" + (menuFor === t.id ? " is-open" : "")}>
              <button type="button" className="pg-ts-act" aria-label={"More actions for " + t.name} aria-haspopup="menu" aria-expanded={menuFor === t.id} onClick={(e) => { e.stopPropagation(); openMenu(t.id, e.currentTarget); }}><UI.Icon name="DotsHorizontal" size={16} /></button>
            </span> : null}
          </div>;
        })}
        <div className="pg-ts-divider" role="separator"></div>
        {menuItem && menuPos ? ReactDOM.createPortal(<div className="pg-ts-pop" role="menu" aria-label={"Actions for " + menuItem.name} style={{ left: menuPos.left, top: menuPos.top }}>
          {menuItem.custom ? <button type="button" role="menuitem" className="pg-ts-pop-item" onClick={act(props.onEdit, menuItem.id)}><UI.Icon name="Brush01" size={16} />Edit theme in Playground</button> : null}
          {menuItem.custom ? <button type="button" role="menuitem" className="pg-ts-pop-item" onClick={(e) => { e.stopPropagation(); startRename(menuItem.id); }}><UI.Icon name="Edit03" size={16} />Rename</button> : null}
          <button type="button" role="menuitem" className="pg-ts-pop-item" onClick={act(props.onDuplicate, menuItem.id)}><UI.Icon name="Copy01" size={16} />Duplicate &amp; edit</button>
          <button type="button" role="menuitem" className="pg-ts-pop-item" onClick={(e) => { e.stopPropagation(); setMenuFor(null); downloadTheme(menuItem); }}><UI.Icon name="Download01" size={16} />Export</button>
          {menuItem.custom || menuItem.starter ? <button type="button" role="menuitem" className="pg-ts-pop-item is-danger" onClick={act(props.onDelete, menuItem.id)}><UI.Icon name="Trash01" size={16} />Delete</button> : null}
        </div>, document.body) : null}
        <button type="button" className="pg-ts-opt pg-ts-new" onClick={() => { setOpen(false); props.onCreate(); }}><UI.Icon name="Plus" size={16} />Create a new theme</button>
        {S.hiddenStarters().length ? <button type="button" className="pg-ts-opt pg-ts-new is-gray" onClick={() => { S.restoreStarters(); }}><UI.Icon name="RefreshCcw01" size={16} />Restore starter themes</button> : null}
      </div> : null}
    </div>;
  }

  /* Neutral page outline shown while a template loads: nav, page header, a card row and a list. */
  function PgSkeleton({ hidden }) {
    const b = (cls) => <span className={"pg-sk-b " + cls}></span>;
    return (
      <div className={"pg-sk" + (hidden ? " is-hidden" : "")} aria-hidden="true">
        <div className="pg-sk-nav">{b("pg-sk-logo")}<span className="pg-sk-links">{b("pg-sk-link")}{b("pg-sk-link")}{b("pg-sk-link")}</span>{b("pg-sk-avatar")}</div>
        <div className="pg-sk-body">
          <div className="pg-sk-head">{b("pg-sk-title")}{b("pg-sk-sub")}</div>
          <div className="pg-sk-cards">{[0, 1, 2].map((i) => <div key={i} className="pg-sk-card">{b("pg-sk-icon")}{b("pg-sk-line w60")}{b("pg-sk-line w90")}{b("pg-sk-line w40")}</div>)}</div>
          <div className="pg-sk-card pg-sk-list">{[0, 1, 2, 3].map((i) => <div key={i} className="pg-sk-row">{b("pg-sk-dot")}{b("pg-sk-line w40")}{b("pg-sk-line w20")}</div>)}</div>
        </div>
      </div>
    );
  }

  function Playground(props) {
    useThemeStore();
    const saved = S.find(S.current()) || S.DEFAULT;
    const [base] = useState(() => { const b = window.__shPgCreate; window.__shPgCreate = false; return b; });
    const [creating, setCreating] = useState(!!base);
    const [form, setForm] = useState(() => {
      const src = typeof base === "string" && S.find(base);
      return src ? { ...toForm(src), name: "Copy of " + src.name } : toForm(saved, creating);
    });
    const [deleteId, setDeleteId] = useState(null);
    const [{ options: PAGE_OPTIONS, flat: PAGES }] = useState(templateOptions);
    const [page, setPage] = useStored("sh-pg-page", (PAGES.find((p) => /Home\.dc\.html$/.test(p.value)) || PAGES[0]).value, PAGES.map((p) => p.value));
    const [device, setDevice] = useStored("sh-pg-device", "desktop", Object.keys(DEVICES));
    const frame = useRef(null);
    const fullFrame = useRef(null);
    const [full, setFull] = useState(false);
    useEffect(() => {
      if (!full) return;
      const onKey = (e) => { if (e.key === "Escape") setFull(false); };
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [full]);
    useEffect(() => { if (device !== "desktop") setFull(false); }, [device]);
    useEffect(() => () => setShown({}), [page]);
    useEffect(() => { if (!full) setShown((m) => { const n = { ...m }; for (const k in n) if (k.startsWith("full:")) delete n[k]; return n; }); }, [full]);

    const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
    const dirty = creating || !same(form, toForm(saved));

    useEffect(() => { if (!creating) setForm(toForm(saved)); }, [saved.id]);
    useEffect(() => { S.preview(dirty ? fromForm(form) : null); }, [form, creating, saved.id]);
    useEffect(() => () => S.preview(null), []);

    function themeFrame() {
      for (const r of [frame, fullFrame]) {
        const doc = r.current && r.current.contentDocument;
        if (!doc || !doc.head) continue;
        window.SHTheme.applyTheme(doc, S.active());
      }
    }
    useEffect(themeFrame);

    /* Keep each frame hidden until the template's stylesheets, fonts and theme are in, so the unstyled first paint never shows. */
    const [shown, setShown] = useState({});
    const frameKey = (which) => which + ":" + page;
    function reveal(which, r) {
      themeFrame();
      const key = frameKey(which), doc = r.current && r.current.contentDocument;
      const done = () => setShown((m) => m[key] ? m : { ...m, [key]: true });
      if (!doc) return done();
      const sheets = Array.from(doc.querySelectorAll('link[rel="stylesheet"]')).filter((l) => !l.sheet)
        .map((l) => new Promise((res) => { l.addEventListener("load", res); l.addEventListener("error", res); }));
      const ready = Promise.all(sheets.concat(doc.fonts ? [doc.fonts.ready] : [])).then(() => new Promise((res) => {
        const w = doc.defaultView || window;
        w.requestAnimationFrame(() => w.requestAnimationFrame(res));
      }));
      Promise.race([ready, new Promise((res) => setTimeout(res, 2000))]).then(() => { themeFrame(); done(); });
    }

    function pick(id) { if (id === NEW) return; setCreating(false); S.select(id); setForm(toForm(S.find(id) || S.DEFAULT)); }
    function startCreate() { setCreating(true); setForm(toForm(saved, true)); }
    function reset() { setCreating(false); setForm(toForm(saved)); }
    const [naming, setNaming] = useState(null);
    function save() { setNaming(creating ? form.name : saved.readonly ? "Copy of " + saved.name : saved.name); }
    function confirmSave() {
      const name = (naming || "").trim(); if (!name) return;
      const t = fromForm({ ...form, name });
      const id = S.save(t, creating || saved.readonly ? null : saved.id);
      setNaming(null); setCreating(false); setForm(toForm(S.find(id)));
    }
    function exportJSON() {
      downloadTheme(fromForm(form));
    }
    function duplicate(id) {
      const src = S.find(id); if (!src) return;
      const t = fromForm(toForm(src)); t.name = "Copy of " + src.name;
      const nid = S.save(t, null);
      setCreating(false); setForm(toForm(S.find(nid)));
    }
    function doDelete() {
      const id = deleteId; setDeleteId(null); if (!id) return;
      const wasCurrent = id === saved.id;
      S.remove(id);
      if (wasCurrent) { setCreating(false); setForm(toForm(S.DEFAULT)); }
    }
    const toDelete = deleteId ? S.find(deleteId) : null;

    const items = S.all().slice();
    if (creating) items.push({ id: NEW, name: "New Theme" });

    return <div className={"pg" + (props.panelOpen === false ? " is-collapsed" : "")}>
      <aside className="pg-panel" aria-label="Theme editor" hidden={props.panelOpen === false}>
        <div className="sh-resizer" role="separator" aria-orientation="vertical" aria-label="Resize editor panel" tabIndex={0} data-resize="pg-panel"></div>
        <window.SH_ThemeEditor st={form.st} setSt={(fn) => setForm((f) => ({ ...f, st: typeof fn === "function" ? fn(f.st) : fn }))} />
        <div className="pg-actions">
          <UI.Button size="sm" hierarchy="link-gray" onClick={exportJSON}>Export</UI.Button>
          <div className="pg-grow"></div>
          <UI.Button size="sm" hierarchy="link-gray" disabled={!dirty} onClick={reset}>{creating ? "Cancel" : "Reset"}</UI.Button>
          <UI.Button size="sm" hierarchy="primary" disabled={!dirty} onClick={save}>Save</UI.Button>
        </div>
      </aside>
      <section className="pg-preview" aria-label="Preview">
        <div className="pg-toolbar">
          <ThemeSelect inline items={items} value={creating ? NEW : saved.id} onChange={pick} onDelete={setDeleteId} onDuplicate={duplicate} onCreate={startCreate}
            onEdit={pick} onRename={(id, name) => { const t = S.find(id); if (t) S.save({ ...t, name }, id); }} />
          <div className="pg-page-field"><span className="pg-page-label" id="pg-page-label">Template</span><div className="pg-page-select"><UI.Select size="sm" aria-labelledby="pg-page-label" options={/o\.group/.test(String(UI.Select)) ? PAGE_OPTIONS : PAGES} value={page} onChange={setPage} /></div></div>
          <div className="pg-grow"></div>
          <div className="te-seg2 icon" role="radiogroup" aria-label="Preview size">{[["desktop", "Monitor01", "Desktop"], ["tablet", "Tablet01", "Tablet"], ["mobile", "Phone01", "Mobile"]].map(([v, ico, l]) =>
            <button type="button" role="radio" key={v} aria-checked={device === v} aria-label={l} title={l} className={device === v ? "on" : ""} onClick={() => setDevice(v)}><UI.Icon name={ico} size={20} aria-hidden="true" /></button>)}</div>
          {device === "desktop" ? <UI.Button hierarchy="link-color" size="sm" iconLeading={<UI.Icon name="Fullscreen" size={20} aria-hidden="true" />} onClick={() => setFull(true)}>Fullscreen</UI.Button> : null}
        </div>
        <div className="pg-stage">
          <div className={"pg-device pg-device-" + device} style={{ width: DEVICES[device] }}>
            <PgSkeleton hidden={!!shown[frameKey("main")]} />
            <iframe key={page} ref={frame} className={"pg-frame" + (shown[frameKey("main")] ? " is-ready" : "")} src={page} title="Themed preview" onLoad={() => reveal("main", frame)}></iframe>
          </div>
        </div>
      </section>
      {full ? <div className="pg-full" role="dialog" aria-modal="true" aria-label={(PAGES.find((p) => p.value === page) || PAGES[0]).label + ", fullscreen"}>
        <div className="pg-full-bar">
          <div className="pg-full-controls">
            <div className="pg-page-field"><span className="pg-page-label pg-full-label" id="pg-full-theme-label">Theme</span><div className="pg-full-select"><UI.Select size="sm" aria-labelledby="pg-full-theme-label" options={items.map((t) => ({ value: t.id, label: t.name }))} value={creating ? NEW : saved.id} onChange={pick} /></div></div>
            <div className="pg-page-field"><span className="pg-page-label pg-full-label" id="pg-full-page-label">Template</span><div className="pg-page-select"><UI.Select size="sm" aria-labelledby="pg-full-page-label" options={/o\.group/.test(String(UI.Select)) ? PAGE_OPTIONS : PAGES} value={page} onChange={setPage} /></div></div>
          </div>
          <div className="pg-full-end"><UI.Button hierarchy="secondary" size="sm" autoFocus iconLeading={<UI.Icon name="XClose" size={20} aria-hidden="true" />} onClick={() => setFull(false)}>Exit fullscreen</UI.Button></div>
        </div>
        <div className="pg-full-stage"><PgSkeleton hidden={!!shown[frameKey("full")]} /><iframe key={page} ref={fullFrame} className={"pg-full-frame" + (shown[frameKey("full")] ? " is-ready" : "")} src={page} title="Themed preview, fullscreen" onLoad={() => reveal("full", fullFrame)}></iframe></div>
      </div> : null}
      <UI.Modal open={naming != null} onClose={() => setNaming(null)} variant="content" size="sm"
        title="Save theme"
        actions={<React.Fragment>
          <UI.Button hierarchy="secondary" onClick={() => setNaming(null)}>Cancel</UI.Button>
          <UI.Button hierarchy="primary" disabled={!(naming || "").trim()} onClick={confirmSave}>Save</UI.Button>
        </React.Fragment>}>
        {naming != null ? <form onSubmit={(e) => { e.preventDefault(); confirmSave(); }}>
          <UI.Input size="sm" label="Theme name" hint="This is the name which will appear in the theme picker on the home page." placeholder="e.g. Sentara Night" autoFocus maxLength={60} value={naming} onChange={(e) => setNaming(e.target.value)} />
        </form> : null}
      </UI.Modal>
      <UI.Modal open={!!toDelete} onClose={() => setDeleteId(null)} icon={<UI.Icon name="Trash01" />} iconColor="error"
        title="Are you sure you want to delete this theme?"
        description={"\u201c" + (toDelete ? toDelete.name : "") + "\u201d will be permanently deleted. This action cannot be undone."}
        actions={<React.Fragment>
          <UI.Button hierarchy="secondary" onClick={() => setDeleteId(null)}>Cancel</UI.Button>
          <UI.Button hierarchy="primary-destructive" onClick={doDelete}>Delete</UI.Button>
        </React.Fragment>} />
    </div>;
  }

  /* Sidebar picker on the Themes pages — same list, same selection. */
  function ThemePicker() {
    useThemeStore();
    const [deleteId, setDeleteId] = useState(null);
    const toDelete = deleteId ? S.find(deleteId) : null;
    function duplicate(id) { if (!S.find(id)) return; window.__shPgCreate = id; location.hash = "#/playground"; }
    function create() { window.__shPgCreate = true; location.hash = "#/playground"; }
    function doDelete() { const id = deleteId; setDeleteId(null); if (id) S.remove(id); }
    return <React.Fragment>
      <ThemeSelect items={S.all()} value={S.current()} onChange={(id) => S.select(id)} onDelete={setDeleteId} onDuplicate={duplicate} onCreate={create} onEdit={(id) => { S.select(id); location.hash = "#/playground"; }} onRename={(id, name) => { const t = S.find(id); if (t) S.save({ ...t, name }, id); }} />
      <UI.Modal open={!!toDelete} onClose={() => setDeleteId(null)} icon={<UI.Icon name="Trash01" />} iconColor="error"
        title="Are you sure you want to delete this theme?"
        description={"\u201c" + (toDelete ? toDelete.name : "") + "\u201d will be permanently deleted. This action cannot be undone."}
        actions={<React.Fragment>
          <UI.Button hierarchy="secondary" onClick={() => setDeleteId(null)}>Cancel</UI.Button>
          <UI.Button hierarchy="primary-destructive" onClick={doDelete}>Delete</UI.Button>
        </React.Fragment>} />
    </React.Fragment>;
  }

  Object.assign(window, { SH_Playground: Playground, SH_ThemePicker: ThemePicker });
})();
