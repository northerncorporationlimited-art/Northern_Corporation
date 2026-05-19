# Memory Bank — Northern Corporation Limited

_Initialized by `/onboard` — 2026-04-28T05:28Z_

---

## Project Overview

Corporate website for **Northern Corporation Limited**, a Bangladeshi knitwear/activewear manufacturer established in 1987. Fully static Next.js site deployed on Vercel. No backend, no database, no CMS — all content is hardcoded.

---

## Current Features

### Routes

| Route                  | Status     | Description                                                                                                                        |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Home)             | **ACTIVE** | PresentationDeck layout with 8 slides: Hero → AboutUs → EcoImpact → Products → GlobalReach → Facilities → Sustainability → Contact |
| `/V2`                  | Archive    | Legacy full-site (DualScroll + HistoryFlow + Sustainability + WorkLife + ContactFooter)                                            |
| `/facilities/[slug]`   | **ACTIVE** | Dynamic facility detail pages (5 facilities defined in data file)                                                                  |
| `/products/[category]` | **ACTIVE** | Dynamic product category pages (5 categories: bottoms, nightwear, sports-active, tee-polo, winter)                                 |
| `/terms`               | **ACTIVE** | Static Terms & Conditions boilerplate (awaiting client legal text)                                                                 |
| `/privacy`             | **ACTIVE** | Static Privacy Policy boilerplate (awaiting client legal text)                                                                     |

### Components

#### Layout (`src/components/layout/`)

| Component              | File Size | Purpose                                                                    |
| ---------------------- | --------- | -------------------------------------------------------------------------- |
| `AppWrapper.tsx`       | ~1KB      | Preloader → Navbar → Content; pathname-aware smooth scroll toggle          |
| `Navbar.tsx`           | ~10KB     | Pathname-aware nav + cinematic fullscreen overlay menu                     |
| `PresentationDeck.tsx` | ~12KB     | Slide-based layout with nav dot indicators                                 |
| `SmoothScroll.tsx`     | ~1.5KB    | Lenis + GSAP sync; `enableSmooth` prop disables interpolation on sub-pages |

#### Sections (`src/components/sections/`)

| Component            | File Size | Status                                                     |
| -------------------- | --------- | ---------------------------------------------------------- |
| `Hero.tsx`           | ~4.8KB    | ACTIVE (home)                                              |
| `AboutUs.tsx`        | ~4.2KB    | ACTIVE (home)                                              |
| `EcoImpact.tsx`      | ~5.8KB    | ACTIVE (home)                                              |
| `Products.tsx`       | ~8KB      | ACTIVE (home)                                              |
| `GlobalReach.tsx`    | ~10KB     | ACTIVE (home)                                              |
| `Facilities.tsx`     | ~14KB     | ACTIVE (home)                                              |
| `Sustainability.tsx` | ~5.2KB    | ACTIVE (home + V2)                                         |
| `Contact.tsx`        | ~8.7KB    | ACTIVE (home) — split layout: info columns + contained map |
| `DualScroll.tsx`     | ~11KB     | V2 only                                                    |
| `HistoryFlow.tsx`    | ~7.8KB    | V2 only                                                    |
| `WorkLife.tsx`       | ~3.2KB    | V2 only                                                    |
| `ContactFooter.tsx`  | ~4.3KB    | V2 only                                                    |

#### UI Primitives (`src/components/ui/`)

| Component            | File Size | Purpose                                                                         |
| -------------------- | --------- | ------------------------------------------------------------------------------- |
| `Logo.tsx`           | ~11.6KB   | SVG logo component (inline paths — used as backup, navbar uses logo-symbol.svg) |
| `Magnetic.tsx`       | ~1.3KB    | Hover magnetic cursor effect                                                    |
| `Preloader.tsx`      | ~14.9KB   | Cinematic 4.2s loading animation (uses /logo-symbol.svg)                        |
| `ScrollProgress.tsx` | ~1.1KB    | V2 scroll progress indicator                                                    |

