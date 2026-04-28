# Roadmap — Northern Corporation

_Last updated: 2026-04-28T16:25Z — Sprint 4 complete. All 4 tickets (T-12–T-15) delivered._

> ✅ **Sprints 0–3 complete.** Archived to `MEMORY_BANK.md` (session: 2026-04-28T08:50Z).

---

## CEO Decisions (2026-04-28)

- **Release-please:** Option A — delete orphaned config files, remove §5 from WORKFLOW.md. No auto-versioning.
- **Dependency patches:** Skip for now.
- **Prettier:** Skip for now.
- **Tech Debt Sprint:** Tabled to Backlog (see bottom of file).

---

## Sprint 4: Responsive UI/UX & Menu Overhaul

> **Priority:** 🔴 Critical — buyer-facing visual bugs.
> **Branch:** `feat/sprint-4-responsive-menu`

- [x] **T-12: Rigorous Responsive QA Audit** ✅ _Completed 2026-04-28_
  - **Findings:** 4 🔴 Critical · 9 🟡 Warning · 5 🟢 Info
  - C1: Logo too small (64px icon, no brand name <640px)
  - C2: Navbar invisible on sub-pages (cream-on-cream)
  - C3: Mobile menu is generic bottom sheet (CEO flagged)
  - C4: Product image bleeds under navbar
  - Full report: see QA Audit artifact

- [x] **T-13: Smart Navbar & Logo Sizing** ✅ _Completed 2026-04-28_
  - Logo: responsive `h-8 md:h-10 lg:h-12 w-auto`, brand text hidden `<sm:`
  - Background: pathname-aware — transparent gradient on `/`, solid `bg-[#023020]` with shadow+border on all sub-pages
  - Hamburger: 48px touch target (`h-12 w-12`), thicker 2px lines
  - Fixes: C1 (logo too small), C2 (navbar invisible on sub-pages), I5 (touch target)

- [x] **T-14: Cinematic Fullscreen Menu** ✅ _Completed 2026-04-28_
  - Replaced bottom sheet with fullscreen curtain (`clipPath inset` reveal via Framer Motion)
  - Massive staggered typography (`text-4xl sm:5xl md:6xl lg:8xl` Playfair Display)
  - Blur-in link animations with gold hover shimmer lines
  - B2B footer: Corporate HQ (Dhaka), Direct Inquiries (email + phone), Est. 1967
  - Fix: C3 (generic mobile menu)

- [x] **T-15: Implement QA Fixes** ✅ _Completed 2026-04-28_
  - **Products.tsx:** C4 (pt-28 top pad), W1 (text-2xl mobile), W2 (max-w-sm full-width)
  - **GlobalReach.tsx:** W3 (hidden md:inline labels), W4 (onClick toggle for touch)
  - **Sustainability.tsx:** W8 (grid-cols-2 sm:3 md:4 lg:7)
  - **Facilities.tsx:** W5 (auto height, min-h-[80px])
  - **Contact.tsx:** W7 (pointer-events-none mobile map)
  - **AboutUs.tsx:** W9 (tracking-wide mobile, tracking-widest md+)
  - **Hero.tsx:** I2 (bottom-10 + env(safe-area-inset-bottom))
  - **products/[category]/page.tsx:** I3 (text-4xl md:6xl lg:8xl)

---

## Blocked (Awaiting Client)

- [ ] **CF-12:** Flat-lay / lifestyle product photography — awaiting new image assets.
- [ ] **LEGAL:** Replace boilerplate on `/terms` and `/privacy` with client-approved legal text.

---

## Backlog (Tabled)

_These items are valid but deprioritized by CEO decision. Pick up when Sprint 4 ships._

- [ ] Remove `_TO_DELETE` from `tsconfig.json` exclude array.
- [ ] Add `priority` prop to LCP images on `/products/[category]` pages.
- [ ] Clean stale Supabase/R2 references from `WORKFLOW.md`.
- [ ] Delete orphaned `release-please-config.json` + `.release-please-manifest.json` + WORKFLOW.md §5.
- [ ] Apply minor dependency patches (Next.js, React, Tailwind).
- [ ] Add Prettier config + format codebase.
- [ ] Modularize `globals.css` (22KB+ monolith).
- [ ] Set up test framework (unit + E2E).

---

## Completed Sprints (see MEMORY_BANK.md)

| Sprint | Tickets | Commits |
|--------|---------|---------|
| 0: Architecture Docs | T-1 | `4ecca64` |
| 1: Core Engine & Scrolling | T-2, T-3, T-4, T-5 | `fba708d`, `4ecca64` |
| 2: UI Polish | T-6, T-7, T-8, T-9, T-10 | `fba708d` |
| 3: Legal Pages | T-11 | `4ecca64` |
