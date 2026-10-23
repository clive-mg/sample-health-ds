/* Sample Health docs — Page templates. Each page frames a live template from
   templates/<slug>/ at a 1440px desktop width, scaled to fit the content column. */
(function () {
  const SH = window.SH;
  const { useRef, useState, useEffect } = React;
  const VIEWS = [{ id: "desktop", label: "Desktop", icon: "Monitor01", w: 0 }, { id: "tablet", label: "Tablet", icon: "Tablet01", w: 900 }, { id: "mobile", label: "Mobile", icon: "Phone01", w: 390 }];

  const NS = "UntitledUIPRODesignSystem_380e88";

  /* Apply the docs' selected theme (saved, never the Playground draft) to a template frame. */
  const savedTheme = () => (window.SHThemes ? window.SHThemes.saved() : null);
  function themeFrame(frame) {
    try {
      const d = frame.current && frame.current.contentDocument;
      if (d && d.head && window.SHTheme) window.SHTheme.applyTheme(d, savedTheme());
    } catch (e) {}
  }
  function useThemedFrame(frame) {
    const v = window.SH_useThemeVersion ? window.SH_useThemeVersion() : 0;
    useEffect(() => { themeFrame(frame); }, [v]);
    return () => themeFrame(frame);
  }
  const fontRe = () => { const t = savedTheme(); const f = (t && !t.builtin && t.font && t.font.family) || "Inter"; return new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); };

  /* True once the framed template has its stylesheet, bundle and fonts, every import has
     mounted and the layout has stopped changing — so the skeleton never hands over to a
     half-styled page. Falls back after 10s so a slow asset cannot hold the skeleton forever. */
  function useFrameReady(frame) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      let done = false, stable = 0, last = "", n = 0;
      const finish = () => { if (done) return; done = true; clearInterval(t); requestAnimationFrame(() => setReady(true)); };
      const t = setInterval(() => {
        n++;
        if (n > 100) return finish();
        try {
          const win = frame.current && frame.current.contentWindow;
          const doc = win && win.document;
          if (!win || !win[NS] || !doc.fonts || doc.fonts.status !== "loaded") return;
          if (!doc.querySelector("main") || !doc.querySelector("footer")) return;
          if (!fontRe().test(win.getComputedStyle(doc.body).fontFamily + win.getComputedStyle(doc.querySelector("main")).fontFamily)) return;
          const imgs = Array.prototype.every.call(doc.images, (i) => i.complete);
          const sig = doc.documentElement.scrollHeight + ":" + doc.getElementsByTagName("*").length;
          if (imgs && sig === last) stable++; else { stable = 0; last = sig; }
          if (stable >= 4) finish();
        } catch (e) {}
      }, 100);
      return () => clearInterval(t);
    }, []);
    return ready;
  }

  /* Skeleton mirrors the template at the width it renders: same container steps
     (100% + 16px gutter below 1200, 1140 / 1320 above) and the same column count. */
  function TemplateSkeleton(props) {
    const UI = window[NS] || {};
    const Sk = UI.Skeleton;
    if (!Sk) return null;
    const W = props.width || 1440;
    const mobile = W < 600, compact = W < 992;
    const cols = mobile ? 1 : compact ? 2 : 4;
    const box = { width: "100%", maxWidth: W >= 1400 ? 1320 : W >= 1200 ? 1140 : "100%", margin: "0 auto", boxSizing: "border-box", padding: "0 var(--spacing-xl-px)" };
    const line = "1px solid var(--colors-border-border-secondary)";
    const card = { border: line, borderRadius: "var(--radius-xl-px)", padding: mobile ? "var(--spacing-xl-px)" : "var(--spacing-3xl-px)", display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)" };
    const grid = (c) => ({ display: "grid", gridTemplateColumns: "repeat(" + c + ", minmax(0, 1fr))", gap: "var(--spacing-xl-px) var(--spacing-3xl-px)" });
    const field = (k) => <div key={k} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm-px)" }}><Sk width="40%" height={14} /><Sk height={36} /></div>;
    const pair = (k) => <div key={k} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs-px)" }}><Sk width="50%" height={14} /><Sk width="75%" height={14} /></div>;
    const list = (k) => <div key={k} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}><Sk width="60%" height={20} />{[0, 1, 2, 3, 4].map((i) => <Sk key={i} width={(85 - i * 9) + "%"} height={14} />)}</div>;
    const tcols = compact ? 3 : 7;
    const rows = (n) => Array.from({ length: n }, (_, i) => mobile ? (
      <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)", padding: "var(--spacing-xl-px)", borderTop: i ? line : 0 }}><Sk width="55%" height={16} /><Sk width="80%" height={14} /><Sk width="40%" height={14} /></div>
    ) : (
      <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(" + tcols + ", minmax(0, 1fr))", gap: "var(--spacing-3xl-px)", padding: "var(--spacing-xl-px) var(--spacing-3xl-px)", borderTop: i ? line : 0 }}>
        {Array.from({ length: tcols }, (_, c) => <Sk key={c} height={16} />)}
      </div>));
    const head = mobile ? <Sk width="60%" height={36} /> : (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)" }}>
        <Sk width="28%" height={36} />
        {props.kind === "article" ? null : props.kind === "list" ? <div style={{ display: "flex", gap: "var(--spacing-lg-px)", width: compact ? "40%" : "30%" }}><Sk height={36} /><Sk height={36} /></div> : null}
      </div>);
    let body;
    if (props.kind === "detail") body = [0, 1, 2].map((k) => (
      <div key={k} style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)" }}><Sk variant="circle" width={32} height={32} /><Sk width={mobile ? "50%" : "20%"} height={20} /></div>
        <div style={grid(cols)}>{Array.from({ length: mobile ? 3 : 5 }, (_, i) => pair(i))}</div>
      </div>));
    else if (props.kind === "article") body = (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4xl-px)" }}>
        <div style={{ flex: "0 1 240px", display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}><Sk width="70%" height={20} />{Array.from({ length: mobile ? 4 : 10 }, (_, i) => <Sk key={i} height={i ? 20 : 40} />)}</div>
        <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: "var(--spacing-lg-px)" }}><Sk width="45%" height={24} />{Array.from({ length: 10 }, (_, i) => <Sk key={i} width={i % 3 === 2 ? "70%" : "100%"} height={16} />)}</div>
      </div>);
    else if (props.kind === "sitemap") body = <div style={grid(mobile ? 1 : compact ? 2 : 3)}>{Array.from({ length: mobile ? 3 : 6 }, (_, i) => list(i))}</div>;
    else if (props.kind === "form") body = (
      <div style={{ display: "grid", gridTemplateColumns: compact ? "minmax(0,1fr)" : "minmax(0,2fr) minmax(0,1fr)", gap: "var(--spacing-3xl-px)" }}>
        <div style={card}>{[0, 1, 2, 3].map(field)}<Sk height={120} /><Sk width={140} height={36} /></div>
        <div style={card}>{[0, 1, 2].map(pair)}</div>
      </div>);
    else if (props.kind === "marketing") body = <>
      <Sk height={360} style={{ borderRadius: "var(--radius-2xl-px)" }} />
      {[0, 1].map((s) => <div key={s} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)" }}><Sk width={mobile ? "60%" : "25%"} height={28} /><div style={grid(mobile ? 1 : compact ? 2 : 3)}>{Array.from({ length: mobile ? 2 : 3 }, (_, i) => <div key={i} style={card}><Sk width="50%" height={20} /><Sk height={14} /><Sk width="80%" height={14} /></div>)}</div></div>)}
    </>;
    else body = <>
      <div style={card}><Sk width={mobile ? "30%" : "12%"} height={22} /><div style={grid(cols)}>{Array.from({ length: mobile ? 3 : 6 }, (_, i) => field(i))}</div></div>
      <div style={{ ...card, padding: 0, gap: 0 }}>{rows(mobile ? 5 : 8)}</div>
    </>;
    return (
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--colors-background-bg-primary)", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "var(--colors-background-bg-secondary)", borderBottom: line }}>
          <div style={{ ...box, height: compact ? 64 : 112, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)" }}>
            <Sk width={140} height={32} />
            {compact ? <Sk width={40} height={40} /> : <div style={{ display: "flex", gap: "var(--spacing-3xl-px)", width: "50%" }}>{[0, 1, 2, 3].map((i) => <Sk key={i} height={20} />)}</div>}
          </div>
        </div>
        <div style={{ ...box, paddingTop: "var(--spacing-4xl-px)", display: "flex", flexDirection: "column", gap: "var(--spacing-3xl-px)" }}>
          {props.kind === "detail" ? <Sk width={160} height={20} /> : null}
          {head}
          {body}
        </div>
      </div>
    );
  }

  function TemplateFrame(props) {
    const wrap = useRef(null), frame = useRef(null);
    const [w, setW] = useState(0);
    const [docH, setDocH] = useState(1600);
    const ready = useFrameReady(frame);
    const onLoad = useThemedFrame(frame);
    useEffect(() => {
      const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
      if (wrap.current) ro.observe(wrap.current);
      const t = setInterval(() => {
        try {
          const d = frame.current && frame.current.contentDocument;
          if (d && d.body) {
            /* The iframe is sized to its content, so a 100vh page root would pin it at
               whatever height it last reached and leave a band below the footer. */
            d.querySelectorAll("div").forEach((el) => { if (el.style.minHeight === "100vh") el.style.minHeight = "0"; });
            const ft = d.querySelector("footer");
            setDocH(ft ? Math.ceil(ft.getBoundingClientRect().bottom + frame.current.contentWindow.scrollY) : d.documentElement.scrollHeight);
          }
        } catch (e) {}
      }, 150);
      return () => { ro.disconnect(); clearInterval(t); };
    }, []);
    /* designW 0 = fluid: the template renders at the column's own width and reflows on resize. */
    const DESIGN_W = props.designW || Math.round(w) || 1440;
    const scale = w ? Math.min(1, w / DESIGN_W) : 1;
    const left = w ? Math.max(0, (w - DESIGN_W * scale) / 2) : 0;
    return (
      <div ref={wrap} style={{ position: "relative", width: "100%", background: props.designW ? "var(--colors-gray-light-mode-400)" : "var(--colors-background-bg-primary)", boxSizing: "border-box", height: (ready ? docH : 1200) * scale + 2, overflow: "hidden", borderRadius: "var(--radius-2xl-px)", border: "1px solid var(--colors-border-border-secondary)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02), 0px 2px 2px -1px var(--colors-effects-shadows-shadow-lg-03)", marginBottom: "var(--spacing-3xl-px)" }}>
        <iframe ref={frame} src={props.src} title={props.title} scrolling="no" onLoad={onLoad}
          style={{ width: DESIGN_W, height: docH, border: 0, display: "block", marginLeft: left, background: "var(--colors-background-bg-primary)", transform: "scale(" + scale + ")", transformOrigin: "0 0", visibility: ready ? "visible" : "hidden" }} />
        {!ready && <div style={{ position: "absolute", top: 0, left: left, width: DESIGN_W, height: 1200, transform: "scale(" + scale + ")", transformOrigin: "0 0" }}><TemplateSkeleton kind={props.kind} width={DESIGN_W} /></div>}
      </div>
    );
  }

  function FullFrame(props) {
    const frame = useRef(null);
    const ready = useFrameReady(frame);
    const onLoad = useThemedFrame(frame);
    return (
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <iframe ref={frame} src={props.src} title={props.title} onLoad={onLoad} style={{ width: "100%", height: "100%", border: 0, display: "block", visibility: ready ? "visible" : "hidden" }} />
        {!ready && <TemplateSkeleton kind={props.kind} width={window.innerWidth} />}
      </div>
    );
  }

  function TemplatePreview(props) {
    const UI = window.UntitledUIPRODesignSystem_380e88 || {};
    const [full, setFull] = useState(false);
    const [view, setView] = useState("desktop");
    const [fullSrc, setFullSrc] = useState(props.src);
    useEffect(() => { if (full) setFullSrc(props.src); }, [full, props.src]);
    window.SH_useThemeVersion && window.SH_useThemeVersion();
    const cur = TEMPLATES.find((t) => t.src === fullSrc) || props;
    const themes = window.SHThemes ? window.SHThemes.all() : [];
    const themeId = window.SHThemes ? window.SHThemes.saved().id : null;
    const fieldS = { display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)" };
    const labelS = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: 600, color: "var(--colors-base-white)", whiteSpace: "nowrap" };
    const Icon = UI.Icon;
    useEffect(() => {
      if (!full) return;
      const onKey = (e) => { if (e.key === "Escape") setFull(false); };
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    }, [full]);
    return (
      <div className="sh-tpl-preview" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg-px)", paddingTop: "var(--spacing-xl-px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)", flexWrap: "wrap" }}>
          <div className="sh-tm-seg is-icons" role="group" aria-label="Preview width">{VIEWS.map((o) =>
            <button key={o.id} type="button" className={o.id === view ? "is-on" : ""} aria-label={o.label} aria-pressed={o.id === view} title={o.label} onClick={() => setView(o.id)}>
              {Icon ? <Icon name={o.icon} size={20} aria-hidden="true" /> : o.label}
            </button>)}</div>
          {UI.Button && view === "desktop" && <UI.Button hierarchy="link-color" size="sm" iconLeading={Icon ? <Icon name="Fullscreen" size={20} aria-hidden="true" /> : null} onClick={() => setFull(true)}>Fullscreen</UI.Button>}
        </div>
        <TemplateFrame key={view} src={props.src} title={props.title} kind={props.kind} designW={VIEWS.find((o) => o.id === view).w} />
        {full && (
          <div role="dialog" aria-modal="true" aria-label={props.title + ", fullscreen"} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column", background: "var(--colors-background-bg-primary)" }}>
            <div className="sh-tpl-full-bar" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", alignItems: "center", gap: "var(--spacing-lg-px) var(--spacing-xl-px)", padding: "var(--spacing-lg-px) var(--spacing-3xl-px)", background: "var(--colors-gray-light-mode-900)" }}>
              {UI.Select ? <div className="sh-tpl-full-controls" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--spacing-3xl-px)" }}>
                {themes.length ? <div style={fieldS}><span style={labelS} id="sh-tpl-full-theme">Theme</span><div style={{ width: 200 }}><UI.Select size="sm" aria-labelledby="sh-tpl-full-theme" options={themes.map((t) => ({ value: t.id, label: t.name }))} value={themeId} onChange={(id) => window.SHThemes.select(id)} /></div></div> : null}
                <div style={fieldS}><span style={labelS} id="sh-tpl-full-page">Template</span><div style={{ width: 280, maxWidth: "100%" }}><UI.Select size="sm" aria-labelledby="sh-tpl-full-page" options={TEMPLATES.map((t) => ({ value: t.src, label: t.title }))} value={fullSrc} onChange={setFullSrc} /></div></div>
              </div> : <span></span>}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>{UI.Button && <UI.Button hierarchy="secondary" size="sm" autoFocus iconLeading={UI.Icon ? <UI.Icon name="XClose" size={20} aria-hidden="true" /> : null} onClick={() => setFull(false)}>Exit fullscreen</UI.Button>}</div>
            </div>
            <FullFrame key={fullSrc} src={cur.src} title={cur.title} kind={cur.kind} />
          </div>
        )}
      </div>
    );
  }

  /* `template` is read by the Playground's Template picker, which lists every
     template page in the sidebar's "… templates" groups. */
  const TEMPLATES = [];
  const page = (src, title, kind) => (TEMPLATES.push({ src, title, kind }), {
    wide: true,
    template: { src, title },
    sections: [{ id: "preview", render: () => <TemplatePreview src={src} title={title} kind={kind} /> }]
  });

  SH.registerPage("claims-list", page("templates/claims-list/ClaimsList.dc.html", "Search and results view", "list"));
  SH.registerPage("claim-detail", page("templates/claim-detail/ClaimDetail.dc.html", "Search results detail view", "detail"));
  SH.registerPage("sitemap", page("templates/sitemap/Sitemap.dc.html", "Sitemap", "sitemap"));
  SH.registerPage("contact-us", page("templates/contact-us/ContactUs.dc.html", "Support / Contact Us", "form"));
  SH.registerPage("manage-profile", page("templates/manage-profile/ManageProfile.dc.html", "Manage Profile", "detail"));
  SH.registerPage("coverage-benefits", page("templates/coverage-benefits/CoverageBenefits.dc.html", "Coverage & Benefits", "marketing"));
  SH.registerPage("knowledge-base", page("templates/knowledge-base/KnowledgeBase.dc.html", "Knowledge Base / Help Center", "marketing"));
  SH.registerPage("knowledge-base-detail", page("templates/knowledge-base-detail/KnowledgeBaseDetail.dc.html", "Knowledge Base / Help Center Detail View", "article"));
  SH.registerPage("member-home", page("templates/home/Home.dc.html", "Member Portal Home Page", "marketing"));
  SH.registerPage("provider-search", page("templates/provider-search/ProviderSearch.dc.html", "Provider Search", "list"));
})();
