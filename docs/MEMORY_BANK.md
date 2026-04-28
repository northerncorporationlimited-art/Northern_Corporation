# Memory Bank — Northern Corporation Limited

_Initialized by `/onboard` — 2026-04-28T05:28Z_

---

## Project Overview

Corporate website for **Northern Corporation Limited**, a Bangladeshi knitwear/activewear manufacturer established in 1987. Fully static Next.js site deployed on Vercel. No backend, no database, no CMS — all content is hardcoded.

---

## Current Features

### Routes

| Route                   | Status   | Description                                                       |
| ----------------------- | -------- | ----------------------------------------------------------------- |
| `/` (Home)              | **ACTIVE** | PresentationDeck layout with 8 sections: Hero → AboutUs → EcoImpact → Products → GlobalReach → Facilities → Sustainability → Contact |
| `/V2`                   | Archive  | Legacy full-site (DualScroll + HistoryFlow + Sustainability + WorkLife + ContactFooter) |
| `/facilities/[slug]`    | **ACTIVE** | Dynamic facility detail pages (6 facilities defined in data file) |
| `/products/[category]`  | **ACTIVE** | Dynamic product category pages (5 categories: bottoms, nightwear, sports-active, tee-polo, winter) |
| `/terms`                | **ACTIVE** | Static Terms & Conditions boilerplate (awaiting client legal text) |
| `/privacy`              | **ACTIVE** | Static Privacy Policy boilerplate (awaiting client legal text) |

### Components

#### Layout (`src/components/layout/`)
| Component          | File Size | Purpose                                       |
| ------------------ | --------- | --------------------------------------------- |
| `AppWrapper.tsx`   | ~1KB      | Preloader → Navbar → Content; pathname-aware smooth scroll toggle |
| `Navbar.tsx`       | ~10KB     | Pathname-aware nav + cinematic fullscreen overlay menu |
| `PresentationDeck.tsx` | ~12KB | Slide-based layout with nav dot indicators      |
| `SmoothScroll.tsx` | ~1.5KB   | Lenis + GSAP sync; `enableSmooth` prop disables interpolation on sub-pages |

#### Sections (`src/components/sections/`)
| Component          | File Size | Status   |
| ------------------ | --------- | -------- |
| `Hero.tsx`         | ~4.8KB    | ACTIVE (home) |
| `AboutUs.tsx`      | ~4.2KB    | ACTIVE (home) |
| `EcoImpact.tsx`    | ~5.8KB    | ACTIVE (home) |
| `Products.tsx`     | ~8KB      | ACTIVE (home) |
| `GlobalReach.tsx`  | ~10KB     | ACTIVE (home) |
| `Facilities.tsx`   | ~14KB     | ACTIVE (home) |
| `Sustainability.tsx`| ~5.2KB   | ACTIVE (home + V2) |
| `Contact.tsx`      | ~6.2KB    | ACTIVE (home) |
| `DualScroll.tsx`   | ~11KB     | V2 only |
| `HistoryFlow.tsx`  | ~7.8KB    | V2 only |
| `WorkLife.tsx`     | ~3.2KB    | V2 only |
| `ContactFooter.tsx`| ~4.3KB    | V2 only |

#### UI Primitives (`src/components/ui/`)
| Component          | File Size | Purpose                          |
| ------------------ | --------- | -------------------------------- |
| `Logo.tsx`         | ~11.6KB   | SVG logo component               |
| `Magnetic.tsx`     | ~1.3KB    | Hover magnetic cursor effect     |
| `Preloader.tsx`    | ~14.9KB   | Cinematic 4.2s loading animation |
| `ScrollProgress.tsx`| ~1.1KB   | V2 scroll progress indicator     |

### Data Files (`src/data/`)
| File            | Contents                                                    |
| --------------- | ----------------------------------------------------------- |
| `facilities.ts` | 6 facility definitions (Facility interface): prayer-rooms, medical-service, dining, daycare, equality, professional-development |
| `slides.ts`     | Slide config: order, labels, dark/light backgrounds, navbar visibility per slide |