### Data Files (`src/data/`)

| File            | Contents                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `facilities.ts` | 5 facility definitions (Facility interface): medical-service, dining, daycare, equality, professional-development |
| `slides.ts`     | 8 slide configs: Hero → AboutUs → EcoImpact → Products → GlobalReach → Facilities → Certifications → Contact      |

### Assets (`public/`)

| Directory         | Contents                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `certifications/` | 15 certification badge images (PNG/JPG/WebP) — includes BSCI + Better Work added Sprint 13                                        |
| `images/`         | Hero bg, factory images, world map SVG, facility photos                                                                           |
| `products/`       | 5 category subdirs (bottoms, nightwear, sports-active, tee-polo, winter) — `sports-active` now holds Body Suit photos (11 images) |
| `logo-symbol.svg` | Site logo (brand mark — used in both preloader + navbar)                                                                          |

---

## Key Architectural Decisions

1. **Fully Static:** No API routes, no server actions, no database. Content is hardcoded in components and TypeScript data files.
2. **PresentationDeck Pattern:** Home page uses a slide-based `PresentationDeck` layout — each child is a full-viewport "slide" with dot navigation. Currently 8 slides.
3. **CSS Strategy:** Complex component styles in `globals.css` (22KB+), simple layout via Tailwind utilities. Uses `@theme inline` for Tailwind v4.
4. **Animation Layering:** Framer Motion for mount/viewport-triggered animations, GSAP + ScrollTrigger for scroll-pinned sections (DualScroll), Lenis for global smooth scroll.
5. **Preloader Gate:** 4.2s cinematic preloader blocks content until animation completes.
6. **V2 Archive:** Legacy full-scroll site preserved at `/V2` — uses curtain-reveal sticky sections with z-index stacking.
7. **Image Optimization:** Next.js image config with AVIF + WebP formats, aggressive caching (1 year TTL).
8. **Release Automation:** Manual releases only. `release-please` was removed (CEO decision 2026-04-28). Conventional Commits used for commit messages.
9. **Multi-Remote Git:** `push:all` script pushes to both `origin` and `portfolio` remotes.
10. **Logo Unification:** Both preloader and navbar use `/logo-symbol.svg` (the clean brand mark). `Logo.tsx` (inline SVG with full wordmark paths) is preserved but no longer imported in Navbar.

---

## Environment Variables

**None required.** The site is fully static with no external service integrations. Vercel settings reference Supabase and R2 keys in WORKFLOW.md, but these appear to be legacy references from a previous architecture — no active code uses them.

---

## Deployment Config

| Setting         | Value                                        |
| --------------- | -------------------------------------------- |
| Platform        | Vercel (GitHub App integration)              |
| Production URL  | `https://northern-corporation-nu.vercel.app` |
| Deploy Trigger  | Push to `main` (auto)                        |
| Preview Deploys | Per-PR (auto)                                |
| CI Gate         | GitHub Actions: lint + typecheck + build     |
| Node Version    | 20.x                                         |
| Build Command   | `next build`                                 |
| Install Command | `npm ci`                                     |

---

## Known Issues & Tech Debt

