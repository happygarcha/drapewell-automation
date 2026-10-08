# Publish gate: copywriting (check 4) and GEO / AI-search (check 5), 2026-10-08

Read-only. Nothing in Shopify was read, changed or published. Source: `reports/drafts-beauty-tech-2026-10-08.json` (13 specs). The headband CJYD1488388 was skipped because it was not created, which leaves 12 products. Revised copy is in `reports/gate-copy-revisions-2026-10-08.json` (all 12 revised; the file parses, and every title, SEO title, meta and tag count was checked with a script).

Builds on `geo-aeo-2026-10-07.md` (consistent policy wording, no superlatives, supplier-partner honesty) and `audit-schema-geo-2026-10-08.md` (C2: the "within 5 business days" refund timing is not in the official policy, so it is not used here; M2: run-together words in descriptions).

## Method and limits

- Claims were checked against the spec's own fields and `notes`, and against the CJ titles and rows in `reports/cj-beauty-tech-2026-10-08.md`.
- **CJ pages could not be fetched.** WebFetch failed with ENOTFOUND and curl got a proxy 403, so the full supplier description text was not available. For (a), originality was judged against the CJ titles (keyword-stuffed, Apple/iPad wording), and the drafts are clearly rewritten. A word-level diff against the full CJ descriptions was not possible.
- For (f), the drafts were measured: titles are 50-59 characters, SEO titles 33-48, metas 142-155, with no run-together words. All 12 pass.
- Images were not viewed in this check. Logo, watermark and character-artwork checks belong to the technical gate (check 2).

## Rubric

(a) original text, (b) no brand or trademark names, (c) no health, skin, medical, anti-aging or performance claims, (d) every claim traceable to the CJ data, (e) honest size, material and what's-included lines, (f) title 45-70, SEO title 60 or fewer, meta 130-155 with no run-together words, (g) GEO: liftable answers for what it is, size, material, included, who it suits, and delivery/returns; no superlatives; consistent store facts.

## Results on the drafts as created

| # | CJ SKU | Product | a | b | c | d | e | f | g | Draft result |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | CJSJSJSJ01310 | Adjustable metal desk stand | PASS | PASS | PASS | FAIL | PASS | PASS | FAIL | FAIL |
| 2 | CJSJSJSJ02567 | Suction dashboard car mount | PASS | PASS | PASS | FAIL | PASS | PASS | FAIL | FAIL |
| 3 | CJJT1752681 | Zinc alloy laptop stand pair | PASS | PASS | PASS | FAIL | PASS | PASS | FAIL | FAIL |
| 4 | CJSJ1161149 | Iron wire folding stand | PASS | PASS | PASS | FAIL | FAIL | PASS | FAIL | FAIL |
| 5 | CJSJSJSJ00332 | Pocket foldable phone stand | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 6 | CJQC1086774 | Gravity air vent phone holder | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 7 | CJJT1287599 | 18-piece cable clips | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 8 | CJMB2606544 | 12-piece makeup sponge set | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 9 | CJJJJTYS01111 | EVA shower cap | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 10 | CJBHNSNS08011 | Mini sequin coin purse | PASS | PASS | PASS | FAIL | FAIL | PASS | FAIL | FAIL |
| 11 | CJJJJTYS02174 | Double-sided bath brush | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL |
| 12 | CJPF1090126 | Microfibre hair drying cap | PASS | PASS | PASS | FAIL | PASS | PASS | FAIL | FAIL |

**Shared (g) failure in all 12:** no body has a "Good for" line or any delivery or returns facts. The body only links to the Shipping Policy, so a citation engine cannot lift the answers to "how long does delivery take" or "can I return it" from the product page. Every revision adds the same two lines, worded to match the store facts:

> **Delivery and returns:** Estimated delivery is 13-25 days to Canada and 10-20 days to the US from the order date. Shipping is charged by weight and shown at checkout. No change-of-mind returns; damaged, defective, incorrect or lost items are replaced or refunded within 30 days of delivery.
>
> Ships from our supplier with tracking: see our Shipping Policy.

The draft metas also used "Ships tracked, see our Shipping Policy." The revisions use "Ships tracked to Canada and the US." instead, which states a fact rather than pointing to a link.

## Results after revision (copy and GEO only)

All 12 revisions pass (a)-(g) on paper. This does **not** make the products publishable. Checks 1-3, the image review and the competitor-price check are still open, and several items need the owner confirmations listed below.

| # | CJ SKU | Copy+GEO after revision | Open items before publishing (not copy fixes) |
|---|---|---|---|
| 1 | CJSJSJSJ01310 | PASS | Confirm the material on arrival (CJ text says aluminium alloy + silicone; the attributes say plastic + metal) |
| 2 | CJSJSJSJ02567 | PASS | If photos or CJ text confirm rotation, "360" may be re-added with "per the supplier listing" |
| 3 | CJJT1752681 | PASS | Check the photos for how the stands attach; competitor comparators are full-size stands |
| 4 | CJSJ1161149 | PASS | Confirm 1 stand per variant with a sample (the CJ packing list says "1 x phone case") |
| 5 | CJSJSJSJ00332 | PASS | None for copy |
| 6 | CJQC1086774 | PASS | None for copy |
| 7 | CJJT1287599 | PASS | None for copy |
| 8 | CJMB2606544 | PASS | Check the photos for puff shapes; an optional hygiene/care note needs owner review |
| 9 | CJJJJTYS01111 | PASS | Check the print artwork for character or brand designs (CJ says "cartoon") |
| 10 | CJBHNSNS08011 | PASS | Material unconfirmed (PVC vs fabric) and closure type unknown; confirm on arrival, then add them |
| 11 | CJJJJTYS02174 | PASS | Check the photos for a bear design or baby imagery (not claimed) |
| 12 | CJPF1090126 | PASS | Confirm the "Lotus Pink" colour name against the photo |

