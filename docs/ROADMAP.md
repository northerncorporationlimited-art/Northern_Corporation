# Roadmap — Northern Corporation

_Last updated: 2026-04-29T14:31Z — Sprint 6 planned. Tickets T-20 through T-24._

> ✅ **Sprints 0–5 complete.** Archived to `MEMORY_BANK.md`.

---

## CEO Decisions (2026-04-29)

- **Scope freeze:** Do NOT touch `AboutUs.tsx`, `Products.tsx`, or Hero social links.
- **Release-please:** Deleted. Manual releases only.
- **Dependency patches / Prettier:** Skip for now.

---

## Sprint 6: Map & Contact Polish

_Goal: Make the GlobalReach map pop, fix pin animations, swap in real buyer names, polish ContactB._

### T-20: GlobalReach — Map Visibility & Pop
- [x] **File:** `src/components/sections/GlobalReach.tsx`
- **Problem:** Continents still read as a flat grey-green wash — the map needs to "pop" and be immediately obvious.
- **Acceptance Criteria:**
  - Boost continent visibility significantly — they should be recognizable at a glance
  - Add a faint latitude/longitude grid or dot-grid overlay for geographic depth
  - Add a radial vignette around edges to frame the map
  - The map should feel more "alive" — consider a subtle ambient glow pulse on the background
  - Test visibility on both light and dark monitors

### T-21: GlobalReach — Pin & Flight Path Animation Fix
- [x] **File:** `src/components/sections/GlobalReach.tsx`
- **Problem:** (1) The round sonar pulse rings on pins reset abruptly — they need to be **smoother** (longer cycle, gentle fade, no visible snap-back). (2) Flight paths vanish after 3.2s — timer should be **2 seconds**. (3) After vanishing, paths should stay faintly visible, not disappear completely.
- **Acceptance Criteria:**
  - **Smooth sonar ring animations** on `HoloPin` — increase pulse duration (e.g. 2→4s), use a seamless ease curve so the ring fades out before scaling back, and eliminate the visible reset/snap. The effect should feel like a gentle, continuous ripple.
  - Change `hasLaunched` timer from `3200ms` → `2000ms`
  - After launch, flight paths should remain at ~0.15 opacity (not vanish to 0)
  - On hover, path brightens to full opacity
  - Add a small "traveling dot" particle that loops along each path (SVG `animateMotion` or Framer `offset`)
  - Hub pin (Bangladesh HQ) should have a stronger steady glow — bigger diamond, brighter shadow
  - Region labels: keep hidden on mobile (too cluttered), but verify desktop labels don't clip

### T-22: GlobalReach — Replace Buyer Names with Real Clients
- [x] **File:** `src/components/sections/GlobalReach.tsx`
- **Data — exact buyer list:**
  ```
  Honey, Muji, Uny, Bonmax, Lindex, Celio, New Yorker, Next, Suzy, Greg Norman, Walmart, Target, TJX
  ```
- **Acceptance Criteria:**
  - Replace `PLACEHOLDER_BUYERS` array with the 13 names above (correct casing)
  - Verify marquee scroll speed still feels smooth with the new name lengths
  - Remove the "PLACEHOLDER" naming — rename constant to `BUYERS`

### T-23: ContactB — Map Sizing (Match Contact A)
- [x] **File:** `src/components/sections/ContactB.tsx`
- **Acceptance Criteria:**
  - Desktop: Switch from full-bleed right panel to a contained map using `aspect-[4/3]` with `rounded-3xl` border, vertically centered in the right column
  - Add `border border-[#F5F5EB]/10` matching Contact A's glass-card look
  - Cap height at `max-h-[70vh]` so it never overwhelms the viewport
  - Mobile: keep `h-[40vh]` (current)
  - Gold accent divider line between columns preserved

### T-24: ContactB — Legal Link Clarity & Padding Audit
- [x] **File:** `src/components/sections/ContactB.tsx`
- **Acceptance Criteria:**
  - Legal links: bump to `text-xs` (12px), opacity `/60`, add subtle underline
  - Add a small `›` chevron before each link text for scannability
  - Keep gold hover as-is (`hover:text-[#FDD017]`)
  - Verify `lg:pl-20` clears progress rail at all widths ≥ 1024px
  - Verify heading alignment matches Contact A
  - Test mobile `px-4` on 375px viewport — no text clipping

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
