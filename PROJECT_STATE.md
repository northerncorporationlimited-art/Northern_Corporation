# Project State

## Status: V1 + V2 + V3 Variations Live

**Last Updated:** 2026-03-09

## Overview

Northern Corporation Ltd. portfolio with A/B/C variation routing — V1 (Classic), V2 (Premium Motion), V3 (Kinetic Premium).

## Variations

### V1: Classic (`/`)
Light-themed single-page prototype with FadeInScroll animations, section dividers, enhanced hero.

### V2: Premium Motion (`/v2`)
Dark forest-professional theme with staggered hero word reveal, RevealPremium scroll-linked animations.

### V3: Kinetic Premium (`/v3`)
Ultra-premium dark theme with:
- **Mouse-tracking parallax hero** — 3-layer depth (background/text/badge) using `useMotionValue` + `useSpring` (zero re-renders)
- **Sticky curtain scroll** — sections stick at top, scale down and fade as next section slides over
- Dark aesthetic alternating northern-evergreen / near-black

## Shared Components
- Navbar with version dropdown (V1 / V2 / V3)
- FabricShowcase, AboutUsContent, CertificationGrid, ContactInfo (dark prop)
- Deployed: [northern-corporation.vercel.app](https://northern-corporation.vercel.app)

## Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | Next.js (App Router) |
| Styling     | Tailwind CSS v4      |
| Animations  | Framer Motion        |
| Icons       | lucide-react         |
| Hosting     | Vercel               |
