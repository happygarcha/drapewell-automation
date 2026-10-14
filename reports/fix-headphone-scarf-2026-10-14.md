# Photo fix: headphone stand and tassel scarf (2026-10-14)

Both products still DRAFT. Price, copy, tags untouched. No git commit. Files in reports/fix-headphone-scarf-2026-10-14/ (orig/ = CJ before, *-after.jpg = what was uploaded, live/ = re-downloaded from drapewell.myshopify.com cdn).
Method: CJ images added to each draft via productCreateMedia, fetched from the drapewell.myshopify.com cdn path, edited with ImageMagick (feathered Gaussian blur through masks, or crops), uploaded through stagedUploadsCreate, variants re-linked, originals and temp media deleted.

## 1. Black Walnut Headphone Stand (15415550968117) - photos PASS (with one caveat)
CJ only has 4 distinct photos (the 6 listed include 2 duplicates). All 4 are now on the draft: final count 4, all READY.
| Pos | Media id | Variant | Work done |
|---|---|---|---|
| 1 | 57518662058293 | none | unchanged: top view, one headset, no readable brand |
| 2 | 57518662123829 | none | unchanged: plain stand on white |
| 3 | 57537419510069 | Black Walnut | DT 990 PRO lettering on the ear cup blurred (sigma 14) |
| 4 | 57537419542837 | Walnut | blurred: Logitech G logo, Razer logo, two mouse logos, "libi..." text on the mat, a red card, small monitor-bezel text (sigma 18). Viewed at 800 px: nothing readable |
Colours covered: Black Walnut and Walnut each have their own photo; the dropped-colour shots were fixed instead of dropped.
Caveats: (a) the Walnut photo shows a visibly lighter, ash/oak-looking stand than the Black Walnut photos; it is CJ's own photo for that variant, so the owner may want the variant described by what the photo shows. (b) The headsets in photos 3 and 4 are still recognisable gaming/studio headset shapes, only the lettering and logos are blurred. If the owner wants no branded-looking headsets at all, photos 1 to 2 alone are only 2 photos, so that cannot reach 4. Realistically fixable: yes, as is.

## 2. Women's Tassel Scarf Wrap (15414984180021) - photos PASS for 3 colours; "Beige Red" cannot be fixed
Current draft state differed from the gate report: it already had 3 variants (Sky Blue Orange, Camel, Yellow) and 4 photos, with no Beige Red variant. Those 4 photos still had the props (camellia flower on 2, handbag with clasp, card text), so they were redone.
Final: 4 photos, all READY, 3 colours.
| Pos | Media id | Variant | Work done |
|---|---|---|---|
| 1 | 57537424556341 | Sky Blue Orange | handbag clasp (bottom left) and card text (right, beside sunglasses) blurred |
| 2 | 57537424589109 | Camel | card text and bag edge blurred |
| 3 | 57537424621877 | (Camel, second angle) | cropped to remove the top 230 px (white camellia flower on the hanger); 1920x1690 |
| 4 | 57537424654645 | Yellow | CJ yellow variant photo, cropped to the left 1590 px so the CHANEL box, sunglasses and bag are out; 1590x1920 |
Removed: CJ blue-gray collage (photo 5, face of a woman, "Liu Yifei same style" celebrity text, houndstooth pattern, a different design; only a 270 px thumbnail of the scarf is usable, so not fixable), the old yellow photo with camellia, handbag clasp and card text, the CJ beige photos with camellia (29f3d33a), black label (9d7b5fff) and brand box.
Beige Red: CJ's Beige Red photo (2ce2b94c) is a pale peach-beige scarf with blue and brown motifs and a grey reverse. There is NO red in the scarf (the only red is a fingernail in the yellow photo and a button). So a "true beige-and-red photo" does not exist at CJ; I could not make one. I did make a clean crop of the beige photo (x 330-1410, CHANEL box and handbag fully cropped out): reports/fix-headphone-scarf-2026-10-14/scarf-beige-after.jpg, not uploaded to the product. If the owner wants this colour, the honest name is "Beige" (or "Beige Blue"), not "Beige Red"; that is a variant rename the owner must approve.
Realistically fixable: yes for the 3 colours now on the draft. Beige Red: not as named.
Not done: copy fixes ("soft", "knit"), which the gate report also flags.

## Verification
Each edited image was viewed at full size before upload (headphone walnut re-viewed from the live cdn copy; Shopify re-encodes so the files differ byte-wise but looked identical). Product status DRAFT and all 8 media READY read back after the changes. Staged upload URLs are single-use temp links; no keys recorded.
