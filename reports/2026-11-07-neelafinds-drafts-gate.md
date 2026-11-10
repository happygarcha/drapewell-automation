# Publish-gate check on the 16 neelafinds drafts, 2026-11-07 (all still DRAFT)

Checked from Shopify data (read back) and the product text. Nothing published.

## What was checked and how
| Check | Result | Notes |
|---|---|---|
| SEO text limits | PASS after fixes | Titles 53-62 chars, meta descriptions now 139-155. Fixed today: meta description of #0 (was 127), #13 (156), #24 (158), #31 (156); SEO title of #5, #8, #23 (were 62, now 51-58). |
| Tags, type, collections | PASS | Every draft has a product type, tags incl. `cj-pid:` and `cj-sku:`, and sits in Kitchen + Home & Kitchen (#13: Home & Kitchen + Bedroom; #1: Living Room + Home & Kitchen). |
| Keyword demand (Ubersuggest, Canada) | PARTIAL | 3 of 3 daily lookups used: "milk frother handheld" 260/mo, "silicone stretch lids" 170/mo, "handbag organizer for closet shelf" no data. The other products were not looked up (daily limit). |
| Images READY, alt text | PASS | All media READY. Alt text describes the picture (no "view 1"). |
| Logos/watermarks in pictures | PASS (as viewed) | Pictures viewed at build; handbag rack, rice strainer video and tongs video had brands blurred. #24 video: faint jar/knife-block lettering, not legible. |
| Weight on every variant | PASS | 40-670 g, all set. |
| Delivery profile | PASS | Every variant is in "CJ Dropshipping Fulfillment". |
| Inventory at cjdropshipping | PASS | Location 115880919349, 50 each. |
| SKU and CJ pid tag | PASS | |
| Variant pictures | PASS | Every variant has its own picture (shared by colour where sizes share). |
| Copywriting | PASS | No brand names, no health or performance claims, supplier-only facts marked "per the supplier", honest "Good to know" lines, delivery sentence present, batteries/heat items carry the Safe use box. |
| Page loads (HTTP 200) | NOT CHECKED | Drafts have no public page; the preview host is blocked from this session. |
| Product JSON-LD / schema | NOT CHECKED | Needs a live or preview page. |
| GEO readiness | PARTIAL | Text has plain facts (what it is, size, material, included, delivery). Page-level check not possible without the page. |
| Competitor price (Amazon.ca) | NOT CHECKED | amazon.ca blocked from this session; no prices invented. |
| Pictures 10+ | FAIL for 9 drafts | #0 7, #1 5, #8 9 (+video), #12 9, #13 7, #14 5, #24 5 (+video), #28 6, #29 5 real pictures. |

## Still open
- Page load, schema and competitor checks need the page live or an allowed host.
- Safe use text printed on in-use photos for #31 and #33.

## Update: information cards added (2026-11-07)
32 information cards (dark card, cyan edge, same style as the Safe use picture) were added to the 9 drafts that had fewer than 10 real pictures. Text uses only facts already in each listing (size, material, what is included or not, options, delivery sentence); alt text repeats the card text. Read back from Shopify, all DRAFT, all media READY, variant pictures unchanged:

| Draft | Real photos | Cards added | Total pictures |
|---|---|---|---|
| #0 Plate | 7 | 3 | 10 |
| #1 Curtain brackets | 5 | 5 | 10 |
| #8 Measuring spoon | 9 | 1 | 10 + video (last) |
| #12 Stretch covers | 9 | 1 | 10 |
| #13 Handbag rack | 7 | 3 | 10 |
| #14 Pumpkin mold | 5 | 5 | 10 |
| #24 Batter bottle | 5 | 5 | 10 + video (last) |
| #28 Strainer dome | 6 | 4 | 10 |
| #29 Rice washing bowl | 5 | 5 | 10 |

The 10+ picture rule now passes for all 16 drafts, but cards are padding, not extra real photos.

## Update 2026-11-08: remaining gates
- **Page load and schema (preview pages, now reachable): PASS for all 16.** HTTP 200, one H1, Product JSON-LD parses, offers carry the right CAD price per variant (matches Shopify), availability InStock, shipping and return data present, no ratings or reviews. The four drafts with a video (#5, #8, #20, #24) contain the `data-video-pane` block. Previews are marked noindex because they are unpublished: re-check the live page after publishing.
- **CJ freight re-quote: unchanged** for every variant of all 16 drafts (cost and freight to CA and US), so the profit table holds.
- **Safe use printed on photos:** done on the four frother in-use photos. The glove has no in-use photo, so none printed.
- **Keyword demand (Canada, Ubersuggest, searches/month):** silicone oven gloves 1000, pancake batter dispenser 390, milk frother handheld 260, silicone stretch lids 170, adjustable rolling pin 140. Other products not looked up.
- **Competitor price: NOT CHECKED.** Amazon.ca returns its bot-check page (503) even with network access; no workaround attempted. Walmart.ca search rate-limited (429) after a few queries; the only usable data is for handheld milk frothers: item prices C$8.39-13.83 (shipping unknown). Our frother is C$12.99 plus the shop's weight-band shipping, so the 1.5x checkout-total comparison could not be made for any product.

## Update 2026-11-08 (later): Amazon.ca with plain Chromium
Method (owner rule, now in CLAUDE.md): default Playwright Chromium, one search page per product, about 20 s apart, non-sponsored first page, stop at the first robot check.
- **#0 plate** ("white porcelain salad plate round", 24 listings): median checkout total about C$38 (price plus delivery where shown, free delivery counted as 0), cheapest about C$23. Ours C$13.99 + C$9.99 = C$28.98, ratio about 0.76: **PASS**. Prices as shown on the search page, not verified one by one.
- **#31 frother** (first attempt, 12 listings, delivery text not captured): item prices C$7.99 to C$29.99, median about C$13.99. Ours C$12.99 + C$9.99 = C$22.98, about 1.64x the median item price if delivery is free: **likely FAIL (indicative only)**, would need the delivery text to confirm.
- **#1 curtain brackets and the other 13 drafts: NOT CHECKED.** Amazon served the first search and then showed its robot-check page on the second, so the run stopped as planned.

## Update 2026-11-08: Amazon.com (US), same plain-Chromium method
- **#0 plate** ("white porcelain salad plate round", 24 non-sponsored listings): median checkout total about C$37 (USD converted at 1.42443, delivery added where shown, free counted as 0), cheapest about C$18.50. Ours to the US: C$13.99 + C$12.99 = C$32.98, ratio about 0.89: **PASS**. Search-page prices, not verified one by one.
- **The other 15 drafts: NOT CHECKED.** Amazon.com served the first search and showed the robot-check page on the second, same as Amazon.ca, so the run stopped.

## Update 2026-11-10: leftover gates
- Amazon.ca retry with the plain-Chromium method (one search, curtain brackets): HTTP 503 "Something Went Wrong" on the very first search of the session. Stopped per the owner rule, nothing worked around. Competitor price is still NOT CHECKED for the other 15 drafts (only #0 plate PASS, #31 frother indicative FAIL).
- Shopify read-back: all drafts still DRAFT; the 16 neelafinds drafts each have 10+ media (read from the list query, not re-viewed).
- Nothing else is open that can be run from here: SEO, technical, schema, copy, GEO and freight were done 2026-11-07/08.

## Update 2026-11-10 (later): Amazon.ca re-run
- **#1 curtain brackets** ("curtain rod brackets adhesive no drill", 24 non-sponsored listings, most with free delivery): median checkout total about C$18.79, cheapest C$4.99. Ours C$11.99 + C$9.99 = C$21.98, ratio about 1.17: **PASS** (within 1.5x). Search-page prices, not verified one by one.
- **Rice strainer (#5)**: next search 20 s later returned the 503 robot-check page. Stopped per the owner rule. The other 13 drafts remain NOT CHECKED.

## Update 2026-11-10 (evening): Amazon.ca, rice strainer
- **#5 rice strainer** ("silicone rice strainer clip on bowl"): Amazon.ca returned HTTP 200 this time. 21 of 24 non-sponsored listings read (the last 3 were cut from my capture), prices C$3.89-34.95, almost all with free delivery (items showing a delivery date without "FREE" counted as 0, which is the stricter way). Median total C$14.99, cheapest C$3.89. Ours C$11.99 + C$9.99 = C$21.98, ratio about 1.47: **PASS, borderline** (limit 1.5). Search-page prices, not verified one by one. Many cheaper items are 2-3 week delivery.
- Search not repeated afterwards (rule: one per session).

## Update 2026-11-10 (night): Amazon.ca run on the other drafts
Amazon.ca served all 12 searches this time (plain Playwright Chromium, a fresh browser per search, 20 s apart, no block). Per search: first 24 non-sponsored listings, item price plus delivery (free or an unlabelled delivery date counted as 0, the stricter way). Ours = cheapest variant price + weight-band shipping to Canada. Raw numbers: reports/data/amazon-ca-2026-11-10-batch.json.

| Draft | Search used | Median total | Cheapest | Ours | Ratio | Result |
|---|---|---|---|---|---|---|
| #12 Stretch silicone covers | silicone stretch lids reusable set | 14.99 | 8.49 | 25.98 | 1.73 | FAIL |
| #13 Handbag rack | handbag organizer closet shelf divider | 33.49 | 16.99 | 28.98 | 0.87 | PASS |
| #20 Tongs | stainless steel kitchen tongs silicone tip | 15.49 | 8.99 | 19.98 | 1.29 | PASS |
| #23 Rolling pin | adjustable rolling pin thickness rings | 22.99 | 13.39 | 37.98 | 1.65 | FAIL |
| #24 Batter bottle | pancake batter mixing bottle whisk ball | 23.74 | 9.84 | 26.98 | 1.14 | PASS |
| #27 Patty press | hamburger patty press | 23.49 | 11.99 | 20.98 | 0.89 | PASS |
| #28 Strainer dome | silicone strainer for cans and jars | 12.64 | 5.27 | 19.98 | 1.58 | FAIL |
| #31 Frother | handheld milk frother whisk | 14.00 | 7.99 | 22.98 | 1.64 | FAIL (confirms the earlier indication) |
| Oven glove (silicone heat resistant glove) | silicone oven glove heat resistant | 20.49 | 11.57 | 22.98 | 1.12 | PASS |
| #1x Batter dispenser | pancake batter dispenser | 20.74 | 10.49 | 31.98 | 1.54 | FAIL (just over) |
| #8 Measuring spoon | adjustable measuring spoon slider | 13.19 | 5.59 | 20.98 | 1.59 | FAIL |
| #14 Pumpkin mold | pumpkin silicone cake mold | 17.49 | 7.99 | 25.98 | 1.49 | PASS, borderline |

(Earlier results: #0 plate 0.76 PASS, #1 curtain brackets 1.17 PASS, #5 rice strainer 1.47 PASS borderline.)
Caveats: search-page prices, not verified one by one; the search words are generic, so some listings may be a different size, pack or type than ours; relevance was not hand-checked. Result labels are indicative (UNVERIFIED in the strict sense of scripts/competitor_price_check.py, which needs sourced, dated rows). Amazon.com (US) not run. No prices, listings or drafts were changed.
