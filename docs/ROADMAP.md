# Roadmap — Northern Corporation

_Last updated: 2026-04-28T15:55Z — CEO override: visual bugs take priority over config debt._

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

- [ ] **T-12: Rigorous Responsive QA Audit**
  - Scan the Home page PresentationDeck (all 8 sections) on mobile (375px), tablet (768px), and small laptop (1024px) viewports.
  - Scan all dynamic sub-pages: `/products/[category]` (5 categories), `/facilities/[slug]` (6 slugs), `/terms`, `/privacy`.
  - Document every layout break: text overflow, image overlap, touch-target violations (< 44px), z-index collisions, clipped content.
  - Output: checklist of findings with screenshot evidence per breakpoint.
  - **Acceptance:** Written audit report with zero ambiguity — each finding has a file, line, and breakpoint.

- [ ] **T-13: Smart Navbar & Logo Sizing** (`src/components/layout/Navbar.tsx`)
  - Increase the logo size significantly (current `h-16` is too small on inner pages).
  - Make the Navbar background **context-aware by pathname**:
    - On `/` (home): transparent background (current behaviour, blends with PresentationDeck).
    - On all sub-pages (`/products/*`, `/facilities/*`, `/terms`, `/privacy`): solid or frosted-glass dark green (`#023020`) background so nav text is always legible against light page backgrounds.
  - Ensure the CTA button and nav links remain accessible at all breakpoints.
  - **Acceptance:** Logo is visually prominent. Navbar is transparent on home, opaque/frosted on every other route. No text-on-light-background legibility issues.

- [ ] **T-14: Cinematic Fullscreen Menu** (`src/components/layout/Navbar.tsx`)
  - Redesign the mobile/tablet menu into an **Awwwards-level fullscreen overlay**.
  - Use Framer Motion for entrance/exit animations (staggered link reveals, background wipe, etc.).
  - **UI/UX agent has full creative control** over layout, typography, animation choreography, and micro-interactions.
  - Include a **B2B contact footer** inside the menu overlay (email, phone, factory address — pull from Contact section data).
  - Menu must work flawlessly on mobile (375px), tablet (768px), and desktop (1440px+).
  - **Acceptance:** Menu feels premium and cinematic. Smooth open/close. Contact info visible. No scroll-lock bugs. Passes Lighthouse accessibility audit.

- [ ] **T-15: Implement QA Fixes**
  - Resolve **all** responsive layout breaks documented in T-12.
  - Fix across mobile (375px) and tablet (768px) breakpoints minimum.
  - Each fix must reference the original T-12 finding number.
  - **Acceptance:** Re-run the T-12 audit — zero critical/warning findings remain.

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
