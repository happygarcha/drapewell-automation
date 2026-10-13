# Fix: kitchen mat and chenille blanket drafts (2026-10-13)

Owner said "Yes" (2026-10-13) to fixing the photo and name failures from `reports/gate-3-ad-signal-drafts-2026-10-13.md`. Both products are still DRAFT, publishedAt empty, 0 publications (read back). No price, SKU, weight, other product, theme or shipping profile was changed. The gate has NOT been re-run; the owner has NOT approved publishing. Christmas stocking untouched.

Method: CJ images added to the draft via productCreateMedia so Shopify fetched them, downloaded from drapewell.myshopify.com/cdn/shop/files/, edited with ImageMagick, uploaded with stagedUploadsCreate + productCreateMedia, linked with productVariantsBulkUpdate (mediaId), old media deleted, temp media deleted. Each result was viewed at full size.
Before/after images: `reports/fix-mat-blanket/`.

## Product A: L-Shaped Coral Fleece Kitchen Floor Mat (15415977247029)

### Photos
Camel, Coffee, Light gray, Dark gray: cropped to 1030 x 1030 px from (170,170) of the 1200 x 1200 original. This removes the whole top band where the grey patch (Camel) and thin patch strip (the other three) sat. Black: same crop, plus a feathered sigma-10 blur over the faint ghost text across the top of the mat (only visible with a 4x contrast boost, now not visible even boosted at normal view). Viewed after upload: no patch, strip or lettering in any of the five; mat colour matches variant name.

| Variant colour | Old media (deleted) | New media | Size |
|---|---|---|---|
| Light gray | 57521512317237 | 57527709237557 (mat-light-gray.jpg) | 1030 x 1030 |
| Dark gray | 57521512350005 | 57527709270325 (mat-dark-gray.jpg) | 1030 x 1030 |
| Coffee | 57521512382773 | 57527709303093 (mat-coffee.jpg) | 1030 x 1030 |
| Camel | 57521512415541 | 57527709335861 (mat-camel.jpg) | 1030 x 1030 |
| Black | 57521512448309 | 57527709368629 (mat-black.jpg) | 1030 x 1030 |
| (swatch) Dark blue | 57521512481077 (deleted) | none | |
Underside photo 57521512612149 kept (alt "dotted grip backing" changed to "dotted backing", because CJ English text has no grip claim). Alts of the five new photos reworded ("in a kitchen corner", the counter is no longer the subject). Order: light gray, dark gray, coffee, camel, black, underside.

### Dark blue: variants removed
Searched all 14 CJ gallery images and 11 description images (all added temporarily to the draft, viewed, then deleted: 18 temp media). No photo is mapped to Dark blue except the flat colour circle. There IS a real photo of a deep navy mat (gallery image 5b8ba021, and description image 84b611f4, a darker copy of the same scene), but CJ maps it to a different variant ("Upper Cyan", not sold here), and its navy is darker than the Dark blue swatch (rgb about 42,51,95 vs 52,73,130). I could not confirm it shows what CJ ships as "Dark blue", so I did not use it. Fallback applied: productVariantsBulkDelete of 67682445721909 (Dark blue / 80 x 120) and 67682445754677 (Dark blue / 80 x 150). Saved for the owner to decide: `reports/fix-mat-blanket/candidate-blue-mat-84b611f4.jpg` (it too has a grey patch strip at the top and would need the same crop). CJ SKUs of the removed variants: CJYD296272713MN, CJYD296272714NM.

### Text before / after
| Field | Before | After |
|---|---|---|
| Title | L-Shaped Coral Fleece Kitchen Floor Mat, 2 Sizes, 6 Colours | L-Shaped Coral Fleece Kitchen Floor Mat, 2 Sizes, 5 Colours (59 chars) |
| Handle (draft, no public page, no redirect) | ...-2-sizes-6-colours | l-shaped-coral-fleece-kitchen-floor-mat-2-sizes-5-colours |
| SEO title | L-Shaped Coral Fleece Kitchen Floor Mat \| Drapewell (51) | unchanged (never said 6 colours) |
| Meta description | ...mat in 6 colours, 80 x 120 cm or 80 x 150 cm. Supplier lists it as washable. Tracked shipping to Canada and the US. | same with "5 colours" (151) |
| Description | no colour count | added bullet "Colours: light gray, dark gray, coffee, camel and black"; rest unchanged |
The "45" in the size string and the "Supplier lists it as washable" meta wording were left as they were (the gate called them optional).

