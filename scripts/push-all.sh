#!/bin/bash
# ═══════════════════════════════════════════════════════
# DUAL-REMOTE PUSH — Author-Aware
#
# Pushes to BOTH remotes with correct authorship:
#   origin → commits as AdilAhmedAhir
#   client → commits rewritten as northerncorporationlimited-art
#
# Usage: npm run push:all
# ═══════════════════════════════════════════════════════

set -euo pipefail

CLIENT_NAME="Northern Corporation Limited"
CLIENT_EMAIL="274474212+northerncorporationlimited-art@users.noreply.github.com"

# ── 1. Push to origin as yourself ──
echo ""
echo "═══ Pushing to origin (AdilAhmedAhir) ═══"
git push origin main
echo "✓ origin/main updated"

# ── 2. Push to client with rewritten author ──
echo ""
echo "═══ Syncing to client (northerncorporationlimited-art) ═══"

# Stash any uncommitted changes (filter-branch requires clean tree)
STASHED=false
if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
  git stash push -u --quiet -m "_push_all_auto_stash"
  STASHED=true
fi

# Clean up any leftover temp branch
git branch -D _client_sync 2>/dev/null || true

# Create temp branch from current main
git checkout -b _client_sync main --quiet

# Rewrite all commits with client author/committer
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter "
  GIT_AUTHOR_NAME='${CLIENT_NAME}'
  GIT_AUTHOR_EMAIL='${CLIENT_EMAIL}'
  GIT_COMMITTER_NAME='${CLIENT_NAME}'
  GIT_COMMITTER_EMAIL='${CLIENT_EMAIL}'
" HEAD

# Force push to client (SHAs differ due to author rewrite — force is expected)
git push client _client_sync:main --force

echo "✓ client/main updated (author: ${CLIENT_NAME})"

# ── 3. Clean up ──
git checkout main --quiet
git branch -D _client_sync 2>/dev/null || true
rm -rf .git/refs/original/ 2>/dev/null || true

# Restore stashed changes
if [ "$STASHED" = true ]; then
  git stash pop --quiet 2>/dev/null || true
fi

echo ""
echo "✅ Both remotes synced successfully"
echo "   origin → AdilAhmedAhir"
echo "   client → ${CLIENT_NAME}"
