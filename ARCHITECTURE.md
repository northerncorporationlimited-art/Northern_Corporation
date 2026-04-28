# Architecture Map — Northern Corporation Limited

_Last updated: 2026-04-28_

## Directory Structure (Active Code Only)

```
src/
├── app/                              # Next.js App Router pages
│   ├── page.tsx                      # Home — 8-section PresentationDeck
│   ├── layout.tsx                    # Root layout (AppWrapper)
│   ├── globals.css                   # All custom CSS
│   ├── icon.svg                      # Favicon
│   ├── products/[category]/page.tsx  # Dynamic product galleries (SSG)
│   ├── facilities/[slug]/page.tsx    # Dynamic facility detail pages (SSG)
│   ├── terms/page.tsx                # Terms & Conditions (static)
│   ├── privacy/page.tsx              # Privacy Policy (static)
│   └── V2/page.tsx                   # Archived full site
│
├── components/
│   ├── layout/                       # App-level wrappers
│   │   ├── AppWrapper.tsx            # Preloader → Navbar → SmoothScroll → Content
│   │   ├── Navbar.tsx                # Fixed nav with slide navigation + mobile overlay
│   │   ├── PresentationDeck.tsx      # Fullpage slide engine (desktop snap, mobile scroll)
│   │   └── SmoothScroll.tsx          # Lenis + GSAP ScrollTrigger sync
│   │
│   ├── sections/                     # Page-level content blocks (home slide order)
│   │   ├── Hero.tsx                  # Slide 0 — Cinematic hero with tagline
│   │   ├── AboutUs.tsx               # Slide 1 — Company story + stats
│   │   ├── EcoImpact.tsx             # Slide 2 — Sustainability initiatives + counters
│   │   ├── Products.tsx              # Slide 3 — Category lookbook (click-to-browse)
│   │   ├── GlobalReach.tsx           # Slide 4 — World map + buyer marquee
│   │   ├── Facilities.tsx            # Slide 5 — Employee facilities carousel
│   │   ├── Sustainability.tsx        # Slide 6 — Certifications grid
│   │   ├── Contact.tsx               # Slide 7 — Contact info + Google Maps + footer
│   │   ├── DualScroll.tsx            # V2 only — GSAP pinned scroll
│   │   ├── HistoryFlow.tsx           # V2 only — timeline milestones
│   │   ├── WorkLife.tsx              # V2 only — work culture
│   │   └── ContactFooter.tsx         # V2 only — contact + footer
│   │
│   └── ui/                           # Reusable primitives
│       ├── Logo.tsx                  # SVG logo component
│       ├── Magnetic.tsx              # Hover magnetic cursor effect
│       ├── Preloader.tsx             # Cinematic loading animation
│       └── ScrollProgress.tsx        # V2 only — scroll indicator
│
├── data/                             # Static content definitions
│   ├── slides.ts                     # Slide config: order, labels, dark/light, nav visibility
│   └── facilities.ts                 # 6 facility definitions (title, stats, details, gallery)

public/
├── certifications/                   # 13 certification badge images (PNG/JPG)
├── images/                           # Hero bg, factory images, world map SVG, facility photos
├── products/                         # 5 category subdirs (bottoms, nightwear, sports-active, tee-polo, winter)
└── logo-symbol.svg                   # Site logo
```

## Component Dependency Tree

```
RootLayout (layout.tsx)
└── AppWrapper
    ├── SmoothScroll (Lenis wrapper — pathname-aware)
    │   ├── Preloader (2s loading gate)
    │   ├── Navbar (appears after preloader, reads SLIDES config)
    │   └── <main>{page content}</main>
    │
    ├── Home (/)
    │   └── PresentationDeck (labels from slides.ts)
    │       ├── [0] Hero
    │       ├── [1] AboutUs
    │       ├── [2] EcoImpact
    │       ├── [3] Products → links to /products/[category]
    │       ├── [4] GlobalReach
    │       ├── [5] Facilities → links to /facilities/[slug]
    │       ├── [6] Sustainability (Certifications)
    │       └── [7] Contact (footer + map)
    │
    ├── Product Gallery (/products/[category])
    │   └── Server Component — SSG via generateStaticParams
    │       Back link: /?slide=3 (returns to Products section)
    │
    ├── Facility Detail (/facilities/[slug])
    │   └── Server Component — SSG via generateStaticParams
    │       Back link: /?slide=5 (returns to Facilities section)
    │
    ├── Terms (/terms) — Static legal page
    └── Privacy (/privacy) — Static legal page
```

## Dynamic Routes

| Route | Params | Source | Generated Pages |
|-------|--------|--------|-----------------|
| `/products/[category]` | `category` | `SLUG_TO_FOLDER` in page.tsx | 5: tee-polo, bottoms, nightwear, sports-active, winter |
| `/facilities/[slug]` | `slug` | `FACILITIES` in `src/data/facilities.ts` | 6: prayer-rooms, medical-service, dining, daycare, equality, professional-development |

## PresentationDeck Architecture

The home page uses a **fullpage slide engine** (`PresentationDeck.tsx`):

- **Desktop (≥1024px):** Viewport-locked slides with wheel/touch snap navigation. Each child is an `absolute inset-0` positioned slide with Framer Motion enter/exit animations.
- **Mobile (<1024px):** Falls back to a normal scrollable stack — no snap behavior.
- **Slide Config:** Centralized in `src/data/slides.ts` — defines order, labels, dark/light backgrounds, and navbar visibility per slide.
- **Navigation:** Navbar reads `slides.ts` to generate links. `NAVIGATE_SLIDE` custom events allow any component to trigger slide changes. URL param `?slide=N` restores position on mount (used by sub-page back links).
- **Progress Rail:** Left vertical rail with clickable segments for direct slide navigation.

## Scroll Architecture

- **Lenis** (`SmoothScroll.tsx`): Wraps all routes via `AppWrapper`. Uses `root` mode with `smoothWheel: true` on home, disabled on sub-pages via pathname detection.
- **GSAP ScrollTrigger:** Synced with Lenis via `useLenis` callback. Used by V2 `DualScroll` for pinned sections.
- **Sub-page scrolling:** `/products/*`, `/facilities/*`, `/terms`, `/privacy` use native browser scrolling — Lenis smooth wheel is conditionally disabled for these routes.

## Data Flow

- No backend, no API, no database, no CMS
- All content hardcoded in components and `src/data/` TypeScript files
- Images served from `public/`
- Google Maps iframe in Contact section (no API key required)

## Key Patterns

- **CSS:** Complex component styles in `globals.css`, simple layout via Tailwind utilities. Uses `@theme inline` for Tailwind v4.
- **Animations:** Framer Motion for mount/viewport-triggered animations. GSAP + ScrollTrigger for V2 scroll-pinned sections.
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `refactor:`, `chore:` prefixes enforced.
- **Release Automation:** release-please generates CHANGELOG + SemVer tags from conventional commits.
