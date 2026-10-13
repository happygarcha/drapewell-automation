# New draft: two-section silicone tumbler liner, 2026-10-13

Owner said "Yes, make a draft" (2026-10-13) for a silicone 2-in-1 tumbler divider (reference: an Alibaba listing, about US$3.3 wholesale). The publish gate has NOT been run and publishing is NOT approved. The product is DRAFT, 0 publications (no sales channel). Nothing existing was changed. The only shipping change: its 7 variants were added to delivery profile "CJ Dropshipping Fulfillment" (135205912885), read back and confirmed.

## Draft

| Field | Value |
|---|---|
| Product id | gid://shopify/Product/15417406259509 |
| Handle | two-section-silicone-cup-liner-for-40-oz-tumblers-7-colours |
| Title (60 chars) | Two-Section Silicone Cup Liner for 40 oz Tumblers, 7 Colours |
| SEO title (57) | Two-Section Silicone Liner for 40 oz Tumblers \| Drapewell |
| Meta description (141) | Silicone cup liner that splits a 40 oz (1.2 L) tumbler into two drink sections. 31 x 15 cm, 7 colours, tracked delivery to Canada and the US. |
| Type / vendor | "Kitchen & Drinkware" (the owner's name; this type did not exist in the store yet, closest existing is "Kitchen Gadgets") / Drapewell |
| Tags | cj-dropship, cj-pid:2604160334031606800, cj-sku:CJYD2837062, needs-check, owner-request-2026-10-13, silicone cup liner, tumbler divider, drink separator |
| Price | CA$17.99 on all 7 variants |
| Variants | 7 colours: Blue, Purple, Grass Green, Beige, Black, Dark Gray, Pink. SKUs CJYD283706201AZ to CJYD283706207GT, 240 g each |
| Inventory | untracked, policy CONTINUE, requiresShipping true; level activated at cjdropshipping (also present at the default location "12088 75a Ave", created automatically) |
| Delivery profile | all 7 variants read "CJ Dropshipping Fulfillment" |
| Collection | none added (the owner did not name one) |
| No tumbler brand | checked in title, description, tags, alt text, SEO and handle |

## CJ data used (pid 2604160334031606800, CJYD2837062 "Ice Blaster Cup Silicone Inner Liner With Compartments", US$2.28)

- Description text (CJ): "silicone cup liner is designed for 40oz large-capacity drinkware ... multiple colors ... Made from food-grade silicone ... Material: Silicone ... Size: 31*15 cm. Packing list: 1set". Used only as: silicone, 31 x 15 cm, designed for 40 oz drinkware, 1 set, "the supplier describes it as food-grade silicone" (attributed, not claimed as ours). No leak-proof, BPA, dishwasher, insulation or temperature claims.
- Variant package size 300 x 105 x 45 mm, weight 240 g, all 7 colours the same.
- The 31 x 15 cm size is not stated as inner fit, so the copy says to check the cup's inner diameter and height, and does not claim it fits "most" tumblers.
- Unclear from CJ: how the two parts fit together. The copy says "two-part silicone liner" / "splits it into two sections" based on the CJ title ("With Compartments") and the supplier photos (a tumbler-shaped liner with a split down the middle, drawings of a cup cut open with two drinks).

## Candidate choice

- Chosen: CJYD2837062 (US$2.28). Clear, simple description, 7 colours, 240 g, "compartments" matches the owner's reference.
- Not made: CJJT2088657 pid 2407200650321616800 (US$2.58). Its CJ text contradicts itself (lists "304 stainless steel liner", "insulation 12-24 hours", "portable, heat preservation" next to "Material: Silicone"), its Chinese title names a tumbler brand, and its capacity options (30 oz, 40 oz) are two sizes of the same shape, so it is not clearly a different product. Not worth a second draft.

## Freight quotes (CJ calculate_freight, 1 unit, Blue variant vid 2604160334031607400, 240 g)

- Canada, CJPacket Ordinary, to M5V 2T6: US$6.49 (4-7 days CJ aging).
- US, YunExpress Ordinary, to 02169: US$7.58 (4-7 days). (CJPacket Ordinary to the US was US$7.72, slightly higher.)
- All 7 variants share the same weight and package, so the heaviest variant is every variant.

## Money test

profit = 0.971 x (price + shipping charged) - 0.30 - (CJ USD + freight USD) x 1.42443. The 240 g weight is in the 0-300 g band: Canada 9.99, US 12.99.

| Price | Canada profit (CAD) | US profit (CAD) | Result |
|---|---|---|---|
| 14.99 | 11.46 | 12.82 | Fails the CA$12 rule on Canada |
| 16.99 | 13.41 | 14.77 | Passes, margin only 1.4 in Canada |
| **17.99 (chosen)** | **14.38** | **15.74** | Passes both, margin 2.4 / 3.7 over CA$12 |
| 19.99 | 16.32 | 17.68 | Passes, higher than needed |

Checkout total at 17.99 is CA$27.98 in Canada and CA$30.98 in the US. Price is within 15-60 CAD. Canada is the binding route. A price of 17.99 was picked so the ad-cost margin is at least about CA$2.4 on the weaker route. CJ's own suggested price is US$17.04.

## Photo review

CJ supplies 10 photos. All 10 were uploaded to the draft, downloaded through drapewell.myshopify.com/cdn/shop/files/, and viewed.

- Photos 1-7 (one render per colour, white background): clean of logos and text, but all carry a very faint tiled supplier watermark in the background (the CJ file names end in "_water"; the text is not readable and is almost invisible at normal contrast, about 1-2 percent off white). Removed by whitening the near-white background (ImageMagick `-fuzz 5% -fill white -opaque white`, product pixels untouched), checked with a heavy contrast stretch that the marks are gone, re-uploaded (stagedUploadsCreate and productCreateMedia), and linked to their colour variants.
- Photo 8 (CJ image 10, liner halves on a plate): overlay text "Insulated tumbler with dual compartments / Suitable for 40oz size" at the top. Cropped off the top 220 px (800 x 580 left), kept. No brand, no logo, no tumbler in the frame.
- Dropped: CJ image "Four colors, choose freely" (overlay text, shows a handled branded-style tumbler), CJ image "Insulated tumbler with dual-chamber liner" (overlay text, handled tumbler of the branded shape), and the original uncleaned versions of the 8 kept photos. The cut-away drink photo would be the best proof of the two sections, but its overlay text could not be cropped out without losing the cup.
- Result: 8 photos, all READY, 7 linked one per colour variant. Photo check: would PASS (at least 4 clean photos). Alt text is descriptive. The original 10 media were deleted.
- Caveat: the photos are 3D renders, not real photographs, and they show no one drinking from it. The renders also show the liner as a tumbler-shaped piece with a lid-like top, which the description does not explain further.

## Not verified

- Publish gate (SEO audit, technical audit with HTTP 200 and markup, schema, GEO, copy review) was not run. Ubersuggest keyword demand not run. Competitor price: not checked. The Alibaba reference price (US$3.3) is the owner's figure, not checked by me.
- Real fit: whether the liner fits popular 40 oz tumblers is unverified. CJ gives only 31 x 15 cm and "designed for 40oz". No product dimensions for the inside of any tumbler. Risk: a customer buys it for a cup it does not fit, causing returns.
- CJ category is listed as "Home Office Storage", HS code 3924100000 (CJ). Only the Blue variant was freight-quoted (identical weight and package for all).
- CJ stock was not checked per country. Page not loaded (draft has no public URL).
- Two-section function is inferred from the CJ title and photos, not from a CJ instruction text. No assembly instructions were given by CJ.
- Faint watermark was removed from the photos; the supplier's rights to the renders are unknown.
- The product type "Kitchen & Drinkware" is new in the store; change it if the owner prefers an existing type.

## Owner decisions needed

1. Whether to run the publish gate for this draft (it has not been run).
2. Whether to order one sample from CJ to check the fit and function before publishing (not done, no orders placed).