1. **No test framework** — zero unit, integration, or E2E tests configured.
2. ~~**No formatter**~~ — ✅ RESOLVED (Sprint 14: T-119/T-120): Prettier 3.x installed; `.prettierrc` + `.prettierignore` added; `format` + `format:check` scripts live; initial format pass applied across all 47 source files.
3. **`globals.css` is 22KB+** — monolithic stylesheet; could be modularized with CSS Modules.
4. ~~**Missing `release-please.yml`**~~ — ✅ RESOLVED (CEO decision): Removed entirely. Manual releases only.
5. ~~**Stale Supabase/R2 references**~~ — ✅ RESOLVED (T-29): Cleaned from `WORKFLOW.md`.
6. ~~**AGENTS.md is outdated**~~ — ✅ RESOLVED (`4ecca64`).
7. ~~**ARCHITECTURE.md is outdated**~~ — ✅ RESOLVED (`4ecca64`).
8. ~~**Facility gallery images may 404**~~ — ✅ RESOLVED (Sprint 14: T-122): All 5 `galleryImages` paths in `facilities.ts` cross-referenced against `public/images/northern/` — all 7 assets present, all 5 references valid.
9. ~~**`_TO_DELETE/` exclusion**~~ — ✅ RESOLVED (T-27): Removed from `tsconfig.json`.
10. **Legal page content** — `/terms` and `/privacy` have boilerplate text with `[CLIENT LEGAL TEXT TO REPLACE]` banners. Awaiting final legal text from client.
11. ~~**Product LCP images**~~ — ✅ RESOLVED (T-28): Added `priority` prop to first 4 images.
12. ~~**Contact A/B/C is temporary**~~ — ✅ RESOLVED (T-30/T-31): Client chose Contact B. A + C deleted, B renamed to Contact, slides reduced 10→8.

---

## Current Version

`0.1.0` (per `package.json` and `.release-please-manifest.json`)

---

## Session Log

### 2026-04-28T08:50Z — Client Feedback Sprints Complete

**Branch:** `feat/final-client-fixes` → merged to `main` at `4ecca64`

**Tickets completed (11/11):**

| Ticket | CF#         | Files Modified                                                  | Summary                                                                          |
| ------ | ----------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| T-1    | —           | `AGENTS.md`, `ARCHITECTURE.md`                                  | Updated arch docs to reflect 8-section deck, dynamic routes, legal pages         |
| T-2    | CF-05       | `Products.tsx`                                                  | Removed wheel-hijacking (`registerSubSlider`), click-only category change        |
| T-3    | CF-02/10/11 | `AppWrapper.tsx`, `SmoothScroll.tsx`                            | Pathname-aware Lenis — `enableSmooth=false` on sub-routes restores native scroll |
| T-4    | CF-07/08/13 | `PresentationDeck.tsx`                                          | Removed slide counter, clickable progress rail, 1.0s→0.6s transitions            |
| T-5    | CF-03       | `products/[category]/page.tsx`                                  | Back link: `/` → `/?slide=3` (returns to Products section)                       |
| T-6    | CF-06/09    | `GlobalReach.tsx`                                               | Cream marquee text, +10% map opacity, flight lines play once                     |
| T-7    | CF-01/16    | `Navbar.tsx`                                                    | Logo h-16, nav text-xs, CTA button enlarged                                      |
| T-8    | CF-04       | `EcoImpact.tsx`                                                 | Removed cursor-pointer from non-interactive items                                |
| T-9    | CF-14       | `Sustainability.tsx`                                            | Enlarged cert logos and label text                                               |
| T-10   | CF-15/18/19 | `Contact.tsx`                                                   | Real social URLs, split factory addresses, larger map                            |
| T-11   | CF-17       | `terms/page.tsx` (NEW), `privacy/page.tsx` (NEW), `Contact.tsx` | Legal boilerplate pages, footer links updated                                    |

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

| Ticket               | Files Modified                                                                                                                                      | Summary                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| T-12: QA Audit       | (report only)                                                                                                                                       | Code-level responsive audit: 4 critical, 9 warning, 5 info findings across all sections + sub-pages                                       |
| T-13: Smart Navbar   | `Navbar.tsx`                                                                                                                                        | Pathname-aware bg (transparent `/`, solid sub-pages), responsive logo `h-8/10/12`, 48px hamburger                                         |
| T-14: Cinematic Menu | `Navbar.tsx`                                                                                                                                        | Replaced bottom sheet with fullscreen `clipPath inset` curtain, Playfair `text-4xl→8xl`, blur-in stagger, gold shimmer hovers, B2B footer |
| T-15: QA Fixes       | `Products.tsx`, `GlobalReach.tsx`, `Sustainability.tsx`, `Facilities.tsx`, `Contact.tsx`, `AboutUs.tsx`, `Hero.tsx`, `products/[category]/page.tsx` | Fixed all 18 audit findings — padding, typography, grid cols, touch targets, pointer-events, safe-area-inset                              |

