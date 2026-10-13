# Beauty and Tech replacement research, 2026-10-13 (read-only)

Nothing was created, published or changed in Shopify or CJ. Goal: find new Beauty and Tech products that pass the screen, after the earlier commodity items were archived because Canadian shelf prices were far below ours.

Result: **Beauty 3 PASS, Tech 3 PASS.** The target was 4 each, so both are short by one. The bar was not lowered. The 3 beauty passes are one product type (a rotating makeup-brush holder) in three CJ listings, so treat them as one product to launch, not three. One tech pass (cork desk pad) overlaps an existing store product category (see notes).

## Method
- Store check: Shopify search of current products. No headphone stands, brush holders, cable organisers or toiletry bags exist. Overlaps to note: ACTIVE "Large Desk Mat Mouse Pad - 3 Sizes, PU Surface" (CJ pid 1476145805931974656) and ACTIVE laptop sleeve. Archived earlier: desk phone/tablet stands, cable clips, makeup sponge set, coin purse.
- CJ catalogue: 18 searches, filters minPrice 1.5, maxPrice 9, startWarehouseInventory 300, orderBy 1 (most listed), pageSize 30. About 540 listings read (Beauty 11 searches, about 330; Tech 7 searches, about 210; the laptop-sleeve search was not read because the store already has one).
- Beauty searches: brush holders/organisers, hanging toiletry bags, claw clips (2), jewellery organisers, travel bottle sets, cosmetic bag sets, hair brushes, nail kits, boar-bristle brushes, hair accessory sets. Tech searches: cable/gadget organisers, large desk mats, phone/tablet stands, headphone stands, phone crossbody/lanyards, monitor risers and laptop stands.
- Funnel: Beauty about 330 read -> 14 shortlisted -> 12 screened with get_product_detail -> 3 PASS, 2 RISK, rest FAIL. Tech about 210 read -> 18 shortlisted -> 16 screened -> 3 PASS, 5 RISK, rest FAIL or excluded.
- Money formulas as in docs/dropshipping-playbook.md: landed CAD = (CJ USD + freight USD) x 1.42443; band <=300 g 9.99, <=600 g 14.99; profit = 0.971 x (price + band) - 0.30 - landed; need >= CA$12; price shown is the lowest x.99 (floor 19.99) that gives profit >= 14.
- Freight: real CJ quotes (Toronto M5V 2T6, CJPacket Ordinary) for 10 products, marked **Q**. Others use 3.78 + 0.0113 x grams, marked **E**. The formula matched every compact quote within 3 cents (250 g 6.59 vs 6.61, 94 g 4.87 vs 4.84, 103 g 4.97 vs 4.94, 350 g 7.73 vs 7.74, 370 g 7.95 vs 7.96, 500 g 9.56 vs 9.43).
- **New finding: volumetric weight breaks the formula for bulky shapes.** A 420 g wood stand (21x23x23 cm) quoted 19.73 and a 500 g cable bag (26x34x11 cm) quoted 17.80 on CJPacket Ordinary. Large-volume items need a real quote before any estimate is trusted.
- Competitor prices: WebSearch restricted to amazon.ca, walmart.ca and other Canadian retailers. The search tool returns summarised listing snippets, so the CAD figures below are snapshots and not hand-checked. Treat them as evidence to confirm, not as final. Where no CAD price came back the cell says "not checked". Checkout (price + band) must be within about 1.5x the typical CAD shelf price. Typical = median of the CAD prices found.
- Not done: photos (cannot be viewed from the sandbox, so "photos not viewed" for every product; photo counts are from CJ). Ubersuggest demand not used. No demand or sales numbers are claimed.
- Skipped on rule: over 600 g, branded items, health/safety text, apparel, battery or electric items.

## Beauty (accessories and tools only)

