# Workflow — Auto Version Control & Auto Deployment

End-to-end automation for Northern Corporation. Every change flows through the
same path: **commit → PR → CI → merge → auto-version → auto-deploy**.

- **Repo:** https://github.com/AdilAhmedAhir/Northern_Corporation
- **Deploy target:** Vercel (production = `main`)
- **Versioning:** SemVer via [release-please](https://github.com/googleapis/release-please) driven by [Conventional Commits](https://www.conventionalcommits.org/)
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
                         ┌────────────────────────────────┼────────────────────────────┐
                         ▼                                                             ▼
               ┌──────────────────────┐                                    ┌──────────────────────┐
               │ release-please.yml   │                                    │   Vercel GitHub App  │
               │ • bumps version      │                                    │ • builds Next.js     │
               │ • updates CHANGELOG  │                                    │ • deploys production │
               │ • opens Release PR   │                                    │ • https://northern-  │
               │ • tags on merge      │                                    │   corporation-nu     │
               └──────────────────────┘                                    │   .vercel.app        │
                                                                           └──────────────────────┘
```

Two things happen in parallel when `main` moves:

1. **release-please** maintains a rolling "Release PR" that bumps `package.json`, updates `CHANGELOG.md`, and creates a git tag (e.g. `v0.2.0`) when merged.
2. **Vercel** detects the push and deploys the new commit to production.

Tags are purely informational for deploys — Vercel deploys every push to `main`, regardless of tag.

---

## 2. Branching model

| Branch         | Purpose                                         | Auto-deploys to          |
| -------------- | ----------------------------------------------- | ------------------------ |
| `main`         | Production. Always deployable.                  | Vercel production        |
| `feature/*`    | New features                                    | Vercel preview (per PR)  |
| `fix/*`        | Bugfixes                                        | Vercel preview (per PR)  |
| `chore/*`      | Tooling, deps, docs (no user-visible change)    | Vercel preview (per PR)  |

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

| Type        | Meaning                                  | Version bump     |
| ----------- | ---------------------------------------- | ---------------- |
| `feat`      | New user-facing feature                  | **minor** (0.X.0) |
| `fix`       | Bug fix                                  | **patch** (0.0.X) |
| `perf`      | Performance improvement                  | **patch**        |
| `refactor`  | Code change, no behaviour change         | none             |
| `docs`      | Docs only                                | none             |
| `style`     | Formatting, whitespace                   | none             |
| `test`      | Tests only                               | none             |
| `chore`     | Tooling, deps, build config              | none             |
| `ci`        | CI config                                | none             |
| `build`     | Build system                             | none             |
| `revert`    | Revert a prior commit                    | patch            |
| any + `!`   | Breaking change (e.g. `feat!:`)          | **major** (X.0.0) |
| `BREAKING CHANGE:` footer | Breaking change              | **major**        |

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

## 5. Release automation — `.github/workflows/release-please.yml`

Runs on every push to `main`.

**What it does:**

1. Scans commits since the last tag.
2. Maintains a single open **Release PR** titled e.g. `chore(main): release 0.2.0`.
3. The Release PR edits:
   - `package.json` → bumps `version`
   - `CHANGELOG.md` → prepends a new section grouped by type
4. When you merge the Release PR:
   - Creates a git tag `v0.2.0`
   - Creates a GitHub Release with the generated notes
   - Pushes the tag to `origin`

**No PAT required.** It uses the built-in `GITHUB_TOKEN` with `contents: write`
and `pull-requests: write` permissions scoped to this workflow only.

### Configuration

A single file pins behaviour to this project:

- `release-please-config.json` — declares package type `node`, root path,
  changelog sections, and the starting version (reads from `package.json`).
- `.release-please-manifest.json` — tracks the current released version
  (release-please updates this automatically).

See Appendix A for the exact file contents.

---

## 6. Deployment — Vercel

Deploy is **already configured** via the Vercel GitHub App (per `CHANGELOG.md`,
pre-2026-04-20). No workflow file needed; Vercel listens to the repo directly.

| Event                          | Vercel behaviour                          |
| ------------------------------ | ----------------------------------------- |
| Push to `main`                 | Build + deploy to **production** domain   |
| Open PR from any branch        | Build + deploy to unique **preview** URL  |
| Push to PR branch              | Re-deploys the preview                    |
| PR closed/merged               | Preview torn down                         |

### Required Vercel project settings

- **Framework preset:** Next.js (auto-detected)
- **Build command:** `next build` (default)
- **Install command:** `npm ci` (default)
- **Node version:** 20.x (match CI)
- **Environment variables:** set Supabase + Cloudflare R2 keys in
  `Project Settings → Environment Variables`. Mirror them to
  `Development`, `Preview`, and `Production` scopes as needed.

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
#    • Vercel deploys production.
#    • release-please opens/updates its Release PR.

# 6. When ready to cut a version, merge the Release PR.
#    • Tag v0.X.Y is created.
#    • GitHub Release published.
#    • CHANGELOG.md updated on main.
```

You never manually edit `CHANGELOG.md` or `package.json` version again.

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
- Vercel secrets (Supabase keys, R2 keys) live **only** in Vercel's
  Environment Variables UI — not in the repo, not in workflows.
- If a token is ever leaked: revoke at https://github.com/settings/tokens
  immediately, then rotate.

---

## Appendix A — release-please configuration

### `release-please-config.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "node",
  "packages": {
    ".": {
      "package-name": "northern-corporation-limited",
      "changelog-path": "CHANGELOG.md",
      "include-v-in-tag": true,
      "draft": false,
      "prerelease": false,
      "bump-minor-pre-major": true,
      "bump-patch-for-minor-pre-major": true
    }
  },
  "changelog-sections": [
    { "type": "feat",     "section": "Features" },
    { "type": "fix",      "section": "Bug Fixes" },
    { "type": "perf",     "section": "Performance" },
    { "type": "refactor", "section": "Refactors" },
    { "type": "docs",     "section": "Documentation", "hidden": false },
    { "type": "chore",    "section": "Chores",        "hidden": true  },
    { "type": "ci",       "section": "CI",            "hidden": true  },
    { "type": "test",     "section": "Tests",         "hidden": true  }
  ]
}
```

### `.release-please-manifest.json`

```json
{
  ".": "0.1.0"
}
```

Starts at your current `package.json` version. release-please edits this file
on every release.

---

## Appendix B — Troubleshooting

| Symptom                                             | Likely cause                                                      | Fix                                                                     |
| --------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| No Release PR appears after merging a `feat:`       | release-please workflow didn't run on `main`                      | Check `Actions` tab; ensure `release-please.yml` triggers on `push: main` |
| Release PR stuck on same version                    | Only `chore:` / `docs:` commits since last release — no version bump needed | Add a `feat:` or `fix:` to trigger a bump                               |
| CI passes locally but fails on GitHub               | Node version drift                                                | Both CI and Vercel pinned to Node 20                                    |
| Vercel preview URL 404s                             | Build failed — open the Vercel deployment log                     | Fix build error, push again                                             |
| Tag created but Vercel didn't redeploy              | Expected — Vercel deploys on commit, not tag                      | The commit before the tag is already deployed                           |
| `release-please` PR has merge conflicts in CHANGELOG | Someone edited CHANGELOG manually                                 | Close the Release PR; release-please reopens it cleanly on next push    |

---

_Last updated: 2026-04-21_