**Key architectural changes:**

- `Navbar.tsx` rewritten (282 lines changed) — now uses `usePathname()` to toggle bg; cinematic overlay uses `clipPath` + Framer Motion `AnimatePresence`
- GlobalReach pins gained `onClick` tap toggle + `hidden md:inline` labels
- Contact map wrapped in `pointer-events-none md:pointer-events-auto`
- Cert grid now `grid-cols-2 sm:3 md:4 lg:7`

**QA:** 6/6 visual tests passed. 0 critical, 0 warning findings.

**Merge:** `212beb2` → `d5a314f` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.

### 2026-04-29T07:00Z — Pre-Sprint Fix: Logo Unification

**Commit:** `9fc012b` (direct to `main`)

Replaced inline `<Logo>` React SVG component in `Navbar.tsx` with `next/image` loading `/logo-symbol.svg` — now preloader and navbar use the **same** brand mark. `Logo.tsx` preserved but no longer imported by Navbar.

### 2026-04-29T10:30Z — Sprint 5: Map Overhaul & Contact A/B/C Testing

**Branch:** `feat/sprint-5-map-and-contact` → merged to `main` at `10ad62f`

**CEO decisions (pre-sprint):**

- Scope freeze: do NOT touch `AboutUs.tsx`, `Products.tsx`, or Hero social links
- Sprint focus: map animation overhaul + contact layout exploration for client A/B testing

**Tickets completed (4/4):**

| Ticket                    | Files Modified                             | Summary                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T-16: Navbar Logo Text    | `Navbar.tsx`                               | `text-xs font-semibold` → `text-base md:text-lg font-black tracking-wider` + hover transition                                                                                              |
| T-17: Map Pop & Animation | `GlobalReach.tsx` (rewrite)                | Map opacity 30%→45% with enhanced filter; extracted `FlightPath` component with 3-phase `pathLength` animation (draw-in → fade at 3.2s → hover re-draw); gold gradient stroke + glow trail |
| T-18: Contact A/B/C       | `ContactB.tsx` [NEW], `ContactC.tsx` [NEW] | B: split 2-col text + 55% map + legal footer. C: "The Embassy" — fullscreen map bg + dark overlay + grain + 4 frosted-glass cards + editorial headline                                     |
| T-19: Wire Deck           | `page.tsx`, `slides.ts`                    | 8→10 slides; renamed "Contact" → "Contact A"; added Contact B/C entries (isDark:true, showInDesktopNav:false)                                                                              |

**Key architectural changes:**

- `GlobalReach.tsx` gained `FlightPath` subcomponent + `hasLaunched` state + `useEffect` timer (3.2s)
- `slides.ts` now has 10 entries; `SLIDE_LABELS`, `NAV_LINKS`, `ALL_LINKS`, `DARK_SLIDES` all auto-derive
- Contact A/B/C are temporary — client picks winner, losers get deleted
- All 3 contacts share identical data (HQ, 2 factories, phone, email, LinkedIn, Instagram)

**QA:** TSC ✅ Lint ✅ Build ✅ (18 pages). Visual: 0 critical, 0 warning, 3 info. All animation phases verified.

**Merge:** `420862b` → `10ad62f` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.

### 2026-04-29T16:32Z — Sprint 6: Map Animation Polish & ContactB Layout

**Branch:** `feat/sprint6-map-contact-polish` → merged to `main` at `d73029f`

**Tickets completed (5/5):**

