# 📊 Northern Corporation — Sprint 14 Roadmap

> **Theme:** Code quality gate — Prettier formatter, CI format-check, gallery image audit  
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

---

## Sprint 14 — Code Quality Gate

> **Goal:** Add Prettier formatter, enforce it in CI, and close the facility gallery image audit (Known Issues #2 and #8).

---

### [x] T-119: Install & Configure Prettier

**Files:**

- `package.json` → add `prettier` as devDependency + add `format` and `format:check` scripts
- `.prettierrc` [NEW] → project formatting config
- `.prettierignore` [NEW] → exclude `.next/`, `node_modules/`, `public/`

**What to do:**

- Run `npm install --save-dev prettier`
- Create `.prettierrc`:
  ```json
  {
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100,
    "plugins": []
  }
  ```
- Create `.prettierignore`:
  ```
  .next/
  node_modules/
  public/
  out/
  ```
- Add scripts to `package.json`:
  ```json
  "format": "prettier --write .",
  "format:check": "prettier --check ."
  ```

**Acceptance Criteria:**

- `npm run format:check` exits 0 on the entire repo
- `npm run format` can be run to auto-fix files
- `.prettierrc` and `.prettierignore` present in repo root

---

### [x] T-120: Run Initial Format Pass

**Files:**

- All `src/` TypeScript/TSX files + root config files

**What to do:**

- Run `npm run format` once to apply Prettier formatting to all existing files
- Review the diff — do NOT change logic, only formatting
- Commit with message: `style: apply initial prettier format pass`

**Acceptance Criteria:**

- `npm run format:check` passes with 0 failures after the format pass
- Build still passes: `npm run build` exits 0
- No logic changes — only whitespace, quotes, trailing commas, semicolons

---

### [x] T-121: Add Format-Check Step to CI

**Files:**

- `.github/workflows/ci.yml` → add a `format-check` step

**What to do:**

- Insert a new step between `Install dependencies` and `Lint`:
  ```yaml
  - name: Format check
    run: npm run format:check
  ```

**Acceptance Criteria:**

- CI job now runs: `Install → Format check → Lint → Typecheck → Build`
- A PR with unformatted code will fail the `Format check` step
- Existing `npm run lint`, `npx tsc --noEmit`, and `npm run build` steps are unchanged

---

### [x] T-122: Close Known Issue #8 — Facility Gallery Audit & Docs Update

**Files:**

- `docs/MEMORY_BANK.md` → mark Known Issue #8 resolved, add Sprint 14 session log
- `docs/ROADMAP.md` → update handoff contract

**What to do:**

- Audit: all 5 `galleryImages` entries in `facilities.ts` cross-referenced against `public/images/northern/` — all 5 paths resolve ✅
- Mark Known Issue #8 in `MEMORY_BANK.md` as: `~~**Facility gallery images may 404**~~ — ✅ RESOLVED: All /images/northern/ paths verified present.`
- Log the Sprint 14 session in MEMORY_BANK

**Acceptance Criteria:**

- Known Issue #8 struck through and marked resolved
- Sprint 14 session entry present in MEMORY_BANK session log
- ROADMAP.md handoff updated to point to Sprint 15 or backlog

---

## Dependency Order

```
T-119 (install Prettier) → T-120 (format pass) → T-121 (CI gate)
T-122 → after T-119/T-120/T-121 complete (doc sweep)
```

> **Recommended execution:** T-119 → T-120 → T-121 → T-122

---

## 🤝 Handoff Contract

> ✅ **Sprint 13 complete.** All tickets merged to `main`. Vercel auto-deploy triggered.  
> Restore point: tag `restore/pre-sprint13` → commit `25edfa9`  
> ✅ **Sprint 14 complete.** Known Issues #2 + #8 resolved. CI now enforces Prettier.  
> Next: `/pm Read MEMORY_BANK.md and ROADMAP.md, assign next ticket.`
