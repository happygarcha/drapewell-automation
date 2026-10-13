# New CJ drafts from competitor-ad signals, 2026-10-13

Owner request (2026-10-13): "Grab all products and search on CJ and make drafts as people are selling there is something in them", based on `reports/competitor-ads-deep-search-2026-10-13.md` and `reports/competitor-ads-research-2026-10-13.md`.

Everything here is a SIGNAL from the Meta Ad Library (advertiser behaviour only), not proof of sales. The ad research shows no spend, sales or conversion data. The publish gate (SEO audit, technical audit, schema, copy review, GEO, competitor price, Ubersuggest) has NOT been run. All products are DRAFT with publication count 0 (not on any channel). Nothing existing was changed. Only the new drafts' variants were added to the delivery profile "CJ Dropshipping Fulfillment" (135205912885), read back and confirmed (see below).

## Existing catalogue read first

All 150 products were read (ACTIVE, DRAFT and ARCHIVED, 3 pages of 50). Nothing archived on purpose was recreated. Relevant existing items that shaped the scope:
- Dog harness: an ACTIVE "Step-In Dog Harness & Leash Set, Reflective Mesh Vest" already exists, so (g) was skipped (not duplicated).
- Already sold, so not duplicated: printed kitchen runner (wood print), quick-dry bath mat, woven bath mat, plush 3-piece bath set, Nordic tassel throw, milk-velvet fleece throw, embroidered knitted Christmas stocking, rotating makeup brush organiser (3 versions), 3 wooden 3D kits (jewelry box, ship and castle, airship), horse canvas, pet carrier tote, rope basket, Christmas tablecloth and table runners, dog sweaters, hat/scarf/gloves sets, crochet kits, shower curtains.
- Archived on purpose and not touched: cat tent bed, snowflake cushion, Christmas shower curtain, Nordic jacquard tablecloth, and the other archived items.

## Money test used

profit (CAD) = 0.971 x (price + shipping band) - 0.30 - (CJ product USD + CJ freight USD) x 1.42443. Bands: <=300 g 9.99, 301-600 g 14.99, 601-900 g 19.99, 901-1200 g 24.99. Real `calculate_freight` quotes, one product at a time, CN to Canada (M5V 2T6, CJPacket Ordinary) and CN to US (02169, YunExpress Ordinary), for the heaviest or highest-cost variant. Required profit >= CA$12 on both routes.

## Drafts created (6) and their status

| Product id | Handle | Price (CAD) | Variants | Photos kept | Profit CA / US | Status |
|---|---|---|---|---|---|---|
| 15415977247029 | l-shaped-coral-fleece-kitchen-floor-mat-2-sizes-6-colours | 22.99 (80 x 120), 24.99 (80 x 150) | 12 (6 colours x 2 sizes) | 7 | 15.60 / 14.74 (120), 16.76 / 15.90 (150) | Photos PASS |
| 15415977312565 | embroidered-cloth-christmas-stocking-3-designs-large-size | 15.99 | 3 designs (85 g) | 6 | 15.35 / 13.42 | Photos PASS. Tag needs-check (low price point, see notes) |
| 15415977378101 | chenille-knit-throw-blanket-with-tassels-127-x-170-cm-6-colours | 32.99 | 6 colours (520 g) | 6 | 15.92 / 14.21 | Photos PASS. Tag needs-check (colour photos show two different knit patterns, stated in copy) |
| 15415976132917 | geometric-jacquard-runner-rug-for-kitchen-and-hall-45-x-120-cm | 21.99 | 1 (dark blue, 700 g) | 1 | 17.81 / 15.29 | Photos FAIL for the 4-photo minimum: CJ supplies only 1 clean photo (its 2nd image carries overlay claim text and was removed). Tag needs-check |
| 15415977607477 | rotating-cosmetic-organiser-tray-360-degree-turntable-4-colours | 21.99 | 4 colours (500 g) | 1 | 16.85 / 15.10 | Photos FAIL: 10 of 11 CJ photos show named brand products (Smeg, Lancome, Heinz, Bushmills, Estee Lauder, Givenchy, Artistry and others) or overlay text; only the beige photo is clean. Only Milky white has a photo. Tags needs-check, photos-fail-brand-products |
| 15415977476405 | wooden-3d-puzzle-model-kit-steam-train-racing-car-or-truck | 27.99 train, 24.99 car and truck | 3 (280 g) | 9 | 15.57 / 13.79 (train), about 15.5 / 13.7 (car, truck; freight quote taken on the train variant, same 280 g) | FAIL, REJECTED on brand risk. The photos and models are copies of a branded wooden-kit range: one removed photo showed a retail box reading "ROKR" and the wheels appear to carry small lettering that I could not read at 500 px. Tags needs-check, brand-risk-do-not-publish. NOT added to the delivery profile. Recommend the owner deletes this draft (I may not delete) |

