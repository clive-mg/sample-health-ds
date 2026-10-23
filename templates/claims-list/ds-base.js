(() => {
  if (window.__SH_DS_BASE) return;
  window.__SH_DS_BASE = true;
  const base = '../..';
  for (const p of ['styles.css']) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  for (const p of ['assets/icons/icon-data.js', '_ds_bundle.js']) {
    const s = document.createElement('script');
    s.src = base + '/' + p; s.async = false;
    s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — in a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page');
    document.head.appendChild(s);
  }
})();
