# Competitor ads deep search (no Pinterest keywords), 2026-10-13

Read-only research. Source: Meta Ad Library search tool (`ads_library_search`), ACTIVE ads, countries CA and US, plus 5 WebSearch queries (labelled snippets only). Nothing was created, edited, paused or spent on Meta, Shopify or Pinterest.

Everything below is a SIGNAL, not proof of sales. The Ad Library shows no sales, spend, impressions or conversion data, and this tool returns no prices except where a price or offer is typed into the ad title. "Weeks running" = (2026-10-13 minus the ad_delivery_start_time of the OLDEST ad by that advertiser seen in the results) / 7. "Ads seen" = ads by that advertiser in the (max 50) results page I read, not necessarily all they run; the one exception is where an estimated total is stated. Platforms (Facebook, Instagram etc.) and creative format (image, video, carousel) are NOT returned by the tool, so those columns cannot be filled. Ad snapshot links exist for every ad if the owner wants to open one by hand: `https://www.facebook.com/ads/library/?id=<ad id>`.

Definitions used: long-running = active 4+ weeks; strong = 8+ weeks, or one advertiser with 5+ ads for the same product. Currency in the ad data is the advertiser's billing currency, not the market.

## Method and what changed from the first pass

- The tool has only these inputs: search_terms, countries, page_ids, ad_active_status, ad_type, limit (max 50). There is NO date-range or start-date filter, NO cursor/pagination, NO language filter, NO media-type filter and NO sort option. Results come back newest-first and stop at 50. So "started before 2026-09-15" and "page through 5 pages" could not be done.
- Workaround that worked: long, specific, seller-style phrases (e.g. "non slip bathroom mat quick dry", "wooden 3D puzzle model kit", "washable kitchen runner rug non-slip") return a small result set (under 50 total), so the older ads are no longer pushed off the end. Short generic phrases ("cushion covers", "3D wooden puzzle", "dog harness") return thousands of off-topic story-app ads and hide everything old. A page_ids filter lets me count one advertiser's ads (used for Modrnizd).
- About 50 Ad Library searches were run across all 20 products, 2 to 4 differently worded searches each, CA and US. Very long phrases often return 0; those zeros are tool matching, not proof that nobody advertises.
- Result: this pass DID reach older ads (up to 48 weeks) and found several real long-running advertisers. Bath mat is clearly the strongest.

## Per product

### 1. Quick-dry non-slip bath mat
Searches: "non slip bathroom mat quick dry" (CA, 91 est.), "quick dry non slip bath mat" (US, 93), "free shipping Canada bath mat" (CA, 4), "super absorbent bath mat" (CA, 27), "bathroom rug non slip microfiber shower mat" (US, 2), plus a page-id count.

