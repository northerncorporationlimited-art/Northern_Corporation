# 📊 Northern Corporation — Roadmap

> **Current status:** Sprint 17 (Testing Infrastructure) planned. 1 open ticket.
> **Last updated:** 2026-05-20

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
| Sprint 16  | Product image optimization (Body Suit flat lay) & Certifications UI layout overlap fix                                   | T-124 → T-125 | `2b9fae1`             |

---

## 🚀 Active Sprint: Sprint 17 (Testing Infrastructure)

- [ ] **T-126: Scaffold Test Framework (Vitest)**
  - Choose and install testing framework (Vitest + React Testing Library + JSDOM)
  - Configure `vitest.config.ts` for Next.js App Router compatibility
  - Add `test` and `test:coverage` scripts to `package.json`
  - Write initial passing tests for pure components (e.g., `Logo.tsx` or utilities) to prove scaffold works
  - Update `ci.yml` GitHub action to include test runner in the pipeline

---

## 📋 Backlog (Unscheduled)

| Item                         | Priority | Notes                                                                                    |
| ---------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `globals.css` modularization | Low      | 22KB+ monolith. Refactor risk — client-facing. No rush.                                  |
| Legal page content           | Blocked  | `/terms` + `/privacy` have `[CLIENT LEGAL TEXT TO REPLACE]` banners. Awaiting client.    |

---

## 🤝 Handoff Contract

> ✅ **Roadmap Ready.** Run: `/git Start the next ticket by creating a feature branch.`
