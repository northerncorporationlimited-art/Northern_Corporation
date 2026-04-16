# Changelog

## [Phase 8 - Elite Polish: Lenis Smooth Scrolling]
- Installed `lenis@1.3.23` for sub-pixel smooth scrolling with inertia (lerp: 0.08, smoothWheel: true, syncTouch: false).
- Created `SmoothScroll.tsx` — wraps app in `<ReactLenis root>`. Synchronizes with GSAP via `scrollerProxy(document.documentElement)` and `gsap.ticker.add()` for frame-perfect RAF alignment. `lagSmoothing(0)` disabled to prevent GSAP frame throttling.
- Integrated into `AppWrapper.tsx` — `<SmoothScroll>` wraps Preloader, Navbar, and all page content.
- Verified: GSAP pin/scrub, clip-path wipes, sticky curtain reveal, and Navbar frost-glass all function correctly with Lenis interpolated scroll position.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 7 - Navigation & Advanced Scrolling]
- Created `Navbar.tsx` — fixed `z-[100]` header. Desktop: Logo + 4 Magnetic nav links (Work, About, Impact, Contact). Scroll-based `bg-transparent` → `bg-brand-green/80 backdrop-blur-md` transition at 50px threshold via `useMotionValueEvent`.
- Mobile: Animated 3-line hamburger (transforms to X), full-screen `clip-path: inset()` overlay with staggered link reveals (0.08s delay cascade).
- Integrated Navbar into `AppWrapper.tsx` — only renders after preloader completes (`{!isLoading && <Navbar />}`).
- Implemented "Sticky Stack Curtain Reveal" in `page.tsx`: each post-DualScroll section wrapped in `sticky top-0` with ascending z-index ladder (z-10 → z-40). Sections slide over each other like stacked cards as user scrolls.
- Added anchor IDs (`#work`, `#about`, `#impact`, `#contact`) to section wrappers for smooth-scroll nav targeting.
- Updated all 4 flow sections (`HistoryFlow`, `Sustainability`, `WorkLife`, `ContactFooter`) with `min-h-screen flex flex-col justify-center` for full-viewport presentation. Removed redundant `border-t` separators.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 6 - Final Polish & SEO]
- Deleted default Vercel `favicon.ico` from `src/app/`.
- Created `src/app/icon.svg` using the Northern Corporation logo SVG path on a brand-green (#0C2E1E) rounded-rect background with brand-cream (#D4C9A8) fill. Next.js auto-resolves this as the site favicon.
- Removed 5 unused default boilerplate assets from `public/` (vercel.svg, next.svg, file.svg, globe.svg, window.svg).
- Overhauled `layout.tsx` metadata: title template (`%s | Northern Corporation Limited`), premium description, `metadataBase`, full `openGraph` block (siteName, locale, type), `twitter` card config, and `robots` directive.
- Final codebase audit: 0 `console.log` / `console.warn` / `console.error` in custom components. TSC clean.

## [Phase 5.2 - Premium Micro-Interactions]
- Created `Magnetic.tsx` — reusable physics-based hover component using Framer Motion `useSpring` (damping: 20, stiffness: 300). Max pull: configurable via `strength` prop (default 15px).
- Rewrote `HistoryFlow.tsx` with scroll-drawn timeline spine: `useScroll` + `useTransform` maps scroll progress to a gold `height` line growing from top. Background track dimmed to 5% for contrast.
- Timeline dots now animate from dim (`bg-brand-gold/30`) to full gold (`#FDD017`) with scale pulse on `whileInView` entry, using `viewport.margin: "-100px"` for tight triggering.
- Wrapped ContactFooter "Send Us an Email" CTA in `<Magnetic strength={12}>` for tactile hover pull.
- No Navbar exists in `src/` — skipped Navbar integration (only `legacy_v1` had one).
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 5 - Premium Animation Polish]
- Refactored DualScroll right column from reverse-scrolling stacked panels to absolutely-positioned image layers with scrub-linked `clip-path: inset()` wipe transitions.
- Images stack with ascending z-index; each new image reveals via `inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)` linked to scroll progress.
- Implemented left-column typography focus: active panel at `opacity: 1`, inactive panels dim to `opacity: 0.15`, crossfading with scroll scrub.
- Left column now translates in discrete `100vh` steps per section, synchronized with clip-path reveals.
- Accordion `ScrollTrigger.refresh()` still fires on expand/collapse without breaking clip-path math.
- Mobile view completely isolated via `gsap.matchMedia()` — all desktop transforms/clips cleared with `clearProps: "all"`.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 4.2 - Complete Content Injection]
- Added 2017 milestone (FAL expansion) and 2018 milestone (NTG Farms diversification) to `HistoryFlow.tsx`.
- Added a concluding "Today" block breaking out of the alternating layout — centered, full-width text about UN SDGs commitment.
- Updated Section 4 product categories: added `Kids` and `Sleepwear` tag pills alongside `Knitwear` and `Sportswear`.
- Updated `Sustainability.tsx` recognition banner to include `SNV Netherlands` partnership.
- Created `WorkLife.tsx` — "Life at Northern" section with 6 HR/well-being cards (Daycare, Equality, Professional Dev, Prayer Rooms, Medical, Dining).
- Updated `ContactFooter.tsx` with structural placeholder fields: Head Office, Factory Location, Work Hours, Phone, Email, Web.
- Updated `page.tsx` render order: DualScroll → HistoryFlow → Sustainability → WorkLife → ContactFooter.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 4.1 - Content Accuracy Fixes]
- Corrected Section 3 capacity stats: added `3,000+ Employees`, changed `Production/Yr` to `$30M USD — Yearly Turnover`.
- Updated stats layout to vertical flex column to gracefully handle 3 items without overflow.
- Replaced dummy 6-milestone history with exact 8-milestone client timeline (1967–2016).
- Timeline: Northern Steel (1967) → NCL (1987) → FAL (2000) → TIL (2002) → PPL (2005) → Public Listings + Enviro Pac (2011) → Stock Exchange Listing (2015) → LEED + BDT 155 Crore Expansion (2016).
- Updated HistoryFlow header to "Since 1967" with accurate founder attribution.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 4 - Full Content Migration]
- Audited `legacy_v1/` and extracted all content from `AboutUsContent.tsx`, `ContactInfo.tsx`, `CertificationGrid.tsx`, `FabricShowcase.tsx`.
- Migrated cert and fabric images from `legacy_v1/public/` into active `public/certifications/` and `public/fabrics/` directories.
- Created `HistoryFlow.tsx` — alternating timeline from 1987 to 2024 with Framer Motion `whileInView` slide-in reveals.
- Created `Sustainability.tsx` — full certification grid (13 certs) with staggered fade-up reveals and brand recognition banner.
- Created `ContactFooter.tsx` — premium dark footer with contact cards, CTA button, and copyright bar.
- Updated `page.tsx` to implement the Pin and Flow architecture: GSAP `DualScroll` pin followed by natural vertical scroll into `HistoryFlow` → `Sustainability` → `ContactFooter`.
- Fixed Framer Motion `Variants` type error: cast cubic-bezier ease tuples as `[number, number, number, number]`.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 3 - Bug Fix: Build Failure]
- Root cause: `legacy_v1/` directory included in `tsconfig.json` compilation scope, producing 40 module-not-found errors from stale archived imports.
- Fix: Added `"legacy_v1"` to `tsconfig.json` `exclude` array. Active `src/` imports were already correct.
- Validated with `npx tsc --noEmit` — 0 errors.

