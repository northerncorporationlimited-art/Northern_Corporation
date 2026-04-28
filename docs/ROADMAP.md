# Roadmap — Northern Corporation Client Feedback

_Last updated: 2026-04-28 — PM sprint re-plan per CEO override_

> **Executive Decision:** Tickets are grouped by **Architectural Component**, not complexity.
> This prevents file-thrashing — each file is touched in exactly one sprint.

---

## Sprint 0: Architecture Docs (Tech Debt)

> Memory Bank items 6 & 7 flag stale docs. Fix before any feature branches.

- [x] **Ticket 1:** Update `AGENTS.md` and create `ARCHITECTURE.md`
  - `AGENTS.md`: Fix Next.js version (15 → 16), replace "Navbar + Certifications section" with full 8-section PresentationDeck layout, remove `_TO_DELETE/` reference, add dynamic routes and `src/data/` to structure
  - `docs/ARCHITECTURE.md`: Document the PresentationDeck pattern, slide config (`src/data/slides.ts`), dynamic routes (`/products/[category]`, `/facilities/[slug]`), animation layering strategy, and Lenis scroll architecture
  - **Acceptance:** Both files accurately describe the codebase as of `main` HEAD. No stale references remain.

---

## Sprint 1: Core Engine & Scrolling (`PresentationDeck` & Routing)

> All changes touching scroll behavior, slide transitions, and route navigation.

- [x] **Ticket 2:** (CF-05) Remove wheel-hijacking from `Products.tsx`
  - Removed `registerSubSlider` call and cleaned unused imports (`useRef`, `useEffect`, `useContext`, `PresentationContext`)
  - Categories change on click only; wheel scroll passes through to PresentationDeck
  - _Shipped: `fba708d`_

- [x] **Ticket 3:** (CF-02, CF-10, CF-11) Fix native scrolling on dynamic sub-pages
  - `AppWrapper.tsx` now detects sub-routes via `usePathname` and passes `enableSmooth={false}` to `SmoothScroll`
  - `SmoothScroll.tsx` accepts `enableSmooth` prop — when false, `lerp: 1` (no interpolation) and `smoothWheel: false`
  - Home + V2 retain smooth scroll; `/products/*`, `/facilities/*`, `/terms`, `/privacy` get native browser scrolling
  - _Shipped: `feat/final-client-fixes`_

- [x] **Ticket 4:** (CF-07, CF-08, CF-13) Update `PresentationDeck.tsx`
  - Removed `05/08` slide counter element (bottom-right)
  - Made progress rail clickable — invisible hit areas on each segment with `setIndex` on click
  - Transition duration `1.0s` → `0.6s` in `slideVariants` (center + exit)
  - _Shipped: `fba708d`_

- [x] **Ticket 5:** (CF-03) Back button returns to Products section
  - Changed `href="/"` → `href="/?slide=3"` in `/products/[category]/page.tsx`
  - PresentationDeck already reads `?slide=N` on mount (existing feature from `ba8747f`)
  - Label changed: "Back to Home" → "Back to Products"
  - _Shipped: `fba708d`_

---

## Sprint 2: UI Polish (Static Components)

> Visual-only changes. No scroll/routing logic touched.

- [x] **Ticket 6:** (CF-06, CF-09) `GlobalReach.tsx`
  - Buyer marquee: `text-[#FDD017]/70` → `text-[#F5F5EB]/50` (cream, stops blending with gold headings)
  - World map opacity: `opacity-20` → `opacity-30` (better visibility against dark bg)
  - Flight lines: removed `repeat: Infinity`, now plays once with `easeOut` over 2.5s
  - _Shipped: `fba708d`_

- [x] **Ticket 7:** (CF-01, CF-16) `Navbar.tsx`
  - Logo: `h-14 w-14` → `h-16 w-16` (visually dominant over nav text)
  - Nav text: `text-sm` → `text-xs` (reinforces logo hierarchy)
  - CTA button: `px-5 py-2 text-[11px]` → `px-6 py-2.5 text-xs`
  - _Shipped: `fba708d`_

- [x] **Ticket 8:** (CF-04) `EcoImpact.tsx`
  - Removed `cursor-pointer` from initiative `<li>` items (non-interactive elements shouldn't look clickable)
  - Initiative text stays cream `text-[#F5F5EB]/70` — only numbered bullets use gold
  - _Shipped: `fba708d`_

- [x] **Ticket 9:** (CF-14) `Sustainability.tsx`
  - Cert logo container: `h-10/h-12/h-14` → `h-14/h-16/h-20`
  - Label text: `text-[9px]/text-[10px]` → `text-[10px]/text-[11px]`
  - _Shipped: `fba708d`_

- [x] **Ticket 10:** (CF-15, CF-18, CF-19) `Contact.tsx`
  - Social links: `href="#"` → real LinkedIn + Instagram URLs; Facebook → Instagram
  - Factory split: single "Factory" → "Factory 1 — BSCIC" + "Factory 2 — Tapirbari"
  - Map iframe: `aspect-video lg:aspect-[4/3]` → `aspect-[4/3] lg:aspect-square`
  - _Shipped: `fba708d`_

---

## Sprint 3: Legal Pages

- [x] **Ticket 11:** (CF-17) Create `/terms` and `/privacy` pages
  - Created `src/app/terms/page.tsx` and `src/app/privacy/page.tsx` with standard corporate boilerplate
  - Each page has Playfair Display H1, 4 boilerplate sections, and prominent `[CLIENT LEGAL TEXT TO REPLACE]` banner
  - Updated footer links in `Contact.tsx`: `href="#"` → `/terms` and `/privacy`
  - _Shipped: `feat/final-client-fixes`_

---

## Blocked

- [ ] **CF-12:** Flat-lay / lifestyle product photography — awaiting new assets from client. Cannot fix in code.

---

## Progress Summary

| Sprint | Total | Done | Remaining |
|--------|-------|------|-----------|
| 0      | 1     | 1    | 0         |
| 1      | 4     | 4    | 0         |
| 2      | 5     | 5    | 0         |
| 3      | 1     | 1    | 0         |
| **Total** | **11** | **11** | **0**  |

> 🤝 **Handoff Contract:**
> ✅ Roadmap ready. Sprint 2 complete. Sprint 0, Ticket 3, and Ticket 11 remain.
> Run: `/lead-dev Execute Ticket 1 (Sprint 0 — Architecture Docs)` to start.