| Ticket               | Files Modified    | Summary                                                                                                                                                                                                                                                             |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-20: Map Visibility | `GlobalReach.tsx` | Map opacity `0.18`→`0.30` + tuned filter; added SVG dot-grid overlay (20px pattern, 12% opacity); radial edge vignette (`#023020` at 95%); ambient glow pulse (6s breathing `motion.div`)                                                                           |
| T-21: Pin & Path Fix | `GlobalReach.tsx` | Sonar rings: `2s easeOut`→`4s linear` + `2s` stagger (seamless ripple, no snap-back); hub pin `h-3→h-4` + double shadow; launch timer `3200→2000ms`; paths vanish to 0 after launch, redraw on hover; traveling dot (`animateMotion`, 3s loop) on hovered path only |
| T-22: Real Buyers    | `GlobalReach.tsx` | `PLACEHOLDER_BUYERS`→`BUYERS`; 13 real client names: Honey, Muji, Uny, Bonmax, Lindex, Celio, New Yorker, Next, Suzy, Greg Norman, Walmart, Target, TJX                                                                                                             |
| T-23: ContactB Map   | `ContactB.tsx`    | Full-bleed `lg:h-full`→contained card: `aspect-[4/3]`, `rounded-3xl`, `border border-[#F5F5EB]/10`, `max-h-[70vh]`, vertically centered in flex column                                                                                                              |
| T-24: Legal Links    | `ContactB.tsx`    | `text-[10px]/40%`→`text-xs/60%`; added underline + `›` chevron prefix; `focus-visible:ring-1` on all interactive elements (legal links + social buttons)                                                                                                            |

**Key architectural changes:**

- `GlobalReach.tsx` FlightPath now uses 3 distinct opacity phases: `isDrawing ? 1 : isHovered ? 1 : 0` (was `0.15` residual — user corrected to full vanish)
- Trade routes SVG raised to `z-[2]` (was `z-0`, rendered behind dot-grid at `z-[1]`)
- `ContactB.tsx` map container: inline `style={{maxHeight}}` replaced with Tailwind `max-h-[70vh]`
- All ContactB interactive elements now keyboard-accessible with gold focus rings

**User preference (important):** Flight paths must **fully vanish** after the 2s timer. They should NOT stay at reduced opacity. On hover → redraw with golden arc + traveling dot. On leave → vanish again.

**QA:** TSC ✅ Build ✅ (18/18 pages, 220ms). 7/7 manual browser tests passed. 0 critical, 0 warning, 1 info (social links could use `target="_blank"`).

**Merge:** `6152774` → `d73029f` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.

### 2026-04-29T17:55Z — Sprint 7: Scroll Cue & ContactB Polish

**Branch:** `feat/sprint7-scroll-cue-contactb-polish` → merged to `main` at `2948425`

**Tickets completed (2/2):**

| Ticket                      | Files Modified | Summary                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-25: Scroll Cue Overhaul   | `Hero.tsx`     | Replaced mechanical wipe bar with gravity-drop gold dot; 6px dot (`h-1.5`) with `box-shadow` glow falls down gradient-faded track (transparent→15%→transparent); 1.8s duration + 0.6s delay loop; fade-in at top, fade-out at bottom; mobile text overlap fixed: `pb-24→pb-32`, cue positioned `bottom-6 md:bottom-10`; track shortened on mobile `h-14 md:h-16` |
| T-26: ContactB Social Links | `ContactB.tsx` | Added `target="_blank" rel="noopener noreferrer"` to LinkedIn + Instagram `<a>` tags; closes last QA info finding from Sprint 6                                                                                                                                                                                                                                  |

**Key architectural changes:**

- Hero scroll cue is now a Framer Motion dot with per-property `times` arrays (position: `[0, 1]`, opacity: `[0, 0.15, 0.75, 1]`) for natural gravity feel
- Track line uses CSS gradient instead of solid `bg-` class — fades at both ends
- Hero text container uses `pb-32 lg:pb-40` (was `pb-24 md:pb-32 lg:pb-40`) — ensures scroll cue clears subtitle on all viewports

**Git note:** `gh auth switch --user AdilAhmedAhir` required before push — credential helper had `tahasinrubaba-art` as active account. Both accounts remain in keyring.

**QA:** TSC ✅ ESLint ✅ Build ✅ (18/18 pages). 7/7 manual browser tests passed. 0 critical, 0 warning, 0 info.

**Merge:** `40508ad` → `2948425` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.

