<!-- BEGIN:nextjs-agent-rules -->
# Project Rules — Northern Corporation Limited

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (via `@theme inline` in globals.css)
- Framer Motion for animations
- Lenis for smooth scrolling
- GSAP + ScrollTrigger for scroll-based animations
- Deployed on Vercel (auto-deploy from `main` branch)

## Design System
- **Brand Green:** `#023020`
- **Brand Gold:** `#FDD017`
- **Brand Cream:** `#F5F5EB`
- **Fonts:** Geist Sans (body), Geist Mono (code), Playfair Display (headlines)
- Complex component styling uses vanilla CSS classes in `globals.css`

## Conventions
- Components: `src/components/` → `layout/`, `sections/`, `ui/`
- Pages: Next.js App Router in `src/app/`
- Use `"use client"` only when needed (framer-motion, hooks, interactivity)
- All interactive elements must have unique, descriptive IDs
- Mobile-first responsive design
- Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Current Site Structure
- **Home page** (`/`): Navbar + Certifications section
- **V2** (`/V2`): Archived full site (DualScroll, HistoryFlow, Sustainability, WorkLife, ContactFooter)
- **`_TO_DELETE/`**: Archived files marked for future removal

## Active Assets
- `public/certifications/` — certification badge images (used on home page)
- `public/logo-symbol.svg` — site logo

## Do NOT
- Remove existing comments unless they are factually wrong
- Add `console.log` in production code
- Use placeholder images — generate real ones if needed
- Scan the full repository unnecessarily — work with the files relevant to the task
<!-- END:nextjs-agent-rules -->
