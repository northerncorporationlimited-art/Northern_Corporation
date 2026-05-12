# Workflow — Auto Version Control & Auto Deployment

End-to-end automation for Northern Corporation. Every change flows through the
same path: **commit → PR → CI → merge → auto-version → auto-deploy**.

- **Repo:** https://github.com/AdilAhmedAhir/Northern_Corporation
- **Deploy target:** Vercel (production = `main`)
- **Versioning:** Manual SemVer. [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- **CI:** GitHub Actions (lint + typecheck + build)

---

## 1. High-level pipeline

```text
┌─────────────┐   commit    ┌────────────┐   PR    ┌──────────────┐
│  feature/*  │ ──────────▶ │   GitHub   │ ──────▶ │  CI workflow │
└─────────────┘             └────────────┘         │ (ci.yml)     │
                                                   └──────┬───────┘
                                                          │ ✅ green
                                                          ▼
                                                   ┌──────────────┐
                                                   │  Merge to    │
                                                   │    main      │
                                                   └──────┬───────┘
                                                          │
                                                          ▼
                                               ┌──────────────────────┐
                                               │   Vercel GitHub App  │
                                               │ • builds Next.js     │
                                               │ • deploys production │
                                               │ • https://northern-  │
                                               │   corporation-nu     │
                                               │   .vercel.app        │
                                               └──────────────────────┘
```

When `main` moves, **Vercel** detects the push and deploys the new commit to production.

---

## 2. Branching model

| Branch      | Purpose                                      | Auto-deploys to         |
| ----------- | -------------------------------------------- | ----------------------- |
| `main`      | Production. Always deployable.               | Vercel production       |
| `feature/*` | New features                                 | Vercel preview (per PR) |
| `fix/*`     | Bugfixes                                     | Vercel preview (per PR) |
| `chore/*`   | Tooling, deps, docs (no user-visible change) | Vercel preview (per PR) |

**Rule:** `main` is protected. All changes land via PR. No direct pushes.

### Protect `main` (one-time GitHub setup)

`Settings → Branches → Add branch protection rule` for `main`:

- ☑ Require a pull request before merging
- ☑ Require status checks to pass: `ci / lint-typecheck-build`
- ☑ Require branches to be up to date before merging
- ☑ Require linear history (optional but recommended for clean tags)
- ☑ Do not allow force pushes

---

## 3. Commit message convention (Conventional Commits)

The automation reads your commit messages to decide the next version. Use this
format for **every** commit that lands on `main`:

```text
<type>(<optional scope>): <short summary>

<optional body>

<optional footer, e.g. BREAKING CHANGE: ...>
```

### Types and version impact

| Type                      | Meaning                          | Version bump      |
| ------------------------- | -------------------------------- | ----------------- |
| `feat`                    | New user-facing feature          | **minor** (0.X.0) |
| `fix`                     | Bug fix                          | **patch** (0.0.X) |
| `perf`                    | Performance improvement          | **patch**         |
| `refactor`                | Code change, no behaviour change | none              |
| `docs`                    | Docs only                        | none              |
| `style`                   | Formatting, whitespace           | none              |
| `test`                    | Tests only                       | none              |
| `chore`                   | Tooling, deps, build config      | none              |
| `ci`                      | CI config                        | none              |
| `build`                   | Build system                     | none              |
| `revert`                  | Revert a prior commit            | patch             |
| any + `!`                 | Breaking change (e.g. `feat!:`)  | **major** (X.0.0) |
| `BREAKING CHANGE:` footer | Breaking change                  | **major**         |

### Examples

```text
feat(hero): add cinematic logo preloader
fix(navbar): close overlay on route change
perf(scroll): reduce Lenis reflow on mobile
docs: document release workflow
chore(deps): bump next to 16.2.4
feat(api)!: switch image store from Supabase to R2

BREAKING CHANGE: /api/images now returns R2 signed URLs
```

### PR titles

Use the same convention for PR titles — release-please squash-merges the PR
title into `main`, so the title drives the version bump.

---

## 4. CI — `.github/workflows/ci.yml`

Runs on every PR and every push to `main`. It must pass before merge.

**Checks:**

- `npm ci` with Node 20 + npm cache
- `npm run lint` (ESLint, Next config)
- `npx tsc --noEmit` (typecheck)
- `npm run build` (Next.js production build — catches runtime config errors)

If the build fails, the PR cannot merge. This guards `main` against broken deploys.

---

---

## 6. Deployment — Vercel

Deploy is **already configured** via the Vercel GitHub App (per `CHANGELOG.md`,
pre-2026-04-20). No workflow file needed; Vercel listens to the repo directly.

| Event                   | Vercel behaviour                         |
| ----------------------- | ---------------------------------------- |
| Push to `main`          | Build + deploy to **production** domain  |
| Open PR from any branch | Build + deploy to unique **preview** URL |
| Push to PR branch       | Re-deploys the preview                   |
| PR closed/merged        | Preview torn down                        |

### Required Vercel project settings

- **Framework preset:** Next.js (auto-detected)
- **Build command:** `next build` (default)
- **Install command:** `npm ci` (default)
- **Node version:** 20.x (match CI)
- **Environment variables:** None required (fully static site). If external
  service integrations are added in the future, set keys in
  `Project Settings → Environment Variables`.

### Rollback

Every deploy is immutable on Vercel. To roll back:

1. Vercel dashboard → Project → Deployments
2. Find the last known-good deploy
3. `⋯` menu → **Promote to Production**

Or via Git: revert the offending commit on `main` — Vercel redeploys automatically.

---

## 7. Everyday developer flow

```bash
# 1. Branch
git checkout -b feat/contact-form

# 2. Work, then commit using Conventional Commits
git commit -m "feat(contact): add lead capture form with Supabase insert"

# 3. Push and open PR
git push -u origin feat/contact-form
gh pr create --fill   # or use the GitHub UI

# 4. CI runs → Vercel posts a preview URL on the PR
#    Review preview, iterate if needed.

# 5. Merge PR to main (squash-merge recommended).
#    • Vercel deploys production automatically.
```

---

## 8. Manual release (escape hatch)

If you ever need to cut a version outside the automation:

```bash
npm version patch          # or minor / major
git push --follow-tags origin main
gh release create v0.2.1 --generate-notes
```

Do this only if release-please is misbehaving. Prefer the automated path.

---

## 9. Secrets & security

- **Never** paste tokens into chat, commits, files, or issue comments.
- The only secret CI needs is `GITHUB_TOKEN`, which GitHub injects automatically.
- If a token is ever leaked: revoke at https://github.com/settings/tokens
  immediately, then rotate.

---

## Appendix — Troubleshooting

| Symptom                               | Likely cause                                  | Fix                                  |
| ------------------------------------- | --------------------------------------------- | ------------------------------------ |
| CI passes locally but fails on GitHub | Node version drift                            | Both CI and Vercel pinned to Node 20 |
| Vercel preview URL 404s               | Build failed — open the Vercel deployment log | Fix build error, push again          |

---

_Last updated: 2026-04-29_
