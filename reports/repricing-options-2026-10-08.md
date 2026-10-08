# Repricing options for 7 live products (2026-10-08)

Read-only analysis. Nothing was changed in Shopify. Competitor prices were NOT available and none were invented: the "within about 1.5x of a typical Canadian competitor total" test is NOT CHECKED for every product below.

## Method and inputs

- Shopify: variant price, SKU and weight read live with `graphql_query`. CJ cost = `variantSellPrice` (USD list price) from CJ variant data. Freight = fresh `calculate_freight` quote to CA (CN origin, no postal code), one call at a time, no rate-limit errors.
- Freight line: CJPacket Ordinary (cheapest reliable line) for all products, except the cat tent, where CJPacket Eub (4-8 days) was cheaper (Small 9.09 vs 12.44, Medium 12.28 vs 16.44, Large 12.54 vs 20.97), so Eub is used there. Ordinary would make the cat tent worse.
- Landed CAD = (CJ USD + freight USD) x 1.42443. Profit = 0.971 x (price + Canada band) - 0.30 - landed. Band is picked from the Shopify variant weight.
- Option A = keep price and bands. Option B = the price that gives profit >= CA$12 with the same band (rounded up to x.99). Option C = item price set to CJ cost in CAD (cost x 1.42443) with the same band. Option D = does a lighter line or weight change the band.
- Profit on all of these is already carried by the shipping band, because the customer pays the band. The weakness is the checkout total and the price:shipping ratio, not margin. For most items Option B is therefore a price floor below today's price, not a rise.
- Worst-case cost across colours or styles is used where cost differs between variants.
- Only the door mat and the stadium cushion carry a `cj:<pid>` tag in Shopify. The other pids were found from the SKU and are listed at the bottom. Tagging them is recommended.

## Table (Canada, one unit, representative variants)

| Product | Variant | Price | Weight (g) | Band | CJ USD + freight USD | Landed CAD | A: profit / checkout / price:ship | B: min price for CA$12 / checkout | C: price = cost CAD / profit |
|---|---|---|---|---|---|---|---|---|---|
| Door mat | 45x70 Grey | 15.00 | 624 | 19.99 | 1.90 + 11.03 | 18.42 | 15.26 / 34.99 / 0.75 | 11.99 / 31.98 | 2.71 / 3.32 |
| Door mat | 60x90 Grey | 19.99 | 973 | 24.99 | 3.13 + 14.92 | 25.71 | 17.66 / 44.98 / 0.80 | 14.99 / 39.98 | 4.46 / 2.58 |
| Quick-dry bath mat | Oval 40x60 | 19.99 | 496 | 14.99 | 1.79 + 9.52 | 16.11 | 17.56 / 34.98 / 1.33 | 14.99 / 29.98 | 2.55 / 0.62 |
| Quick-dry bath mat | Oval 50x80 | 27.99 | 786 | 19.99 | 2.98 + 12.84 | 22.53 | 23.75 / 47.98 / 1.40 | 15.99 / 35.98 | 4.24 / 0.69 |
| Quick-dry bath mat | Oval 60x90 | 32.99 | 984 | 24.99 | 3.84 + 15.05 | 26.91 | 29.09 / 57.98 / 1.32 | 15.99 / 40.98 | 5.47 / 2.37 |
| Snowflake cushion cover | Single 45x45 | 15.99 | 180 | 9.99 | 2.64 + 5.78 | 11.99 | 12.93 / 25.98 / 1.60 | 15.99 / 25.98 (no cut possible) | 3.76 / 1.06 |
| Snowflake cushion cover | Red 4-pack | 43.99 | 696 | 19.99 | 9.82 + 11.84 | 30.85 | 30.97 / 63.98 / 2.20 | 24.99 / 44.98 | 13.99 / 1.84 |
| Woven bath mat | 40x60 | 16.99 | 735 | 19.99 | 1.29 + 9.71 | 15.67 | 19.94 / 36.98 / 0.85 | 8.99 / 28.98 | 1.84 / 5.23 |
| Woven bath mat | 50x80 | 19.99 | 735 | 19.99 | 1.95 + 12.28 | 20.27 | 18.25 / 39.98 / 1.00 | 13.99 / 33.98 | 2.78 / 1.54 |
| Folding stadium seat cushion | all 3 colours | 17.99 | 620 | 19.99 | 4.22 + 10.99 | 21.67 | 14.91 / 37.98 / 0.90 | 15.99 / 35.98 | 6.01 / 3.28 |
| Woven cotton rope basket | 1 pc, 6 colours | 22.99 | 950 | 24.99 | 3.67 + 15.56 | 27.39 | 18.90 / 47.98 / 0.92 | 15.99 / 40.98 | 5.23 / 1.65 |
| Foldable cat tent bed | Small | 13.99 | 150 | 9.99 | 2.46 + 9.09 (Eub) | 16.45 | 6.53 / 23.98 / 1.40 | 19.99 / 29.98 (raise 6.00) | 3.50 / -3.65 |
| Foldable cat tent bed | Medium | 19.99 | 385 | 14.99 | 3.62 + 12.28 (Eub) | 22.65 | 11.02 / 34.98 / 1.33 | 21.99 / 36.98 (raise 2.00) | 5.16 / -3.38 |
| Foldable cat tent bed | Large | 23.99 | 405 | 14.99 | 4.71 + 12.54 (Eub) | 24.57 | 12.98 / 38.98 / 1.60 | 22.99 / 37.98 (holds today) | 6.71 / -3.80 |