### 2026-04-29T18:05Z — Sprint 8: Build Hygiene & Config Cleanup

**Branch:** `feat/sprint8-build-hygiene` → merged to `main` at `35accd3`

**Tickets completed (3/3):**

| Ticket                    | Files Modified                                                                                   | Summary                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-27: Config Cleanup      | `tsconfig.json` [MOD], `release-please-config.json` [DEL], `.release-please-manifest.json` [DEL] | Removed stale `_TO_DELETE` from tsconfig exclude array; deleted both orphaned release-please config files                                                                                          |
| T-28: LCP Priority        | `products/[category]/page.tsx`                                                                   | Added `priority={i < 4}` to `<Image>` — first 4 grid images get eager loading + preload hints for better Core Web Vitals                                                                           |
| T-29: WORKFLOW.md Cleanup | `WORKFLOW.md`, `docs/ROADMAP.md`, `docs/MEMORY_BANK.md`                                          | Removed §5 (release-please automation) + Appendix A (release-please config); cleaned Supabase/R2 env var refs from §6 + §9; trimmed troubleshooting table; updated pipeline diagram to Vercel-only |

**Key changes:**

- `WORKFLOW.md` reduced from 317 → ~200 lines (−37%); now accurately reflects manual-release, static-site reality
- Known issues #5, #9, #11 in MEMORY_BANK marked ✅ RESOLVED
- Net diff: +25 / −147 lines across 7 files (2 deleted)

**QA:** TSC ✅ Build ✅ (18/18 pages, exit 0).

**Merge:** `0ab4586` → `35accd3` via `--no-ff`. Pushed to `origin/main`. Vercel auto-deploy triggered.

### 2026-04-29T18:10Z — Sprint 9: Contact Pick — B Winner

**Branch:** `feat/sprint9-contact-b-winner` → merged to `main` at `a23cb49`

**Tickets completed (3/3):**

| Ticket                       | Files Modified                                                  | Summary                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| T-30: Delete Losers          | `Contact.tsx` (A) [DEL], `ContactC.tsx` [DEL], `page.tsx` [MOD] | Removed Contact A and Contact C components; stripped imports and JSX from home page                                                           |
| T-31: Rewire Slides & Navbar | `ContactB.tsx` → `Contact.tsx` [RENAME], `slides.ts` [MOD]      | Renamed ContactB export/id/title to Contact; reduced SLIDES from 10→8 entries; Navbar CTA uses dynamic `ALL_LINKS.length - 1` (auto-adjusted) |
| T-32: QA & Docs              | `MEMORY_BANK.md` [MOD]                                          | TSC ✅ Build ✅ (18/18 pages). Updated section table, slides count, arch decision, known issue #12 resolved                                   |

**Key changes:**

- Net: 2 files deleted, 1 renamed, 3 modified
- Slide count: 10 → 8
- Known issue #12 resolved
- Navbar CTA already dynamic (`ALL_LINKS.length - 1`) — no change needed

**QA:** TSC ✅ Build ✅ (18/18 pages, 197ms).

### 2026-05-03T07:40Z — Sprint 11: Content Removal (Prayer Rooms + Factory 1)

**Tickets completed (6/6):**

| Ticket | Files Modified                 | Summary                                                                                    |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------ |
| T-107  | `facilities.ts`                | Removed `prayer-rooms` entry from FACILITIES array (6→5 facilities)                        |
| T-108  | `Facilities.tsx`               | Updated `useState(2)` → `useState(1)` so Dining remains default expanded after index shift |
| T-109  | (build verify)                 | Build passes: 17 pages (down from 18). `/facilities/prayer-rooms` now 404s correctly       |
| T-110  | `Contact.tsx`                  | Removed "Factory 1 — BSCIC" entry from OFFICES array (3→2 offices)                         |
| T-111  | `prayer.jpg` [DEL]             | Deleted 876KB prayer room image from `public/images/facilities/`                           |
| T-112  | `MEMORY_BANK.md`, `ROADMAP.md` | Updated facility count 6→5, session log                                                    |

