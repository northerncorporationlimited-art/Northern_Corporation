# Architecture Map

## Directory Structure (Active Code Only)
```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home — Navbar + Certifications
│   ├── V2/page.tsx             # Archived full site
│   ├── layout.tsx              # Root layout (AppWrapper)
│   ├── globals.css             # All custom CSS (936 lines)
│   └── icon.svg                # Favicon
│
├── components/
│   ├── layout/                 # App-level wrappers
│   │   ├── AppWrapper.tsx      # Preloader → Navbar → Content
│   │   ├── Navbar.tsx          # Fixed nav with mobile menu (240 lines)
│   │   └── SmoothScroll.tsx    # Lenis + GSAP sync
│   │
│   ├── sections/               # Page-level content blocks
│   │   ├── Sustainability.tsx  # Certifications grid (ACTIVE on home)
│   │   ├── DualScroll.tsx      # V2 only — GSAP pinned scroll
│   │   ├── HistoryFlow.tsx     # V2 only — timeline milestones
│   │   ├── WorkLife.tsx        # V2 only — work culture
│   │   └── ContactFooter.tsx   # V2 only — contact + footer
│   │
│   └── ui/                     # Reusable primitives
│       ├── Logo.tsx            # SVG logo component
│       ├── Magnetic.tsx        # Hover magnetic effect
│       ├── Preloader.tsx       # Loading animation (14KB)
│       └── ScrollProgress.tsx  # V2 only — scroll indicator

public/
├── certifications/             # 13 certification badge images (ACTIVE)
├── fabrics/                    # 8 fabric texture images (future use)
├── images/                     # Hero/factory images (V2 + future use)
└── logo-symbol.svg             # Site logo (ACTIVE)
```

## Component Dependency Tree
```
RootLayout (layout.tsx)
└── AppWrapper
    ├── SmoothScroll (Lenis wrapper)
    │   ├── Preloader (shows for 4.2s on initial load)
    │   ├── Navbar (appears after preloader)
    │   └── {page content}
    │       └── Home (/): Sustainability (certifications grid)
    │       └── V2 (/V2): DualScroll → HistoryFlow → Sustainability → WorkLife → ContactFooter
```

## Data Flow
- No backend / no API — fully static site
- All content is hardcoded in components
- Images served from /public/
- No database, no CMS

## Key Patterns
- **CSS:** Complex component styles in `globals.css` with class names, simple layout via Tailwind utilities
- **Animations:** Framer Motion for mount/viewport-triggered, GSAP + ScrollTrigger for scroll-pinned sections
- **Scrolling:** Lenis handles smooth scroll globally, synced with GSAP ScrollTrigger via SmoothScroll.tsx
- **Loading:** 4.2s preloader with cinematic logo animation, then Navbar appears

## Archived / Marked for Deletion
- `_TO_DELETE/` — **removed** (legacy_v1, experimental hero variants, old config files)
- `Product_image/` — **removed** (raw source images, duplicated in `public/products/`)
