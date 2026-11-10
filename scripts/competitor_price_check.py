#!/usr/bin/env python3
"""Competitor price gate with honest labels.

Input CSV (owner-supplied from the Amazon app/site, or exported from an authorized
pricing API such as PA-API, Keepa, Rainforest, SerpApi):
  product,marketplace,item_price,delivery,source,checked_on
  delivery: number, "free", or empty (empty = unknown -> UNVERIFIED)
  source:   must name where the number came from (e.g. owner-app, paapi, keepa)
Ours CSV: product,our_price,our_shipping
Output: per product, median competitor checkout total, ratio vs ours, label.
Label VERIFIED needs >=3 rows with a source, a date and a known delivery;
anything else is UNVERIFIED and gets no PASS/FAIL. Nothing is ever fetched
from Amazon by this script, and no price is invented.
Usage: competitor_price_check.py competitors.csv ours.csv [--limit 1.5]
"""
import csv, sys, statistics as st
from collections import defaultdict

def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    limit = float(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else 1.5
    if "--limit" in sys.argv: a.remove(sys.argv[sys.argv.index("--limit") + 1])
    comp, ours = a[0], a[1]
    o = {r["product"]: r for r in csv.DictReader(open(ours))}
    rows = defaultdict(list)
    for r in csv.DictReader(open(comp)): rows[(r["product"], r["marketplace"])].append(r)
    print("| product | market | n | median total | ours | ratio | result |\n|---|---|---|---|---|---|---|")
    for p in o:
        mk = sorted({m for (q, m) in rows if q == p}) or ["(none)"]
        for m in mk:
            rs = rows.get((p, m), [])
            tot, ok = [], True
            for r in rs:
                try: price = float(r["item_price"])
                except ValueError: ok = False; continue
                d = (r.get("delivery") or "").strip().lower()
                if d == "free": ship = 0.0
                else:
                    try: ship = float(d)
                    except ValueError: ok = False; continue
                if not r.get("source") or not r.get("checked_on"): ok = False; continue
                tot.append(price + ship)
            our = float(o[p]["our_price"]) + float(o[p]["our_shipping"])
            if len(tot) >= 3 and ok:
                med = st.median(tot); ratio = our / med
                print(f"| {p} | {m} | {len(tot)} | {med:.2f} | {our:.2f} | {ratio:.2f} | {'PASS' if ratio <= limit else 'FAIL'} (VERIFIED) |")
            else:
                print(f"| {p} | {m} | {len(tot)} | - | {our:.2f} | - | UNVERIFIED (need >=3 sourced, dated rows with known delivery) |")

if __name__ == "__main__":
    main()
