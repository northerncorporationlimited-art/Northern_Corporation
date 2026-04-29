# Roadmap — Northern Corporation

_Last updated: 2026-04-29T09:02Z — CEO scope cut. Sprint 5 defined._

> ✅ **Sprints 0–4 complete.** Archived to `MEMORY_BANK.md`.

---

## CEO Decisions (2026-04-29)

- **Scope freeze:** Do NOT touch `AboutUs.tsx`, `Products.tsx`, or Hero social links.
- **Release-please:** Deleted. Manual releases only.
- **Dependency patches / Prettier:** Skip for now.

---

## Sprint 5: Map Overhaul & Contact A/B/C Testing

> **Priority:** 🟡 Client-facing — visual polish & layout exploration.
> **Branch:** `feat/sprint-5-map-contact`

- [x] **T-16: Navbar Logo Text** ✅ _Completed 2026-04-29_
  - Changed from `text-xs font-semibold tracking-[0.2em]` → `text-base md:text-lg font-black tracking-wider`
  - Added hover transition for cream color
  - Visual weight now balances with the logo symbol at all breakpoints

- [x] **T-17: GlobalReach Map Pop & Animation** ✅ _Completed 2026-04-29_
  - Map opacity boosted from 30% → 45% with `brightness(1.1) contrast(1.1)` filter
  - Extracted `FlightPath` component with 3-phase animation:
    1. On mount: `pathLength` 0→1 draw-in with staggered delays (0.15s per path)
    2. At 3.2s: `hasLaunched=true` → all paths fade to `opacity: 0`
    3. On hover: specific path re-draws with 0.8s animation
  - Added gold gradient stroke + glow trail layer with blur
  - Hover/tap toggle from T-15 preserved

- [x] **T-18: Contact Options (A/B/C)** ✅ _Completed 2026-04-29_
  - **Option A:** `Contact.tsx` — untouched (original layout)
  - **Option B:** `ContactB.tsx` [NEW] — Split layout: two text columns left (offices + contact), massive map right (55% width), Terms/Privacy in footer
  - **Option C:** `ContactC.tsx` [NEW] — "The Embassy" — fullscreen map bg with dark overlay + noise grain, 4 frosted-glass floating cards, editorial italic gold headline, social + legal footer
  - All 3 share identical data (HQ, factories, phone, email, socials)

- [x] **T-19: Wire Up Presentation Deck** ✅ _Completed 2026-04-29_
  - `slides.ts`: Renamed "Contact" → "Contact A", added `contact-b` and `contact-c` entries (isDark:true, showInDesktopNav:false)
  - `page.tsx`: Imported and added `<ContactB />` and `<ContactC />` as final PresentationDeck children
  - Progress rail now shows 10 slides; cinematic menu includes all 3 contacts

---

## Blocked (Awaiting Client)

- [ ] **CF-12:** Flat-lay / lifestyle product photography — awaiting new image assets.
- [ ] **LEGAL:** Replace boilerplate on `/terms` and `/privacy` with client-approved legal text.

---

## Backlog (Tabled)

_Pick up when business priorities allow._

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

| Sprint | Tickets | Merge Commit |
|--------|---------|------------|
| 0: Architecture Docs | T-1 | `4ecca64` |
| 1: Core Engine & Scrolling | T-2, T-3, T-4, T-5 | `fba708d`, `4ecca64` |
| 2: UI Polish | T-6, T-7, T-8, T-9, T-10 | `fba708d` |
| 3: Legal Pages | T-11 | `4ecca64` |
| 4: Responsive UI/UX & Menu | T-12, T-13, T-14, T-15 | `d5a314f` |
