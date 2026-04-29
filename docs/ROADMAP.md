# Roadmap — Northern Corporation

_Last updated: 2026-04-29T18:00Z — Sprint 8 active._

> 🚀 **Sprint 8 in progress.** Sprints 0–7 archived to `MEMORY_BANK.md`.

---

## CEO Decisions (2026-04-29)

- **Scope freeze:** Do NOT touch `AboutUs.tsx`, `Products.tsx`, or Hero social links.
- **Release-please:** Deleted. Manual releases only.
- **Dependency patches / Prettier:** Skip for now.

---

## Blocked (Awaiting Client)

- [ ] **CF-12:** Flat-lay / lifestyle product photography — awaiting new image assets.
- [ ] **LEGAL:** Replace boilerplate on `/terms` and `/privacy` with client-approved legal text.
- [ ] **CONTACT PICK:** Client must choose Contact A, B, or C — delete the 2 losers and reduce slide count.

---

## Sprint 8: Build Hygiene & Config Cleanup

_Zero-risk tech debt that improves build cleanliness and performance._

- [ ] **T-27:** Remove `_TO_DELETE` from `tsconfig.json` exclude array + delete orphaned `release-please-config.json` + `.release-please-manifest.json`.
- [ ] **T-28:** Add `priority` prop to LCP hero images on `/products/[category]` pages.
- [ ] **T-29:** Clean stale Supabase/R2 references from `WORKFLOW.md` + delete WORKFLOW.md §5 (release-please section).

---

## Backlog (Tabled)

_Pick up when business priorities allow._

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
| 5: Map Overhaul & Contact A/B/C | T-16, T-17, T-18, T-19 | `10ad62f` |
| 6: Map Animation Polish & ContactB | T-20, T-21, T-22, T-23, T-24 | `d73029f` |
| 7: Scroll Cue & ContactB Polish | T-25, T-26 | `2948425` |
| 8: Build Hygiene & Config Cleanup | T-27, T-28, T-29 | _in progress_ |
