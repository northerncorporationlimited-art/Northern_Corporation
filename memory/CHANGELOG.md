# Changelog

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