### Assets (`public/`)
| Directory         | Contents                                    |
| ----------------- | ------------------------------------------- |
| `certifications/` | 13 certification badge images (PNG/JPG)      |
| `images/`         | Hero bg, factory images, world map SVG, facility photos |
| `products/`       | 5 category subdirs (bottoms, nightwear, sports-active, tee-polo, winter) |
| `logo-symbol.svg` | Site logo                                    |

---

## Key Architectural Decisions

1. **Fully Static:** No API routes, no server actions, no database. Content is hardcoded in components and TypeScript data files.
2. **PresentationDeck Pattern:** Home page uses a slide-based `PresentationDeck` layout — each child is a full-viewport "slide" with dot navigation.
3. **CSS Strategy:** Complex component styles in `globals.css` (22KB+), simple layout via Tailwind utilities. Uses `@theme inline` for Tailwind v4.
4. **Animation Layering:** Framer Motion for mount/viewport-triggered animations, GSAP + ScrollTrigger for scroll-pinned sections (DualScroll), Lenis for global smooth scroll.
5. **Preloader Gate:** 4.2s cinematic preloader blocks content until animation completes.
6. **V2 Archive:** Legacy full-scroll site preserved at `/V2` — uses curtain-reveal sticky sections with z-index stacking.
7. **Image Optimization:** Next.js image config with AVIF + WebP formats, aggressive caching (1 year TTL).
8. **Release Automation:** Manual releases only. `release-please` was removed (CEO decision 2026-04-28). Conventional Commits used for commit messages.
9. **Multi-Remote Git:** `push:all` script pushes to both `origin` and `portfolio` remotes.

---

## Environment Variables

**None required.** The site is fully static with no external service integrations. Vercel settings reference Supabase and R2 keys in WORKFLOW.md, but these appear to be legacy references from a previous architecture — no active code uses them.

---

## Deployment Config

| Setting          | Value                                          |
| ---------------- | ---------------------------------------------- |
| Platform         | Vercel (GitHub App integration)                 |
| Production URL   | `https://northern-corporation-nu.vercel.app`    |
| Deploy Trigger   | Push to `main` (auto)                           |
| Preview Deploys  | Per-PR (auto)                                   |
| CI Gate          | GitHub Actions: lint + typecheck + build         |
| Node Version     | 20.x                                            |
| Build Command    | `next build`                                     |
| Install Command  | `npm ci`                                         |

---

## Known Issues & Tech Debt

1. **No test framework** — zero unit, integration, or E2E tests configured.
2. **No formatter** — no Prettier or equivalent; inconsistent formatting possible.
3. **`globals.css` is 22KB+** — monolithic stylesheet; could be modularized with CSS Modules.
4. ~~**Missing `release-please.yml`**~~ — ✅ RESOLVED (CEO decision): Removed entirely. Manual releases only.
5. **Stale Supabase/R2 references** — WORKFLOW.md mentions environment variables for Supabase and Cloudflare R2, but no code uses them. Should be cleaned from docs.
6. ~~**AGENTS.md is outdated**~~ — ✅ RESOLVED (`4ecca64`).
7. ~~**ARCHITECTURE.md is outdated**~~ — ✅ RESOLVED (`4ecca64`).
8. **Facility gallery images may 404** — `galleryImages` in `facilities.ts` reference paths like `/images/northern/building-1.jpg` that may not exist.
9. **`_TO_DELETE/` exclusion** — `tsconfig.json` still excludes `_TO_DELETE` which was already removed.
10. **Legal page content** — `/terms` and `/privacy` have boilerplate text with `[CLIENT LEGAL TEXT TO REPLACE]` banners. Awaiting final legal text from client.
11. **Product LCP images** — Next.js warns about missing `loading="eager"` on product hero images (performance, not a bug).

---

## Current Version

`0.1.0` (per `package.json` and `.release-please-manifest.json`)

---

## Session Log

### 2026-04-28T08:50Z — Client Feedback Sprints Complete

**Branch:** `feat/final-client-fixes` → merged to `main` at `4ecca64`

**Tickets completed (11/11):**

