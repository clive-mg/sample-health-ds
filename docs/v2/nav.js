/* Sample Health docs (v2) — sidebar navigation registry.
   Adds the "Developer reference" group: the MDS theme token map.
   Only categories that map to real components in this system are listed.
   Order mirrors the reference: alphabetical within each group. */
window.SH_NAV = [
  {
    group: "Foundations",
    items: [
      { slug: "tokens-color", title: "Colors" },
      { slug: "typography", title: "Typography" },
      { slug: "spacing", title: "Spacing" },
      { slug: "layout", title: "Layout" },
      { slug: "radius", title: "Radius" },
      { slug: "shadows", title: "Shadows" },
      { slug: "icons", title: "Icons" }
    ]
  },
  {
    group: "Base components",
    items: [
      { slug: "avatars", title: "Avatars" },
      { slug: "badges", title: "Badges" },
      { slug: "badge-groups", title: "Badge groups" },
      { slug: "buttons", title: "Buttons" },
      { slug: "checkboxes", title: "Checkboxes" },
      { slug: "dropdowns", title: "Dropdowns" },
      { slug: "featured-icons", title: "Featured icons" },
      { slug: "inputs", title: "Inputs" },
      { slug: "progress-indicators", title: "Progress indicators" },
      { slug: "radio-buttons", title: "Radio buttons" },
      { slug: "select", title: "Select" },
      { slug: "sliders", title: "Sliders" },
      { slug: "textareas", title: "Textareas" },
      { slug: "toggles", title: "Toggles" },
      { slug: "tooltips", title: "Tooltips" }
    ]
  },
  {
    group: "Application components",
    items: [
      { slug: "accordion", title: "Accordion" },
      { slug: "alerts", title: "Alerts" },
      { slug: "breadcrumbs", title: "Breadcrumbs" },
      { slug: "date-pickers", title: "Date pickers" },
      { slug: "empty-states", title: "Empty states" },
      { slug: "file-uploaders", title: "File uploaders" },
      { slug: "modals", title: "Modals" },
      { slug: "navigation", title: "Navigation" },
      { slug: "notifications", title: "Notifications" },
      { slug: "pagination", title: "Pagination" },
      { slug: "progress-steps", title: "Progress steps" },
      { slug: "tables", title: "Tables" },
      { slug: "tabs", title: "Tabs" }
    ]
  },
  {
    group: "Page templates",
    items: [
      { slug: "claims-list", title: "Search and results view" },
      { slug: "claim-detail", title: "Search results detail view" },
      { slug: "sitemap", title: "Sitemap" },
      { slug: "contact-us", title: "Support / Contact Us" },
      { slug: "manage-profile", title: "Manage Profile" },
      { slug: "coverage-benefits", title: "Coverage & Benefits" },
      { slug: "knowledge-base", title: "Knowledge Base / Help Center" },
      { slug: "knowledge-base-detail", title: "Knowledge Base / Help Center Detail View" },
      { slug: "member-home", title: "Member Portal Home Page" }
    ]
  },
  {
    group: "Application templates",
    items: [
      { slug: "provider-search", title: "Provider Search" }
    ]
  }
  /* Developer reference — hidden from the sidebar. The pages are still
     registered, so #/tokens-overview and friends resolve if linked directly.
  ,{
    group: "Developer reference",
    items: [
      { slug: "tokens-overview", title: "Token map overview" },
      { slug: "tokens-layout", title: "Layout tokens" },
      { slug: "tokens-typography", title: "Typography — base" },
      { slug: "tokens-styles", title: "Typography — styles" }
    ]
  } */
];