| # | Product | CJ pid | SKU | Cost USD | Weight | Freight USD | Landed CAD | Price + band = checkout | Profit CAD | CAD competitor evidence | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B1 | 360 rotating makeup brush holder, 5 compartments, 8 colours | 1930195019889389569 | CJSB2392642 | 5.66 | 250 g | 6.59 Q | 17.45 | 22.99 + 9.99 = 32.98 | 14.27 | Amazon.ca rotating brush holders: 22.99, 23.99, 29.30, 37.26 (median about 26.65). Checkout is 1.24x | PASS. 11 photos, 15x15x13 cm ABS. Supplier text mentions "skincare": copy must stay on brushes, lipsticks, tools. Photos not viewed |
| B2 | 360 rotating brush organiser with lid, 5 compartments (use the "White with Lid" variant) | 1930181879126568962 | CJSB2392545 | 3.48 | 350 g | 7.73 Q | 15.97 | 19.99 + 14.99 = 34.98 | 17.70 | Same rotating-holder set, median about 26.65. Checkout 1.31x | PASS. 11 photos. Skip the 300 g no-lid variants (cost 2.57, CJ suggests 14.76, commodity). Photos not viewed |
| B3 | Press-pop brush holder with clear lid, 4 slots, 2 colours | 1930150073442512898 | CJSB2392325 | 4.76 | 500 g | 9.56 Q | 20.40 | 20.99 + 14.99 = 35.98 | 14.24 | Same set, median about 26.65. Checkout 1.35x | PASS. 7 photos. Do not copy the supplier claim "blocks 99% of airborne particles". Photos not viewed |
| B4 | 360 rotating brush holder, sliding dust lid, 3 slots | 1929838880818356225 | CJSB2391867 | 6.71 | 500 g | 9.56 E (from B3 quote) | 23.18 | 23.99 + 14.99 = 38.98 | 14.37 | Same set, median about 26.65. Checkout 1.46x | RISK. At the 1.5x limit and freight not separately quoted. Same product type as B1 to B3, so it adds nothing new |
| B5 | Acrylic brush holder with lid, pearl look, 3 colours | 1930168702179487746 | CJSB2392468 | 4.99 | 400 g | 8.30 E | 18.93 | 19.99 + 14.99 = 34.98 | 14.73 | Non-rotating acrylic holders: not checked (no CAD price returned) | RISK. 5 photos only. Likely cheaper on shelf than the rotating style |
| B6 | Cute bow brush/pen holder, 6 colours | 2604090236521624600 | CJYD2824711 | 3.69 | 92 g | 4.82 E | 12.12 | 19.99 + 9.99 = 29.98 | 16.69 | not checked. CJ suggested retail 27.53 | RISK. Light plastic decor item, shelf price very likely well under 30. 7 photos |
| B7 | Boar-bristle bamboo airbag comb | 1434769598229647360 | CJAM1277177 | 3.10 | 166 g | 5.66 E | 12.48 | 19.99 + 9.99 = 29.98 | 16.33 | Amazon.ca has many boar-bristle paddle brushes; no CAD prices came back. not checked | RISK. 5 photos. CJ category is "Massage and Relaxation": no scalp or hair-health claims allowed |
| B8 | Large hanging Oxford toiletry bag 30x22x12 cm | 2601280543331632000 | CJYD2746227 | 4.11 | 300 g (one colour 413 g) | 7.17 E, bulky shape (9.3 L) so likely higher | 16.07 | 21.99 + 9.99 = 31.98 | 14.69 | Amazon.ca hanging toiletry bags mostly 13 to 20 CAD (range 8 to 99). Checkout about 1.9x | FAIL. Shelf price about half our checkout; volumetric freight risk. 9 photos |
| B9 | Quilted hanging travel makeup bag, 7 patterns | 2096140444812357633 | CJSB3129085 | 4.27 | 335 g | 7.57 E | 16.87 | 19.99 + 14.99 = 34.98 | 16.80 | Same toiletry-bag range, budget 13 to 20. Checkout about 2.1x | FAIL. 7 photos |
| B10 | Travel jewellery pouch, PU, 13x3.5x13 cm | 2609100910031609300 | CJYD3151885 | 3.69 | 580 g (looks wrong for the size) | 10.33 E | 19.97 | 20.99 + 14.99 = 35.98 | 14.67 | Amazon.ca travel jewellery cases mostly 8 to 30. Checkout about 2x typical | FAIL. 7 photos; weight data doubtful |
| B11 | 16-piece stainless nail clipper/pedicure set | 2018243090249056257 | CJMJ2751800 | 3.69 | 300 g | 7.17 E | 15.47 | 20.99 + 9.99 = 30.98 | 14.31 | Amazon.ca manicure kits 10.99 (9-in-1) to 21.99 (19-piece). Checkout about 1.9x | FAIL. Only 4 photos |
| B12 | 4-piece silicone travel bottle set | 1762772368432304128 | CJYD1977861 | 1.77 (purple only; other colours 11.06) | 220 g | 6.27 E | 11.45 | 19.99 + 9.99 = 29.98 | 17.36 | Amazon.ca 4-packs exist; no CAD prices returned. not checked | FAIL. Commodity item and inconsistent variant cost (1.77 vs 11.06) |

