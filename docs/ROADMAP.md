# 📊 Northern Corporation — Roadmap

> **Current status:** Sprint 15 complete — no open tickets.
> **Last updated:** 2026-05-14

---

## ✅ Completed Sprints (Archive)

| Sprint     | Theme                                                                                                                    | Tickets       | Merged                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ | ------------- | --------------------- |
| Sprint 1–9 | Client feedback fixes, responsive menu, map overhaul, Contact A/B/C, scroll cue, build hygiene, Contact B winner         | T-1 → T-32    | `2948425` → `a23cb49` |
| Sprint 10  | (7 tickets — details in MEMORY_BANK)                                                                                     | T-100 → T-106 | logged                |
| Sprint 11  | Content removal — prayer rooms facility, Factory 1 contact, `prayer.jpg` asset                                           | T-107 → T-112 | logged                |
| Sprint 12  | Contact section layout restructure — single-column vertical flow; Factory 2 → Factory rename                             | T-113 → T-114 | logged                |
| Sprint 13  | Certifications: RSC→RSC 100, BSCI + Better Work logos added. Products: Sports & Active→Body Suit, 28→11 images           | T-115 → T-118 | `7008f14`             |
| Sprint 14  | Code quality gate — Prettier 3.x installed, initial format pass (46 files), CI `format:check` step, gallery audit closed | T-119 → T-122 | `bff632a`             |
| Sprint 15  | Contact layout polish — vertically center left-column content block on desktop                                           | T-123         | `d797ffa`             |

---

## 🚀 Sprint 16 — Product Content Update

| Ticket | Status | Description                                                                                                                                                                                                                                                                               |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-124  | `[/]`  | **Update Body Suit (sports-active) primary image** — Replace the current wide (3:2) `1.jpeg` with the provided flat-lay front-facing image (4:5). This aligns the aspect ratio with the `Products.tsx` container and visually matches the flat-lay style of the other product categories. |
| T-125  | `[ ]`  | **Certifications Layout Fix** — Remove strict `lg:h-screen` and bump top padding to `pt-32` in `Sustainability.tsx` to prevent the heading from being pushed behind the fixed navbar on tall grids.                                                                                         |

**Acceptance criteria:**

- `public/products/sports-active/1.jpeg` is updated
- Image matches 4:5 aspect ratio
- Client approval received
- Build passes

---

## 📋 Backlog (Unscheduled)

| Item                         | Priority | Notes                                                                                    |
| ---------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| No test framework            | Medium   | Zero unit/integration/E2E coverage. Needs its own sprint to choose framework + scaffold. |
| `globals.css` modularization | Low      | 22KB+ monolith. Refactor risk — client-facing. No rush.                                  |
| Legal page content           | Blocked  | `/terms` + `/privacy` have `[CLIENT LEGAL TEXT TO REPLACE]` banners. Awaiting client.    |

---

## 🤝 Handoff Contract

> ✅ **Sprint 15 complete.** `feat/sprint15-contact-vertical-center` merged to `main`. Both remotes synced.
> 🛑 **Context compressed.** Start a fresh chat and run:
> `/pm Read MEMORY_BANK.md and ROADMAP.md, assign next ticket.`
