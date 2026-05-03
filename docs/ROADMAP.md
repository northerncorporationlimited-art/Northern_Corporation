# 📊 Northern Corporation — Sprint 10 Roadmap

> **Theme:** Content corrections, certification updates, and facility UX polish  
> **Created:** 2026-05-03

---

## Sprint 10 — Content & Data Corrections

### [x] T-100: Add "Made in Green by OEKO-TEX®" Certification

**Files:**
- `src/components/sections/Sustainability.tsx` → Add entry to `CERTS` array
- `public/certifications/made-in-green.png` → Save the badge image (user-provided)

**Acceptance Criteria:**
- New cert entry: `{ name: "Made in Green", full: "Made in Green by OEKO-TEX®", image: "/certifications/made-in-green.png" }`
- Inserted after the existing OEKO-TEX® STeP entry (index 2) to group all OEKO-TEX certs together
- Badge image saved from user-provided screenshot to `public/certifications/made-in-green.png`
- Grid renders 14 items without layout overflow on desktop (lg:grid-cols-7 = 2 rows)

---

### [x] T-101: Remove BSCI Certification

**Files:**
- `src/components/sections/Sustainability.tsx` → Remove BSCI entry from `CERTS` array
- `public/certifications/bsci.jpg` → Delete asset (optional cleanup)

**Acceptance Criteria:**
- The line `{ name: "BSCI", full: "Business Social Compliance Initiative", image: "/certifications/bsci.jpg" }` is removed from the `CERTS` array
- Grid still renders cleanly (13 → 13 items after T-100 add + T-101 remove, net 13)
- No BSCI reference remains in the active Sustainability section (Contact.tsx "BSCIC" is a factory plot code, NOT the cert — leave it)

---

### [x] T-102: Set Dining as Default Open Facility (Index 2)

**Files:**
- `src/components/sections/Facilities.tsx` → Change `useState(0)` to `useState(2)`

**Acceptance Criteria:**
- Desktop: Dining & Canteen strip is expanded by default on page load
- Auto-rotation still works, cycling from index 2 onward
- Mobile: unaffected (uses separate `mobileExpanded` state)

---

### [x] T-103: Replace Prayer Room Image with Inclusive Alternative

**Files:**
- `public/images/facilities/prayer.jpg` → Replace with new generated image

**Acceptance Criteria:**
- Generate 3 image options showing a serene, inclusive multi-faith meditation/prayer room — no single-religion imagery
- Present options to user for approval
- Replace `public/images/facilities/prayer.jpg` with the chosen option
- Used by: `src/data/facilities.ts` (line 25), Facilities section, and `/facilities/prayer-rooms` detail page

---

### [x] T-104: Fix Buyer Name — "HONEY" → "HONEYS"

**Files:**
- `src/components/sections/GlobalReach.tsx` → Update `BUYERS` array entry

**Acceptance Criteria:**
- Change `"HONEY"` to `"HONEYS"` in the `BUYERS` array (line 27)
- Marquee renders the corrected name in the infinite scroll

---

### [x] T-106: Add "GUESS" to Buyer Marquee

**Files:**
- `src/components/sections/GlobalReach.tsx` → Append entry to `BUYERS` array

**Acceptance Criteria:**
- Add `"GUESS"` to the `BUYERS` array (confirmed not present)
- Append after existing entries (after `"TJX"`, line 39)
- Marquee renders 14 buyer names in the infinite scroll without layout issues

---

### [x] T-105: Correct Stats — Machines & Turnover

**Files:**
- `src/components/sections/AboutUs.tsx` → Update `STATS` array
- `src/components/sections/DualScroll.tsx` → Update `stats` in V2 section (keep in sync)

**Acceptance Criteria:**
- `AboutUs.tsx` STATS:
  - Machines: `"1,300+"` → `"1,500+"`
  - Yearly Turnover: `"$30M"` → `"$40M+"`
  - Employees stays `"3,000+"`
- `DualScroll.tsx` stats (V2 archived):
  - Machines: `"1,300+"` → `"1,500+"`
  - Yearly Turnover: `"$30M USD"` → `"$40M+ USD"`
  - Employees stays `"3,000+"`

---

## Dependency Order

```
T-100 + T-101 → parallel (both in Sustainability.tsx, but different entries)
T-102 → independent
T-103 → independent (requires user image selection)
T-104 + T-106 → parallel (both modify BUYERS array in GlobalReach.tsx)
T-105 → independent
```

> All tickets are independent and can be executed in any order.  
> T-103 requires a user decision checkpoint (image approval).  
> T-104 and T-106 both touch the `BUYERS` array — execute in the same session.

---

## 🤝 Handoff Contract
> ✅ **Roadmap Ready.** Hand off to `/lead-dev` to execute tickets sequentially.  
> After all tickets pass, run `/qa` for a full visual + functional audit.  
> Finally, run `/git` to commit, tag, and push to `main` for Vercel auto-deploy.
