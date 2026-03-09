# Project State

## Status: Phase 1 Complete + V2 Variation Live

**Last Updated:** 2026-03-09

## Overview

Northern Corporation Ltd. portfolio website with A/B variation routing — V1 (Classic) and V2 (Premium Motion).

## Current Phase

🟢 **Phase 1 — Complete**

### V1: Classic (`/`)
- Sticky Navbar with logo + version dropdown
- Enhanced Hero with video placeholder, "WRAP YOURSELF IN LUXURY", buyer logos
- What We Do with category cards + interactive FabricShowcase
- About Us with history, pillars, capacity, work life
- Certification grid (13 badges)
- Contact Us with info cards + CTA
- Section dividers between all sections

### V2: Premium Motion (`/v2`)
- Staggered word-by-word hero reveal (3D rotateX + custom cubic-bezier easing)
- Scroll-linked `RevealPremium` animations (useScroll + useTransform)
- Dark forest-professional aesthetic (northern-evergreen / near-black)
- All shared components render with dark variant
- Category pills, fabric showcase, full content sections

### Shared
- Navbar version dropdown (V1: Classic / V2: Premium Motion)
- Deployed to Vercel — [northern-corporation.vercel.app](https://northern-corporation.vercel.app)

## Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | Next.js (App Router) |
| Styling     | Tailwind CSS v4      |
| Animations  | Framer Motion        |
| Icons       | lucide-react         |
| Hosting     | Vercel               |
