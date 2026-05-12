# 📊 Northern Corporation — Sprint 13 Roadmap

> **Theme:** Certification updates, product category rename, Body Suit image refresh  
> **Created:** 2026-05-12

---

## Sprint 10 — ✅ COMPLETE

All 7 tickets (T-100 → T-106) completed and merged to `main`.

---

## Sprint 11 — Content Removal

### [x] T-107: Remove Prayer Rooms from Facilities Data

**Files:**
- `src/data/facilities.ts` → Remove the `prayer-rooms` entry from the `FACILITIES` array

**Acceptance Criteria:**
- The entire `prayer-rooms` object (lines 21–50) is removed from the `FACILITIES` array
- Array drops from 6 → 5 facilities
- No orphaned commas or syntax errors

---

### [x] T-108: Update Facilities Default Index

**Files:**
- `src/components/sections/Facilities.tsx` → Update `useState(2)` default

**Acceptance Criteria:**
- Since prayer-rooms (index 0) is removed, the old index 2 (Dining) becomes index 1
- Change `useState(2)` → `useState(1)` so Dining remains the default expanded facility
- Auto-rotation still cycles correctly through 5 items

---

### [x] T-109: Remove `/facilities/prayer-rooms` Static Page

**Files:**
- `src/app/facilities/[slug]/page.tsx` → No code change needed (dynamic from `FACILITIES` array)

**Acceptance Criteria:**
- `generateStaticParams()` auto-derives from `FACILITIES` — removing the data entry is sufficient
- Verify build produces 5 facility pages instead of 6
- Visiting `/facilities/prayer-rooms` should 404

---

### [x] T-110: Remove Factory 1 from Contact Section

**Files:**
- `src/components/sections/Contact.tsx` → Remove Factory 1 entry from `OFFICES` array

**Acceptance Criteria:**
- Remove the `Factory 1 — BSCIC` object (lines 23–29) from the `OFFICES` array
- Contact section displays only Head Office and Factory 2 — Tapirbari
- Layout remains clean with 2 office entries instead of 3

---

### [x] T-111: Clean Up Prayer Room Assets

**Files:**
- `public/images/facilities/prayer.jpg` → Delete image asset

**Acceptance Criteria:**
- `prayer.jpg` (876KB) is deleted from `public/images/facilities/`
- No remaining references to `prayer.jpg` or `prayer-rooms` slug in the codebase

---

### [x] T-112: Update Documentation

**Files:**
- `docs/MEMORY_BANK.md` → Update facilities count, known issues, session log

**Acceptance Criteria:**
- Update `facilities.ts` entry from "6 facilities" → "5 facilities" and remove `prayer-rooms` from the list
- Update `MEMORY_BANK.md` to log Sprint 11 session
- Update AGENTS.md Facility Detail route description if it mentions 6 facilities

---

## Dependency Order

```
T-107 → T-108 (index shift depends on data removal)
T-109 → depends on T-107 (build verification)
T-110 → independent
T-111 → depends on T-107 (no orphaned references)
T-112 → last (documentation sweep after all code changes)
```

> **Recommended execution:** T-107 → T-108 → T-110 → T-111 → T-109 (build verify) → T-112  
> T-107 and T-110 can be done in parallel since they touch different files.

---

---

## Sprint 12 — Contact Section Layout Restructure

### [x] T-113: Restructure Contact Left Column to Single-Column Vertical Flow

**Reference:** User-provided screenshot (Fakir Knitwears contact page) — follow left-side text positioning and sequence ONLY.

**Files:**
- `src/components/sections/Contact.tsx` → Restructure left column layout

**What changes:**
- Replace the 2-column `sm:grid-cols-2` grid with a single vertical flex column
- Reorder content to follow reference sequence: Title → Addresses → Phone/Email → Social Media → Useful Links → Copyright

**What stays the same:**
- All brand colors (`#023020`, `#FDD017`, `#F5F5EB`)
- All fonts (Playfair Display for headings, Geist Sans for body)
- All existing styling (gold border-left accents, tracking, opacity values)
- All Framer Motion animations
- Map on right side — completely untouched
- All `focus-visible` accessibility states
- Mobile responsive behavior

**Target sequence (single column, top to bottom):**
1. "Get in Touch" + "Contact Us" heading (existing)
2. Head Office address block (existing gold-border style)
3. Factory — Tapirbari address block (existing gold-border style)
4. Phone + Email blocks (existing gold-border style)
5. Social Media links (existing pill buttons)
6. Useful Links — Terms & Conditions, Privacy Policy (existing styled links)
7. Copyright at bottom (existing)

**Acceptance Criteria:**
- Left column uses a single `flex flex-col` instead of `grid grid-cols-1 sm:grid-cols-2`
- Sections flow vertically in the order listed above
- No visual style changes — same colors, fonts, spacing proportions
- Map right side is completely unchanged

---

### [x] T-114: Rename "Factory 2" to "Factory" in Contact Data

**Files:**
- `src/components/sections/Contact.tsx` → Update OFFICES array title

**Acceptance Criteria:**
- Change `"Factory 2 — Tapirbari"` → `"Factory — Tapirbari"` in the OFFICES constant
- No other changes

---

## Sprint 13 — Certification & Product Content Update

### [x] T-115: Rename RSC → RSC 100

**Files:** `src/components/sections/Sustainability.tsx`  
Changed cert name from `"RSC"` → `"RSC 100"`, full name updated accordingly.

---

### [x] T-116: Add BSCI & Better Work Certification Logos

**Files:** `src/components/sections/Sustainability.tsx`, `public/certifications/bsci.webp`, `public/certifications/better-work.png`  
- BSCI added to Row 2 (7th slot, completes the 7-col grid)  
- Better Work Bangladesh rendered as a centered standalone card in Row 3  

---

### [x] T-117: Rename "Sports & Active" → "Body Suit"

**Files:** `src/components/sections/Products.tsx`, `src/app/products/[category]/page.tsx`  
Slug `sports-active` unchanged (URL preserved). Display title updated in homepage category menu and gallery page heading/metadata.

---

### [x] T-118: Replace Body Suit Product Images

**Files:** `public/products/sports-active/*.jpeg`  
Removed 28 incorrect sports-active images. Added 11 new body suit photos (renamed 1–11.jpeg).

---

## 🤝 Handoff Contract
> ✅ **Sprint 13 complete.** All tickets merged to `main`. Vercel auto-deploy triggered.  
> Restore point: tag `restore/pre-sprint13` → commit `25edfa9`  
> Next: `/pm Read MEMORY_BANK.md and ROADMAP.md, assign next ticket.`
