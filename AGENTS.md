<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project standards

### SEO (required)

Use the shared helpers in `src/lib/seo/`—do not hand-roll metadata per page unless extending the helpers.

- **`buildPageMetadata()`** — every indexable route exports `metadata` with title, description, **canonical**, **Open Graph**, **Twitter**, and `robots`.
- **`JsonLd`** — structured data on key pages (site-wide Organization/WebSite in `layout.tsx`; calculator uses WebApplication, BreadcrumbList, FAQPage).
- **`app/sitemap.ts`** (`/sitemap.xml`) and **`app/robots.ts`** — update `SITEMAP_ENTRIES` in `site-metadata.ts` when adding public pages.
- **Crawlable HTML** — one clear `<h1>` per page, useful `<h2>` sections, real copy (not calculator-only thin pages). Prefer FAQ/definitional content on the calculator route.
- **`NEXT_PUBLIC_SITE_URL`** — set in production (Easypanel) so canonicals, sitemap, and JSON-LD use the live domain.

### AdSense

- Script: `GoogleAdSenseScript` in `layout.tsx` (requires `NEXT_PUBLIC_ADSENSE_CLIENT_ID`).
- Units: `AdSlot` in `components/ads/` — never between labels and inputs, over charts/tables, or near primary buttons (see KWENTALOAN.md §6).
- Slot env vars: `NEXT_PUBLIC_ADSENSE_SLOT_*` in `.env.example`. If client or slot is unset, nothing renders (safe for local dev).
- **Semantics & a11y** — labels, landmarks (`main`, headings), alt text; good Core Web Vitals (avoid blocking client JS for primary content where possible).

## App structure

Follow a **route-colocated** layout: each feature lives under its App Router segment; shared pieces stay at the top level.

```text
src/
  app/
    <route>/
      page.tsx              # Server component: metadata, SEO, static intro, JSON-LD
      _components/          # Private to this route (not a URL segment)
        *.tsx               # Client or server UI used only on this page
  components/
    ui/                     # Design system (shadcn)
    site-*.tsx              # Global chrome (header, footer, nav)
    page-container.tsx      # Shared layout wrappers used across routes
  lib/
    mortgage/               # Pure calculation & validation (no React)
    navigation.ts           # Site-wide nav config
    utils.ts                # Generic helpers
```

**Rules**

- Put **page-specific UI** in `app/<route>/_components/`. Import from the route’s `page.tsx` with a relative path (e.g. `./_components/home-loan-calculator`).
- Keep **`page.tsx` thin**: export `metadata`, semantic headings, and compose `_components` plus shared wrappers.
- Use **`components/`** only for UI reused across multiple routes (header, footer, buttons, cards).
- Use **`lib/`** for framework-agnostic logic (amortization math, formatting, validation). Do not import React in `lib/`.
- Prefix route folders with **`_`** when the folder must not become a URL segment (`_components`, `_lib` if needed later).
- When a `_components` module grows, split by section inside the same folder (e.g. `loan-inputs.tsx`, `amortization-schedule.tsx`) rather than moving to global `components/` until another route needs it.
