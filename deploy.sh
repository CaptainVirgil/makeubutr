#!/usr/bin/env bash
# Deploy public/ to Cloudflare Pages. Needs CLOUDFLARE_API_TOKEN in the env.
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?set CLOUDFLARE_API_TOKEN first}"

npx --yes wrangler@latest pages deploy public \
  --project-name makeubutr \
  --branch main \
  "$@"