## [Phase 3 - Content Integration]
- Extracted and transferred legacy assets (`hero-factory.png`, `hero-macro.png`, `leed-gold.png`, etc.) into `public/images/`.
- Populated `DualScroll.tsx` with 4 definitive client data sections (Home, About, Capacity, Products).
- Implemented an interactive Accordion module in the About section dynamically triggering `ScrollTrigger.refresh()` on expand/collapse to prevent GSAP pinning layout breaks.
- Applied new global brand themes (brand-green, brand-gold) natively into the UI mapping structures.
- Improved mobile responsive stacks gracefully ignoring desktop-reverse mappings when rendering accordions or images.

## [Phase 2 - Configuration]
- Injected client brand color palette (brand-green, brand-gold, brand-cream) directly into Tailwind v4 `@theme inline` configuration.
- Set default application background to brand-green (#023020) and text to brand-cream (#F5F5EB).

## [Phase 2 - Layout Pivot]
- Shifted away from standard Hero concept to an Awwwards-style SPA Dual Scroll layout.
- Created `DualScroll` with GSAP ScrollTrigger implementing pinning, scrubbed reverse scrolling, and fallback fade-ins for mobile viewports using `matchMedia()`.
- Added `ScrollProgress` dynamic fixed marker showing completion ratio on the vertical axis.
- Updated `page.tsx` to handle cross-component state synchronization for scroll progress tracking.

## [Phase 1 - Foundation UI]
- Extracted local `logo.svg` and converted it into a responsive Next.js React component format via `Logo.tsx`.
- Created Framer Motion-powered `<Preloader />` with 1.5s liquid clip-path inset animation and exit transitions.
- Implemented `<AppWrapper />` using `AnimatePresence` to orchestrate initial load state across all routes.
- Sanitized `globals.css` replacing default boilerplate with premium dark mode base (#0a0a0a background).
- Updated Layout to inject `AppWrapper` unconditionally into application loop.

## [Phase 0 - Initial Setup]
- Logged the creation of Next.js foundation in current directory.
- Installed premium dependencies: @supabase/supabase-js, gsap, @gsap/react, framer-motion.
- Established agentic memory system (PROJECT_STATE, ARCHITECTURE, COMPONENT_MAP, TASK_QUEUE, CHANGELOG).
- Added `push:all` script to package.json for dual-remote Git workflow.
