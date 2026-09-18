# TireTrack Pro — Web

The public dashboard for TireTrack Pro. It is a **static demo**: no backend, no
accounts, no network calls. Everything it shows is generated placeholder data
bundled into the build.

```
TireTrack-Web/          this repo — React dashboard, deploys to GitHub Pages
TireTrack-App/          Expo client, stores inspections on the device
```

The two are **not** connected. The app writes to the phone's local storage and
the site reads its own bundled sample set, so there is nothing to sync and
nothing to sign in to. If real accounts and shared data are wanted later, that
means adding a backend to both.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script            | What it does                                        |
|-------------------|-----------------------------------------------------|
| `npm run dev`     | Vite dev server on port 3000                        |
| `npm run build`   | Production build to `dist/`                         |
| `npm run preview` | Serve the production build locally                  |
| `npm run deploy`  | Build and push `dist/` to the `gh-pages` branch     |
| `npm run sync:domain` | Re-copy the shared domain modules from `../TireTrack-App` |

---

## Deploying to GitHub Pages

The site is served from a project path, **https://nathanhambleton1.github.io/TireTrack-Web/**,
which drives two settings that must stay in step:

- `base: '/TireTrack-Web/'` in [vite.config.js](vite.config.js) — so asset URLs
  carry the prefix.
- **HashRouter** in [src/main.jsx](src/main.jsx) — Pages serves static files only,
  so `/inspections/demo-3` would 404 before React ever loads. Routes live after
  the `#`.

If the repo is renamed or moved to a custom domain, change `base` (to `/` for a
domain root) and add a `CNAME` file to [public/](public/).

Two ways to publish, pick one:

**GitHub Actions (recommended).** [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
builds and deploys on every push to `main`. Enable it once under
*Settings → Pages → Build and deployment → Source: **GitHub Actions***.

**Manual.** `npm run deploy` builds and pushes `dist/` to a `gh-pages` branch. Set
*Settings → Pages → Source: **Deploy from a branch** → `gh-pages` / root*.

---

## The demo data

[src/lib/demoData.js](src/lib/demoData.js) generates about 40 inspections spread
over the last ten months, across the real 80-unit fleet roster. It is seeded, so
every visitor sees identical numbers and a reload does not reshuffle the charts.

Wear is modelled per machine rather than per tire — a unit that is due for tires
is worn all round — and condition is graded on the share of the *usable* tread
band left (new depth down to the legal minimum), not on raw millimetres. That is
what makes "most degraded units" meaningful instead of random noise.

Anything a visitor edits or deletes is written to their own `localStorage` and
never leaves the browser. The Account page restores the original set.

---

## Project structure

```
TireTrack-Web/
├── .github/workflows/deploy.yml
├── scripts/sync-domain.mjs
└── src/
    ├── main.jsx              # Entry — HashRouter for GitHub Pages
    ├── App.jsx               # Routes
    ├── index.css             # Tailwind v4 theme tokens (mirrors the app's theme.js)
    ├── context/
    │   ├── AuthContext.jsx   # Placeholder session in localStorage
    │   └── DataContext.jsx   # Inspections, loaded once per session
    ├── lib/
    │   ├── demoData.js       # Seeded placeholder inspections
    │   ├── dataService.js    # localStorage overlay on the demo set
    │   ├── analytics.js      # ⟵ synced from TireTrack-App
    │   ├── specs.js          # Axle-split tireSize / oem_psi helpers
    │   ├── csv.js            # One row per tire, for spreadsheet export
    │   └── format.js
    ├── data/                 # ⟵ synced from TireTrack-App
    ├── components/
    └── pages/
        ├── Landing.jsx       # Public marketing page
        ├── SignIn.jsx        # Placeholder gate — one button
        ├── Dashboard.jsx     # Cost exposure, trend, what needs attention
        ├── Inspections.jsx   # Searchable list
        ├── InspectionDetail.jsx
        ├── Fleet.jsx         # Whole roster, inspected or not
        ├── VehicleDetail.jsx # Per-unit tread history
        ├── Reports.jsx       # Site roll-ups, severity trends, CSV export
        └── Account.jsx
```

### Shared domain code

`src/data/*` and `src/lib/analytics.js` are **copies**. `TireTrack-App` owns them;
this repo keeps a synced duplicate so it installs and builds on its own. After
changing the fleet roster, tire configs or cost tables in the app, run:

```bash
npm run sync:domain
```

Each copy carries a banner saying so. Editing them here will be overwritten.

> Watch out for the shape asymmetry in the fleet data: `tireSize` and `oem_psi`
> are per-axle `{ front, rear }` objects, while `treadDepthNew_mm` and
> `treadDepthMin_mm` are plain numbers. Use the helpers in
> [src/lib/specs.js](src/lib/specs.js) rather than rendering those fields directly.

---

## Charts

Charts are deliberately **single-series**, and where two severities matter they
are drawn as small multiples rather than two colours in one plot. Amber (WATCH)
against red (REPLACE) separates by only ΔE 5.8–7.8 under deuteranopia, and amber
against green by ΔE 2.6 — not enough to carry identity by colour alone. Panel
titles and direct labels do that work instead. Palettes were checked against the
`#17181b` chart surface rather than eyeballed.