Beauty ideas that did not reach a product:
- Hair claw clips: Amazon.ca 12-packs run 13.99 to 41.87 CAD, but CJ only lists single clips under the cost filter, so no multi-pack could be screened.
- Hair brush search was swamped by pet combs.
- Headbands and scrunchies searches returned only wedding and costume items.

## Tech (no batteries, no model-specific cases)

| # | Product | CJ pid | SKU | Cost USD | Weight | Freight USD | Landed CAD | Price + band = checkout | Profit CAD | CAD competitor evidence | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | Black walnut headphone holder (2 finishes, 22x18x12 cm pack) | 1393121391674527744 | CJGJ1128822 | 6.80 | 350 g | 7.73 Q | 20.70 | 21.99 + 14.99 = 36.98 | 14.91 | Amazon.ca wood/walnut stands: GEVO about 26.19, Avantree 39.99, COREMINDED 49.43, QinCoon 50.26; clamp-on hanger 29.97 (median about 39.99). Checkout 0.92x of median, 1.41x of the cheapest | PASS. 6 photos. Text says "headset brand: other"; no brand names in copy. Stock 80,000. Photos not viewed |
| T2 | Solid wood + aluminium headphone hanger (8 variants) | 2F9B6D62-8586-4EF3-94F9-B0BCB8D1CDF7 | CJXFBXEJ01349 | 3.26 (4 variants), 5.15 (4 variants) | 94 g | 4.87 Q | 11.58 / 14.27 | 19.99 + 9.99 = 29.98 | 17.23 / 14.54 | Wall/desk hangers on Amazon.ca: 16.98, 18.89, 29.97 (clamp). Checkout about 1.6x the wall-hanger prices | RISK. Only 1 gallery photo (8 variant photos, 7 description images). Price test fails against simple hangers. Vids: 6A0AA69E-2ED1-4A43-9BF8-60BE97987612 (3.26), AE0828F3-9D16-4FC7-BF08-8D26A47068AC (5.15) |
| T3 | Large cork + PU leather desk pad, 12 colours, 3 sizes. Priced per size: 600x350 (4.88, 320 g) 19.99+14.99; 800x400 (5.79, 370 g) 19.99+14.99; 900x430 (7.09, 420 g) 22.99+14.99 | 1575024972169490432 | CJJT1574240 | 5.79 (800x400) | 370 g | 7.95 Q (800x400); 7.40 E and 8.53 E for the others | 19.57 | 19.99 + 14.99 = 34.98 | 14.09 | Amazon.ca 80x40 cork/leather pads: about 39.15 (QLXZSSEZ), generic grey leather 80x40 45.89, WANGLE 62.40. Checkout about 0.89x | PASS on money. 13 photos, stock 424,330. **Overlaps** the active PU desk mat; owner decides whether a second desk-mat product is wanted. Vid for 800x400 black: 1575024972299513857. Photos not viewed |
| T4 | Wood headphone stand with phone holder | 2604040648151627800 | CJYD2819332 | 4.73 | 420 g | 19.73 Q (bulky, oversize tag) | 34.84 | 35.99 + 14.99 = 50.98 | 14.36 | Combo wood stand about 44.78 (currency unclear) | FAIL. Freight 4x the formula; would need a CA$51 checkout. Photo filenames end "_water" (possible watermark) |
| T5 | Solid wood earphone stand (variants named UK/EU/US) | B71944C9-9466-45AE-B0DA-1DC3295C7C6E | CJXFBXEJ01370 | 6.82 | 350 g (same item also listed 500 and 538 g) | 7.73 E | 20.73 | 21.99 + 14.99 = 36.98 | 14.88 | Same as T1 | RISK. Variant names make no sense for a stand, weights conflict, text only says "carving, spray painting". 6 photos |
| T6 | Creative solid wood headphone stand, 3 colours | 1446712124616347648 | CJJT1313183 | 8.12 | 597 g (text says 0.45 kg) | 10.53 E, oversize tag so unverified | 26.57 | 27.99 + 14.99 = 42.98 | 14.87 | Same as T1 (median about 39.99). Checkout about 1.07x | RISK. 597 g is at the weight limit, weight data conflicts, oversize tag, no real quote. 7 photos |
| T7 | Aluminium headphone hook holder, 5 colours | 1737653541868670976 | CJYD1926100 | 4.36 | 240 g | 6.49 E | 15.46 | 20.99 + 9.99 = 30.98 | 14.33 | Hook/hanger style: 16.98 to 18.89 on Amazon.ca. Checkout about 1.7x | FAIL. CJ suggested retail is only 17.97. 7 photos |
| T8 | Foldable aluminium tablet/phone stand, 19x19.5 cm | 1753316869915815936 | CJYD1962225 | 6.72 | 220 g | 6.27 E | 18.50 | 23.99 + 9.99 = 33.98 | 14.19 | Amazon.ca foldable aluminium stands 12.59 to 21.49; adjustable models 24.99 to 26.99. Checkout about 1.6x of the typical foldable | FAIL. Same reason the earlier stands were archived. 15 photos |
| T9 | Nordic waterproof leather desk mat, 11 colours (use 40x80 441 g and 70x35 470 g only; 90x45 is 620 g) | 1504398151497822208 | CJYD1440564 | 3.10 | 441 g | 8.76 E | 16.89 | 19.99 + 14.99 = 34.98 | 16.77 | Amazon.ca 80x40 leather mat 45.89, cork/leather 39.15. Checkout about 0.76 to 0.89x | RISK. Money works but it nearly duplicates the active PU desk mat and has 24 variants. 9 photos |
| T10 | Large double-layer travel cable bag | 1403527200413716480 | CJNS1171068 | 6.70 | 500 g | 17.80 Q (bulky) | 34.90 | 35.99 + 14.99 = 50.98 | 14.30 | Amazon.ca double-layer organisers: 23.99 (YOUBDM), 29.99 (Bagsmart) | FAIL. Freight kills it; would need a CA$51 checkout |
| T14 | Glasses-shape foldable aluminium laptop stand | 5DB92F4C-EF47-4679-91AF-2E68A314AE7E | CJJJJTJT17822 | 6.44 | 103 g | 4.97 Q | 16.25 | 21.99 + 9.99 = 31.98 | 14.50 | Walmart.ca portable aluminium stands 11.97, 14.99, 16.99. Checkout about 2.1x | FAIL. 5 photos. Supplier text makes pain-relief claims, which cannot be used |
| T15 | Double-layer cable/gadget organiser bag, Oxford cloth, 3 layers 28x21x3 cm, 3 colours | 2605120844411628900 | CJYD2882785 | 1.91 | 250 g | 6.59 Q | 12.11 | 19.99 + 9.99 = 29.98 | 16.70 | Amazon.ca double-layer organisers: 23.99 and 29.99 (a 95.08 outlier ignored). Checkout about 1.0 to 1.25x | PASS. 10 photos, stock 45,139. Use the "Three layers" variants (250 g); the two-layer ones are 190 g and cost 1.53. Photos not viewed. Vid Black three layers: 2605120844411629400 |
| T16 | Cable organiser kit case, 25x18x5 cm, 15 colours | 517CE21C-1A19-4659-B7B0-55DCD9E43BCE | CJJJJTJT06420 | 2.90 | 125 g | 5.19 E | 11.52 | 19.99 + 9.99 = 29.98 | 17.29 | Smaller than the 23.99 to 29.99 organisers; no CAD price for this size. not checked | RISK. 18 gallery photos but 15 colours. Possible look-alike of a branded case, so photos must be checked for logos |
| T11 | Wooden monitor riser | 2605240547521628800 | CJYD2901889 | 1.93 to 2.11 | 820 to 920 g | n/a | n/a | n/a | n/a | n/a | FAIL. Over 600 g |
| T12 | Foldable laptop stand (MDF + aluminium) | 5F2B4F3D-B43B-4852-995F-7A60D9E2FF2B | CJJSPBPB00139 | 5.42 | 972 to 1010 g | n/a | n/a | n/a | n/a | n/a | FAIL. Over 600 g |
| T13 | 6-piece travel organiser set (packing cubes) | 2608260319101600900 | CJYD3096500 | 5.90 | 470 g | not run | n/a | n/a | n/a | n/a | EXCLUDED. Packing cubes for clothes, not tech; packing cubes were covered in the 2026-10-12 batch |

