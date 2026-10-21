#!/usr/bin/env python3
"""Weekly Search Console report: queries ranking 11-20 with CTR below 2%, grouped by page.

Reads a Google service account key from GSC_SERVICE_ACCOUNT_JSON (never from a file in the repo),
asks the Search Console API for the last N days by page and query, keeps the rows that match,
and writes a markdown report. Needs: pip install google-auth requests.

  python scripts/gsc_report.py --out reports/gsc-opportunities.md
  python scripts/gsc_report.py --from-json rows.json     # offline, rows as returned by the API
"""
import argparse
import datetime as dt
import json
import os
import sys
import urllib.parse
from collections import defaultdict
from pathlib import Path

SITE = "https://drapewell.myshopify.com/"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"


def fetch_rows(site, start, end):
    from google.auth.transport.requests import AuthorizedSession
    from google.oauth2 import service_account

    info = json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"])
    creds = service_account.Credentials.from_service_account_info(info, scopes=[SCOPE])
    session = AuthorizedSession(creds)
    url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/"
           + urllib.parse.quote(site, safe="") + "/searchAnalytics/query")
    rows, start_row = [], 0
    while True:
        body = {"startDate": start, "endDate": end, "dimensions": ["page", "query"],
                "rowLimit": 25000, "startRow": start_row, "dataState": "final"}
        r = session.post(url, json=body, timeout=60)
        r.raise_for_status()
        batch = r.json().get("rows", [])
        rows += batch
        if len(batch) < 25000:
            return rows
        start_row += 25000


def read_watch(path):
    """Lines of 'URL YYYY-MM-DD'; blank lines and # comments are skipped."""
    out = []
    for line in Path(path).read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            url, added = line.split()
            out.append((url, dt.date.fromisoformat(added)))
    return out


def inspect_urls(site, urls):
    """URL Inspection API (read-only). Returns {url: indexStatusResult dict, or {'error': text}}."""
    from google.auth.transport.requests import AuthorizedSession
    from google.oauth2 import service_account

    info = json.loads(os.environ["GSC_SERVICE_ACCOUNT_JSON"])
    creds = service_account.Credentials.from_service_account_info(info, scopes=[SCOPE])
    session = AuthorizedSession(creds)
    res = {}
    for u in urls:
        r = session.post("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                         json={"inspectionUrl": u, "siteUrl": site}, timeout=60)
        if r.ok:
            res[u] = r.json().get("inspectionResult", {}).get("indexStatusResult", {})
        else:
            res[u] = {"error": f"HTTP {r.status_code}"}
    return res


def render_watch(watch, results, today, wait_days=7):
    out = ["# New pages: indexing check", "",
           f"Checked {today} with the Search Console URL Inspection API. A page that is not indexed {wait_days} days "
           "after going live is marked STUCK: request indexing for it by hand in Search Console (no API for that).", "",
           "| Page | Live since | Google says | Last crawl | Action |", "|---|---|---|---|---|"]
    stuck = []
    for url, added in watch:
        r = results.get(url, {})
        if "error" in r:
            state, crawl, action = f"check failed ({r['error']})", "", "retry next run"
        else:
            indexed = r.get("verdict") == "PASS"
            state = r.get("coverageState") or "no data"
            crawl = (r.get("lastCrawlTime") or "never")[:10]
            age = (today - added).days
            if indexed:
                action = "indexed: remove from watch-urls.txt"
            elif age >= wait_days:
                action = "STUCK: request indexing"
                stuck.append(url)
            else:
                action = f"waiting ({age} of {wait_days} days)"
        out.append(f"| {url} | {added} | {state} | {crawl} | {action} |")
    out.append("")
    if stuck:
        out += ["## Request indexing for these", ""] + [f"- {u}" for u in stuck] + [""]
    return "\n".join(out)


def select(rows, min_impr):
    pages = defaultdict(list)
    for r in rows:
        page, query = r["keys"]
        impr, clicks, pos = r["impressions"], r["clicks"], r["position"]
        ctr = clicks / impr * 100 if impr else 0.0
        if impr >= min_impr and 11 <= pos <= 20 and ctr < 2:
            pages[page].append((query, impr, clicks, ctr, pos))
    ranked = sorted(pages.items(), key=lambda kv: -sum(x[1] for x in kv[1]))
    return [(p, sorted(q, key=lambda x: -x[1])) for p, q in ranked]


def render(grouped, start, end, min_impr, total_rows):
    out = [f"# Search Console opportunities, {start} to {end}", "",
           f"Queries with at least {min_impr} impressions, average position 11 to 20 and CTR under 2%, grouped by page "
           f"(biggest pool of impressions first). Source: Search Console API, {total_rows} page and query rows read.", ""]
    if not grouped:
        out += ["No queries matched. Either the site has too few impressions yet, or nothing sits between "
                "positions 11 and 20 with a low CTR. Lower --min-impr to widen the net.", ""]
        return "\n".join(out)
    out += ["## Fix first", ""]
    for page, rows in grouped[:3]:
        out.append(f"- {page}: {sum(r[1] for r in rows)} impressions across {len(rows)} queries")
    out.append("")
    for page, rows in grouped:
        out += [f"## {page}", "", "| Query | Impressions | Clicks | CTR | Position |", "|---|---:|---:|---:|---:|"]
        for q, i, c, ctr, p in rows:
            out.append(f"| {q} | {i:.0f} | {c:.0f} | {ctr:.1f}% | {p:.1f} |")
        out.append("")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default=SITE)
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--lag", type=int, default=3, help="Search Console data trails by about 2-3 days")
    ap.add_argument("--min-impr", type=float, default=50)
    ap.add_argument("--out", default="")
    ap.add_argument("--watch", default="", help="file of 'URL date' lines to check for indexing")
    ap.add_argument("--watch-json", default="", help="offline: inspection results as {url: indexStatusResult}")
    ap.add_argument("--from-json", default="", help="offline mode: a JSON list of API rows")
    a = ap.parse_args()
    end = dt.date.today() - dt.timedelta(days=a.lag)
    start = end - dt.timedelta(days=a.days - 1)
    if a.from_json:
        rows = json.load(open(a.from_json))
    else:
        if not os.environ.get("GSC_SERVICE_ACCOUNT_JSON"):
            sys.exit("GSC_SERVICE_ACCOUNT_JSON is not set")
        rows = fetch_rows(a.site, start.isoformat(), end.isoformat())
    text = render(select(rows, a.min_impr), start, end, a.min_impr, len(rows))
    if a.watch:
        watch = read_watch(a.watch)
        if a.watch_json:
            results = json.load(open(a.watch_json))
        else:
            results = inspect_urls(a.site, [u for u, _ in watch])
        text += "\n\n" + render_watch(watch, results, dt.date.today())
    if a.out:
        os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
        open(a.out, "w").write(text + "\n")
    print(text)


main()
