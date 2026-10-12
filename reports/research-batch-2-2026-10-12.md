# CJ research batch 2, 2026-10-12 (read-only; nothing created, nothing published, nothing changed in Shopify or CJ)

Goal from owner: at least 5 NEW products that pass the screen, different from `reports/research-batch-2026-10-12.md` (no more dog clothing, slippers, scarves, gloves). Result: **5 PASS**, 5 RISK, 10 FAIL (20 products fully screened).

## Method
- Categories searched (CJ catalogue, USD 1.5 to 8, stock 300+, most listed first, 30 per page): diamond painting kits, 3D wooden puzzle models, candle holders, packing cubes and travel organisers, Christmas hanging ornaments, cat toys, paint-by-numbers, desk pen holders/organisers, macrame and wall tapestries, cotton rope baskets, Christmas felt/tree skirts, Christmas gnome plush, crochet and embroidery kits. 14 searches, about 400 listings read. Electronics, batteries, liquids, knives, food contact, cosmetics, branded items, sized apparel/shoes skipped. Candle holders (mostly iron/glass, heavy) and cat toys (US$ commodity, many electric) dropped at search stage.
- 20 products pulled with `get_product_detail` (weight per variant, photo count, variants).
- Money: profit = 0.971 x (price + band) - 0.30 - landed; landed = (CJ USD + freight USD) x 1.42443; band 9.99 up to 300 g, 14.99 up to 600 g; need profit >= CA$12, target >= 14, price CA$19.99 to 39.99.
- Freight: 9 real CJ quotes to Toronto M5V 2T6 (CJPacket Ordinary where offered, else cheapest line): jewelry box 7.73, owl 5.67, tapestry (large) 9.29, ship puzzle 10.04, compressible bags 8.39, crochet plants 8.26, crochet bag 8.61, paint-by-numbers 9.84 (Sensitive Pro+, no Ordinary line), embroidery 7.15 (Sensitive Pro+, no Ordinary line). The formula 3.78 + 0.0113 x g held within about 0.2 USD for compact items. It UNDER-estimates bulky boxes (ship puzzle: formula 8.53 vs quote 10.04), so every finalist needs its own quote at draft stage. Rows marked "est" use the formula.
- Competitor: WebSearch is US-biased. CAD evidence found only for packing cubes (walmart.ca) and crochet plant kits (deserres.ca, dillydallykids.ca). Everything else has USD shelf prices from US sites (shown as USD, NOT converted) or "not checked". Nothing invented; rule used: checkout (price + band) within about 1.5x the typical comparable total, and the owner confirms CAD by hand before publish.
- Store overlap: Shopify search done. Store already has a boho macrame leaf wall hanging (CJJT1019306, CA$24.99, active), raffia and sedge wall hangings, a book-shaped pen holder, an archived jellyfish diamond painting kit. No 3D wooden puzzles, crochet kits, embroidery kits, packing cubes or Christmas ornaments in the store.
- Not done: photo viewing (CJ CDN photos are not viewable from the sandbox: **photos not viewed** for every product), Ubersuggest demand (not run), full publish gate (SEO, schema, copy, GEO) which comes at draft stage.
- Compliance note for all wooden 3D puzzles and craft kits: CJ files several under "toys" with "age 7-14" text. Copy must not claim an age grade or safety certification; position as adult hobby kits with small parts. Owner to decide.