Notes on the table:
- Quick-dry semicircle variants (691-891 g) were not separately quoted. They cost the same as the matching oval size and weigh more, so their freight should be a little higher than the oval quote. Re-quote before changing semicircle prices.
- Woven bath mat cost varies by style (0.94 to 1.95 USD); the worst style is used. Cat tent cost varies by colour; the worst colour is used.
- Rope basket 3-pack variants are not in the store and were not analysed.
- "Snowflake cushion cover" was taken to be the single-design product "Cotton Embroidered Snowflake Christmas Cushion Cover" (CJJJJFKD00102). The separate "Embroidered Christmas Cushion Cover, 8 Designs" product (CJKD1576869, 15.99, 80 g) was not analysed; say if it is the one meant.

## Option D: lighter line or lower weight

- The band comes from the Shopify variant weight, not the CJ line, so switching to a lighter or cheaper line lowers landed cost but never changes the band by itself.
- Woven bath mat 40x60: Shopify weight is 735 g but CJ lists 505 g. Correcting the weight moves the band from 19.99 to 14.99, so checkout falls from 36.98 to 31.98 and profit becomes 15.09. This is a data fix, not a trick, and it helps the ratio.
- Door mat 45x70 Grey: 624 g, only 24 g over the 600 g band. The brown 45x70 is 299 g, but the grey is the one sold, so no change.
- Rope basket: net 900 g, packed 950 g. Using 900 would drop the band to 19.99 but under-declares the packed weight, so it is not recommended. Its freight is volume-driven (410x220x90 mm).
- Stadium cushion: freight is volume-driven (120x400x420 mm) and costs more than its price-to-weight suggests.
- Cat tent: all variants are far below the 300 g or 600 g limits; the swing is the line, not the band. Eub saves 3.35 (S), 4.16 (M) and 8.43 (L) USD over Ordinary.
- Snowflake single: JYSP Sensitive is 5.38 vs Ordinary 5.78 USD, about CA$0.57 saved, band unchanged.

## Recommendation per product

Photo issues come from the owner's brief (not re-inspected here). Under the publish gate, an image with a visible logo or brand fails the technical check.

1. Door mat (grey, 2 sizes): KEEP. Profit CA$15.26 and 17.66. Checkout 34.99 and 44.98 with price:shipping 0.75-0.80 is the lopsided part. Competitor totals unknown, so do not change price until a Canadian competitor total is checked. If a check shows it too high, the price can drop to 11.99 / 14.99 and still clear CA$12.
2. Quick-dry bath mat: KEEP. Best margin of the seven (CA$17.56 to 29.09). Ratio is healthy (1.3-1.4). Large sizes have room to drop price (50x80 to 15.99 still clears 12), so check competitors on the 60x90 (total 57.98), which is the highest checkout total of the seven. Re-quote semicircle freight first.
3. Woven bath mat: KEEP. Fix the 40x60 weight to 505 g (Option D). Profit then CA$15.09 at checkout 31.98.
4. Snowflake cushion cover: FIX PHOTOS OR DROP. Profit is thin but acceptable on the single (CA$12.93, no room to cut price) and strong on the 4-pack (CA$30.97, but a 63.98 checkout). Logos on all images mean the product fails the gate as is. Seasonal (order by 2026-11-28). If clean images cannot be sourced quickly, drop it.
5. Folding stadium seat cushion: DROP UNLESS IMAGES ARE REPLACED. Profit CA$14.91 is fine, but the Nike swoosh fails the gate. Checkout 37.98 on an item with CJ cost of USD 4.22 is also hard to defend against local competitors. Price floor for CA$12 profit is 15.99.
6. Woven cotton rope storage basket: DROP UNLESS THE BRAND TAG IS REMOVED FROM THE IMAGES. Profit CA$18.90 but checkout 47.98 on a bulky item (freight USD 15.56 is 4x the cost). Highest freight burden relative to cost of the seven. Keep only if a competitor total check supports it.
7. Foldable cat tent bed: DROP the named-book-spine images and fix prices before keeping. Small (CA$6.53) and Medium (CA$11.02) are below the CA$12 target. Either raise Small to 19.99 and Medium to 21.99, or remove them and keep Large only (CA$12.98 as is). Switching to the Eub line is required for these numbers; on Ordinary, Medium and Large would lose money.

## Suggested actions for the owner (nothing applied)

- Replace or retake the images on items 4, 5, 6, 7 before they stay live.
- Correct the woven bath mat 40x60 weight to 505 g.
- Price decisions on items 1, 2, 3 wait on a Canadian competitor total check (record as checked or not checked).
- For the cat tent, decide between raising Small and Medium or removing them, and confirm the CJ order uses the Eub line.
- Add `cj:<pid>` tags to the five products that lack them.

## CJ product ids found

- Woven bath mat: 89FAC005-6354-4A7B-BE49-2AF7779A370E
- Quick-dry bath mat: 1440855621082681344
- Snowflake cushion cover: 49C879B1-6742-469D-8533-08D38E783146
- Rope basket: 2607071254461633100
- Cat tent: 1399192301615583232
- Door mat (tagged): CB9F6E31-A086-411A-BCC5-CE3C1985873F
- Stadium cushion (tagged): 2512310302411624300
