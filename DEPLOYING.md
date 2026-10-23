# Deploying the Sample Health docsite

This folder is a **plain static website**. `DocSite.html` loads React and Babel from a CDN
and everything else from files in this folder — no build step, no server code, nothing
tied to Claude Design. Any static host can serve it. This guide uses **GitHub** (stores the
files and history) and **Vercel** (hosts the site, gives every change its own preview link,
and lets reviewers leave comments on the page).

The visitor-facing URL is the site root (`/`), which forwards to `DocSite.html`.
Deep links work: `/#/buttons` opens the Buttons page.

---

## 0. Try it on your computer (optional)

From this folder, in Terminal:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Press `Ctrl+C` to stop. (Double-clicking `DocSite.html`
does **not** work — the page templates need a web server.)

## 1. Put the project on GitHub

1. Create a free account at https://github.com if you don't have one.
2. Install **GitHub Desktop** (https://desktop.github.com) and sign in.
3. *File → Add Local Repository…* → choose this `sample-health-ds` folder
   (it is already a Git repository).
4. Write a summary like `Initial import from Claude Design` and click **Commit to main**.
5. Click **Publish repository**. Keep **Private** ticked unless you want the code public.

## 2. Host it on Vercel

1. Sign up at https://vercel.com with **Continue with GitHub** (the free Hobby plan is enough
   for a docs site).
2. **Add New… → Project**, and **Import** the `sample-health-ds` repository.
3. Settings:
   - Framework Preset: **Other**
   - Build Command: leave empty / off
   - Output Directory: `.` (or leave default)
4. Click **Deploy**. In about a minute you get a URL like
   `https://sample-health-ds.vercel.app`. That is your live site.
5. Optional: *Project → Settings → Domains* to add your own domain
   (e.g. `design.mongoosesoftware.com`).

From now on, **every change pushed to `main` redeploys the live site automatically.**

`.vercelignore` keeps authoring files (`CLAUDE.md`, the audits, `uploads/`, this guide)
out of the public site while they stay in the repository.

## 3. Collect feedback

- **Share the production URL** for general viewing. It is public by default.
- **Comments on the page:** Vercel shows a toolbar on preview deployments where
  reviewers can click any spot and leave a comment, which you see in the Vercel dashboard.
  Reviewers sign in with a free Vercel account. Invite them under *Project → Settings*
  or share the preview link.
- **Who can see previews:** Vercel protects preview links by default (viewers must sign in).
  Change this under *Settings → Deployment Protection* if outside reviewers need access.
- Note: the **Playground** and theme choices are saved in each viewer's own browser
  (localStorage). They are not shared between people, so ask reviewers for a screenshot
  or a comment if they want to show you a theme they built.

## 4. Adding features from now on

The repository is now the source of truth — no more exporting zips.

1. Open this folder in Claude Code (desktop app → choose the folder). `CLAUDE.md` loads
   automatically, so the spacing and typography rules still apply to new work.
2. Work on a **branch** per feature (e.g. `add-toast-component`). In GitHub Desktop:
   *Current Branch → New Branch*.
3. Commit and **Push**. Vercel builds a **preview URL** just for that branch — share it
   for feedback without touching the live site.
4. When it's approved, merge the branch into `main` (GitHub Desktop: *Create Pull Request*,
   then merge on GitHub). The live site updates.

Where things live:

| You want to…                     | Edit                                              |
|----------------------------------|---------------------------------------------------|
| Add / change a docs page         | `docs/pages/*.jsx`, register it in `docs/v2/nav.js`, add a `<script>` line in `DocSite.html` |
| Change tokens (color, spacing…)  | `tokens/*.css`, `docs/v2/tokens.js`               |
| Change a page template           | `templates/<name>/*.dc.html`                      |
| Change a component               | `components/**` — see the note below              |

**Note on components:** the docs load components from `_ds_bundle.js`, a single compiled
file that Claude Design generated. Editing `components/**/*.jsx` does not change it.
Before changing an existing component, decide whether to (a) keep the bundle frozen and
add new components as separate files, or (b) set up a small build that regenerates
the bundle from `components/`. Ask Claude Code to help with either.

## 5. Later improvements (not needed to launch)

- **Speed:** the page compiles ~30 JSX files in the browser (Babel) and uses React's
  development build, and loads ~16 MB of bundle + icon data. Fine for reviewers, slow on
  phones. A one-time build step would precompile these.
- **Analytics:** Vercel Web Analytics shows who visits which pages (one toggle in the
  dashboard).
