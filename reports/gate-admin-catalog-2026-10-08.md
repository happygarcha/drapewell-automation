# Publish gate, admin-side catalog check (read-only), 2026-10-08

Store: aqudpc-ca.myshopify.com (CAD). Source: Shopify Admin GraphQL, read-only, all 91 products fetched in 4 pages (25 per page); nothing was changed.
Nothing was truncated (max 11 variants per product, max 11 media, max 2 inventory locations per variant on the fields queried; the first:100 / first:30 / first:5 caps were never hit).

## Totals
- Products: 91 (ACTIVE 77, DRAFT 14, ARCHIVED 0). Variants: 855. Media items: 689. All vendor = Drapewell.
- Publication counts: ACTIVE 61 products at 5, 15 at 8, 1 at 7 (not an anomaly by the rule given, but uneven); DRAFT 14 at 0.

## Result by check
1. Status/publications: ACTIVE with 0 publications: 0. DRAFT with publications: 0. OK. (Note uneven publication counts above: 5 vs 7 vs 8 channels. Not checked which channels; only the count was requested.)
2. Weight: variants with weight 0/missing: 0. Above 3000 g: 0. OK (all units GRAMS).
3. Delivery profile: 850 variants in 'CJ Dropshipping Fulfillment', 5 in 'General profile' (1 product):
   - hat-scarf-and-gloves-3-piece-set-fleece-lined-winter-set (all 5 variants, SKUs CJBQ258141201AZ..05EV)
