# 📊 Northern Corporation — Roadmap

> **Current status:** Sprint 14 complete — no open tickets.
> **Last updated:** 2026-05-12

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

---

## 🚀 Sprint 15 — Contact Layout Polish

| Ticket | Status | Description                                                                                                                                                                                                                                                                      |
| ------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-123  | `[ ]`  | **Contact section vertical centering** — Left-column content block (`flex flex-col gap-8`) sits at the top of the left panel. Add `flex-1` + `justify-center` to vertically center it between the header padding and the copyright footer. Desktop only concern (lg breakpoint). |

**Acceptance criteria:**

- On `lg:` breakpoint, the address/email/social/links block is visually centred top-to-bottom on the left side
- Copyright footer remains pinned to the bottom
- No layout regression on mobile
- TypeScript: 0 errors | Build: 0 errors | `format:check`: clean

---

## 📋 Backlog (Unscheduled)

| Item                         | Priority | Notes                                                                                    |
| ---------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| No test framework            | Medium   | Zero unit/integration/E2E coverage. Needs its own sprint to choose framework + scaffold. |
| `globals.css` modularization | Low      | 22KB+ monolith. Refactor risk — client-facing. No rush.                                  |
| Legal page content           | Blocked  | `/terms` + `/privacy` have `[CLIENT LEGAL TEXT TO REPLACE]` banners. Awaiting client.    |

---

## 🤝 Handoff Contract

> ✅ **Sprint 14 complete.** `feat/sprint14-prettier-ci-gate` merged to `main`. Both remotes synced.
> 🛑 **Context compressed.** Start a fresh chat and run:
> `/pm Read MEMORY_BANK.md and ROADMAP.md, assign next ticket.`