**Key changes:**

- Net: 1 file deleted, 3 files modified, 1 doc file updated
- Facility count: 6 → 5
- Contact offices: 3 → 2 (Head Office + Factory 2 — Tapirbari)
- `WorkLife.tsx` (V2 archive) still references prayer rooms — left as-is since V2 is archived

**QA:** TSC ✅ Build ✅ (17/17 pages, 145ms).

### 2026-05-12T09:50Z — Sprint 13: Certification Updates & Body Suit Category

**Branch:** `feat/sprint13-cert-product-content-update` → merged to `main` at `7008f14`  
**Restore point:** tag `restore/pre-sprint13` → commit `25edfa9` (pushed to `origin`)

**Tickets completed (4/4):**

| Ticket | Files Modified                                                                                               | Summary                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| T-115  | `Sustainability.tsx`                                                                                         | Renamed cert `RSC` → `RSC 100`; full name updated to "RMG Sustainability Council 100"                                                   |
| T-116  | `Sustainability.tsx`, `public/certifications/bsci.webp` [NEW], `public/certifications/better-work.png` [NEW] | Added BSCI to Row 2 (7th slot); Added Better Work Bangladesh as centered standalone Row 3 card                                          |
| T-117  | `Products.tsx`, `products/[category]/page.tsx`                                                               | Renamed "Sports & Active" → "Body Suit" in homepage menu + gallery page title/metadata. Slug `sports-active` unchanged (URL preserved). |
| T-118  | `public/products/sports-active/*.jpeg`                                                                       | Removed 28 incorrect images; added 11 new Body Suit photos (renamed 1–11.jpeg)                                                          |

**Key decisions:**

- Better Work rendered as a separate centered row (Row 3) below the main 7-col grid — matches user's spec for "3rd row center position"
- Slug `sports-active` intentionally preserved — changing it would break existing Vercel pages; display name update is sufficient
- Certification count: 13 → 15 (BSCI + Better Work)
- Body Suit image count: 28 → 11 (full image replacement, not addition)

**QA:** TSC ✅ (0 errors). 33 files changed (37 insertions, 4 deletions).

**Merge:** `7008f14` → merge commit via `--no-ff`. Pushed to both `origin` (AdilAhmedAhir) and `client` (Northern Corporation Limited) via `npm run push:all`. Vercel auto-deploy triggered.

### 2026-05-12T18:00Z — Sprint 14: Code Quality Gate

**Branch:** `feat/sprint14-prettier-ci-gate` → merged to `main`

**Tickets completed (4/4):**

| Ticket | Files Modified                                                                    | Summary                                                                                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-119  | `package.json`, `package-lock.json`, `.prettierrc` [NEW], `.prettierignore` [NEW] | Installed Prettier 3.x as devDependency; created `.prettierrc` (100-char width, double quotes, ES5 trailing commas); created `.prettierignore` (excludes `.next/`, `node_modules/`, `public/`, `out/`); added `format` + `format:check` npm scripts |
| T-120  | 46 files across `src/`, `docs/`, `.agents/`, root configs                         | Initial Prettier format pass — pure whitespace/style changes, zero logic edits. Removed orphaned `public/images/map-baridhara.png`                                                                                                                  |
| T-121  | `.github/workflows/ci.yml`                                                        | Inserted `Format check` step between `Install dependencies` and `Lint`; CI pipeline now: Install → Format check → Lint → Typecheck → Build                                                                                                          |
| T-122  | `docs/MEMORY_BANK.md`, `docs/ROADMAP.md`                                          | Closed Known Issues #2 (formatter) and #8 (gallery 404 audit); logged Sprint 14 session                                                                                                                                                             |

**Key decisions:**

- `.prettierrc` uses `printWidth: 100` (standard for TSX-heavy projects where 80 is too narrow)
- `.prettierignore` excludes `public/` — binary assets and generated files shouldn't be processed
- `format:check` placed _before_ lint in CI — cheap fast-fail catches formatting before slower type-aware lint
- `map-baridhara.png` (885KB) was already deleted locally; committed the deletion in this sprint

