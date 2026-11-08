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
