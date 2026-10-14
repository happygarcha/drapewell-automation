# Blanket and puzzle photo fixes (2026-10-14)

Both products are still DRAFT, publishedAt empty, 0 publications (read back). No price, copy, tag, title, variant, weight, inventory or shipping-profile change. Method: CJ images added to the draft via productCreateMedia, downloaded from drapewell.myshopify.com/cdn/shop/files/, edited with ImageMagick (crop, or feathered Gaussian blur through an elliptical mask), uploaded with stagedUploadsCreate + productCreateMedia, variants relinked with productVariantsBulkUpdate (mediaId), old and temporary media deleted. Every result was viewed at full size, and the uploaded files were re-downloaded from the Shopify CDN and viewed again. Files: `reports/fix-blanket-puzzle-2026-10-14/` (`cur/` = photos as they were before, `orig/` and `puzzle-orig/` = CJ originals, `after/` and `puzzle-after/` = edited, `verify/` = downloaded back from Shopify).

## 1. Chenille Knit Throw Blanket (15415977378101): PASS (photos)

CJ pid 2604100747481620000. The two failing photos were re-fetched as CJ originals and cropped instead of retouched.
- Mustard yellow (CJ 4df018dc): the original has leftover watermark letters in the bottom fringe (y about 703-773). Cropped to 695 x 695 (from x 10, y 0), which removes them. Left fringe stays partly visible.
- Taupe (CJ b7beeb0c): the original has a crude retouch smear at the bottom right (y from about 690). Cropped to 800 x 685 (y 0-685). Tassels along the sofa side and right edge are kept.
- The earlier smeared retouches (media 57527710286133, 57527710318901) were deleted; new media 57537415708981 (Mustard yellow) and 57537415741749 (Taupe), both READY, alt text unchanged.
- Seen at full size after upload: no text, watermark, smear or artefact in either.
- Other four photos viewed again: Cream, Brick red, Coffee brown, Dark blue are clean. Brick red still shows a few white specks on the floor and slightly torn fringe near x 380-480, y 680-740 (old watermark-removal residue, no letters). Left as is.
- Other CJ images (pink, forest green, orange colours, not sold) were added temporarily, viewed, and deleted.

Final: 6 photos (all READY), 6 colours covered (Cream, Taupe, Mustard yellow, Brick red, Coffee brown, Dark blue), each variant linked to its own photo. Read back: 6 variants, 32.99 each, weight 520 g on all 6, inventory level at cjdropshipping on all 6. No variant was removed. Realistically fixable: done.

## 2. Wooden 3D Puzzle Model Kit (15415977476405): FAIL, recommend deleting

CJ pid B1F31982-A5D2-4C59-A9EE-F8D59C8426B0 (CJ SKU CJWJWJJM00664). All 9 draft photos plus 9 more CJ photos were viewed.

Why it fails: the brand is built into the product. These are Robotime/ROKR kits (Prime Steam Express, Grand Prix car, heavy truck). The name is laser-engraved on the models themselves in every photo: "ROBOTIME" on the train cab plate, a "ROKR" emblem on the tender, a "R" radiator emblem and "robotime" text round the rims of the car wheels, a "ROKR" plate on the truck bumper plus an emblem on the grille and step. Customers also receive the branded parts. Blur can hide the marks in photos but cannot change what is sold.

Dropped (not blurrable or duplicates): ROKR box with hands (12429906804987), shelf scene with 4 models incl. a Jeep not sold (1620358617643), Jeep photos (1620358617636, 32033940182), collages with overlay text "Assembled train", "Grand Prix Car", "Luxury Steam Train", "American Long Head Truck", "Military Jeep" (1620358617642, 1615255487912, 1620358617634), a cream size photo (1106996614559), a white-background car photo whose wheel rims read "robotime" at full size (5314089357286), and the three 500 px duplicates (a1b5b0b2, 2a8bdd01, 9ad52126). All 9 original draft photos were replaced.

Kept (5 photos, all READY), what was blurred:
| Photo | Variant | Edit |
|---|---|---|
| puzzle-train-white-blurred.jpg (800 x 800) | Steam train | sigma-9 blur over the cab "ROBOTIME" plate and the tender "ROKR" emblem |
| puzzle-train-moss-blurred.jpg (800 x 800) | (extra train shot) | same two marks |
| puzzle-train-size-blurred.jpg (800 x 800) | (307 x 67 x 82 mm size diagram) | same two marks |
| puzzle-car-blurred.jpg (800 x 800) | Racing car | blur over the "R" radiator emblem and a sigma-6 blur over the front, rear and back-left tyres and rims to remove "robotime" text |
| puzzle-truck-blurred.jpg (790 x 600, cropped) | Truck | blur over the "ROKR" bumper plate, grille "R" emblem, step emblem and two tyre texts; cropped x 10-800, y 0-600 to drop crude retouch artefacts at the edge and bottom rocks |

Photo check: marks are not readable in any kept photo at full size, so on the narrow test it passes. It fails on quality and on the product: the train photos show obvious smudges on the tender and cab; the racing car wheels look smeared like motion blur, which no shopper would accept; only 1 truck photo remains (minimum is 4 photos in total, met only because 3 are train shots). The Racing car and Truck variants each have a single, compromised photo. The `brand-risk-do-not-publish` and `needs-check` tags were left on the draft.

Read back: 3 variants (Steam train 27.99, Racing car 24.99, Truck 24.99), weight 280 g each, inventory at cjdropshipping, each linked to its photo, 5 photos READY.

Not realistically fixable to a publishable standard. Recommend deleting the draft (the owner decides; not deleted). If the owner prefers to keep it, publish only the train variant, but it is still an engraved-brand product.

## Not done
No gate run, no publish, no commit. The delivery profile membership was not re-queried (no variant was touched except its photo link).