**Known Issues resolved:** #2 (formatter), #8 (gallery audit)

**QA:** TSC ✅ Build ✅ `format:check` ✅ (47 files all clean).

### 2026-05-19T19:00Z — Hotfix Session: Contact Info + Tablet Responsive Overhaul

**Multiple feature branches** → each merged to `main` via `--no-ff`, pushed to both remotes via `npm run push:all`.

**Changes completed (5 commits):**

| Commit | Files Modified | Summary |
| --- | --- | --- |
| Contact info update | `Contact.tsx`, `Navbar.tsx` | Added NCL Corporate Office number `+880 9606 548147` before email in Contact section (clickable `tel:` link); synced mobile menu footer from stale `info@northerncorp.com` / `+88-02-48814594` → correct `Socials@ntg.com.bd` / `+880 9606 548147`; made both phone and email clickable links |
| Tablet breakpoint v1 | `Navbar.tsx`, `Facilities.tsx`, `Sustainability.tsx`, `Contact.tsx` | Initial attempt — pushed desktop layouts from `lg:` (1024px) → `xl:` (1280px). Insufficient: user's tablet is exactly 1280px landscape |
| Custom desktop breakpoint | `globals.css`, `PresentationDeck.tsx`, `Navbar.tsx`, `Facilities.tsx`, `Sustainability.tsx`, `Contact.tsx` | Added `--breakpoint-desktop: 1360px` to Tailwind v4 `@theme inline`; created `desktop:` prefix; changed `PresentationDeck.MOBILE_BREAKPOINT` from 1024→1360; all desktop-only layouts now use `desktop:` instead of `lg:` or `xl:` |
| Cert grid fix | `Sustainability.tsx` | Moved "Better Work" from standalone centered card into main `CERTS[]` array — now 15th grid item, flows naturally at all breakpoints. Removed separate `CERT_BETTER_WORK` constant and its dedicated render block |
| Menu text scaling | `Navbar.tsx` | Reduced mobile menu overlay typography for tablets: `text-4xl→3xl` base, `text-6xl→4xl` at md, `text-8xl→5xl` at lg; tightened vertical padding `py-3→py-2.5` base, `py-5→py-3` at md |

**Key architectural decisions:**

- **Custom Tailwind v4 breakpoint:** `--breakpoint-desktop: 1360px` ensures tablets up to 1280px (user's Samsung Tab S9) always get mobile layout. Uses Tailwind v4's `@theme inline` variable approach — no plugin needed
- **PresentationDeck sync:** JS-side `MOBILE_BREAKPOINT` must always match the CSS `--breakpoint-desktop` value (currently 1360). If either changes, the other must too
- **Breakpoint map:** `sm:640` → `md:768` → `lg:1024` → `xl:1280` → `desktop:1360` (custom) → `2xl:1536`
- **Cert grid progression:** `2-col (base)` → `3-col (sm)` → `4-col (md)` → `5-col (lg)` → `7-col (desktop)`
- **Better Work** no longer a special case — it's the 15th item in the `CERTS[]` array, rendered by the same `.map()` as all others

**User's tablet viewports:**
- Portrait: 800×1141 → gets mobile layout (hamburger, accordion, stacked contact, 4-col certs)
- Landscape: 1280×661 → gets mobile layout (hamburger, accordion, stacked contact, 5-col certs)
- Desktop 1360px+ → full desktop (nav links, expanding gallery, side-by-side contact, 7-col certs)

**Dual-remote setup note:** This project uses two GitHub remotes:
- `origin` → `github.com/AdilAhmedAhir/Northern_Corporation` (developer commits)
- `client` → `github.com/northerncorporationlimited-art/Northern_Corporation` (client-facing, rewritten author)
- Always push via `npm run push:all` — never push individually

**QA:** Build ✅ (all pages). Vercel auto-deployed after each merge.
