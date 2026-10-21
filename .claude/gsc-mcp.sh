#!/usr/bin/env bash
# Starts the mcp-gsc server. If GSC_SERVICE_ACCOUNT_JSON holds a Google service account key,
# write it to a private temp file and point mcp-gsc at it, so no key file lives in the repo.
set -euo pipefail
if [ -n "${GSC_SERVICE_ACCOUNT_JSON:-}" ]; then
  key="$(mktemp)"
  chmod 600 "$key"
  printf '%s' "$GSC_SERVICE_ACCOUNT_JSON" > "$key"
  export GSC_CREDENTIALS_PATH="$key"
  export GSC_SKIP_OAUTH=true
  trap 'rm -f "$key"' EXIT
fi
exec uvx --with 'mcp<2' mcp-gsc