## PASS list (for the owner to approve into draft; none has been drafted)

Beauty (all rotating-brush-holder family, pick one or two, not all three):
- B1 360 rotating brush holder, 5 compartments | pid 1930195019889389569 | CJSB2392642 | 22.99 + 9.99 = 32.98 | profit 14.27
- B2 360 rotating brush organiser with lid | pid 1930181879126568962 | CJSB2392545 | 19.99 + 14.99 = 34.98 | profit 17.70
- B3 Press-pop brush holder with lid | pid 1930150073442512898 | CJSB2392325 | 20.99 + 14.99 = 35.98 | profit 14.24

Tech:
- T1 Black walnut headphone holder | pid 1393121391674527744 | CJGJ1128822 | 21.99 + 14.99 = 36.98 | profit 14.91
- T3 Cork + leather desk pad | pid 1575024972169490432 | CJJT1574240 | 19.99 + 14.99 = 34.98 | profit 14.09 (800x400; overlaps the existing desk mat)
- T15 Double-layer cable/gadget organiser bag | pid 2605120844411628900 | CJYD2882785 | 19.99 + 9.99 = 29.98 | profit 16.70

## Why fewer than 4 in each category
- Beauty: nearly everything light and cheap in CJ's beauty accessories has an Amazon.ca shelf price of CA$10 to 20 (toiletry bags, jewellery pouches, nail kits, bottle sets). Only the rotating brush holder has CAD shelf prices of 23 to 37, which carries our CA$33 to 36 checkout. Claw-clip multipacks (CAD 14 to 42) are not available as packs on CJ under the cost filter.
- Tech: the shelf-price winners are wood headphone stands, cork desk pads and double-layer organiser bags. Aluminium phone/tablet stands and laptop stands fail on price (Walmart.ca laptop stands 12 to 17). Anything bulky (wood stand with phone holder, big cable bag) fails on volumetric freight, and monitor risers and laptop stands are over 600 g.

## Before any of these are drafted
- Hand-check the CAD prices on amazon.ca and walmart.ca; the figures above come from search snapshots.
- View all photos for logos, watermarks and supplier branding (none viewed here). The wood-stand photos end in "_water".
- Fresh CJ freight quote at draft time. B4, B5 to B12, T3 (other sizes) to T9, T16 used the formula only.
- Copy rules: no skincare, pain-relief, scalp-health or air-filtering claims even where the supplier text makes them (B1, B3, B7, T14).