4. No inventory level at location 'cjdropshipping': 17 variants in 3 products (838 of 855 variants have it):
   - electronic-kitchen-scale: 8 variants, only at location 'teemdrop' (TeemDrop-sourced, SKU SUKIDKB...)
   - nordic-jacquard-tablecloth-with-tassels-140-140-cm-4-colours: 4 variants (…01AZ, 04DW, 07GT, 10JQ), only at '12088 75a Ave'
   - hat-scarf-and-gloves-3-piece-set-fleece-lined-winter-set: 5 variants, only at '12088 75a Ave'
   (Location '12088 75a Ave' is on 335 variants; it is the shop's own address location.)
5. Missing SKU: 0.
6. Tag styles: 'cj:<id>' 38 products. No 'cj:' tag: 53 products, of which
   - 4 carry other cj-style tags: rustic-wood-print-kitchen-runner-rug, botanical-watercolour-shower-curtain, chenille-jacquard-tassel-table-runner (all 'cj-dropship' + 'cj-pid:<id>'); nordic-jacquard-tablecloth-with-tassels-140-140-cm-4-colours ('cj-pid:' + 'cj-sku:').
   - 49 carry no cj tag of any style (full list below).
   Tag style counts across all 91: cj: 38; cj-pid: 4; cj-dropship: 3; cj-sku: 1; none: 49.
7. Media: status not READY: 0. Fewer than 3 images (4 products):
   - modern-art-colourful-wall-print (2), thanksgiving-maple-leaf-pumpkin-wreath (2), autumn-maple-leaf-pumpkin-embroidered-cushion-cover (1), printed-waterproof-shower-curtain-180-180-cm-hooks-included (1)
   Empty alt: 7 products have ALL images with empty alt (count of products only; total image count in them is 50):
   waterproof-desk-mat-large-pu-leather-look-mouse-pad-3-sizes, crescent-moon-candle-holder-metal-tealight-holder-gold-or-black, milk-velvet-fleece-sofa-throw-soft-solid-colour-blanket-120-200-cm, merry-christmas-wooden-hanging-sign-5-designs-20-cm, book-shaped-wooden-pen-holder-retro-desk-organizer-small, double-camping-hammock-parachute-nylon-300-200-cm-4-colours, folding-stadium-seat-cushion-portable-oxford-cloth-bleacher-pad-3-colours. Other products have no empty alts.
8. SEO: missing title: 0; missing description: 0; title over 60: 0. Description outside 130-155: 27 products (listed with length):
   tie-dye-plush-rug-plush-toilet-three-piece-set 122; rustic-wood-print-kitchen-runner-rug 158; botanical-watercolour-shower-curtain 161; flower-shaped-plush-bedside-rug 112; nordic-knitted-throw-blanket-tassel 129; embroidered-christmas-table-runner 129; red-christmas-table-runner-coffee-table-cover 124; foldable-fleece-pet-bed-mat 126; abstract-wall-art-print-30x40 127; modern-art-colourful-wall-print 129; red-christmas-tree-skirt-48-inch 124; embroidered-knitted-christmas-stocking 128; towel-embroidered-pumpkin-cushion-cover-45x45 103; autumn-maple-leaf-pumpkin-embroidered-cushion-cover 112; thanksgiving-maple-leaf-pumpkin-wreath 123; round-christmas-doormat-non-slip-festive-entry-rug-4-sizes 128; woven-cotton-rope-storage-basket-43-x-33-cm-6-colours 123; cotton-printed-tea-towel-set-retro-and-blue-and-white-kitchen-towels-45-x-45-cm 129; cotton-linen-kitchen-curtain-with-tassels-half-shade-short-window-curtain-6-sizes 125; dog-breed-oven-mitt-and-trivet-set-2-piece-kitchen-gift-set-7-breeds 115; laptop-sleeve-case-protective-notebook-cover-for-11-to-15-inch-laptops-5-colours 119; hotel-style-bed-runner-plain-modern-bed-throw 122; absorbent-non-slip-door-mat-latex-backing-grey 129; non-slip-back-seat-dog-bed-mat-soft-padded-car-seat-cover 121; milk-velvet-fleece-sofa-throw-soft-solid-colour-blanket-120-200-cm 123; merry-christmas-wooden-hanging-sign-5-designs-20-cm 119; double-camping-hammock-parachute-nylon-300-200-cm-4-colours 129.
   (Most are only 1 to 8 characters short of 130; 4 are well short: 103, 112, 112, 122.)
9. Not in any collection: 1 product: nordic-jacquard-tablecloth-with-tassels-140-140-cm-4-colours.
10. Variant price below 9.99 or above 60: 0. OK.
11. Shipping band over 100% of the cheapest variant price (band chosen by the HEAVIEST variant; cheapest price used) , 7 products:
   | handle | cheapest price | max weight | band | ship | % of price |
   |---|---|---|---|---|---|
   | absorbent-non-slip-door-mat-latex-backing-grey | 15.00 | 973 g | up to 1200 g | 24.99 | 167% |
   | quick-dry-non-slip-bath-mat | 19.99 | 984 g | up to 1200 g | 24.99 | 125% |
   | cotton-embroidered-snowflake-christmas-cushion-cover | 15.99 | 696 g | up to 900 g | 19.99 | 125% |
   | non-slip-woven-bath-mat | 16.99 | 735 g | up to 900 g | 19.99 | 118% |
   | folding-stadium-seat-cushion-portable-oxford-cloth-bleacher-pad-3-colours | 17.99 | 620 g | up to 900 g | 19.99 | 111% |
   | woven-cotton-rope-storage-basket-43-x-33-cm-6-colours | 22.99 | 950 g | up to 1200 g | 24.99 | 109% |
   | foldable-cat-tent-bed | 13.99 | 405 g | up to 600 g | 14.99 | 107% |
   Caveat: band prices are as supplied in the brief; I did not verify them against the shipping profile in Shopify. Variants lighter than the max may fall in a cheaper band.

## Products without any cj tag (49)
modern-bath-set, terrazzo-shower-curtain, geometric-shower-curtain, anti-mildew-shower-curtain, botanical-coastal-boho-peva-shower-curtain, dinosaur-shower-curtain, watercolour-shower-curtain-set, round-plush-accent-rug, poached-egg-doormat, non-slip-woven-bath-mat, jacquard-cotton-towel-set, quick-dry-non-slip-bath-mat, tie-dye-plush-rug-plush-toilet-three-piece-set, bathroom-black-cat-canvas-poster-toilet-wall-art-print, matte-black-bathroom-accessories-set-plastic-soap-dispenser-toothbrush-holder-cup-soap-dish-for-modern-bathroom-decor, electronic-kitchen-scale, botanical-watercolour-canvas-wall-art-set-of-3, flower-shaped-plush-bedside-rug, cotton-kitchen-apron-solid-colour, nordic-knitted-throw-blanket-tassel, embroidered-christmas-table-runner, red-christmas-table-runner-coffee-table-cover, foldable-cat-tent-bed, foldable-fleece-pet-bed-mat, abstract-wall-art-print-30x40, modern-art-colourful-wall-print, red-christmas-tree-skirt-48-inch, embroidered-knitted-christmas-stocking, embroidered-christmas-cushion-cover-45x45, cotton-embroidered-snowflake-christmas-cushion-cover, towel-embroidered-pumpkin-cushion-cover-45x45, autumn-maple-leaf-pumpkin-embroidered-cushion-cover, thanksgiving-maple-leaf-pumpkin-wreath, round-christmas-doormat-non-slip-festive-entry-rug-4-sizes, woven-cotton-rope-storage-basket-43-x-33-cm-6-colours, cotton-printed-tea-towel-set-retro-and-blue-and-white-kitchen-towels-45-x-45-cm, christmas-tablecloth-printed-polyester-rectangular-table-cover-3-sizes, moon-and-stars-wall-tapestry-soft-polyester-wall-hanging-4-sizes-3-designs, ombre-gradient-sheer-curtains-semi-sheer-window-panels-3-colours-4-lengths, boho-macrame-leaf-wall-hanging-woven-cotton-tapestry-with-tassels-30-x-85-cm-6-colours, 4d-mesh-bath-pillow-with-suction-cups-machine-washable-bathtub-neck-and-back-support, christmas-linen-kitchen-apron-festive-cotton-linen-cooking-apron-12-prints, cotton-pillowcase-pair-48-x-74-cm-soft-twill-standard-pillow-covers-12-colours, nutcracker-christmas-door-banner-set-2-hanging-porch-banners-180-cm, lace-toilet-seat-cover-set-3-piece-fabric-and-lace-set-zipper-style-12-colours, cotton-linen-kitchen-curtain-with-tassels-half-shade-short-window-curtain-6-sizes, christmas-shower-curtain-printed-polyester-bathroom-curtain-3-festive-designs, dog-breed-oven-mitt-and-trivet-set-2-piece-kitchen-gift-set-7-breeds, laptop-sleeve-case-protective-notebook-cover-for-11-to-15-inch-laptops-5-colours

## Not checked / limits
- Which sales channels the publications are (count only). Shipping-profile rates themselves were not read. Weight band uses the heaviest variant.
