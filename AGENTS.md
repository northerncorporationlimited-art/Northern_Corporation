<!-- BEGIN:nextjs-agent-rules -->
# Project Rules — Northern Corporation Limited

## Tech Stack
- Next.js 16.2.3 (App Router)
- TypeScript 5.9.3
- Tailwind CSS 4.2.2 (via `@theme inline` in globals.css)
- Framer Motion 12.38.0 for animations
- Lenis 1.3.23 for smooth scrolling
- GSAP 3.15.0 + ScrollTrigger for scroll-based animations
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
- Data: Static content in `src/data/` (slides, facilities)
- Use `"use client"` only when needed (framer-motion, hooks, interactivity)
- All interactive elements must have unique, descriptive IDs
- Mobile-first responsive design
- Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Current Site Structure
- **Home page** (`/`): 8-section PresentationDeck → Hero, AboutUs, EcoImpact, Products, GlobalReach, Facilities, Sustainability (Certifications), Contact
- **Product Gallery** (`/products/[category]`): Dynamic SSG pages for 5 categories (tee-polo, bottoms, nightwear, sports-active, winter)
- **Facility Detail** (`/facilities/[slug]`): Dynamic SSG pages for 5 facilities (medical-service, dining, daycare, equality, professional-development)
- **Legal** (`/terms`, `/privacy`): Static corporate boilerplate pages
- **V2** (`/V2`): Archived full site (DualScroll, HistoryFlow, Sustainability, WorkLife, ContactFooter)

## Active Assets
- `public/certifications/` — 13 certification badge images (PNG/JPG)
- `public/products/` — 5 category subdirectories with product photography
- `public/images/` — Hero bg, factory images, world map SVG, facility photos
- `public/logo-symbol.svg` — site logo

## Do NOT
- Remove existing comments unless they are factually wrong
- Add `console.log` in production code
- Use placeholder images — generate real ones if needed
- Scan the full repository unnecessarily — work with the files relevant to the task
<!-- END:nextjs-agent-rules -->