| Ticket | CF# | Files Modified | Summary |
|--------|-----|----------------|--------|
| T-1 | — | `AGENTS.md`, `ARCHITECTURE.md` | Updated arch docs to reflect 8-section deck, dynamic routes, legal pages |
| T-2 | CF-05 | `Products.tsx` | Removed wheel-hijacking (`registerSubSlider`), click-only category change |
| T-3 | CF-02/10/11 | `AppWrapper.tsx`, `SmoothScroll.tsx` | Pathname-aware Lenis — `enableSmooth=false` on sub-routes restores native scroll |
| T-4 | CF-07/08/13 | `PresentationDeck.tsx` | Removed slide counter, clickable progress rail, 1.0s→0.6s transitions |
| T-5 | CF-03 | `products/[category]/page.tsx` | Back link: `/` → `/?slide=3` (returns to Products section) |
| T-6 | CF-06/09 | `GlobalReach.tsx` | Cream marquee text, +10% map opacity, flight lines play once |
| T-7 | CF-01/16 | `Navbar.tsx` | Logo h-16, nav text-xs, CTA button enlarged |
| T-8 | CF-04 | `EcoImpact.tsx` | Removed cursor-pointer from non-interactive items |
| T-9 | CF-14 | `Sustainability.tsx` | Enlarged cert logos and label text |
| T-10 | CF-15/18/19 | `Contact.tsx` | Real social URLs, split factory addresses, larger map |
| T-11 | CF-17 | `terms/page.tsx` (NEW), `privacy/page.tsx` (NEW), `Contact.tsx` | Legal boilerplate pages, footer links updated |

**Key decisions:**
- Grouped tickets by architectural component (CEO override) to prevent file-thrashing
- Lenis stays mounted on all routes but `smoothWheel`/`lerp` disabled on sub-pages (keeps GSAP sync working)
- Legal pages use `[CLIENT LEGAL TEXT TO REPLACE]` banners — content is placeholder

**QA:** 6/6 tests passed (product scroll, facility scroll, deck lock, terms render, privacy render, build). 0 critical/warning findings.

**Blocked:** CF-12 (flat-lay product photography) — awaiting client assets.

### 2026-04-28T16:48Z — Sprint 4: Responsive UI/UX & Menu Overhaul

**Branch:** `feat/responsive-menu-overhaul` → merged to `main` at `d5a314f`

**CEO decisions (pre-sprint):**
- Release-please: deleted (Option A)
- Dependency patches / Prettier: skipped
- Tech debt sprint: tabled to Backlog

**Tickets completed (4/4):**

| Ticket | Files Modified | Summary |
|--------|----------------|--------|
| T-12: QA Audit | (report only) | Code-level responsive audit: 4 critical, 9 warning, 5 info findings across all sections + sub-pages |
| T-13: Smart Navbar | `Navbar.tsx` | Pathname-aware bg (transparent `/`, solid sub-pages), responsive logo `h-8/10/12`, 48px hamburger |
| T-14: Cinematic Menu | `Navbar.tsx` | Replaced bottom sheet with fullscreen `clipPath inset` curtain, Playfair `text-4xl→8xl`, blur-in stagger, gold shimmer hovers, B2B footer |
| T-15: QA Fixes | `Products.tsx`, `GlobalReach.tsx`, `Sustainability.tsx`, `Facilities.tsx`, `Contact.tsx`, `AboutUs.tsx`, `Hero.tsx`, `products/[category]/page.tsx` | Fixed all 18 audit findings — padding, typography, grid cols, touch targets, pointer-events, safe-area-inset |

**Key architectural changes:**
- `Navbar.tsx` rewritten (282 lines changed) — now uses `usePathname()` to toggle bg; cinematic overlay uses `clipPath` + Framer Motion `AnimatePresence`
- GlobalReach pins gained `onClick` tap toggle + `hidden md:inline` labels
- Contact map wrapped in `pointer-events-none md:pointer-events-auto`
- Cert grid now `grid-cols-2 sm:3 md:4 lg:7`

**QA:** 6/6 visual tests passed. 0 critical, 0 warning findings.

**Merge:** `212beb2` → `d5a314f` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.
