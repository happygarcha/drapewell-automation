# Gate fixes: products C and D (2026-10-13)

Owner approved (reply "2": copy and variant edits, still as drafts). Only these two products were edited. No price, collection, theme, setting or publication was touched. Before-state: `reports/gate-fixes-before-2026-10-13.json`. Gate source: `reports/gate-10-drafts-2026-10-13.md`.

## C. Dog vest (gid://shopify/Product/15414982377781, CJ pid 1440623013967040512)

CJ says only "Teddy cashmere + twill"; photos 1 and 2 (viewed) show teddy-textured collar and pockets on a twill-look body. Copy now says only that. No "lining", "fleece" or "cashmere" anywhere in title, SEO, description or alt text.

| Field | Before | After |
|---|---|---|
| Title | Dog Vest with Teddy-Fleece Style Lining, Beige or Green (55) | Dog Vest with Teddy-Style Collar and Pockets, Beige or Green (60) |
| SEO title | Dog Vest, Beige or Green, XS to 2XL \| Drapewell (47) | Dog Vest, Teddy-Style Collar, Beige or Green \| Drapewell (56) |
| Meta | ...teddy-fleece style lining and twill outer... (143) | Casual dog vest in beige or green with teddy-style fabric on the collar and pockets and a twill outer. Sizes XS to 2XL, with a supplier size guide. (147) |
| Handle | dog-vest-teddy-fleece-style-lining-beige-green | dog-vest-teddy-style-collar-beige-green (old handle contained "teddy-fleece-style-lining"; set with redirectNewHandle=false, no redirect created; the product was never published) |
| Description | first line and fabric bullet said "teddy-fleece style lining" | first line: teddy-style fabric on the collar and pockets and a twill outer; bullet: "Fabric: twill outer with teddy-style fabric on the collar and pockets". Size guide (labelled supplier size guide), colours, included line and delivery paragraph unchanged |
| Alt text | images 1-3 said "teddy-fleece style collar" | now "teddy-style collar" (images 4-6 unchanged) |

## D. Tassel scarf wrap (gid://shopify/Product/15414984180021, CJ pid 2505090302361608000)

- Deleted variant Beige Red (CJYD237196301AZ) with productVariantsBulkDelete. Option value Beige Red was removed with it; Colour is now Sky Blue Orange, Camel, Yellow.
- Deleted photos 5 (blue/cream close-up, 57514733961525) and 6 (beige/grey with handbag and label, 57514733994293) with productDeleteMedia. 4 photos remain.
- Variant image check (viewed through the shop CDN, width 500): Sky Blue Orange = photo 1 (teal-blue with orange lining, matches), Camel = photo 2 (camel/peach, matches), Yellow = photo 4 (yellow, matches). Photo 3 (camel on a stand) is an extra Camel view. Alt texts all match their photos; none mention beige red or blue gray.
- Copy: description colours line now "sky blue orange, camel, yellow"; meta says "Three colours" (was "Four", 131 chars). Title, 67 x 185 cm, "soft polyester knit-look fabric" kept; no cashmere, warmth or season claim.

| Field | Before | After |
|---|---|---|
| Variants | 4 (Beige Red, Sky Blue Orange, Camel, Yellow) | 3 (Sky Blue Orange, Camel, Yellow) |
| Photos | 6 | 4 |
| Meta | ...Four colours... (130) | ...Three colours... (131) |
| Description colours | beige red, sky blue orange, camel, yellow | sky blue orange, camel, yellow |

Open point for the owner: a small white flower brooch (camellia-like) still appears on the scarf in photos 3 and 4, and a handbag edge is visible bottom-left in photo 4. No readable brand. Task scope was photos 5 and 6 only, so these were left; the gate report flagged this as an owner call.

## Confirmation (re-read from Shopify after the edits)

- Both products: status DRAFT, publishedAt null, resourcePublicationsCount 0.
- All variants (12 for C, 3 for D) are in delivery profile gid://shopify/DeliveryProfile/135205912885 (CJ Dropshipping Fulfillment) and have inventory levels at gid://shopify/Location/115880919349 (also 115880493365, as before); nothing needed fixing.
- Weights unchanged (C 120-170 g, D 360 g). SKUs unchanged. Tags cj:1440623013967040512 and cj:2505090302361608000 still present. All media READY.
- These products still need the full publish gate when the owner says publish (SEO/Ubersuggest, technical, schema, copy, GEO re-run). Gate status after the edits: C expected PASS on copy, D expected PASS on photos; not re-run here.
