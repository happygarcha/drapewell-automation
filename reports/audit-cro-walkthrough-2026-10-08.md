# Drapewell CRO cognitive walkthrough, 2026-10-08

Read-only audit. Nothing was changed, uploaded or published.

## 0. Method and limits

- Qualitative persona simulation, not statistical evidence. Every finding is a hypothesis to validate. Volume is tiny (466 sessions, 10 add-to-cart, 4 checkout, 1 completed, 0 orders), so no segment-level conclusion is possible from analytics.
- Sources: live HTML fetched with `curl` from drapewell.myshopify.com (home, /collections/all, /collections/pet-supplies, /collections/gifts-under-25, 2 product pages, /cart, /pages/about, /pages/contact, shipping and refund policies, /products.json); the repo `theme/` folder; one read-only Shopify Admin GraphQL query (shipping profiles and currency).
- Not done: no rendered 390x844 screenshots (no headless browser available in this run), so layout and fold position are inferred from HTML and CSS. No test cart or checkout was created (it would add to the store's analytics), so the real checkout shipping step was not seen. Rates come from the delivery profile, not from a checkout.
- Live theme (published) is believed to be `Copy of Drapewell Discover` (191787335989), repo as of bacca2f, per `docs/deploys.md` of 2026-10-07. The fetched HTML references theme asset version `t/17`. Fixes below are repo edits; they reach customers only after a full sync to an unpublished copy and the owner publishing.

### Persona

Maya, 34, Surrey-adjacent suburb in Canada, iPhone 14 (390x844). Arrives from a Pinterest pin or a Meta ad showing one cosy home or pet item. Has never heard of Drapewell. Price-sensitive. Has been burned once by a dropshipping store (3 weeks, then a tracking number that never moved). Pays with Apple Pay when she trusts a store. Decision style: quick scanner who checks shipping and returns before she commits. Attachment: anxious (needs reassurance at each step). Contact threshold: a store that shows total landed cost early and looks like a real business.

Relevance contract: the ad promised one specific item at one price. The landing page must show that item or its category in the first 3 seconds, the price, and what it really costs to get it.

## 1. Key facts established (evidence)

| Fact | Evidence |
|---|---|
| Shipping is weight-banded, Canada CA$9.99 (0-300 g), 14.99 (-600 g), 19.99 (-900 g), 24.99 (-1200 g), 36.99 (-2000 g), 59.99 (-3000 g) | Shopify delivery profile "CJ Dropshipping Fulfillment" |
| Shipping is large relative to price. Using each product's first variant: median shipping is 59% of the item price; 60% of the 77 products carry shipping of 50% or more of price; 4 products (5%) ship for more than the item costs | `/products.json` grams x bands. Examples: door mat CA$15.00 + CA$19.99 shipping (133%), woven bath mat CA$16.99 + 19.99 (118%), stadium cushion CA$17.99 + 19.99 (111%), cat tent small CA$13.99 + 9.99 (71%), waffle towel CA$27.99 + 14.99 (54%), pet carrier CA$29.99 + 14.99 (50%) |
| Shipping cost appears only at checkout, plus "from CA$9.99" in two text pages | Cart and drawer say "Shipping and taxes are calculated at checkout." PDP trust row gives days only. Policy/About say "start from $9.99". |
| Taxes are added on top (`taxesIncluded: false`) | Admin query. GST/PST arrives as a second surprise at checkout |
| Currency is CAD but every price prints as "$" with no "CA" or "CAD" | Rendered prices "$13.99"; money format shows no currency |
| No reviews on any product. The reviews block is empty, with two stacked empty states ("Be the first" from the theme, then Judge.me's own "Be the first to write a review" with five "0% (0)" rows) | Product HTML |
| No express checkout button on product or cart pages | `grep payment_button` in theme: no result |
| No compare-at prices on any product, so there is no fake discount anywhere | `/products.json`: 0 variants with compare_at |
| Contact email is a personal-looking Hotmail address (happygarcha2018@hotmail.com); phone 604-226-9941 and a real Surrey BC address are on About and Contact only | About, Contact, policies |
| About page states plainly it is a dropshipping store and that delivery takes longer. Good honesty, but it is two clicks away from the footer | About text |
| Visual identity is a dark neon theme (near-black background, magenta/cyan/lime accents, 900-weight uppercase headlines) | `theme.css` tokens, `theme-color #0b0b14` |
| Homepage hero H1 is the product title in uppercase, sub-line is the generic "Fresh in the store: take a look." There is no brand promise anywhere above the fold | `hero-slide.liquid`, locale `home.discover_new` |
| All 5 hero slides render `loading=eager fetchpriority=high` at 900 px | Home HTML: first 3 imgs all eager/high |
| Announcement bar says "10-25 day delivery", the Canada promise is 13-25 | Home HTML vs policy |
| Seasonal items: Thanksgiving wreath and maple/pumpkin items are for sale on 2026-10-08. Canadian Thanksgiving is Mon 2026-10-12 and the delivery estimate starts at 13 days | Catalogue plus calendar |
| Analytics gap: 455 of 466 sessions are "direct" | Owner data. Paid social usually shows up as direct when links lack UTMs or open in in-app browsers |

## 2. Walkthrough (Maya, scroll by scroll)

Voice 1 is Maya, raw. Voice 2 is the analyst (LIFT / Cialdini / Fogg). Positions are inferred from the markup.

### Pre-arrival
Maya: "Okay, that pin of the cat tent was cute, thirteen ninety-nine, that's nothing. I've never heard of this shop though. Last time I ordered a 'cheap lamp' it took five weeks. I'm going to look for shipping and returns before I even think about it."
Analyst: Emotional baseline anxious/curious. Fogg: motivation medium (impulse price), ability high, prompt = the ad. LIFT: anxiety is already high; any hidden cost will be read as confirmation.

### Home, fold 1 (0-844 px)
Maya: "Ships to Canada and US, 10 to 25 days. Ugh, that's long. Wait, which is Canada? And where's the cat tent? It's showing me a stadium cushion in huge capital letters. 'Fresh in the store, take a look.' Okay. What is this place? Dark purple, neon... looks like a gaming shop, but it sells bath mats? I'll tap 'Pet Supplies' in those pills."
Analyst: Five-second test: What is this? Partially (title says "Home, Outdoor, Pet & Everyday Finds", a scattershot). Is it for me? Unclear; the dark neon look does not match a 28-50 home/pet buyer from Pinterest. What to do? "Shop now" on a random product. LIFT: Relevance and Clarity both down; Value Proposition absent. Cialdini: none active (no Authority, Social Proof, Unity). CTA reachable: yes (hero button, room chips), but it points at the wrong product for this visitor. Mobile: topbar + brand + search + 10 chips + hero 480 px minimum height pushes the grid below the fold. Trust delta: down.

### Home, fold 2-3 (feed)
Maya: "Prices look low, good. Plus buttons on each card, fine. No stars, no 'bestseller', no photos of real people. Everything's stock photos. Where do I see shipping cost? 'Shipping and taxes are calculated at checkout.' So I won't know until the end. That's exactly what the last shop did."
Analyst: Cards are clean, sort control works. Cialdini: Social Proof missing (honestly: there are no reviews), Authority missing. LIFT: Anxiety up (hidden shipping cost). Fogg: ability okay, motivation flat.

### Home, footer (fold 5+)
Maya: "Newsletter, About, Contact, policies. Finally. I'll read the shipping policy... 'rates start from $9.99.' Start from? OK, so it's at least ten on a thirteen-dollar thing."
Analyst: First time shipping cost is mentioned in the entire journey, and only as "from". Contact details (address, phone) are not in the footer, only behind a link.

### Collection (Pet Supplies, 5 products, and Gifts under $25)
Maya: "Cards are fine. Everything says 'From' or a price. 'Gifts under $25' is nice, but those prices don't include a shipping cost that's half the price."
Analyst: The "Under $25" framing is a price-to-shipping trap: the badge promises low price, the landed cost is 40-130% higher. Collection pages have no shipping line, no review stars and no trust text. Collections are good ad landers for category pins but carry no reassurance.

### Product page A: Foldable Cat Tent Bed, CA$13.99 (cheap item)
Fold 1: gallery, title, price, variant chips (colour, size), quantity, Add to cart.
Maya: "Cute. Thirteen ninety-nine. It has sizes. My cat is chunky, which size? OK there's a size table below the buy button. Price goes to nineteen ninety-nine when I pick Medium, so the thirteen ninety-nine was the tiny one. Still okay."
Analyst: The headline price is the smallest variant (Small, 150 g), so Maya pays CA$19.99 or 23.99 for the size that fits a normal cat, plus CA$14.99 shipping. Hierarchy: title H1 is a long SEO string. Sticky add-to-cart exists on phones (good, `sticky-atc` appears when the main button leaves view).
Fold 2: trust row.
Maya: "'Tracked delivery, 13 to 25 days.' So at best two weeks, at worst almost a month. 'We replace it or refund you if damaged or wrong.' 'Change-of-mind returns are not accepted.' So if the size is wrong I'm stuck. Hmm. I like that it says it straight, but it's not helping me."
Analyst: Honest and policy-accurate trust row (a strength: Authority via transparency). But it states days, not cost, and the no-returns note is the last line, which hits right when Maya needs size certainty. Anxiety down slightly on delivery clarity, up on returns.
Fold 3: description and sizes table, shipping paragraph.
Maya: "OK sizes in centimetres, 'allow 1-3 cm variance'. No picture of it with an actual cat. No idea where this ships from. 'Supplier partners'? So who is making it?"
Analyst: Specs are decent; Liking and Social Proof are missing (no in-use photos or UGC, which the store cannot honestly have yet). Origin of shipment never stated on PDP.
Fold 4: reviews.
Maya: "Reviews: five empty stars, 'No reviews yet. Be the first.' And then again 'Be the first to write a review' with a bunch of zeroes. So nobody has bought this. Nobody. I'm not going to be the guinea pig for a shop I've never heard of."
Analyst: The empty block is the loudest social proof statement on the page: "zero". Duplicate empty states from theme and Judge.me double the effect. Cialdini: Social Proof actively negative. This is the "moment I almost left".
Add-to-cart: she may still add at this price; cart-level shipping surprise comes next.

### Product page B: Waffle Weave Bath Towel, CA$27.99 (over CA$25)
Maya: "Twenty-eight dollars for a towel, not cheap for a no-name shop. Four colours. 'Long-staple cotton.' There's no GSM, no weight, no care instructions, one photo style. Compare: a towel at a big Canadian retailer is the same money and ships in two days. Why would I wait 25 days for this one?"
Analyst: Over CA$25 the persona has a real comparison frame (local retail), and the store offers no differentiator: no material detail beyond fabric name, no weight (GSM), no care info, no in-use photos, no origin. Shipping CA$14.99 makes the landed cost about CA$43 before tax. LIFT: Value Proposition fails (cost 43 + 25-day wait vs known retailers); Cialdini: Authority and Social Proof missing. Fogg: motivation low, ability high, prompt is just the button.

### Cart (and drawer)
Maya: "Subtotal thirteen ninety-nine. 'Shipping and taxes are calculated at checkout.' Payment icons, secure checkout, 'Canada 13-25 days.' But no number. Where's the Apple Pay button? I have to go through the whole form."
Analyst: Cart is clean and the checkout strip is truthful. It prints delivery days but no shipping cost, and there is no estimator even though the Ajax API `/cart/shipping_rates.json` could supply one. Fogg: prompt present (checkout button), ability reduced (no express checkout), motivation drained by uncertainty. The "Import duties included on US orders" line is irrelevant to a Canadian and invites a "what about me?" question.

### Checkout (not walked, inferred)
Maya: "Shipping 14.99 on a 13.99 thing, and tax on top. Forget it." This is the most probable exit of the 4 who reached checkout and the 3 who did not complete. The 1 "completed checkout, 0 orders" needs a separate look (Section 5, item C-2).

### About, Contact, policies
Maya: "Okay, a Surrey address, a phone number, hours, and a plain statement that it's a dropshipping store. That's more honest than most. But the email is hotmail. Real businesses have their own email, don't they?"
Analyst: Best trust content on the site, buried. Authority/Unity are present in the text (Canadian, Surrey BC, real address, FAQ). FAQPage schema exists. It is only reached from the footer.

### Speed and mobile technicals
- HTML TTFB ~0.3-0.8 s from the sandbox, home 178 KB, PDP 187 KB (includes product JSON), CSS 69 KB, JS 55 KB. Not the main problem.
- Five hero images load as eager/high priority; only the first needs it.
- Gallery thumbs have empty `alt`, hero art has empty `alt`.
- Dark theme with heavy motion (glow, parallax) may feel slow on mid-range phones. Not measured.

## 3. Framework summary

LIFT
- Value Proposition: undefined at brand level; shipping eats 40-130% of the price on the cheapest items.
- Relevance: ad-to-page mismatch likely (homepage lands on hero of newest product, not the pinned item). Direct traffic hides the landing page, so verify.
- Clarity: policies are clear but placed in the footer and cart small print; shipping cost is not clear until checkout.
- Urgency: none, and none should be faked. Honest options exist (Section 5, M-3, H-6).
- Anxiety: highest factor. Hidden shipping, zero reviews, no-returns, unknown brand, hotmail, long delivery.
- Distraction: low; the neon motion and hero slideshow compete with the product a little.

Cialdini (honest use only)
- Reciprocity: absent. A free size/fit guide or shipping estimator would give value first.
- Commitment: absent (no wishlist/save).
- Social Proof: negative by absence; cannot be fixed with invented content; real route is to collect real reviews.
- Authority: partially present (transparent policies, structured data). Not surfaced where decisions happen.
- Liking: weak (stock imagery, neon look unlike target persona).
- Scarcity: none; must not be invented. Use only real, date-based facts.
- Unity: weak; "Canadian store in Surrey, BC" is real and unused.

Fogg
- Motivation: medium at best (cheap price, but cost uncertainty and no proof reduce it).
- Ability: reduced by no express checkout and shipping surprise at the last step.
- Prompt: sticky add-to-cart on phones is good; no follow-up prompt after cart (abandoned-cart email depends on email capture, which only happens at checkout).

## 4. What already works (keep)
- Honest, consistent policy copy across PDP trust row, cart strip, About, Contact, policies.
- No fake discounts, no fake scarcity, no fake reviews; reviews show only real data.
- Sticky add-to-cart bar on phones; secure checkout strip with real payment icons; Shop Pay/Apple Pay/Google Pay named.
- Real address, phone, business hours, and reply-time promise; FAQ content with schema.
- Fast server response and light page weight.

## 5. Prioritized fix list

Legend: Theme = edit in `/home/user/drapewell-automation/theme/` then full sync to an unpublished copy (never upload `config/settings_data.json`). Admin = Shopify admin or app setting made by the owner.

### CRITICAL

**C-1. Shipping cost is invisible until the last step, and it is 40-130% of item price**
- Problem: price-sensitive shopper sees CA$13.99, then learns CA$9.99-19.99 at checkout, plus tax.
- Evidence: delivery profile bands; computed ratios in Section 1; cart/drawer copy "calculated at checkout"; zero shipping-cost mention on PDP.
- Change (Theme):
  1. `locales/en.default.json`: add `product.ship_est` = `"Shipping to Canada for this item: CA${{ price }}. Tax added at checkout."` and `general.ship_note` = `"Shipping from CA$9.99, by weight. Tax added at checkout."`.
  2. `snippets/trust-row.liquid`: put a new first line above the "Tracked delivery" `<li>` that prints the estimate from the selected variant weight. In Liquid, map `current.weight` (grams) to the band: `<=300 9.99, <=600 14.99, <=900 19.99, <=1200 24.99, <=2000 36.99, <=3000 59.99`. Keep the band table in one `{% liquid %}` block at top of the snippet with a comment "must match Admin > Settings > Shipping and delivery > CJ Dropshipping Fulfillment".
  3. `assets/theme.js` variant-change handler (near line 177, where `priceEl.innerHTML` is updated): update the shipping line when the variant changes (variant JSON already has `weight` in `[data-product-json]`).
  4. `sections/cart.liquid` and `snippets/cart-drawer.liquid`: replace `general.shipping_note` with `general.ship_note`, and add a postal-code input that fetches `/cart/shipping_rates.json?shipping_address[zip]=…&shipping_address[country]=Canada` and prints the returned rates (real, from Shopify).
- Admin: none (rates already configured). Verify on a preview that the Liquid band matches checkout for 3 products; multi-item carts add weights, so the cart estimator is the authority.
- Expected impact: removes the main surprise-at-checkout trigger; shoppers who still proceed have accepted the cost, which should raise checkout completion even if add-to-carts fall slightly. Judge by checkout-reached to completed ratio.

**C-2. One completed checkout and zero orders: find out why**
- Problem: unexplained funnel break at the bottom; could be a test, a failed payment, or a fraud/payment hold.
- Evidence: owner data (1 completed checkout, 0 orders).
- Change (Admin): Orders > filter all statuses including archived, cancelled, test; Settings > Payments: confirm a gateway is active (not test mode) and that Shop Pay/Apple Pay domain verification passed; Abandoned checkouts: open the 4 and read the failure step; place one real low-value order yourself with a card and refund it.
- Expected impact: a payment-side bug would hide any gain from every other fix. Do this first.

**C-3. Traffic attribution is blind (455/466 direct)**
- Problem: cannot tell which ad, pin or landing page each session came from; cannot tell if ads land on the home page.
- Evidence: owner data.
- Change (Admin / ads): add UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) to every Meta and Pinterest ad URL; verify the Meta pixel and Pinterest tag fire `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase`. Point each ad at the product or collection pictured in the ad, not the homepage.
- Expected impact: ad-to-page relevance can be diagnosed; fixes below can be tested per source.

### HIGH

**H-1. Zero-review state broadcasts "nobody has bought this" (twice)**
- Problem: empty stars, "No reviews yet", "Be the first", then a Judge.me block of five "0% (0)" bars.
- Evidence: PDP HTML of both products.
- Change (Theme): in `snippets/reviews.liquid`, when `rv_has` is false, do not render the empty stars row or the `.reviews-soon` line, and hide the widget's own empty UI. Add to `assets/theme.css`: `.reviews.is-empty .jdgm-rev-widg__summary, .reviews.is-empty .jdgm-histogram {display:none}` (confirm the exact Judge.me class names on a preview; they may differ). Keep a single quiet line: "No reviews yet. After delivery we email every buyer to ask for an honest review, good or bad." only if that email is actually enabled.
- Admin: Judge.me > enable automatic review-request emails 7-10 days after delivery (the delivery window is 13-25 days, so set the delay from fulfilment, not order, and allow photo reviews). Never import supplier-store reviews or write your own; they are not your customers' reviews.
- Expected impact: removes the strongest negative proof cue; reviews later accumulate from real buyers, which is the only durable fix for Social Proof.

**H-2. Dark neon look does not match the persona or the source (Pinterest/Meta home and pet content)**
- Problem: near-black gaming look with 900-weight uppercase headlines for bath mats, cushions and pet beds. Reads as a different kind of shop and weakens the "real home store" signal.
- Evidence: `theme.css` tokens (`--bg oklch(0.14 0.025 285)`, neon magenta/cyan/lime), `html { color-scheme: dark }`, `.hero h1` uppercase 900.
- Change (Theme): add a light palette as the default: in `assets/theme.css` `:root` set `--bg` to a warm off-white, `--surface` white, `--text` near-black, `--text-soft` mid grey, change `--neon-a/b/c` to one calm accent colour, set `color-scheme: light`, `meta theme-color` in `layout/theme.liquid` to match, and remove `body::before` glow. Make `.hero h1` normal case, weight 700. Treat as a design task for `design-ui-designer` / `design-brand-guardian`, then verify contrast on a preview. This is the largest change; stage it behind an A/B on a second unpublished copy rather than replacing the live theme blindly.
- Expected impact: closer match to the ad's visual world and to what a home-goods shopper expects; may reduce first-seconds bounce. Test, do not assume.

**H-3. Homepage never says what the store is or why trust it**
- Problem: hero H1 is a random newest product title with "Fresh in the store: take a look."
- Evidence: `snippets/hero-slide.liquid`, locale `home.discover_new`.
- Change (Theme): in `sections/home.liquid` above the slideshow add a plain two-line band (uses only true facts): "Home, pet and everyday finds. Canadian store, Surrey BC. Tracked delivery to Canada and the US." with links "Shipping & delivery" and "About us". In `hero-slide.liquid` make the product title an `<h2>` on all slides and give the page a real `<h1>` in that band (also helps SEO). Change `home.discover_new` to something factual such as `"CA${{ price }} · tracked delivery 13–25 days to Canada"` built from product price.
- Expected impact: passes the five-second test (what/for-whom/next step) and states the delivery tradeoff up front instead of hiding it.

**H-4. No express checkout (Apple Pay / Shop Pay) on product or cart**
- Problem: iPhone shopper must enter an address form to see shipping; extra effort at the weakest moment.
- Evidence: `grep payment_button` returns nothing in `theme/`.
- Change (Theme): in `sections/product.liquid` inside `{% form 'product' %}` after the Add to cart button add `{{ form | payment_button }}`; in `sections/cart.liquid` add `{{ additional_checkout_buttons | additional_checkout_buttons }}` below the Checkout button (style via `.shopify-payment-button` in `theme.css`). Admin: make sure Shop Pay, Apple Pay and Google Pay are active (Settings > Payments).
- Expected impact: fewer steps for returning Shop Pay users and Apple Pay users; the wallet sheet shows shipping and tax before payment.

**H-5. Fix the price shown on variant products so it is not misleading (cat tent shows CA$13.99, real choice CA$19.99-23.99)**
- Problem: ad and card price is the smallest variant; most people pick bigger sizes.
- Evidence: cat tent variants 13.99/19.99/23.99; `price.liquid` shows plain `product.price` (and PDP defaults to first variant).
- Change (Theme): `snippets/price.liquid` already prints "From" only when `price_varies`; confirm cards show "From CA$13.99" (the home HTML shows "$13.99"; the rendering suggests the Small variant price on PDP). In `sections/product.liquid` show a "From" prefix in `[data-price]` until a size is chosen, and on variant change update it (`theme.js` line ~177). Ad creative must use the same figure ("from").
- Expected impact: fewer "bait" feelings; fewer price-change surprises on the PDP.

**H-6. Honest date-based urgency, and stop selling items that cannot arrive in time**
- Problem: the Thanksgiving wreath and maple/pumpkin items are for sale; Canadian Thanksgiving is 2026-10-12, but the shortest Canadian delivery is 13 days. Sells a product that will arrive late and invites a "lost/late" claim and a bad first review.
- Evidence: catalogue (`thanksgiving-maple-leaf-pumpkin-wreath`, autumn cushion covers), calendar, shipping policy.
- Change (Admin): set Thanksgiving-only items to draft or keep with a clear note ("Will arrive after Thanksgiving, good for autumn display"). Autumn items can stay if framed for the season, not the date.
- Change (Theme, optional, real urgency only): on Christmas products render an "Order by [date] to receive by Dec 25 (latest estimate)" line computed from `'now' | date: '%s'` + 25 days processing-inclusive, hidden once that date has passed. With the policy's "from the day you order" wording, 25 days before Dec 25 is 30 Nov. Do not use countdown timers or "only X left".
- Expected impact: honest reason to buy sooner for gift shoppers, fewer disappointed buyers.

**H-7. Put shipping/returns/contact reassurance where the decision is made, in plain order**
- Problem: policies live in the footer; the PDP puts "Change-of-mind returns are not accepted" last, with no mitigation.
- Evidence: `trust-row.liquid`, locale `product.trust_*`.
- Change (Theme): `locales/en.default.json`: keep the three lines; rewrite `trust_note` to lead with the helpful facts: "Based in Surrey, BC. Questions before you order? Email or call us, we reply within 1 business day." with phone and email links (already in the pages). Then the no change-of-mind line. In `theme.liquid` add a short Contact link and phone to the topbar on phones (e.g., "Help" linking to /pages/contact). Add a one-line "Size and fit help: email us before you order" to PDPs with size variants (the Contact page already promises a straight answer on matching prints).
- Expected impact: a lower-anxiety read of the no-returns rule; a visible human fallback.

**H-8. Own-domain email and domain**
- Problem: Hotmail address on every policy page, and `drapewell.myshopify.com` domain.
- Evidence: About/Contact/policies; URL.
- Change (Admin): buy a custom domain (generate-domain-names can check availability), connect it in Settings > Domains and set it as primary; set up a branded mailbox (e.g. hello@yourdomain), update Settings > Store details (sender and customer email), and the refund/shipping/contact policy text; update ad URLs afterwards (redirects carry old links).
- Expected impact: removes two classic "throwaway store" cues; also improves email deliverability.

### MEDIUM

**M-1. Announcement bar says 10-25 days; Canada is 13-25**
- Evidence: HTML announce vs policy.
- Change (Admin): Online Store > Customize > Theme settings > announcement (stored in `settings_data.json`, which must not be uploaded): "Canada: 13–25 day tracked delivery · shipping from CA$9.99". The announcement is the first line of text on every page, so it should carry the one number that surprises people.
- Impact: less "gotcha"; consistent wording.

**M-2. Show currency as CA$**
- Evidence: all prices print "$".
- Change (Admin): Settings > General > Currency display > Change formatting: set HTML with currency to `CA${{amount}}` (or "${{amount}} CAD"). No theme code is needed because the theme uses `| money`. Note US visitors also shop here, so CAD clarity helps them as well.
- Impact: removes a US-vs-CA price doubt for ad visitors.

**M-3. Cart/drawer: drop the US-duty line for Canadian visitors and add an item-count shipping tip**
- Evidence: `general.co_tracking` mentions import duties on US orders.
- Change (Theme): split into locale keys per market using `localization.country.iso_code`: show the duty line only when country is US. In the drawer, add a true line: "Shipping is charged by total weight, so combining items can lower the shipping cost per item." (real, per the weight-band model; verify with the estimator).
- Impact: less irrelevant noise; legitimate nudge to bundle.

**M-4. Show what the store has that supports confidence, in the first scrolls**
- Evidence: About FAQ has these facts; PDP/home do not.
- Change (Theme): add a slim "Why shop with us" strip on the home page under the hero and on the cart: "Real business in Surrey, BC · Phone 604-226-9941 · Replacements or refunds for damaged, defective or wrong items within 30 days". All three facts are already published in the policies.
- Impact: Authority and Unity (honest) at no cost; supports the anxious persona.

**M-5. PDP content for items above CA$25 needs substance**
- Evidence: waffle towel description has 4 bullets, no weight (GSM), no care, no origin, one-line story.
- Change (Admin, via `marketing-seo-specialist` / `marketing-content-creator` drafts): add true specs only (take from the CJ product detail; do not invent GSM): composition, weight, care, what's included, and the shipping origin if CJ lists it. State "Ships from our supplier's warehouse" accurately once the origin is confirmed.
- Impact: raises the perceived value of the CA$28-50 items and answers the "why wait 25 days for this" question.

**M-6. Email capture before checkout, for abandoned-cart follow-up**
- Evidence: newsletter only in footer; no popup or cart email capture; abandoned-checkout emails need an email, which exists only after checkout step 1.
- Change (Admin): confirm Settings > Checkout > Abandoned checkout emails are on with a clear subject ("Your cart at Drapewell"); in Theme consider a footer or cart-page "Email me my cart" form using `customer` form with a tag. No countdown or fake discount in the email; a real small first-order discount is a business decision for the owner (create-discount can do it) rather than a tactic to fake.
- Impact: second chance for the 10 add-to-cart sessions; requires `marketing-email-strategist` copy.

**M-7. Hero loads five eager hi-priority images**
- Evidence: `hero-slide.liquid` line with `loading: 'eager', fetchpriority: 'high'` for every slide.
- Change (Theme): `loading: (n == 0 | 'eager' else 'lazy')` and `fetchpriority` only on `n == 0`; add `alt: product.featured_image.alt | default: product.title` to the first slide.
- Impact: faster first view on cellular networks; slightly better accessibility.

### LOW

**L-1.** Alt text: gallery thumbs `alt=""`; give thumbs `alt: product.title | append: ' photo N'` (`sections/product.liquid`).
**L-2.** Long SEO-style titles on PDP H1 (e.g., "Foldable Cat Tent Bed — Enclosed Cat House, 3 Sizes"): keep the SEO title in `<title>` and use a shorter display title via a metafield (Admin + `product.liquid`). Low urgency.
**L-3.** Add "Recently viewed" collapse on phones to shorten page; low value.
**L-4.** Cart page: replace inline styles on the quantity input with a class (`sections/cart.liquid`); housekeeping.
**L-5.** After the first reviews arrive, switch the hero source to a "Best sellers" collection (editor setting already exists in `sections/home.liquid`); do not label anything "bestseller" before it is true.
**L-6.** Run a second walkthrough after C-1, H-1, H-4 ship to compare the emotional arc (longitudinal re-run).

## 6. Not recommended (explicitly rejected)
- Fake or imported supplier reviews, invented testimonials, "X people are viewing", fake stock counters, countdown timers, inflated compare-at prices, fake "bestseller" badges. The live theme correctly lacks all of these; the old Sales Pop app was already left off.
- Free-shipping banners that are not true. A legitimate strategic alternative is to build a median shipping amount into the item price and offer shipping included; only do it with honest pricing, and test margins first (support-finance-tracker).

## 7. Suggested order of work
1. C-2, C-3 (diagnose; no code).
2. C-1 plus M-1, M-2 (cost clarity; one deploy).
3. H-1, H-4, H-7, M-3, M-4, M-7 (one deploy).
4. H-3, then H-2 on a staged copy for A/B.
5. H-8 and M-5, M-6 in admin in parallel.
Deploy via the full-sync workflow in CLAUDE.md onto an unpublished theme; the owner previews and publishes.

## 8. Hypotheses to validate (do not read as facts)
- Hidden shipping cost is the top driver of the 4-to-1 checkout drop.
- The dark neon aesthetic reduces trust with the target persona.
- Empty review blocks suppress add-to-cart on products over CA$25 more than on the cheapest ones.
- Ads that land on the homepage underperform ads that land on the pictured product.
Validate with one change at a time where traffic allows; at 466 sessions per month, expect results only for large effects, so track checkout-reached/completed and add-to-cart/session over several weeks before concluding.