### Read-back
10 variants (5 colours x 2 sizes), prices unchanged 22.99 and 24.99, all 10 in delivery profile 135205912885, all 10 have an inventory level at location 115880919349. Option Colour values: Light gray, Dark gray, Coffee, Camel, Black (no orphan; Dark blue value gone). Size values 80 x 120 cm and 80 x 150 cm. 6 images, all READY, each variant linked to its colour photo.

## Product B: Chenille Knit Throw Blanket with Tassels (15415977378101)

### Photos
| Colour | Old media (deleted) | New media | Fix |
|---|---|---|---|
| Mustard yellow (was Lemon yellow) | 57521524343093 | 57527710286133 (blanket-mustard-yellow.png, 800 x 800) | Leftover white letters in the bottom fringe removed with a masked grayscale opening (thin bright strokes only) limited to x 400-550, y 698-792. At 800 px the letters are gone; the fringe in that spot is slightly smoothed, not obvious at full size. |
| Taupe (was Khaki) | 57521524310325 | 57527710318901 (blanket-taupe.png, 800 x 800) | Crude retouch smear (torn grey and white edge, bottom right) softened with a sigma-18 blur through a feathered mask, x 560-800, y 670-800. It now reads as an out-of-focus foreground cushion and rug edge. |
Cropping was not possible without losing the tassel fringe (800 px minimum), so blur was used. Beige/Cream photo left as is (the chair-leg patches were optional and look acceptable). Order: Cream, Taupe, Mustard yellow, Brick red, Coffee brown, Dark blue; every variant linked to its own photo.

### Colour names (option values renamed, SKUs unchanged)
| Before | After | Why |
|---|---|---|
| Beige | Cream | photo is white/cream (owner request) |
| Khaki | Taupe | photo is grey-beige (about rgb 150,140,130 knit base), not yellow-tan khaki. Extra fix |
| Lemon yellow | Mustard yellow | owner request, photo is mustard |
| Crimson | Brick red | owner request |
| Caramel coffee | Coffee brown | photo is dark chocolate brown with cream chevron. Extra fix |
| Dark blue | Dark blue (kept) | photo is dark navy with teal lines; acceptable |
Alt text updated on Cream, Taupe, Mustard yellow, Brick red, Coffee brown (Dark blue unchanged).
Description: popcorn/chevron bullet now reads "Cream, taupe, mustard yellow and brick red are shown in the supplier photos with a raised dot (popcorn) knit; coffee brown and dark blue are shown with a chevron knit", plus a new bullet "Colour names follow the supplier photos; shades can look a little different on screen". Title unchanged (still 6 colours, 65 chars). SEO title (52) and meta (136) unchanged, they name no colours.
Supplier names for the record (CJ listing): Beige, Khaki, Lemon Yellow, Crimson, Caramel Coffee, Dark Blue; the CJ description lists Deep Red, Caramel Brown, Navy Blue. The photos, not CJ names, now drive our names.

### Tag needs-check removed
The tag was added because the colour photos show two different knit patterns (new-drafts-from-ad-signals-2026-10-13.md). That is now stated in the copy, the colour names match the photos and the copy says they follow the supplier photos. I re-read CJ (pid 2604100747481620000): 520 g and 127 x 170 cm including tassels on the 6 sold variants, polyester fibre, 1 blanket, SKUs match. Remaining open items are not CJ data: competitor price (NOT CHECKED, indicative only) and keyword demand (Ubersuggest unavailable). Tag now: ad-signal-2026-10-13, chenille blanket, cj-dropship, cj-pid, cj-sku, knitted blanket, sofa throw, tassel blanket, throw blanket.

### Read-back
6 variants, price 32.99 each, all 6 in profile 135205912885, all 6 with inventory level at 115880919349, 6 images READY.

## Could not fix / for the owner
- Dark blue mat: no confirmed real photo; variants removed (see above). If the owner decides the navy photo is right, re-add two variants (SKUs above, 350 g and 400 g, 22.99 and 24.99) with a cropped copy of the candidate.
- Mustard and Taupe edits are retouches, not clean originals; review at full size before publish.
- Mat 120 cm freight still not requoted separately; competitor prices not checked; page-level and keyword checks pending. Publish gate must be re-run on both.
