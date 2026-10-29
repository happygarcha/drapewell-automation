# SEO Checker (SEOWILL) audit fixes, 2026-10-29

Source: owner screenshots of the SEO Checker app. Fixed through the Shopify Admin API (no theme change, nothing published or unpublished except five empty pages).

## What the app flagged and what caused it
| App finding | Cause found | Fix |
|---|---|---|
| Pages have meta tags 131 of 140 | 6 collections and 3 draft products had no SEO title or description | Written for all 9 |
| Meta title length (3 products) | SEO titles of 36-37 characters (Sisal cat pad, PU watch case, Squishy duck) | 18 short SEO titles lengthened to 52-59 characters |
| Collection scores 32 and 46 | Missing or short collection SEO, empty collection text | 20 collection SEO titles or descriptions written; empty descriptions filled for Home page, Recently Added, Beauty, Car Accessories, Tech |
| Other pages score 33 | No SEO title or description on 6 store pages; 5 empty thin pages | SEO set on About, Contact, Shipping Policy, Refund Policy, Terms of Service, Your Privacy Choices; 5 empty "shop-*" pages unpublished |
| Html sitemap not enabled | App feature | New page /pages/sitemap (Site Map) linked from the footer menu |
| Home page title 47 characters (wants 50-70) and no target keyword | Home page title and description are stored in Online Store > Preferences, which the Admin API cannot edit | NOT DONE (manual, see below) |
| Auto-generate meta tags (Pro plan) | Paid feature, switched off | Left off on purpose: it could overwrite the hand-written tags |

## Product SEO titles changed (all end in "| Drapewell", 52-59 characters)
Cotton pillowcase set; glitter evening bag; horse canvas set; boho raffia tapestry; sedge wall hanging set; microfibre beach towel; aluminium camping stool; 32-piece brush set; satin eye mask set; faux suede tote; jellyfish diamond painting kit; wooden wrist rest; PU watch case; memory foam wrist rest set; sisal cat scratching pad; shawl cape; squishy duck; squishy bunny; back seat dog bed mat (was 65, now 56).
Drafts (SEO added): underbed storage box (title), dreamcatcher plush blanket (title and description), mint dishwasher tabs (title and description).

## Collections (SEO title and description)
Home page, Recently Added, Beauty, Home & Kitchen, Gifts under $25, Car Accessories (previously empty); Kitchen, Living Room, Tech, Halloween, Bedroom, Seasonal, Shower Curtains (titles lengthened and descriptions matched to what the collection holds).

## Not fixed
- Home page SEO title and description (Online Store > Preferences). Suggested title: "Drapewell | Home Decor, Pet Supplies & Everyday Finds in Canada" (63 characters).
- Image alt text on the two Shopify Collective drafts (blanket, dishwasher tabs): images could not be viewed from this session.
- Primary keywords in the app: set inside the app only.