## PASS (approve to draft)
| # | Product | CJ pid | SKU | CJ USD | Weight (g) | Freight USD | Landed CAD | Price + band = checkout | Profit CAD | Photos | Competitor evidence | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Jewelry box 3D wooden puzzle kit, 23 x 13 x 2 cm | 2407270607381611300 | CJTY2094748 | 3.38 | 350 | 7.73 quoted | 15.83 | 19.99 + 14.99 = 34.98 | 17.84 | 22 | USD only: comparable treasure/jewelry box kits US$28 to 40 (woodartsupply, shopabunda, wakilni); no CAD found | PASS |
| 2 | Wooden 3D ship / castle model kit (3 variants: Ming sailing 2.53, fairy-tale castle 3.81, pirate ship 5.03) | 1407535719232180224 | CJJT1187264 | 2.53 to 5.03 | 420 | 10.04 quoted (pirate ship) | 21.47 worst variant | 24.99 + 14.99 = 39.98 | 17.05 worst, 20.62 best | 5 | USD only: pirate ship kits US$32 to 44 (mooremuseum.ca, woodartsupply, eBay); no CAD found | PASS (one price for all variants; or price pirate ship alone higher) |
| 3 | Mini wooden airship 3D puzzle, 185 x 128 x 165 mm | 1752204567506325504 | CJTY1960047 | 3.86 | 175 | 5.76 est | 13.70 | 19.99 + 9.99 = 29.98 | 15.11 | 13 | USD only: small wood kits US$12.52 to 33 (walmart.com); mid-range, not much cheaper; no CAD found | PASS (conditional, owner checks CAD by hand; get quote at draft) |
| 4 | Beginner crochet plant kit, 3 or 6 potted plants, English manual and video | 1726210547890266112 | CJYD1901067 | 4.36 (3 pots) / 5.64 (6 pots) | 320 / 398 | 8.26 quoted (6 pots); 7.40 est (3 pots) | 19.80 (6) / 16.75 (3) | 24.99 + 14.99 = 39.98 (6 pots); 19.99 + 14.99 = 34.98 (3 pots) | 18.72 (6) / 16.92 (3) | 11 | CAD: De Serres succulent crochet kit CA$14.99, Dillydally Kids 3-plant kit CA$17.99 (both listed out of stock, shipping 11.99 there); so competitor total about CA$27 to 30 vs our 34.98 to 39.98. Walmart.com plant kits US$11 to 19. Kit contents (hook, stuffing) must be confirmed on CJ before copy says "complete kit" | PASS (borderline on the 6-pot price: lower to 22.99 if owner wants safety, profit still 16.7) |
| 5 | DIY crochet crossbody bag kit (yarn, fabric strips, hook, chain, pearl chain, needle, marker), 7 colours x small/large | 2603250313081613600 | CJJE2802927 | 5.25 | 300 (small) / 430 (large) | 8.61 quoted (large); 7.17 est (small) | 19.74 large / 17.69 small | 24.99 + 14.99 = 39.98 large; 24.99 + 9.99 = 34.98 small | 18.78 large / 15.97 small | 19 | USD/GBP only: bag kits US$22.99 to 26.99, Stitch and Story GBP 18; no CAD found | PASS (conditional, owner checks CAD by hand) |

## RISK (not approved; fixable or needs owner call)
| # | Product | CJ pid | SKU | CJ USD | g | Freight | Landed | Checkout | Profit | Evidence / reason | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Owl 3D wooden puzzle pen holder | 1606168280987873280 | CJYD1646635 | 5.42 | 170 | 5.67 quoted | 15.80 | 24.99 + 9.99 = 34.98 | 17.87 | 7 photos. Comparables only US$11.99 (42-piece owl puzzle) and a US$24 eBay owl pen holder; checkout looks high | RISK |
| 7 | Stork tower 3D wooden puzzle (age 7-14 per supplier) | 1603596833547366400 | CJJM1639697 | 4.16 | 220 | 6.27 est | 14.85 | 24.99 + 9.99 = 34.98 | 18.81 | 5 photos only, supplier markets it as a kids toy (compliance), no direct comparable found | RISK |
| 8 | Boho leaf fringe macrame tapestry, small/large | 2609250859561605300 | CJJT3196227 | 3.77 / 4.13 | 323 / 475 | 9.29 quoted (large) | 19.12 | 24.99 + 14.99 = 39.98 | 19.40 | Store already sells a near-identical macrame leaf wall hanging (CJJT1019306, CA$24.99). walmart.com leaf hangings US$11 to 21. Duplicate category, also no sizes in cm in text | RISK (skip unless replacing the live one) |
| 9 | Beginner yarn embroidery kit, hoop, thread, cloth, 8 variants | 1481502282712485888 | CJJT1399230 | 2.96 | 100 | 7.15 quoted (only Sensitive Pro+, 6-11 days; tagged EDGE/needles) | 14.40 | 19.99 + 9.99 = 29.98 | 14.41 | 9 photos. Restricted shipping line only, no Ordinary line; competitor not checked | RISK |
| 10 | Diy oil paint-by-numbers kit, 40 x 50 cm (270 g) | 1399621011107876864 | CJJT1154258 | 3.83 | 270 | 9.84 quoted (Sensitive Pro+ only; tagged HAVE_CREAM, paint) | 19.47 | 24.99 + 9.99 = 34.98 | 14.19 | 5 photos, paste/paint shipping restrictions, competitor not checked | RISK |

