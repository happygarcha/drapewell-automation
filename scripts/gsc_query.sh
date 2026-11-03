#!/bin/bash
# Read-only Google Search Console queries using the service account in the env var
# GSC_SERVICE_ACCOUNT_JSON (the WHOLE downloaded JSON key file). The key is written to
# memory (/dev/shm) only for the signing step and removed on exit. Never print the key.
# Usage: scripts/gsc_query.sh sites|totals|dates|queries|pages|countries|sitemaps [days]
# The MCP Search Console tools do NOT read this variable; use this script instead.
set -u
SITE="${GSC_SITE:-https://drapewell.myshopify.com/}"
CMD="${1:-totals}"; DAYS="${2:-28}"
# Accept either the whole JSON (GSC_SERVICE_ACCOUNT_JSON) or the same JSON as ONE base64 line
# (GSC_SERVICE_ACCOUNT_B64, for settings boxes that cut multi-line or long values). B64 wins if set.
if [ -n "${GSC_SERVICE_ACCOUNT_B64:-}" ]; then
  GSC_SERVICE_ACCOUNT_JSON=$(printf '%s' "$GSC_SERVICE_ACCOUNT_B64" | tr -d ' \n\r' | base64 -d 2>/dev/null) \
    || { echo "GSC_SERVICE_ACCOUNT_B64 is not valid base64"; exit 1; }
fi
export GSC_SERVICE_ACCOUNT_JSON
[ -n "${GSC_SERVICE_ACCOUNT_JSON:-}" ] || { echo "Neither GSC_SERVICE_ACCOUNT_B64 nor GSC_SERVICE_ACCOUNT_JSON is set"; exit 1; }
KF=$(mktemp /dev/shm/gsc.XXXXXX); chmod 600 "$KF"; trap 'rm -f "$KF"' EXIT
python3 -I -c 'import os,json,sys;sys.stdout.write(json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"])["private_key"])' > "$KF" 2>/dev/null \
  || { echo "GSC_SERVICE_ACCOUNT_JSON is not valid JSON with a private_key"; exit 1; }
LEN=$(wc -c < "$KF"); [ "$LEN" -gt 1000 ] || { echo "private_key is only $LEN characters: it is a placeholder or was cut off. Paste the whole JSON file into the variable."; exit 1; }
EMAIL=$(python3 -I -c 'import os,json;print(json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"])["client_email"])')
b64(){ openssl base64 -A | tr '+/' '-_' | tr -d '='; }
NOW=$(date +%s); EXP=$((NOW+3000))
H=$(printf '{"alg":"RS256","typ":"JWT"}' | b64)
P=$(printf '{"iss":"%s","scope":"https://www.googleapis.com/auth/webmasters.readonly","aud":"https://oauth2.googleapis.com/token","iat":%s,"exp":%s}' "$EMAIL" "$NOW" "$EXP" | b64)
SIG=$(printf '%s' "$H.$P" | openssl dgst -sha256 -sign "$KF" | b64)
TOK=$(curl -s -X POST https://oauth2.googleapis.com/token -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" -d "assertion=$H.$P.$SIG" | python3 -I -c 'import sys,json;d=json.load(sys.stdin);print(d.get("access_token") or "")')
[ -n "$TOK" ] || { echo "Google rejected the sign-in (key wrong, deleted or rotated)"; exit 1; }
ENC=$(python3 -I -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=""))' "$SITE")
END=$(date -u -d "-2 days" +%F); START=$(date -u -d "-$DAYS days" +%F)
q(){ curl -s -X POST -H "Authorization: Bearer $TOK" -H "Content-Type: application/json" "https://www.googleapis.com/webmasters/v3/sites/$ENC/searchAnalytics/query" -d "$1"; }
rows(){ python3 -I -c '
import sys,json;d=json.load(sys.stdin)
if "error" in d: print(d["error"]); sys.exit()
print("clicks impressions ctr% position key")
for r in d.get("rows",[]): print(int(r["clicks"]),int(r["impressions"]),round(r["ctr"]*100,1),round(r["position"],1),"|".join(r.get("keys",["total"])))'; }
case "$CMD" in
  sites) curl -s -H "Authorization: Bearer $TOK" https://www.googleapis.com/webmasters/v3/sites ;;
  totals) q "{\"startDate\":\"$START\",\"endDate\":\"$END\"}" | rows ;;
  dates) q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"date\"],\"rowLimit\":200}" | rows ;;
  queries) q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"query\"],\"rowLimit\":50}" | rows ;;
  pages) q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"page\"],\"rowLimit\":50}" | rows ;;
  countries) q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"country\"],\"rowLimit\":20}" | rows ;;
  sitemaps) curl -s -H "Authorization: Bearer $TOK" "https://www.googleapis.com/webmasters/v3/sites/$ENC/sitemaps" ;;
  *) echo "unknown command $CMD"; exit 1 ;;
esac