| Advertiser (page) | Start date (oldest seen) | Weeks | Ads | Offer text in title | Signal |
|---|---|---|---|---|---|
| Modrnizd (CAD billing, targets Canada) | 2026-05-14 | 21.6 | 212 estimated active in CA; 45 read, about 35 different titles | "The Magic Mat" with 5 stars, "Ditch the Damp - Save Up to 60%", "Still Time to Save up to 60%", "Break Up With Your Old Bath Mat", "The Bath Mat 100,000+ Customers Love" (the advertiser's own claim, unverified) | STRONG. Oldest ad 21.6 wks, plus ads at 11.7 and 8.7 wks, 212 live ads. Many fresh variants weekly (about 10 new ads started 2026-10-06 to 10-11). Product looks like an absorbent quick-dry bath mat; I could not confirm it is the same type as ours. Domain not shown. |
| BeyondBaths (AUD billing, shown under CA filter) | 2026-04-21 | 24.9 | 3 | "A safer, drier bathroom - instantly." | Long-running but an Australian-currency advertiser; weak for Canada. |
| Temu Canada (catalogue ad, six products incl. "Super Absorbent Bathroom Mat - Quick Drying Non-slip Floor Mat") | 2026-06-17 | 16.7 | 4 | none | Weak: bath mat is one of six items in a catalogue ad; Temu always runs many. |
| Kitsch (US brand) | 2026-09-12 | 4.3 | 5 | "The Bath Mat That Dries Itself" | Borderline long-running, 5 ads for one product. |
| Forubom home (USD) | 2026-08-20 | 7.6 | 2 | blank title | Product not identifiable from tool data. |
| Fresh Reveal (GBP billing) | 2026-07-17 | 12.4 | 1 | "Thick Bathroom Rug" | UK currency; weak. |
| Suzvo-xx / Suzvo Studio / Suzvo Shop (USD) | 2026-10-09 | 0.4 | 4 | "Quick-Dry Non-Slip Bath Mat!" | New test; same operator family on three pages. |
| SHEIN HOME catalogue incl. "Multicolor Bohemian Floral Bath Mat" | 2026-09-12 | 4.3 | 2 | none | Weak catalogue ad. |

Takeaway: one well-funded Canadian advertiser (Modrnizd) has run a bath mat for 5 months with hundreds of ad variants. That is the best sign in this whole pass that bath mats can be sold with paid Meta ads in Canada. It does not say what they sell or earn.

### 2. Waterproof shower curtain with hooks
Searches: "waterproof shower curtain with hooks" (CA, 205), "shower curtain waterproof bathroom shop now" (US, 16), "shower curtain set with hooks bathroom decor" (CA, 71).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Crème De Decor (USD) | 2026-09-11 | 4.4 | 1 | "Upgrade Your Bathroom - Upgrade How You Feel." | Just over 4 wks. |
| SHEIN HOME catalogue ("Multicolor Bohemian Tropical Shower Curtain Sets Waterproof Bath Mat...") | 2026-09-12 | 4.3 | 2 | none | Weak (catalogue). |
| Nova Haven Selection (USD) | 2026-09-18 | 3.4 | 3 | "Modern Waffle Weave Shower Curtain with Washable Liner" | Under 4 wks. |
| "3D Printed Waterproof Shower Curtain" on about 11 different pages (Decisivte/M x2, Commodityes l x2, Commodityes k x2, Converselyon1, Foihletpath.HE28, Bamaxisboon_hhh, Newbecame, Practicei.fa08, Expotsition.EX01) | 2026-10-08 to 10-12 | under 1 | about 13 | same title on every page | New copy-paste test cluster across many pages; no age. |
| Erodlav (USD) | 2026-10-13 | 0 | 2 | "Luxury 3-in-1 Shower Curtain $49.99" (price typed in title) | Hours old. |

Takeaway: no 8+ week shower curtain ads found. A dropshipper cluster started this week.

### 3. 5-piece horse canvas wall art set
Searches: "horse canvas wall art set 5 piece" (CA, 0), "horse wall art canvas" (US, 81), "horse canvas wall art" (CA, 30).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Callie Canada / Callie Gifts (USD, same operator) | 2026-09-11 | 4.4 | 3 | "Personalized Watercolor Horse Canvas" | Borderline long-running (personalized, not a 5-piece set). |
| Zeydrt.com (USD) | 2026-09-11 | 4.4 | 4 | "A Dream Canvas Painted by Hand" | Borderline long-running, 4 ads. |
| ArtofRoyals.com (USD) | 2026-09-21 | 3.0 | 4 | "Black Stallion in Ocean Waves Canvas Wall Art - Majestic Horse Power" (catalogue title list) | Under 4 wks. |
| Youkuart (USD) | 2026-09-23 | 2.7 | 1 | "Two Black Horses ... Textured Canvas Art" | Under 4 wks. |
| Arvionart US (USD) | 2026-10-09 to 10-11 | 0.1 | 4 | "Black Horse Wall Art - 45% Off", "Hand-Painted Horse Art - 45% Off" | New, discount-led. |
| Carmel Oil Art, HorseContacts.com, Ashley Garner, Liberty signs | 2026-09-27 to 10-09 | under 3 | 1-2 each | e.g. "Five Pasture Horses - Hand-Painted Art" | New or small. |
| TinySnap family (custom portraits, not horse sets) | 2026-07-19 | 12.1 | 7 | "Your Passion, Painted - FREE Preview" | Different product (custom portrait); noted only because it is a 12-week canvas advertiser. |

Takeaway: horse canvas is advertised by many sellers, mostly hand-painted or personalized; no exact "5-piece set" competitor found; none over 5 weeks.

### 4. Pet carrier tote bag for puppies and cats
Searches: "pet carrier tote bag for puppies and cats" (CA, 13), "portable cat dog carrier shoulder bag airline approved" (US, 0), "pet carrier bag" (US, 779), "cat carrier bag" (CA, 163), "pet sling carrier bag" (CA, 9).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Callie Gifts (USD) | 2026-09-27 | 2.1 | 9 | "Personalized Multicolor Wrapped Name Pet Sling Carrier Crossbody Travel Bag Hands-Free" | 9 ads for one product (strong by count) but only 2 weeks old. |
| Personal Chic Personalized Gifts (EUR) | 2026-10-10 | 0.4 | 2 | "Personalized Pet Carrier Tote Bag" | New. |
| Dexy Paws (CAD) | 2026-10-13 | 0 | 1 | "Beige Pet Travel Bag" | Canada-facing, hours old. |
| Mr. Peanut's Pet Carriers (USD) | 2026-10-09 | 0.5 | 1 | catalogue of expandable carriers | New. |
| Petnkica (INR billing) | 2026-10-06 | 1 | 1 | catalogue incl. "Breathable Pet Carrier Backpack" | Weak. |

Takeaway: no long-running carrier-bag ads. Callie Gifts has 9 live ads but is only 2 weeks in.

### 5. Knitted throw blanket with tassels
Searches: "knitted throw blanket with tassels" (CA, 90), "knit throw blanket chunky" (US, 32).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Robin Reed Chugg (USD) | 2026-06-01 | 19.0 | 1 | "American Flag Chunky Knit Blanket" | Long-running but one small-seller ad; themed product. |
| Bearaby (USD) | 2026-07-16 | 12.6 | 3 | blank titles | Long-running; sells weighted knit blankets, an adjacent product. |
| Meg DiVittis (USD) | 2026-08-08 | 9.3 | 4+ | "I Waited 3 Months for This Restock Worth Every Day", "I've Washed This Thing a Million Times and It Still Looks New", "I Literally Gasped When I Touched This Blanket" | 8+ weeks, several ads; soft blanket, testimonial-style copy (claims are the advertiser's). Latest ad 2026-10-10. |
| In2Green (USD) | 2026-08-27 | 6.6 | 1 | catalogue incl. "Chunky Cable Knit Throw Blanket" | 6+ wks, catalogue. |
| Cleanish Curated (USD) | 2026-09-05 | 5.3 | 1 | "I Waited 3 Months for This Restock Worth Every Day" | 5+ wks. |
| Amy Wilson (USD) | 2026-09-22 | 2.9 | 6 | "The Blanket You Make Yourself" | Make-it-yourself kit/pattern, 6 ads. |
| Copper Pearl (USD) | 2026-10-10 | 0.1 | 1 | "The Softest Blanket You Can Find - Now 60% Off" | New. |
| Candychristy (USD) | 2026-10-10 | 0 | 9 | "Personalized Colorful Tassels Couple Photo Pattern Soft Throw Blanket with Name" | 9 ads, only just started; photo-printed, not knitted. |

Takeaway: soft throw blankets have real 8+ week US advertisers (Meg DiVittis, Bearaby). For Canada, nothing found. The tasselled knitted style specifically has nothing older than 3 days in these results.

### 6. Embroidered Christmas table runner
Searches: "embroidered Christmas table runner" (CA, 1), "Christmas table runner" (US, 290; mostly noise), "Christmas table runner Canada" (CA, 0).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Willow & Pine (USD) | 2026-10-10 | 0.1 | 2 | catalogue incl. "Red Tartan Table Runner", "Buy 2, Save 10%" | New. |
| Loomavelle (USD) | 2026-10-09 | 0.4 | 1 | catalogue with typed prices, e.g. "Bohemian Style Embroidered Peace Sign & Floral Pattern Quilted Table Runner $26.99" | One embroidered quilted runner, price shown in title; not Christmas. |
| Carol R. Anderson (USD) | 2026-10-11 | 0.1 | 1 | "Beaded Christmas Table Runner" | Small seller, new. |

Takeaway: no long-running table-runner ads; the Christmas season ad wave has only just begun.

### 7. Christmas tablecloth
Searches: "Christmas tablecloth" (CA, 317), "Christmas tablecloth rectangular waterproof wrinkle free holiday table decor" (US, 0).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| 16 pages with the identical title "Christmas Tablecloth" (or "Christmas Tablecloth" with a sparkle): Blissvibem, Arrivalcy, Renaissanct.AS, Sladrmeace+sa, Listedchart.U (2), Enhancew9- (2), Regulationto.0ar (5), Simplicitythe\op, Infurthermore/inj, Cheerpathm.8, Shoprevitasole5, Raisbewae.ef06, Arousebell.s, Practicei.fq12 (2), Shopwearglossy+W, Retrospectdevelop%H | 2026-10-09 to 10-12 | under 1 | about 23 | no price or offer in title | Many pages, same creative, all started within 4 days: a coordinated dropship test. Regulationto.0ar alone has 5 ads. No age to read. |
| Temu Canada | 2026-06-17 onward | 15-17 | 4 | catalogue incl. "1pc Stripe Square Tablecloth With Edges" | Weak (catalogue). |

Takeaway: the busiest "many ads" signal on Christmas items, but zero history. It may be a shared supplier video that many stores picked up at once.

### 8. Embroidered Christmas stocking
Searches: "embroidered Christmas stocking" (CA, 27), "Christmas stockings personalized knit" (US, 7).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Elegantpark (CAD) | 2025-11-10 | 48.0 | 1 | "Knit Christmas Stockings" (colour variants: pink, beige) | Oldest active ad found in the whole pass; Canadian billing; one catalogue-style ad, probably an always-on seasonal ad. Strong on age, weak on volume. |
| Shirley Bredal (DKK billing) | 2026-07-09 | 13.6 | 9 | "The Christmas Collection is here + FREE gift" | Danish currency; shown under CA but probably not a Canada seller. Ignore unless the owner wants Christmas-collection ideas. |
| Hand Knit Holiday (USD) | 2026-09-13 | 4.1 | 5 | "25% off preseason", "5.0 stars, 3,405 reviews. 25% off preseason." (advertiser's own claim, unverified) | Just over 4 wks, 5 ads. |
| Callie Ireland (USD) | 2026-10-07 | 0.9 | 11 | "Personalized Cute Snowman Santa Claus Reindeer Embroidered Christmas Stocking with Name" | 11 ads for one product (5+), but a week old. Same family as Callie Gifts. |
| Thesurprisememory (USD) | 2026-10-06 | 0.9 | 1 | "Personalized Christmas Stockings Rustic Holiday Stocking Embroidered Neutral Woodland" | New. |
| Casa Home Living, Daisy & Doodle Art Party | 2026-10-09 | 0.5 | 1 each | knitted stocking catalogue; "Grandma's Retro Christmas Stocking" | New. |

Takeaway: embroidered stockings have a Canada-billed advertiser running since last November and a US store at 4 weeks with a 25% preseason offer; plus an 11-ad personalized-stocking push starting now.

### 9. Fall maple leaf door swag / wreath
Searches: "fall maple leaf wreath front door" (CA, 0), "autumn door swag wreath" (US, 1), "fall wreath maple leaves" (US, 12).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Suzvo Shop (USD) | 2026-09-17 | 3.6 | 1 | "49% off" | Product not identifiable from tool data. |
| Moonighty (USD) | 2026-08-31 | 6.0 | 1 | blank title | Product not identifiable; do not treat as a wreath ad. |
| Dolores Rivero (USD) | 2026-10-08 | 0.6 | 1 | "Fall Autumn Wreath with Mums, Leaves, and Burlap Bow" | Small seller, new. |
| Feelvora-01 (USD) | 2026-10-10 | 0.4 | 1 | "Autumn Cross & Pumpkin Harvest Metal Wall Decor (Buy 2 Free Shipping) - 10 in" | New; offer in title. |
| (First pass) Silvio Peron Jr., Vivian Johnson | 2026-10-10 to 10-12 | under 1 | 1 each | "Handmade Double-Sided Fall Door Swag, Over the Door Decor" | New. |

Takeaway: thin niche on Meta, none verified over 4 weeks. WebSearch snippet (not Meta data): a 2026 fall decor guide lists harvest wreaths in burnt orange and gold, and embroidered plaid-bow wreaths and door banners, as popular outdoor pieces.

### 10. Dog sweater for small dogs
Searches: "dog sweater for small dogs warm winter" (CA, 6; all off-topic), "knit dog sweater" (US, 181).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Customwarms (USD) | 2026-10-07 | 0.9 | 8+ | "Personalized Embroidered Pets Christmas Knit Sweater" | 5+ ads, a week old. |
| Found My Animal (USD) | 2026-10-07 | 0.9 | 5 | "Cozy Sweaters Your Dog Will Love" | 5 ads, a week old. |
| Mirvive store (USD) | 2026-10-10 | 0.3 | 4 | "Cozy Knit Outfits For Dog Lovers" | New. |
| Havehad US (KRW billing) | 2026-10-06 | 1.0 | 9 | "Shaggy Dog Round Knit" (colour variants) | Korean currency; probably not the US/Canada market. |
| Pawtique, The Foggy Dog, Dog Wear Studio, Chilly Dog Sweaters | 2026-10-06 to 10-09 | about 1 | 1-2 | "Premium Dog Sweaters Made for Chilly Days", "Sweater Weather, Golden Approved" | New seasonal push. |

Takeaway: ads are starting now for the cold season; nothing older. Web snippet (SaleHoo trend page, relative-interest signal, not sales): pet sweater interest peaks in December.

### 11. Crochet kit for beginners (potted plants, crossbody bag)
Searches: "crochet kit for beginners" (CA, 318), "crochet potted plants kit" (US, 0), plus first-pass "crochet kit" and "crochet blanket".

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Rubbyoo crafts (USD) | 2026-10-12 | 0 | 2 | "Easy & Fast Crochet Kit for Beginners" | New. |
| Celebrista.shop, Livelydayinmax | 2026-10-10/11 | 0.1 | 4 | "Crochet Animal Bag Holder DIY Kit" / "Highland Cow Crochet Bag Holder DIY Kit" | New. |
| Four pages with the identical title "Crochet Animal Christmas Tree DIY Kit - Stitch a Little Christmas Magic (This is a DIY kit, not a finished product.)": Meetitsneeds, Hitincontact+ism, Attimeperiod.PE04, Veryabsolute&H | 2026-10-10/11 | 0.1 | 4 | same | Copy-paste test across pages. |
| Talkarrange\b, Gracefancy=6, Boosthighly/op ("Ocean Series Hood Hat DIY Crochet Kit", "Fantasy Hood Hat DIY Crochet Kit"), Perpetualing.PR02 (snowman kit) | 2026-10-11/12 | 0 | 6 | titles as given | New. |
| Emily Carter (USD) | 2026-10-12 | 0 | 13 | "Crochet Without the Stress", "The Complete Crochet Amigurumi Bundle - 2026 Bestseller", "Find Your Next Pattern in Seconds" | Digital patterns; 13 ads. |
| Amy Wilson (USD) | 2026-09-22 | 2.9 | 6 | "The Blanket You Make Yourself" | Under 4 wks. |
| (First pass) We Are Knitters, Mary Annette, Crochetta yarn | 2026-10-12/13 | 0 | 5-8 each | various | New. |

Takeaway: crochet is the most crowded niche, but every advertiser started this week. No "potted plants" or "crossbody bag" kit ad found in either country with those phrases. Web snippets did not mention crochet kits as trending, so there is no outside confirmation.

### 12. Wooden 3D puzzle model kit (ship, jewelry box)
Searches: "wooden 3D puzzle model kit" (CA, 9), "3D wooden puzzle ship model DIY" (US, 3, off-topic), "3D wooden puzzle" (US, 1,520, off-topic).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Ugeargeek (USD) | 2026-07-24 | 11.4 | 1 | "#OceanLovers #WoodenArt #DIYModel" | 8+ wks; ocean-themed wooden model by hashtags; single ad, product not confirmed. |
| Rokrgeek (USD) | 2026-07-31 | 10.4 | 2 (second at 5.0 wks) | "3D Wooden Puzzles for Adults, Unique Wooden 3D Puzzle Kits" | 8+ wks. Two ads only. |
| Temu Canada / Shoptemu catalogue incl. "Dlkhobby 1/10 ... Model Kit" | 2026-08-11 to 09-07 | 5-9 | 2 | none | Weak (catalogue). |
| Alibaba.com (wholesale book nook kits) | 2026-09-18 and 10-09 | 0.5-3.5 | 2 | "3D Wooden Puzzle" kits, factory wording | Supplier ads, not a store competitor. |

Takeaway: a modest but real signal: two small advertisers have kept a 3D wooden puzzle ad running for 10+ weeks. Neither has more than 2 ads.

### 13. Rotating makeup brush organizer with lid
Searches: "rotating makeup brush organizer with lid" (CA, 14), plus first-pass "makeup brush organizer".

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Lidvy (USD) | 2026-08-29 | 6.3 | 1 | "Elegant Rotating Vanity Organizer" | 6 wks. |
| Purposean%po, Retentioni.shop, Suitfitable-AE (USD) | 2026-09-10 | 4.6 | 1 each | "360° Rotating Makeup Brush Organizer Box" (identical title) | 4+ wks, three pages, same title. |
| Slimdescent/o, Masslaugh.mm (USD) | 2026-09-13 | 4.1 | 1 each | same title | 4+ wks. |
| Subsistenceed-er (USD) | 2026-10-07 | 0.9 | 1 | same title | Newer copy. |
| Prsefusoa.SE02, Manifeist·p (USD) | Prsefusoa 2026-10-06; Manifeist 2026-10-12 | 0.9 / 0 | 6 / 1 | "Hot Sale: Dust-proof toothbrush holder with cover, makeup brush storage box for bathroom vanity" | 6 ads on one page; a week old. |

Takeaway: moderate-to-strong. Seven different pages ran the same rotating-organizer creative, five of them for 4+ weeks and one for 6. Same title across unrelated pages suggests many dropshippers copying one supplier ad (so it is probably profitable for someone, or just widely copied; the tool cannot tell which).

### 14. Woven cotton rope storage basket
Searches: "woven cotton rope storage basket" (CA, 12), "cotton rope basket blanket storage" (US, 1), "rattan woven storage basket with handles" (US, 28; mostly noise).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Eight pages with the title "Halloween 'Boo!' Hand-Woven Cotton Rope Basket": Gracefancy=6 (4 ads), Posequiver, Shiftalter-P, Highlightp, Endeavoried.EA08, Endeavoried.IE05 (2), Terminatek.RM03 | 2026-09-24 (Terminatek) to 2026-10-11 | 0.1-2.6 | 11 | same title | Copy-paste dropship cluster; oldest 2.6 wks. Seasonal Halloween angle. |
| Yupeng Textile & Rope Baskets (CNY billing) | 2026-07-04 | 14.3 | 1 | blank | Chinese supplier ad, not a competitor store. |

Takeaway: no 4+ week basket ad from a store. A Halloween rope basket creative is being cloned by about 8 pages.

### 15. Cushion cover
Searches: "cushion cover decorative throw pillow covers" (CA, 0), "cushion covers" (CA, 834; all off-topic story ads).
No relevant ad found. Tool/phrase limit, not proof of no advertisers.

### 16. Dog harness
Searches: "no pull dog harness for small dogs" (CA, 2,548; off-topic), "reflective dog harness vest breathable" (US, 15).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| Relaxrich (USD) | 2026-06-22 | 16.0 | 2 | blank | Appeared in a harness search, product not confirmed from data; do not rely. |
| EcoBark Pet Supplies (USD) | 2026-09-05 | 5.3 | 1 | catalogue of step-in and over-the-head mesh harnesses | 5+ wks, single catalogue ad. |
| FourPaw (USD) | 2026-09-11 | 4.4 | 1 | "SafeWalk No-Pull Dog Harness - Front-Clip Design" | 4+ wks, one ad. |
| Browphiz (USD) | 2026-10-08 | 0.6 | 5 | "ShawnCo Essential Dog Harness" | 5 ads, new. |
| Kun Lalo (USD) | 2026-10-10 | 0.3 | 1 | "No More Tug-of-War on Walks!" | New. |

Takeaway: weak-to-moderate. Two small stores have run a harness ad for 4 to 5 weeks.

### 17. Plush bathroom rug set
Searches: "plush bathroom rug set" (CA, 8; off-topic), "bath rug set 3 piece contour toilet mat plush" (US, 0). Related: Pinkdiyprint-C "Stop stepping on cold, boring floors! Step onto a chubby cat every morning!" (novelty bath rug, USD, 2 ads, 2026-10-11, 0.2 wks).
No relevant long-running ads found. Modrnizd (see bath mat) is the nearest adjacent advertiser.

### 18. Round plush accent rug
Searches: "round fluffy shag area rug" (CA, 0). No ads found. Not proof of none.

### 19. Kitchen runner rug
Search: "washable kitchen runner rug non-slip" (CA, 26 est.).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| 14 pages with the title "Wavy Pineapple Circle Sisal Runner Rug": Masslaugh+ugh, Gropething/tg, Diameterp.shop, Intelligencn.com, Ceremonye.com, Fluxpeaks#SS, Tripopulary, Lineraparnt, Zcjeaneviln, Masslaugh/ma, Micrscopic\6, Taprinferior, Corelration/Y, Ultimatej#e | 2026-09-08 (oldest) to 2026-09-18 | 3.4-4.9 (12 of 14 pages at 4+ wks) | 14 | same title everywhere | Strong by page count and mostly 4+ wks. Product is a sisal (natural fibre) runner, not necessarily a washable kitchen runner. |
| Styledwithjordan (USD) | 2026-08-22 | 7.3 | 4 variants | "Kitchen-Ready Rugs That Bring Comfort" | 7+ wks, 4 ads for kitchen rugs. |
| Garvee Canada (billed in USD) | 2026-09-29 | 1.9 | 1 | "Extra 5% OFF over CA$149.99" (also CA$53.99 and others in the title) | Canadian-dollar thresholds typed in; product mix not confirmed. |
| Amazon.ca | 2026-10-09 | 0.4 | 8 | catalogue incl. "2x8 Runner Rug Non Slip" | Retailer catalogue ad; new start. |

Takeaway: runner rugs show the most coordinated multi-page activity that is already past 4 weeks (14 pages). Kitchen-specific: Styledwithjordan at 7 weeks.

### 20. Knitted hat, scarf and gloves set
Searches: "knitted hat scarf gloves set winter" (CA, 0), "beanie scarf glove set" (US, 3).

| Advertiser | Start date | Weeks | Ads | Offer text | Signal |
|---|---|---|---|---|---|
| JustChance (USD) | 2026-10-12 | 0 | 2 | "The Winter Set you've been looking for! Now 50% OFF!" | New, discount in title. |
| MomFoundit (USD) | 2026-10-09 | 0.4 | 1 | "Beanie, Scarf & Gloves Set - Cold-Weather Set That Helps - Easy Winter Layering" | New. |
| Inferguess (USD) | 2026-10-09 | 0.4 | 1 | "Cozy Up in Style - Your New Favorite Knitted Hat for Chilly Days!" | New. |

Takeaway: no long-running ads; winter sets are only starting to be advertised.

## Strongest signals (top 8)

All are signals of advertiser behaviour only. None proves sales.

1. Bath mat: Modrnizd (CAD, Canada-facing). 212 estimated active ads in Canada, oldest seen 2026-05-14 (21.6 weeks), more at 11.7 and 8.7 weeks, titles all about a quick-dry bath mat ("The Magic Mat", "Ditch the Damp - Save Up to 60%"). Evidence: Ad Library ids 2080288179566629 and 1239951981324065 (both "The Magic Mat", started 2026-05-14), page id 101610052305179. Best signal in this pass.
2. Kitchen/runner rug: 14 pages running "Wavy Pineapple Circle Sisal Runner Rug", 12 of them for 4+ weeks (started 2026-09-08 to 09-11), plus Styledwithjordan "Kitchen-Ready Rugs That Bring Comfort" at 7.3 weeks with 4 ads. Adjacent material (sisal) to our product.
3. Embroidered/knit Christmas stockings: Elegantpark (CAD) "Knit Christmas Stockings", active since 2025-11-10 (48 weeks, one ad); Hand Knit Holiday 5 ads at 4.1 weeks with "25% off preseason"; Callie Ireland 11 ads for a personalized embroidered stocking (new).
4. Rotating makeup brush organizer: 7 pages with the same creative ("360° Rotating Makeup Brush Organizer Box", "Elegant Rotating Vanity Organizer"), 5 of them at 4.1-4.6 weeks and Lidvy at 6.3 weeks.
5. Soft/knit throw blankets (US): Meg DiVittis at 9.3 weeks with 4+ testimonial-style ads; Bearaby at 12.6 weeks (weighted knit, adjacent); In2Green 6.6 weeks; Cleanish Curated 5.3 weeks. No Canada-specific ad found.
6. 3D wooden puzzle kits: Ugeargeek (11.4 weeks) and Rokrgeek (10.4 weeks, plus a second ad at 5.0 weeks) with "3D Wooden Puzzles for Adults, Unique Wooden 3D Puzzle Kits". Only 1-2 ads each.
7. Christmas tablecloth: 16 pages with the identical "Christmas Tablecloth" creative, about 23 ads, all started 2026-10-09 to 10-12. Highest page count but zero history, so it is a "seen being copied right now" signal, not a "has worked for weeks" signal.
8. Dog harness: EcoBark Pet Supplies (5.3 weeks) and FourPaw "SafeWalk No-Pull Dog Harness - Front-Clip Design" (4.4 weeks), single ads each. Weakest of the eight; included because nothing else in the remaining products reached 4 weeks. (Runner-ups: Zeydrt.com horse canvas, 4 ads at 4.4 weeks; Kitsch bath mat, 5 ads at 4.3 weeks.)

## Long-running versus none, by product (4+ weeks)

- Long-running competitor ads found: bath mat (Modrnizd 21.6 wks, BeyondBaths 24.9 wks AUD, Kitsch 4.3), kitchen runner rug (Styledwithjordan 7.3, sisal-runner cluster 4.4-4.9), Christmas stocking (Elegantpark 48 wks, Hand Knit Holiday 4.1), knitted throw blanket (Meg DiVittis 9.3, Bearaby 12.6, In2Green 6.6, Cleanish 5.3), makeup brush organizer (Lidvy 6.3, five pages 4.1-4.6), 3D wooden puzzle (Ugeargeek 11.4, Rokrgeek 10.4), dog harness (EcoBark 5.3, FourPaw 4.4), horse canvas (Zeydrt 4.4, Callie 4.4; borderline).
- Nothing 4+ weeks: shower curtain (Crème De Decor 4.4 on a single ad is the only one, borderline), pet carrier tote, Christmas table runner, Christmas tablecloth, fall door swag/wreath, dog sweater, crochet kit, woven rope basket, plush bathroom rug set, hat/scarf/gloves.
- No relevant ads found at all (tool matching, not proof): cushion cover, round plush accent rug, 5-piece horse set exact phrase, crochet potted plants, crochet crossbody bag.

## Shopify/DTC-looking advertisers (open by hand)

The tool shows page names, not domains. A domain appears only when it was typed into the ad title: ahlwoplus.com (Ahlwo-Fall, not one of our products), Zeydrt.com, ArtofRoyals.com, HorseContacts.com, Intelligencn.com and Ceremonye.com (page names that look like domains). Page names that look like single-product or DTC Shopify stores for our items: Modrnizd (bath mat), Elegantpark (stockings), Hand Knit Holiday (stockings), Meg DiVittis and Cleanish Curated (blankets), Lidvy (rotating organizer), Styledwithjordan (kitchen rugs), Zeydrt.com (horse canvas), Dexy Paws (pet bag, CAD), Callie Gifts / Callie Ireland / Callie Canada (personalized gifts across stockings, pet carriers, horse canvas, blankets), Browphiz (dog harness), FourPaw (dog harness), Nova Haven Selection (shower curtain), Rokrgeek and Ugeargeek (3D puzzles). Competitor sites were not fetched, as instructed. Many of the "page name with random letters or dots" advertisers (e.g. Regulationto.0ar, Practicei.fa08) are clearly throwaway dropship pages sharing creatives; I would not treat them as brands.

## Web snippets (WebSearch, mode standard, 5 queries; context only, not Meta data)

- A 2026 Canada home decor market report snippet gives about 4.5B to 5.2B CAD market size, e-commerce about 22% of sales, shoppers prioritising quality over quantity. No product-level sales rankings were found for fall or Christmas 2026.
- Fall decor guide snippet: harvest wreaths in burnt orange and gold, embroidered plaid-bow wreaths and door banners are named as popular outdoor pieces.
- Walmart Connect Canada holiday deck snippet: 59% of Canadians celebrating Christmas at home say they will decorate. Nothing on table runners or stockings specifically.
- Bath mat snippets: diatomite stone mats described as fastest drying and "mainstream in 2026"; low-pile microfiber described as machine washable and highest volume on Amazon per one unverified market page. No Canada-specific sales data.
- Pet snippets: pet sweater interest peaks in December per a SaleHoo trend page (relative interest, not sales). No data on carrier bags.
- Dropshipping roundup snippets mention no crochet kits; there is no outside confirmation that crochet kits are trending.
Sources: https://www.sourceready.com/report/detail/canada-home-decor-market-report-2026 , https://merchize.com/fall-decor-ideas/ , https://www.walmartconnect.ca/content/dam/walmart-connect-canada/en/documents/pages/resources/Holiday%20Insights%202026/WMC_Holiday_Insights_FY26_E.pdf , https://www.salehoo.com/trends/pet-sweater , https://www.accio.com/business/black-bath-mat , https://zacjohnson.com/?p=1672 , https://www.trendtrack.io/blog-post/top-trending-dropshipping-products-in-2026-summer-2026

## What we could not see

- No date-range, start-date or language filter, no sort order, no pagination cursor; limit is capped at 50 and results are newest-first. The "started before 2026-09-15 and still active" query and "5 pages per search" could not be run. Only searches narrow enough to return fewer than 50 ads reached older ads, so a product with a huge, noisy result set (shower curtain, bath mat generic, throw blanket generic) may still hide older ads beyond the first 50.
- Search is loose word matching: short phrases drown in unrelated story-app ads (cushion cover, dog harness, 3D wooden puzzle), and very long phrases often return 0 (horse set, Christmas tablecloth long form, round rug). Zero results do not mean no advertisers.
- Not returned at all: ad body text, platforms (Facebook/Instagram/Messenger/Audience Network), creative format (image/video/carousel), landing-page domain, price (only what the advertiser typed into the title), spend, impressions, reach, sales or reviews. Where an ad title says "100,000+ customers", "5.0 stars, 3,405 reviews" or "2026 Bestseller", that is the advertiser's own claim and is not verified.
- "Ads seen" counts are limited by the 50-ad page, so they under-count big advertisers. Only Modrnizd was counted with a page filter (212 estimated).
- Weeks running uses the start date of the ad, which can be reset when an advertiser duplicates or edits an ad; a store may have run the product longer than any single ad shows.
- Currency is billing currency, not target market (EUR, DKK, KRW, INR, AUD, GBP, MYR ads appeared under CA/US filters and are flagged where seen).
- Catalogue ads (Temu, SHEIN, Amazon.ca, Alibaba, Wayfair) bundle many products and say nothing about one product.
- Snapshot images were not opened, so I could not check that a titled ad actually shows our exact product.
- Web search is US-only and returned no Canada-specific sales rankings.