## FAIL
| # | Product | CJ pid | SKU | CJ USD | g | Reason |
|---|---|---|---|---|---|---|
| 11 | 6/8-piece compressible travel storage bag set | 2603171149031616200 | CJYD2790879 | 3.10 to 4.44 | 380 / 410 | Profit 20.25 at 39.98 checkout (quote 8.39), 14 photos, but walmart.ca packing cubes CA$9.16 to 13.69: our checkout about 3x. FAIL |
| 12 | 8-piece luggage divider / packing cube set | 1386852733046362112 | CJNS1100869 | 2.27 to 4.62 | 480 | Profit ok (18.83 at 39.98 checkout, est freight 9.20) but CAD evidence: walmart.ca 6-piece set CA$13.69 (was 29.99), 7-piece CA$9.16 (was 18.16). Our checkout is 2.9 to 4.4x that. Item 11 same. FAIL |
| 13 | 24 pcs Christmas wooden hanging ornaments (gnomes/trucks) | 1727623257509081088 | CJYD1904592 | 1.90 | 78 to 184 | Profit fine (17.76 at 29.98), but walmart.com 24-piece gnome set US$10.99 with free shipping: our checkout about 2.7x. FAIL |
| 14 | Poster Christmas diamond painting kit 30 x 40 cm | 1444210694227628032 | CJZS1306698 | 3.19 to 3.29 | 306 | 6 photos; competitor US$11.99 (walmart.com) down to US$5.49 (woodartsupply). Checkout 34.98 about 3x. Store also archived a diamond painting kit earlier. FAIL |
| 15 | Christmas diamond painting wreath kit | 2610030528121636700 | CJSD3217341 | 2.94 to 3.13 | 155 to 163 | CJ product tag BATTERY (light variants). Skipped. FAIL |
| 16 | Dutch windmill 3D wooden puzzle | DB609306-D9CF-4848-B2D2-1F9AD970451F | CJWJWJJM00995 | 1.99 | 645 | Over 600 g. FAIL |
| 17 | Cotton rope storage basket | 2607071254461633100 | CJYD2972614 | 3.67 | 950 (1 pc) | Over 600 g, oversize. FAIL |
| 18 | Christmas tree skirt | 1430770235836862464 | CJSD1264392 | 4.10 | 770 | Over 600 g. FAIL |
| 19 | Animal-shaped 3D wooden puzzle (S/M/L) | 2406120903471616800 | CJTY2058893 | 3.52 to 7.30 | 165 to 397 | Only 2 photos (need 4+); S size costs 7.30 for 397 g. FAIL |
| 20 | Crochet material kit / knitted bouquet | 2603020334571629100 | CJYD2771701 | 5.05 to 6.62 | 455 to 920 | Most variants over 600 g. FAIL |

## Funnel
- 14 searches, about 400 listings read -> about 45 shortlisted by name/price/category -> 20 detail pulls -> 9 real freight quotes -> 10 WebSearch competitor lookups + 1 Shopify overlap search.
- 20 screened: 5 PASS, 5 RISK (6 to 10), 10 FAIL (11 to 20; 11 and 12 on competitor price, 13 and 14 on competitor price, 15 battery, 16 to 18 weight, 19 photos, 20 weight). Item 11 is counted FAIL.
- Pattern: commodity travel/Christmas/diamond-painting items lose to Canadian and US shelf prices at our checkout. What passes are hobby kits and 3D wooden models where comparable kits sit at US$12 to 44 and CAD craft kits CA$15 to 18 plus shipping.

## Proposal
1. Owner approves 1 to 5 to draft stage. For each: fresh freight quote, view all photos (logos/watermarks), copy from CJ data only (no age or safety claims, no "complete kit" unless contents confirmed), CAD competitor check on amazon.ca / michaels.ca / walmart.ca by hand, then the 5-check publish gate.
2. Suggested handling: list the three wooden models as one "3D wooden model kits" collection; crochet plant kit price 3 pots 19.99 and 6 pots 24.99; crochet bag kit 24.99.
3. Items 6 to 10 stay parked; revisit 6 and 7 if the owner wants more wooden models.