## Per-product notes

**1. CJSJSJSJ01310 desk stand.** (d) FAIL: "at a comfortable angle" is a subjective benefit that is not in the CJ data, and "Fixes on the desktop" is unclear wording that is not explained. Revised: both removed. The material line keeps the CJ text claim (aluminium alloy) attributed to the supplier. Added that the open stand size and maximum tablet size are not given. Title and SEO title unchanged.

**2. CJSJSJSJ02567 dashboard car mount.** (d) FAIL: "360 Swivel" (title) and "360 degree free rotation" are not in the spec notes or the CJ title. "Easy to install and use" and "Mini size" are also unsupported. Revised title: "Foldable Suction Cup Car Dashboard Phone Mount, Black". Added the windscreen-rules note from the spec ("check local rules") and a "do not block your view" line. Dropped the "gps holder" tag, because the notes limit the claim to phones.

**3. CJJT1752681 laptop stand pair.** (d) FAIL: "Low-Profile Riser", "slim", "fold flat" and "easy to carry or store" are inferences. The spec says only "folding style", zinc alloy, pair, with no height or load rating and no stated attach method. Revised title: "Folding Zinc Alloy Laptop Stand, Set of 2, in 3 Colours". The body states what is not given (height, weight rating, attach method). Dropped the "portable stand" tag.

**4. CJSJ1161149 wire stand.** (e) FAIL: "1 stand (per supplier packing details)" is wrong. Per the notes, the CJ packing list says "1 x phone case", and 1 stand is our assumption. The size line gave no measurements although packed sizes exist. (d) FAIL: "lightweight" (200-220 g packed) and "light" in the meta are unsupported. Revised: "1 x folding stand" (owner to confirm with a sample), with packed sizes added for Large (9 x 6 x 5 cm) and Small (8 x 5 x 5 cm). The body also states that device fit per size is not given.

**5. CJSJSJSJ00332 pocket phone stand.** Clean on (a)-(f). Tablet use is correctly not claimed. Only (g) was fixed.

**6. CJQC1086774 air vent holder.** Clean on (a)-(f). The "gravity-style grip" is now attributed to the supplier listing. Added the vent-shape fit caveat from the notes to the body and meta. SEO title lengthened from 33 to 44 characters ("Gravity Air Vent Car Phone Holder, 4 Colours"). Dropped the "gps holder" tag.

**7. CJJT1287599 cable clips.** Clean on (a)-(f). Added "no adhesive strength or maximum cable thickness given". "Wall or cabinet edge" was reduced to "around a desk", because the CJ use is cable sorting at a desk. SEO title now includes "for Desk".

**8. CJMB2606544 makeup sponges.** Clean on (a)-(f), with no skin or performance claims. Revised title: "Choose Your Colour" became "8 Colour Options" (more descriptive). The colours are listed by name, and the body states that puff size and shape are not given.

**9. CJJJJTYS01111 shower cap.** "Waterproof" is supplier-stated ("good waterproof", EVA), so (d) passes; the body and meta attribute it to the supplier. The draft also said "Cute" and "easy to store", which are subjective. Revised title: "Waterproof EVA Shower Cap, 27 cm Across, 4 Print Designs". "Light" is now backed by the CJ cap weight of 13 g. The manual-measurement caveat is kept.

**10. CJBHNSNS08011 sequin pouch.** (d)/(e) FAIL: the size line said "Laser sequin PVC-type finish (supplier lists PVC)", but the CJ attributes say fabric. "PVC-type" is our own wording and states a material the data contradicts. Revised: no material is stated, with a plain note that the supplier's material details conflict and the closure type is not stated. "Catches the light" removed. Add the material once it is confirmed.

**11. CJJJJTYS02174 bath brush.** Clean on (a)-(f). "Massage", foaming and baby wording were correctly left out. Material is attributed to the supplier description, because the CJ category lists plastic. Only (g) was fixed.

**12. CJPF1090126 hair drying cap.** (d) FAIL: "Soft" and "hands-free while your hair dries" are unsupported. "Absorbent" is supplier-stated ("super absorbent") and stays, attributed. The draft title "...Cap Towel Wrap Turban" was keyword-stacked. Revised: "Microfibre Hair Drying Cap, Turban-Style Towel Wrap, 5 Colours" (62 characters). The body states that the unfolded size is not given. No hair or skin claims.

## Store-fact consistency (GEO)

- Delivery, returns and shipping-by-weight wording is identical in all 12 revised bodies and matches the store facts given for this task. The 5-business-day refund timing (audit C2) is deliberately left out.
- No superlatives ("best", "premium", "perfect", "universal") appear in any revision. The CJ word "universal" was not carried over.
- No brand or trademark names appear in any revision. This was checked by script for Apple, iPad, iPhone and Samsung, and none of the drafts used them either.
- Keep the delivery line in step with the Shipping Policy. If the policy changes, these 12 bodies must be updated with it.

## Not done in this check

Checks 1-3 (SEO, technical, schema), the image review, the competitor-price check and the Ubersuggest keyword check. Nothing was written to Shopify.
