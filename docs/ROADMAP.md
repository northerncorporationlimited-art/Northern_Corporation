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

- [ ] **T-16: Navbar Logo Text** (`src/components/layout/Navbar.tsx`)
  - Increase the font size and visual weight of the "NORTHERN CORP." text next to the logo symbol.
  - Current: `text-xs font-semibold tracking-[0.2em]` — too thin and small.
  - Target: larger, bolder text that balances with the logo mark at all breakpoints.
  - **Acceptance:** "NORTHERN CORP." text is visually prominent alongside the symbol. Readable at `sm:` breakpoint. Does not crowd desktop nav links.

- [ ] **T-17: GlobalReach Map Pop & Animation** (`src/components/sections/GlobalReach.tsx`)
  - **Map visibility:** Increase the world map contrast/opacity so it "pops" against the dark background. Currently too faint.
  - **Flight path animation overhaul:**
    1. **On load:** Animate SVG path drawing from Bangladesh (HQ) to all destination pins simultaneously — like shipments launching. Use stroke-dasharray/dashoffset or Framer Motion `pathLength`.
    2. **After draw completes:** Paths fade out gracefully.
    3. **On hover/tap of a pin:** Re-animate that specific flight path from HQ → destination.
  - Do NOT touch the pin labels fix from T-15 (already hidden on mobile via `hidden md:inline`).
  - **Acceptance:** Map is visually striking. Flight paths animate on load. Hover re-triggers individual path animation. Touch tap toggle (from T-15) still works.

- [ ] **T-18: Contact Options (A/B/C)**
  - **Option A:** The existing `Contact.tsx` — do NOT modify it.
  - **Option B:** Create `src/components/sections/ContactB.tsx`
    - Layout: larger Google Maps embed on the right (~60% width), two stacked text columns on the left (HQ address + factory info).
    - Include Terms & Privacy footer links inside the section.
    - Style: same dark green `#023020` palette, Playfair headlines, Geist body text.
  - **Option C:** Create `src/components/sections/ContactC.tsx`
    - AI has full creative control. Ultra-premium, Awwwards-level layout.
    - Must include: HQ address, email, phone, map embed, and legal footer links.
    - May use split-screen, parallax, editorial grid, or any premium pattern.
  - **Acceptance:** Three distinct, production-quality contact sections exist. All share the same data (address, email, phone). All render correctly on mobile and desktop.

- [ ] **T-19: Wire Up Presentation Deck** (`src/app/page.tsx`, `src/data/slides.ts`)
  - Add `ContactB` and `ContactC` as the final slides inside `PresentationDeck`.
  - Update `slides.ts` to append two new entries:
    - `{ id: "contact-b", label: "Contact B", navLabel: "Contact B", isDark: true, showInDesktopNav: false }`
    - `{ id: "contact-c", label: "Contact C", navLabel: "Contact C", isDark: true, showInDesktopNav: false }`
  - Ensure the cinematic menu and progress rail show all slides including the new ones.
  - **Acceptance:** Client can scroll/snap through "Contact A" → "Contact B" → "Contact C" at the end of the deck. All three render correctly. Menu labels are accurate.

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
