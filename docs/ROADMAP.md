# Roadmap — Northern Corporation

_Last updated: 2026-04-29T18:08Z — Sprint 9 assigned._

> ✅ **Sprints 0–8 complete.** Archived to `MEMORY_BANK.md`.
>
> 🔧 **Sprint 9 in progress.**

---

## CEO Decisions (2026-04-29)

- **Scope freeze:** Do NOT touch `AboutUs.tsx`, `Products.tsx`, or Hero social links.
- **Release-please:** Deleted. Manual releases only.
- **Dependency patches / Prettier:** Skip for now.

---

## Blocked (Awaiting Client)

- [ ] **CF-12:** Flat-lay / lifestyle product photography — awaiting new image assets.
- [ ] **LEGAL:** Replace boilerplate on `/terms` and `/privacy` with client-approved legal text.
- [x] ~~**CONTACT PICK:** Client chose **Contact B** as the winner (2026-04-29).~~

---

## Sprint 9: Contact Pick — B Winner (3 tickets)

_Client decision: Contact B wins. Delete Contact A + C, reduce deck from 10 → 8 slides._

- [x] **T-30: Delete Losers** — Remove `Contact.tsx` (A) and `ContactC.tsx` from `src/components/sections/`. Remove their imports and JSX from `page.tsx`.
  - **Files:** `src/components/sections/Contact.tsx` [DELETE], `src/components/sections/ContactC.tsx` [DELETE], `src/app/page.tsx` [MODIFY]
  - **AC:** Build passes with 0 references to `Contact` (A) or `ContactC` in any import statement.

- [x] **T-31: Rewire Slides & Navbar** — Update `slides.ts`: remove Contact A + Contact C entries, rename Contact B → "Contact", set `showInDesktopNav: false`. Update Navbar CTA (`nav-contact-cta`) to point to the correct slide index (now index 7). Rename `ContactB.tsx` export from `ContactB` to `Contact` and rename file to `Contact.tsx`.
  - **Files:** `src/data/slides.ts` [MODIFY], `src/components/layout/Navbar.tsx` [MODIFY], `src/components/sections/ContactB.tsx` → `src/components/sections/Contact.tsx` [RENAME], `src/app/page.tsx` [MODIFY]
  - **AC:** `SLIDES` has exactly 8 entries. Navbar CTA navigates to Contact (slide 7). Desktop nav still shows 6 links (Contact hidden). Overlay menu shows 8 links, no "A/B/C" suffixes.

- [x] **T-32: QA & Docs** — `tsc --noEmit && next build`. Verify 16 pages generated (was 18 — minus 2 contact slides). Update `MEMORY_BANK.md` session log and `AGENTS.md` slide count.
  - **Files:** `docs/MEMORY_BANK.md` [MODIFY], `AGENTS.md` [MODIFY]
  - **AC:** Build succeeds. Slide count documented as 8. No references to Contact A/B/C remain in docs.


---

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
| 8: Build Hygiene & Config Cleanup | T-27, T-28, T-29 | `35accd3` |
| 9: Contact Pick — B Winner | T-30, T-31, T-32 | _in progress_ |
