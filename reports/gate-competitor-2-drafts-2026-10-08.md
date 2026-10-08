# Competitor-price gate: 2 drafts (2026-10-08)

Read-only check. Nothing was changed. Ubersuggest was not used.

Method limits (read first):
- WebSearch is US-biased and returns snippets, not live prices. Restricting to amazon.ca, walmart.ca and bestbuy.ca (allowed_domains) did surface Canadian pages, but WebFetch could not read prices. Amazon.ca returned 503 or a 100,000-character truncated page without the buy box, Walmart.ca showed a bot check, and bestbuy.ca did not resolve.
- Every CAD price below comes from a search-result summary, not from a page I could open. Shipping was NOT shown for any of them, so ratios use item price only.
- Etsy.com results (Canadian prices not confirmed) were generic rubber and silicone feet and were not used.

## 1. Folding laptop feet, set of 2 (zinc alloy)
Ours: item CA$12.99, checkout CA$22.98.

| Listing (all Amazon.ca) | Price | Notes |
|---|---|---|
| PONICOR 2PCS Zinc Alloy Mini Foldable Laptop Stand, self-adhesive, black (amazon.ca/dp/B0BZCRNFGW) | CA$10.95 | Pair, same type of product. Shipping not shown. |
| Lexziuo 2PCS Mini Portable Laptop Stand, zinc alloy foldable, self-adhesive (dp/B0FT835DR5) | not found | Listing exists, price not readable |
| Emperoch 2 Pcs Mini Laptop Stands, zinc alloy, silver/black (dp/B0D73F71SG) | not found | Listing exists |
| "2pcs Alloy Mini Laptop Stand ... Self-Adhesive Invisible" (dp/B0DMF4MDJS) | not found | Listing exists |
| 4pcs Mini Keyboard Riser zinc alloy (dp/B0H1V8K552); Ciieeo 4pcs (dp/B0GKCH8212); BETOOKY 4 Pcs (dp/B0GPPMK28W) | not found | 4-packs |
| CDW Canada StarTech aluminum laptop stand | CA$71.99 (currency not stated; likely CAD) | Full stand, not comparable, excluded |

- Low / typical / high: CA$10.95 / CA$10.95 / CA$10.95. This is a single data point, so confidence is low. At least 8 near-identical zinc-alloy self-adhesive folding feet listings exist on Amazon.ca.
- Indicative USD only: a self-adhesive mini stand at about US$22.99 was seen in a US result. Not used.
- Ratio: 22.98 / 10.95 = **2.10** (item price only; shipping not shown).
- **Verdict: FAIL (provisional).** Same product type is sold as a pair on Amazon.ca at about CA$11, so our checkout is about twice the market. Confirm PONICOR's live price and delivery on amazon.ca by hand before finalising.

## 2. Pocket foldable plastic phone stand (one per pack)
Ours: item CA$10.99, checkout CA$20.98.

| Listing | Price | Notes |
|---|---|---|
| Nulaxy dual-fold aluminum stand (Amazon.ca, best seller) | from CA$14.24 | Aluminum, adjustable, not plastic pocket. Weak comparable. |
| UGREEN foldable aluminum MagSafe stand (Amazon.ca) | CA$19.66 | Magnetic aluminum, not comparable |
| Lamicall bi-folding stand (amazon.ca/dp/B09MCKK9NX) | not found | Aluminum, pocket-size claim |
| Canyora 1 Pack silicone/aluminum travel stand (amazon.ca/dp/B0H4QPQMND) | not found | |
| Wingomart foldable aluminum stand (bestbuy.ca, ID 15131296) | not found | |
| Hianjoo 2-pack, Hemobllo 5-pack V-shaped foldable stands (Amazon.ca) | not found | Cheap multipacks exist |
| Walmart.ca "Cell Phone Stand Desk Foldable" (PRD6WE2R8I8BD50) | not found | Bot check blocked fetch |

- Indicative US only (US-biased results, not used): about US$4 to US$11 for foldable phone stands (JSAUX US$8.49, Lamicall about US$10 to 11).
- Low / typical / high in CAD: **not found** for a comparable plastic pocket stand. The only CAD figures are aluminum, so they are not a like-for-like comparison.
- Ratio: not computed. For reference only, against Nulaxy's CA$14.24 it would be 20.98 / 14.24 = 1.47, but that is an aluminum product, and multipacks and plastic stands are likely cheaper.
- **Verdict: NOT CHECKED.** Many Canadian foldable phone stand listings exist, but no comparable CAD price was verified. Strong warning: the US figures and the existence of cheap multipacks suggest the market may be well below CA$20.98. Please check amazon.ca "foldable phone stand" prices manually before publishing.

## Summary

| Product | Our item / checkout | Competitor low / typical / high (CAD) | Ratio | Verdict | Reason |
|---|---|---|---|---|---|
| Folding laptop feet x2 | 12.99 / 22.98 | 10.95 / 10.95 / 10.95 (Amazon.ca PONICOR 2PCS; shipping not shown) | 2.10 | FAIL (provisional) | Near-identical pair listed at about CA$11 on Amazon.ca |
| Pocket foldable plastic phone stand | 10.99 / 20.98 | not found (aluminum Nulaxy from 14.24, UGREEN 19.66; not comparable) | n/a | NOT CHECKED | No verified CAD price for a comparable plastic stand; market likely cheaper |
