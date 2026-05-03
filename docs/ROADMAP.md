# 📊 Northern Corporation — Sprint 11 Roadmap

> **Theme:** Content removal — Prayer Rooms facility & Factory 1 address  
> **Created:** 2026-05-03

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

## 🤝 Handoff Contract
> ✅ **Roadmap Ready.** Hand off to `/lead-dev` to execute tickets sequentially.  
> After all tickets pass, run `/qa` for a full visual + functional audit.  
> Finally, run `/git` to commit, tag, and push to `main` for Vercel auto-deploy.