Per product, as in the earlier draft reports: vendor Drapewell, collection (Kitchen for the mat and runner, Seasonal for the stocking, Living Room for the blanket, Beauty for the tray, Desk & Hobby for the puzzle), inventory not tracked, inventoryPolicy CONTINUE, requiresShipping true, weight per variant from the CJ `variantWeight`, SKU = CJ variant SKU, tags `cj-pid:<pid>` and `cj-sku:<spu>`, inventory level activated at the `cjdropshipping` location (quantity 0, untracked), SEO title <= 60, meta 130-155, delivery sentence (13-25 days Canada, 10-20 days US, tracked, taxes extra). Photos were viewed through the shop CDN after upload; photos that failed were deleted from the draft.

Delivery-profile read-back: every variant of the five drafts above reads `deliveryProfile = CJ Dropshipping Fulfillment` (1 + 12 + 3 + 6 + 4 = 26 variants). The 3 puzzle variants read `General profile` on purpose.

### Ad-signal evidence behind each draft (signal, not proof)
- Kitchen mat and runner rug: `competitor-ads-deep-search` section 19 and top-8 item 2. 14 pages ran the identical "Wavy Pineapple Circle Sisal Runner Rug" creative, 12 of them for 4+ weeks (started 2026-09-08 to 09-11, oldest 4.9 wks); Styledwithjordan "Kitchen-Ready Rugs That Bring Comfort" at 7.3 weeks with 4 ads. No sisal or woven runner suitable for shipping was found on CJ (see rejected list), so the drafts are an L-shaped kitchen mat and a small jacquard runner, which are adjacent products, not the advertised sisal runner.
- Christmas stocking: section 8 and top-8 item 3. Elegantpark (CAD) "Knit Christmas Stockings" ad active since 2025-11-10 (48 weeks, 1 ad); Hand Knit Holiday 5 ads at 4.1 weeks ("25% off preseason", the advertiser's own claim); Callie Ireland 11 ads for a personalized embroidered stocking (0.9 weeks).
- Throw blanket: section 5 and top-8 item 5. Meg DiVittis 9.3 weeks (4+ ads), Bearaby 12.6 weeks (weighted knit, adjacent), In2Green 6.6 weeks, Cleanish Curated 5.3 weeks. All US advertisers; no Canada-specific blanket ad was found.
- Rotating organiser: section 13 and top-8 item 4. Seven pages ran "360 Rotating Makeup Brush Organizer Box" (five at 4.1-4.6 weeks), Lidvy "Elegant Rotating Vanity Organizer" 6.3 weeks. (The CJ product found is a rotating tray, not the brush box.)
- 3D wooden puzzle: section 12 and top-8 item 6. Ugeargeek 11.4 weeks and Rokrgeek 10.4 weeks (one or two ads each). Note the advertiser name "Rokrgeek" fits the finding that this niche is dominated by a branded range.

## All screened candidates

| Type | CJ SKU | CJ USD | Weight | Freight CA / US (USD, quoted) | Price (CAD) | Profit CA / US | Verdict | Reason |
|---|---|---|---|---|---|---|---|---|
| Kitchen mat (L-shaped) | CJYD2962727 | 2.19-2.74 | 350-400 g | 12.54 / 13.14 (150 cm, 400 g) | 22.99-24.99 | 15.6-16.8 / 14.7-15.9 | DRAFT created | Passes money test, 7 clean photos. 120 cm variant freight not separately quoted (same package size 450 x 450 x 30 mm, assumed same) |
| Christmas stocking | CJJT1772324 | 1.93 | 85 g | 4.79 / 6.15 | 15.99 | 15.35 / 13.42 | DRAFT created | 6 clean photos, size 38 x 25 cm from the supplier diagram |
| Chenille throw blanket | CJYD2827399 | 9.78-11.44 | 520 g (170 cm size) | 9.88 / 11.08 | 32.99 | 15.92 / 14.21 | DRAFT created | 127 x 220 cm size (720 g) not created |
| Geometric runner rug 45 x 120 | CJFM3055435 | 4.02 | 700 g | 11.88 / 13.65 | 21.99 | 17.81 / 15.29 | DRAFT created | Only 1 clean CJ photo |
| Rotating cosmetic tray | CJCC2233818 | 3.61 | 500 g | 9.56 / 10.79 | 21.99 | 16.85 / 15.10 | DRAFT created (photos FAIL) | 10 of 11 CJ photos show brand products |
| Wooden 3D train, car, truck kit | CJWJWJJM00664 | 5.72-7.83 | 280 g | 6.92 / 8.17 (train) | 24.99-27.99 | 15.5 / 13.7 | DRAFT created, REJECTED (brand risk) | Branded range copy, ROKR lettering visible; the CJ variants also include a "Jeep" model (trademark), not created |
| Geometric runner rug (2nd design) | CJFM3055482 | 4.02 | 700 g | 11.88 / not separately quoted (same weight, size, price as CJFM3055435) | would be 21.99 | would be 17.8 / 15.3 | Not created | Same type as the runner draft, 1 photo, no new information, cap and time |
| Classic European runner 50 x 180 | CJFM3055533 | 6.90 | 1200 g | not quoted | n/a | n/a | Rejected | 1.2 kg, over the weight limit |
| Straw sisal rug 50 x 80 | CJJJJTJT10338 | 15.05 | 1350 g | not quoted | n/a | n/a | Rejected | 1.35 kg and cost too high |
| Sisal rug (cat scratch use) | CJYD3143390 | 17.36-22.40 | 1250-1600 g | not quoted | n/a | n/a | Rejected | Over 1.2 kg, sold for cats |
| 2-piece anti-fatigue kitchen mat | CJKD2168946 | 4.65 | 2500 g | not quoted | n/a | n/a | Rejected | 2.5 kg |
| Boho kitchen rug set of 3 | CJFM2896494, CJLY2790309 | 26.86-28.56 | not read | not quoted | n/a | n/a | Rejected | Cost USD 27-29 cannot reach CAD 60 with the profit rule; stock 229-270 only |
| Named-brand 2x8 runner rugs | CJFU28583xx range | 30-44 | not read | not quoted | n/a | n/a | Rejected | Brand names in titles (MAVAL, PAYAS, MARFI), stock of about 20-30 |
| Beaded embroidery stocking | CJYS2979001 | 3.86 | 90 g | not quoted | n/a | n/a | Rejected | Variant is "Random Delivery" (customer cannot choose the design) |
| Diatomite bath mat | CJJJJTYS02292 | 8.47 | 2560 g | not quoted | n/a | n/a | Rejected | 2.56 kg; the CJ text also makes antibacterial and health claims we may not repeat |
| Diatomite stone bath mat | CJFU2728395 | 17.29 | not read | not quoted | n/a | n/a | Rejected | CJ stock 2 |
| Water-absorbent bath mat 40 x 60 | CJYD2993339 | 14.45-19.16 | 630-1030 g | not quoted | would need about 28 | n/a | Not created | At CJ cost 14.45 the price needed for a CA$12 profit gives a checkout total near CA$48 for a small mat, hard to hold against bath mat competitors; we already sell 3 bath mat styles. Not quoted |
| Rotating makeup organiser (large) | CJCC2185119 | 5.53 | 700 g | not quoted | n/a | n/a | Not created | Not quoted: same photo problem expected (cosmetic scenes with brands), and the tray draft already fails on photos |
| 3D music box kit | CJYD2070092 | 8.07 | 350 g | not quoted | n/a | n/a | Rejected | Built-in battery flag, tune names are licensed film and song titles, only 5 photos |
| Other wooden 3D kits ($0.5-5) | CJWJWJJM00845, CJTY2198847, and similar | 0.5-6 | not read | not quoted | n/a | n/a | Not created | Generic low-cost children's items or the same branded range |
| Dog harness set | n/a | n/a | n/a | n/a | n/a | n/a | Skipped | We already sell one |
| Other types from the ad research | Christmas tablecloth, horse canvas, pet carrier, rope basket, shower curtain, dog sweater, crochet kit, hat/scarf/gloves | n/a | n/a | n/a | n/a | n/a | Skipped | We already sell each (existing catalogue read above) |

Note: freight quote responses from CJ are deterministic for the same weight and package size, so the second runner design reuses the first design's US quote. This is stated, not assumed silently.

## Not verified
- Competitor prices: not checked for any product (competitor sites cannot be fetched). Checkout totals (price plus band) are CA$25.98 (stocking), CA$36.98 (tray), CA$37.98 (mat 120), CA$39.98 (mat 150), CA$41.98 (runner), CA$47.98 (blanket), CA$37.98-42.98 (puzzle). Whether these are within about 1.5x of typical competitor totals is unknown.
- Keyword demand (Ubersuggest) was not run.
- CJ freight for the mat 120 cm variant, and the racing car and truck puzzle variants, was not quoted separately (same weight band and package size as the quoted variant).
- No stock was checked per country; CJ search used default stock filters and listed inventory only.
- Product pages were not loaded (drafts have no public URL); JSON-LD, markup, and HTTP status were not checked.
- Supplier claims left out of the copy: "washable" is repeated only as "supplier lists it as washable" for the runner and the mat; "stain-resistant", "super water absorption", "dust-proof" style claims and age or skill claims were not used.
- Mat colour "Dark blue" has only a colour swatch (blue circle) photo, no product photo. Blanket photos for Lemon yellow and Crimson show mustard and brick red. Mat "Camel" photo looks sand-beige.
- Blanket CJ listing also names pink, forest green, orange and navy blue colours that are not in its variant list; they were not created.
- The supplier text for the stocking says "large"; the 38 x 25 cm size comes from the supplier diagram photo.

## Owner decisions needed
1. Approve the publish gate for any draft. It has NOT been run. Realistic candidates for the gate: the kitchen mat, the Christmas stocking (the Canadian Christmas order-by tag is 2026-11-28 like the other seasonal items) and the throw blanket.
2. Decide on the photo FAILs (runner: 1 photo; tray: 1 clean photo). They stay DRAFT unless replaced by clean photos.
3. Delete the wooden puzzle draft (brand risk). I did not add it to the delivery profile.
