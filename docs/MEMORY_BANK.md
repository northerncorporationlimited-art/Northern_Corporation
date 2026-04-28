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

### Components

#### Layout (`src/components/layout/`)
| Component          | File Size | Purpose                                       |
| ------------------ | --------- | --------------------------------------------- |
| `AppWrapper.tsx`   | 805B      | Preloader → Navbar → Content orchestration     |
| `Navbar.tsx`       | ~13KB     | Fixed nav with mobile fullscreen overlay        |
| `PresentationDeck.tsx` | ~12KB | Slide-based layout with nav dot indicators      |
| `SmoothScroll.tsx` | ~1.5KB   | Lenis + GSAP ScrollTrigger sync                 |

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
8. **Release Automation:** Conventional Commits → release-please → auto CHANGELOG + SemVer tags. No manual version editing.
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
4. **Missing `release-please.yml`** — workflow file referenced in WORKFLOW.md but not present in `.github/workflows/`. Only `ci.yml` exists.
5. **Stale Supabase/R2 references** — WORKFLOW.md mentions environment variables for Supabase and Cloudflare R2, but no code uses them. Should be cleaned from docs.
6. **AGENTS.md is outdated** — still says "Home page: Navbar + Certifications section" but home now has 8 sections via PresentationDeck.
7. **ARCHITECTURE.md is outdated** — doesn't reflect new sections (Hero, AboutUs, EcoImpact, Products, GlobalReach, Facilities, Contact) or new routes (`/facilities/[slug]`, `/products/[category]`).
8. **Facility gallery images may 404** — `galleryImages` in `facilities.ts` reference paths like `/images/northern/building-1.jpg` that may not exist.
9. **`_TO_DELETE/` exclusion** — `tsconfig.json` still excludes `_TO_DELETE` which was already removed.

---

## Current Version

`0.1.0` (per `package.json` and `.release-please-manifest.json`)
