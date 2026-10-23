<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project standards

- **SEO:** Keep the site SEO compliant—semantic HTML, accurate page metadata (title, description, canonical URLs), Open Graph/Twitter tags where relevant, crawlable content, and performance that supports Core Web Vitals.

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
