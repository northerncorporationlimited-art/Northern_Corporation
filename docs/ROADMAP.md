# Roadmap — Northern Corporation

_Last updated: 2026-04-29T13:06Z — Sprint 5 shipped. Backlog items remain._

> ✅ **Sprints 0–5 complete.** Archived to `MEMORY_BANK.md`.

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
| 5: Map Overhaul & Contact A/B/C | T-16, T-17, T-18, T-19 | `10ad62f` |
