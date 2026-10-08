# Drapewell audit: structured data, e-commerce SEO, GEO readiness (2026-10-08)

Read-only audit of https://drapewell.myshopify.com. All live fetches used `curl -sS -m 30`. Nothing in Shopify was changed. The code below is a set of proposals: commit it to `theme/` first, then deploy to an UNPUBLISHED copy per `CLAUDE.md`.

Builds on `reports/geo-aeo-2026-10-07.md` (llms.txt draft, FAQ, "what not to do") and `reports/seo-drafts-2026-10-05.md` (titles, meta, alt-text patterns, schema reminders). Their content is not repeated here.

## 0. Scope, method and what could not be measured

Pages fetched live: homepage, `/collections/all`, `/collections/bathroom`, `/collections/living-room`, `/collections/outdoors`, `/collections/beauty`, `/collections/tech`, and all 77 product pages (6 were inspected in depth: hammock, pet carrier, PEVA shower curtain, Christmas table runner, kitchen scale, Christmas sign). Also fetched: `/pages/about`, `/pages/contact`, the 5 `/policies/*` pages, the 3 duplicate `/pages/*-policy` pages, `/products.json`, `/collections.json`, `robots.txt`, `/llms.txt`, `/llms-full.txt`, `/agents.md`, and the sitemap index plus all child sitemaps.

The live theme is the one carrying the 2026-10-07 seo-meta snippet. Shopify's own tracking JSON on the product page shows `theme_id 191789302069, theme_published: true`. `docs/deploys.md` still describes that theme as UNPUBLISHED, so the publish should be logged.

**Not measured:**
- **Which prompts cite Drapewell in ChatGPT, Gemini, Perplexity or AI Overviews.** I don't know. No DataForSEO or other AI-visibility tool was available, and I did not guess.
- **Off-site entity signals.** Wikipedia, Reddit and YouTube were blocked by the sandbox proxy (HTTP 403 on CONNECT), so brand-mention presence is unmeasured.
- **Google documentation.** developers.google.com was blocked. Google requirements cited below come from my own knowledge (cutoff mid-2026) and were not re-checked today. Run the Rich Results Test and check Merchant Center diagnostics after deploying.
- **Merchant Center / Google & YouTube channel status, Search Console coverage, checkout shipping rates.** These need admin or GSC access. I did not create a cart to read rates.
- **Prices for a real US visitor.** I could only test `?currency=USD` and `?country=US`. Both returned CAD, and `/en-us/` returns 404, so there is no US market subfolder.

## 1. GEO readiness score: 52 / 100 (heuristic)

| Dimension | Weight | Score | Basis (live evidence) |
|---|---|---|---|
| Citability | 25% | 55 | About page has 8 question-headed, direct answers (good). The homepage has no text answering "what is Drapewell", all 15 collections have 0 words of copy, and refund timing contradicts across pages (section 3, C2). |
| Structural readability | 20% | 60 | One H1 per page, question H2s on About. But the homepage H1 is a rotating product title, and product pages show two "Customer reviews" H2s. |
| Multi-modal | 15% | 35 | 0 of the 77 products have any image alt text set (about 600 images), and there is no video. The theme falls back to the product title only on the main image. |
| Authority and brand | 20% | 30 | Organization schema is complete for address, phone and hours. Missing: logo, sameAs (no social profiles exist), reviews (Judge.me shows `data-number-of-reviews='0'`). Still on the `myshopify.com` domain with a hotmail address. Off-site signals unmeasured. |
| Technical accessibility | 20% | 75 | Server-rendered Liquid: content is in the raw HTML, no JS needed. All AI crawlers are allowed. JSON-LD on all 77 product pages parses as valid JSON. Weaknesses: conflicting duplicate policy pages, empty collections in the sitemap, and a 404 blog URL in the sitemap. |

Weighted total: 13.75 + 12 + 5.25 + 6 + 15 = **52**.

Platform estimates are heuristics from on-site readiness only, not measured visibility:

| Platform | Est. | Main limiter |
|---|---|---|
| Google AI Overviews / Gemini | 50 | Thin collection and homepage copy; no shipping or returns data in the Offer markup; new domain |
| ChatGPT search | 45 | Depends on OAI-SearchBot (allowed) and Bing-indexed pages; Bing indexing unmeasured |
| Perplexity | 50 | PerplexityBot allowed; About FAQ is quotable |
| Bing Copilot | 45 | Same as ChatGPT; Bing Webmaster Tools status unknown |

## 2. AI crawler access, llms.txt, agents.md

`robots.txt` is Shopify-generated. It has only a `User-agent: *` group (`Allow: /`, standard cart, checkout and account disallows) and an `adsbot-google` group, with no bot-specific rules. Live fetches of a product page with each UA below returned HTTP 200 with the same JSON-LD, H1 and links. The ClaudeBot response was about 30 KB smaller only because app-script markup was ordered and trimmed differently; the content matched. One ClaudeBot request returned an 18-byte `local_rate_limited` body; retries succeeded, and I could not tell whether that came from the sandbox proxy or Shopify.

| Crawler | Governs | robots.txt | Live fetch |
|---|---|---|---|
| OAI-SearchBot | ChatGPT search results | Allowed (via `*`) | 200 |
| GPTBot | OpenAI training only | Allowed | 200 |
| Claude-SearchBot | Claude search citations | Allowed | 200 |
| ClaudeBot | Anthropic training only | Allowed | 200 (see note) |
| PerplexityBot | Perplexity search | Allowed | 200 |
| Googlebot | Google Search and AI Overviews | Allowed | not tested by UA |
| Google-Extended | Gemini/Vertex training and grounding (not AI Overviews) | Allowed | n/a (robots token only) |
| Applebot-Extended | Apple Intelligence training (not Siri/Spotlight) | Allowed | n/a |
| CCBot, cohere-ai | Training | Allowed | CCBot 200 |

No action is needed for search visibility. Blocking the training-only bots is optional and an owner choice. On Shopify that needs a `templates/robots.txt.liquid`; the theme has none today.

**`/llms.txt`: present but platform-generated.** It returns 200 as `text/markdown`, as do `/llms-full.txt` and `/agents.md`, all near-identical. The content is generic Shopify text: UCP/MCP endpoints, a recommendation to install Shop's agent skill, and links to the 4 policies. It contains no store description, collections, or shipping and returns facts. The 47-line draft in `geo-aeo-2026-10-07.md` cannot be placed by the theme, because Shopify already answers this path. I could not verify whether Shopify offers an admin setting to override it; do not claim the custom file is live until `/llms.txt` returns it. Meanwhile the About page and its FAQPage JSON-LD carry the store facts in crawlable HTML, which matters more.

- **RSL 1.0:** no `License:` directive in robots.txt and no licence file found. Optional; nothing to fix.
- **robots.txt comments:** the comment lines addressed to AI agents (Shop skill, checkout rules) are Shopify platform text, not under the owner's control.
- **Sitemaps:** the sitemap index includes `sitemap_agentic_discovery.xml`, which lists only `/agents.md`. That is Shopify's addition.

## 3. Findings and fixes

### Critical

**C1. Three duplicate policy pages contradict the official policies and are in the sitemap**
Evidence: `sitemap_pages_1.xml` lists `/pages/shipping-policy`, `/pages/refund-policy` and `/pages/terms-of-service`. All return 200, are self-canonical and have no noindex. They duplicate `/policies/*` (which the footer links to) with different wording:
- `/pages/shipping-policy` says orders are "dispatched by our manufacturing and supplier partners and are not shipped from our Surrey office". The About page and the prior GEO report say "supplier partners" only.
- `/pages/refund-policy` says refunds are issued "within 5 business days of approval". The official `/policies/refund-policy` has no time figure ("Banks may need extra time to post the refund").

AI engines and Merchant Center reviewers can quote either version.

Fix (Shopify admin):
1. Decide which wording is true.
2. Put it in Settings > Policies, which feeds `/policies/*`.
3. Delete the three `/pages/*-policy` pages (Online Store > Pages).
4. Add URL redirects in Online Store > Navigation > URL redirects: `/pages/shipping-policy` → `/policies/shipping-policy`, `/pages/refund-policy` → `/policies/refund-policy`, `/pages/terms-of-service` → `/policies/terms-of-service`. Shopify redirects only fire once the page no longer exists, so delete first.

Effort: 30 minutes.

**C2. The refund-timing claim in the About FAQ (visible and JSON-LD) is not in the official refund policy**
Evidence: the About FAQ and the FAQPage JSON-LD (`theme/snippets/seo-meta.liquid` line 87) say "Approved refunds go to the original payment method within 5 business days of approval." `/policies/refund-policy` does not state 5 days.

Fix: either add "within 5 business days of approval" to the official refund policy (admin) if it is true, or remove the clause from both the About page body (admin) and the JSON-LD. If you remove it, the theme edit in `theme/snippets/seo-meta.liquid` line 87 is to replace the final sentence with:

```text
Approved refunds go to the original payment method. Banks may need extra time to post the refund.
```

The visible text and the JSON-LD must stay word-for-word identical. Effort: 15 minutes.

### High

**H1. Product Offers have no `shippingDetails` or `hasMerchantReturnPolicy`**
Evidence: all 6 inspected Product blocks have the keys `@context, @type, brand, description, image, name, offers, sku, url`. Each Offer has url, sku, price, priceCurrency (CAD), availability, itemCondition and seller, and nothing else. Without these fields, Google's merchant listing report flags shipping and returns as missing, and AI shopping answers have no machine-readable delivery or returns facts.

Fix in `theme/snippets/seo-meta.liquid`: replace the whole `{%- if template contains 'product' and product != blank -%}` block (lines 94-123) with the block below. It also fixes M2 (description cleanup).

```liquid
{%- if template contains 'product' and product != blank -%}
{%- liquid
  assign ld_desc = product.description | replace: '<', ' <' | strip_html | replace: '&amp;', '&' | replace: '&nbsp;', ' ' | replace: '&quot;', '"' | replace: '&#39;', "'" | split: ' ' | join: ' ' | truncate: 480
-%}
{%- comment -%}
  Shipping and returns facts from /policies/shipping-policy and /policies/refund-policy (checked 2026-10-08):
  processing 3-5 calendar days; total delivery from the day you order: Canada 13-25 days, US 10-20 days.
  transitTime = total minus processing (CA 10-20, US 7-15). Owner to confirm before deploy.
  No shippingRate: rates are by order weight (from CA$9.99 CA / CA$12.99 US), so one fixed figure would be wrong for heavier items.
  No change-of-mind returns -> MerchantReturnNotPermitted. Must match Merchant Center return settings.
{%- endcomment -%}
{%- capture ld_offer_extra -%}
      "shippingDetails": [
        {
          "@type": "OfferShippingDetails",
          "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "CA" },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["https://schema.org/Monday", "https://schema.org/Tuesday", "https://schema.org/Wednesday", "https://schema.org/Thursday", "https://schema.org/Friday", "https://schema.org/Saturday", "https://schema.org/Sunday"] },
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 5, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 20, "unitCode": "DAY" }
          }
        },
        {
          "@type": "OfferShippingDetails",
          "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["https://schema.org/Monday", "https://schema.org/Tuesday", "https://schema.org/Wednesday", "https://schema.org/Thursday", "https://schema.org/Friday", "https://schema.org/Saturday", "https://schema.org/Sunday"] },
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 5, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 7, "maxValue": 15, "unitCode": "DAY" }
          }
        }
      ],
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": ["CA", "US"],
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
      }
{%- endcapture -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "description": {{ ld_desc | json }},
  "url": {{ canonical_url | json }},
  "sku": {{ product.selected_or_first_available_variant.sku | json }},
  "brand": { "@type": "Brand", "name": {{ product.vendor | default: shop.name | json }} },
  "image": [
    {%- for image in product.images limit: 6 -%}{{ image | image_url: width: 1200 | prepend: 'https:' | replace: 'https:https:', 'https:' | json }}{% unless forloop.last %}, {% endunless %}{%- endfor -%}
  ],
  "offers": [
    {%- for variant in product.variants -%}
    {
      "@type": "Offer",
      "url": {{ shop.url | append: product.url | append: '?variant=' | append: variant.id | json }},
      "sku": {{ variant.sku | json }},
      "price": {{ variant.price | divided_by: 100.0 | json }},
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "availability": "{% if variant.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@type": "Organization", "name": {{ shop.name | json }} },
{{ ld_offer_extra }}
    }{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ]
}
</script>
{%- endif -%}
```

Notes:
- **Derived transit times.** The CA 10-20 and US 7-15 transit values are arithmetic on the published totals, not supplier data. Confirm them with CJ/SUKI lead times, or widen them.
- **Missing shippingRate warning.** Without `shippingRate`, Search Console will probably show a non-critical "missing field" warning. Accept it rather than publish a wrong rate.
- **Page size.** Two products have 99 variants (geometric and botanical shower curtains), so this adds roughly 90 KB of JSON-LD to each of those pages. See L5 (ProductGroup) for the longer-term fix.
- **Before deploying:** check that the rendered JSON parses (run Rich Results Test on 3 products, including a 99-variant one).

Effort: 1 hour plus a staging check.

**H2. Merchant Center settings (Shopify admin and Google Merchant Center, not theme)**
Evidence: all 77 products have no barcode (`products.json`: 0 of 77 with any variant barcode) and vendor = "Drapewell" on every product. Supplier SKUs (`CJJT…`, `SUKIDKB…`) are present. I could not see whether the Google & YouTube channel is installed or what Merchant Center holds.

Fix (admin):
1. Set weight-based shipping rates for CA and US in Merchant Center that match checkout.
2. Set the return policy to match the refund policy (no change-of-mind returns).
3. For products without a GTIN, mark "product has no GTIN/identifier" (identifier_exists = no). Do not invent GTINs, and do not put supplier SKUs in `mpn`: they are the supplier's catalogue codes, not manufacturer part numbers.
4. Keep `aggregateRating` out until Judge.me has real reviews. This is correct today.

Effort: 1-2 hours.

**H3. All 15 collections have empty descriptions**
Evidence: `collections.json` body_html word counts are 0 for every collection. Collection pages render only an H1 ("Bathroom", "Outdoors") and the product grid. The SEO titles and meta are set (for example "Bathroom Decor – Shower Curtains, Bath Mats & Towels"), so the snippet promises content the page does not have. Collections are the pages most likely to answer category prompts like "where to buy shower curtains in Canada".

Fix (admin, Products > Collections > Description): write an 80-150 word intro for each real collection. Start with a direct answer sentence (what is in it, ships to CA/US, CAD prices) and link to 3-5 products. Use only facts from the product pages. `theme/sections/collection.liquid` already renders `collection.description` in `.prose`, so no theme change is needed. Order by size: Bathroom (19 products), Seasonal (16), Living Room (15), Recently Added (10), Kitchen (9), Bedroom (8), Outdoors (6). For Outdoors and Desk & Hobby, follow the brief in `seo-drafts-2026-10-05.md`. Hand the copywriting to marketing-seo-specialist. Effort: 2-3 hours.

**H4. The homepage H1 is a rotating product title, and the homepage has no brand text**
Evidence: the live homepage H1 is "Folding Stadium Seat Cushion — Oxford Cloth, 3 Colours". In `theme/snippets/hero-slide.liquid` line 5, the first slide's product becomes the `<h1>`, so the homepage topic changes whenever a product is added. Apart from that, the page is product cards only, with no sentence saying what Drapewell is. AI engines landing on the root URL find no quotable store description; it exists only on /pages/about.

Fix (theme):

`theme/snippets/hero-slide.liquid` line 5: make every slide an h2.
```liquid
<h2 class="hero-h">{{ product.title }}</h2>
```
`theme/assets/theme.css` line 74: the hero title style targets `.hero h1`, so retarget it.
```css
.hero .hero-h { margin: 0; font-family: var(--display); font-stretch: 125%; font-weight: 900; font-size: clamp(26px, 3.1vw, 44px); line-height: 1.08; letter-spacing: -0.01em; text-transform: uppercase; text-wrap: balance; overflow-wrap: break-word; }
```
`theme/sections/home.liquid`: insert this before `<header class="feed-head">`.
```liquid
<header class="home-intro">
  <h1>{{ section.settings.intro_heading | default: shop.name }}</h1>
  {%- if section.settings.intro_text != blank -%}<p>{{ section.settings.intro_text }}</p>{%- endif -%}
</header>
```
Then add these two settings to the section's `{% schema %}` `settings` array. The default text is the About page's own wording.
```json
{ "type": "text", "id": "intro_heading", "label": "Intro heading (page H1)", "default": "Drapewell: home textiles, decor and everyday finds" },
{ "type": "textarea", "id": "intro_text", "label": "Intro text", "default": "Drapewell is an online store based in Surrey, British Columbia, Canada. We sell home textiles and décor, plus selected outdoor gear, pet supplies, desk accessories and fashion accessories, shipped to customers in Canada and the United States. Prices are in Canadian dollars." }
```
Style `.home-intro` to match `.page-head`; route the styling to design-ui-designer. Effort: 1 hour.

**H5. No image alt text on any product image**
Evidence: `products.json` shows 0 images with alt text on all 77 products (about 600 images). Live, the main product image falls back to the product title. Gallery thumbnails, hover images on cards and side-feed images output `alt=""`. That leaves image search and multimodal engines with nothing per image beyond the filename and the title fallback.

Fix (admin): fill alt text using the patterns in `seo-drafts-2026-10-05.md` (scene for the first image; "{Colour} {short product name}, {view}" for variants). Do the 20 products already drafted first, then the bathroom and seasonal ranges. No theme change is required, because the theme already prefers `image.alt`.

Optional theme improvement in `theme/sections/product.liquid` line 10: thumbnails sit inside buttons labelled "Photo N", so keep `alt: ''` there to avoid double announcement. Effort: 3-5 hours in admin; can be batched.

### Medium

**M1. No breadcrumbs (visible or BreadcrumbList)**
Evidence: product and collection pages have only "← Back to home" and no BreadcrumbList JSON-LD. Products live at `/products/{handle}`, so nothing tells crawlers which room a product belongs to.

Fix (theme): add a new file `theme/snippets/breadcrumbs.liquid`. It picks the room collection the same way `sections/side-feeds.liquid` does.
```liquid
{%- comment -%} Visible breadcrumb and BreadcrumbList for product and collection pages. Product: the product's first room collection (skips utility collections). {%- endcomment -%}
{%- liquid
  assign has_col = false
  if request.page_type == 'product'
    for c in product.collections
      unless c.handle == 'frontpage' or c.handle == 'all' or c.handle == 'gifts-under-25' or c.handle == 'recently-added' or c.handle == 'seasonal'
        if has_col == false
          assign bc_col = c
          assign has_col = true
        endif
      endunless
    endfor
    if has_col == false
      for c in product.collections
        unless c.handle == 'frontpage' or c.handle == 'all' or c.handle == 'recently-added'
          if has_col == false
            assign bc_col = c
            assign has_col = true
          endif
        endunless
      endfor
    endif
    assign bc_name = product.title
  else
    assign bc_name = collection.title
  endif
-%}
<nav class="crumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="{{ routes.root_url }}">Home</a></li>
    {%- if has_col -%}<li><a href="{{ bc_col.url }}">{{ bc_col.title }}</a></li>{%- endif -%}
    <li aria-current="page">{{ bc_name }}</li>
  </ol>
</nav>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": {{ shop.url | append: '/' | json }} },
    {%- if has_col -%}
    { "@type": "ListItem", "position": 2, "name": {{ bc_col.title | json }}, "item": {{ shop.url | append: bc_col.url | json }} },
    { "@type": "ListItem", "position": 3, "name": {{ bc_name | json }}, "item": {{ canonical_url | json }} }
    {%- else -%}
    { "@type": "ListItem", "position": 2, "name": {{ bc_name | json }}, "item": {{ canonical_url | json }} }
    {%- endif -%}
  ]
}
</script>
```
`theme/layout/theme.liquid` lines 95-97: replace the `unless` block with:
```liquid
{%- if request.page_type == 'product' or request.page_type == 'collection' -%}
  {% render 'breadcrumbs' %}
{%- elsif request.page_type != 'index' -%}
  <a class="back-home" href="{{ routes.root_url }}"><span aria-hidden="true">&larr;</span> {{ 'general.back_home' | t }}</a>
{%- endif -%}
```
`theme/assets/theme.css` (append):
```css
.crumbs ol { display: flex; flex-wrap: wrap; gap: var(--s2); margin: 0; padding: 0; list-style: none; font-size: 14px; color: var(--text-soft); }
.crumbs li + li::before { content: "/"; margin-right: var(--s2); opacity: 0.5; }
.crumbs a { color: inherit; }
```
Effort: 1 hour plus a preview check.

**M2. Product JSON-LD `description` runs words together and leaks HTML entities**
Evidence: the PEVA curtain description reads "…for everyday durability.Water-resistant PEVA…". The kitchen scale reads "Precision Digital Kitchen Scale for Coffee, Baking &amp; Everyday MeasuringMeasure small ingredients…". The cause is `strip_html | strip_newlines` with no spacing between block tags.

Fix: the `ld_desc` line inside the H1 block above (adds a space before each tag, decodes common entities and collapses whitespace). Effort: included in H1.

**M3. Empty collections are indexable and in the sitemap**
Evidence: `/collections/beauty` and `/collections/home-kitchen` have 0 products, return 200 with no noindex, and are listed in `sitemap_collections_1.xml`. `/collections/frontpage` ("Home page") is also in the sitemap and duplicates homepage content.

Fix:
- Admin (preferred): remove Beauty and Home & Kitchen from the Online Store sales channel, or delete them, until they have products.
- Theme fallback in `theme/layout/theme.liquid`, after the canonical tag on line 9:
```liquid
{%- if request.page_type == 'collection' and collection.products_count == 0 or collection.handle == 'frontpage' -%}<meta name="robots" content="noindex, follow">{%- endif -%}
```
Liquid evaluates `and`/`or` right to left, so this reads as `page_type == 'collection' and (products_count == 0 or handle == 'frontpage')`, which is the intended logic. Effort: 10 minutes.

**M4. The sitemap lists `/blogs/news`, which returns 404**
Evidence: `sitemap_blogs_1.xml` contains `/blogs/news`, but the live URL is 404 and `theme/templates/` has no `blog.json` or `article.json`. A blog is also the natural home for citable buying guides (shower curtain sizes, PEVA vs polyester, delivery times to Canada).

Fix: when the owner wants editorial content, add `templates/blog.json`, `templates/article.json` and matching sections, with Article JSON-LD (author = Drapewell, datePublished from `article.published_at`). Until then, hide the blog in admin (Online Store > Blog posts > Manage blogs) so it leaves the sitemap. Route editorial planning to marketing-content-creator. Effort: 15 minutes to hide, about 3 hours to build templates.

**M5. The delivery FAQ reads as processing plus delivery**
Evidence: the About FAQ and JSON-LD say "Orders are processed in 3–5 calendar days. Estimated delivery is 13–25 days to Canada and 10–20 days to the United States". A reader can add these together (up to 30 days). The shipping policy says the 13-25 and 10-20 day totals run "from the day you order".

Fix: in `theme/snippets/seo-meta.liquid` line 85 and in the About page body (admin), use identical text:
```text
Orders are processed in 3–5 calendar days. Estimated delivery is 13–25 days to Canada and 10–20 days to the United States, counted from the day you order, with tracking.
```
Effort: 10 minutes.

**M6. The Contact page contradicts the refund policy on returning items**
Evidence: the Contact page says "Email us photographs within 30 days of delivery and we will refund or replace it. You will not need to send anything back." The refund policy says "Do not mail an item back unless we provide written return instructions", which allows that a return may be requested.

Fix (admin): change the Contact sentence to "Do not send anything back unless we give you written return instructions." Effort: 5 minutes.

**M7. Brand = "Drapewell" on all 77 supplier-made products**
Evidence: vendor is "Drapewell" on all 77 products, and Product JSON-LD `brand` uses the vendor. These are generic CJ/supplier products, not Drapewell-manufactured. As I recall, Merchant Center's brand guidance limits using the store name as brand to products you manufacture or private-label; I could not re-check it today.

Fix: an owner decision. Either treat Drapewell as a private label and keep it (and stay consistent everywhere), or set brand per Merchant Center guidance for unbranded goods and make the schema follow the vendor field. Do not invent manufacturer brands. Effort: decision, then a bulk vendor edit if needed.

**M8. About and Contact meta descriptions are auto-generated from body text**
Evidence: the About description begins "Home, outdoor, pet and everyday findsDrapewell is an online store…": the heading and paragraph run together, and it is cut at 320 characters. Contact is the same ("…Business name: DrapewellAddress: 12088…"). `/policies/*` have no description, and Shopify gives policy pages no SEO field.

Fix (admin, Pages > Search engine listing), keeping each under 160 characters:
- About: "Drapewell is an online store in Surrey, BC, selling home textiles, decor, outdoor, pet and desk items. Ships to Canada and the US; prices in CAD."
- Contact: "Contact Drapewell, Surrey, BC: email happygarcha2018@hotmail.com or call 604-226-9941, Monday to Friday 9 AM–5 PM Pacific. Replies within 1 business day."

Effort: 10 minutes.

### Low

**L1. Organization schema: no logo, sameAs, description, or organization-level return policy**
Evidence: the homepage Organization has name, url, email, telephone, address and contactPoint only. There is no logo (the theme shows the brand as text), and all five social settings are blank (the footer `.soc` list is absent), so no profiles exist to cite. Do not add any that do not exist.

Fix in `theme/snippets/seo-meta.liquid`: add the Liquid below just before `<script type="application/ld+json">` in the index block, then add the properties after `"url": {{ shop.url | json }},` in the Organization node.
```liquid
{%- liquid
  assign social_keys = 'social_facebook,social_instagram,social_pinterest,social_tiktok,social_youtube' | split: ','
  assign same_as = ''
  for k in social_keys
    if settings[k] != blank
      assign same_as = same_as | append: settings[k] | append: '|'
    endif
  endfor
  assign same_as_list = same_as | split: '|'
-%}
```
```liquid
      "description": "Online store based in Surrey, British Columbia, Canada, selling home textiles and decor, outdoor gear, pet supplies, desk accessories and fashion accessories. Ships to Canada and the United States; prices in CAD.",
      {%- if shop.brand.logo -%}"logo": {{ shop.brand.logo | image_url: width: 600 | prepend: 'https:' | replace: 'https:https:', 'https:' | json }},{%- endif -%}
      {%- if same_as_list.size > 0 -%}"sameAs": {{ same_as_list | json }},{%- endif -%}
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": ["CA", "US"],
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
        "merchantReturnLink": {{ shop.refund_policy.url | prepend: shop.url | json }}
      },
```
The logo appears only once one is uploaded in Settings > Brand. Effort: 20 minutes.

**L2. llms.txt cannot be customised from the theme.**
See section 2. Check Shopify admin and help for an override option; I did not verify one exists. Effort: unknown.

**L3. Product pages show two "Customer reviews" H2s.** One comes from `snippets/reviews.liquid` and one from Judge.me's widget header, which is hidden until JS runs. Hide Judge.me's title in its widget settings (admin) or drop the theme's H2 when the Judge.me widget renders. Effort: 15 minutes.

**L4. The homepage meta description is 165 characters.** Trim it to 155 or fewer in Online Store > Preferences. One product meta is 161 characters (botanical watercolour shower curtain). Effort: 5 minutes.

**L5. Products with 99 or 51 variants emit up to 99 Offers.** Longer term, switch to `ProductGroup` + `hasVariant` (with `variesBy` color/size), which Google supports for variant products. This is a larger rewrite; do it after H1 is validated. Effort: 3 hours.

**L6. `WebSite` → `SearchAction`.** Google retired the sitelinks search box in late 2024 (from my knowledge, not re-checked). It is harmless to keep; there is no benefit.

**L7. Internal links.** The product-page side-feed headings ("New in Pet Supplies", "Under $20 · Pet Supplies") are plain text. Linking the heading to `ctx.url` in `theme/sections/side-feeds.liquid` lines 65 and 82 adds a contextual product → collection link:
```liquid
<h2 class="eyebrow" id="fresh-h"><a href="{{ ctx.url }}">{{ 'general.feed_new_in' | t: name: ctx.title }}</a></h2>
```
"Under $20" is ambiguous for US shoppers; consider "Under CA$20" (theme editor setting). Effort: 15 minutes.

**L8. Entity basics from the prior GEO report remain open.** The store is still on `drapewell.myshopify.com` with a hotmail support address, and has 0 reviews (Judge.me is installed and requests should start after real orders). The address and phone are consistent across Contact, About, the Contact-information policy, the shipping policy and the JSON-LD. Only the formats differ ("BC" vs "British Columbia", "604-226-9941" vs "+1-604-226-9941"), which is fine.

**L9. Deploy log.** `docs/deploys.md` should record that 191789302069 is now the published theme.

## 4. What is already in good shape (verified live)

- **JSON-LD validity.** All homepage, About and 77 product JSON-LD blocks parse as valid JSON. Organization and WebSite are on the homepage, FAQPage (8 Q&A) on About, and Product with per-variant Offers on every product. No `aggregateRating` or `review` is output, which is correct with 0 reviews.
- **Product SEO titles and meta.** All 77 are custom and unique, with no duplicates. Titles are 45-61 characters; meta descriptions 103-161 characters. The 20 drafts from 2026-10-05 have been applied.
- **Duplicate supplier text.** None in product bodies. The only repeated sentences are intentional shipping boilerplate, such as "Estimated delivery is 13–25 days to Canada…" on 32 products. Those match the policy.
- **Currency and availability.** priceCurrency is CAD everywhere, availability is per variant, and canonicals are self-referencing and clean.
- **Server-rendered content.** Descriptions, prices and links are all in the raw HTML, so AI crawlers need no JavaScript.

## 5. Agent routing for follow-up (per CLAUDE.md)

- Collection intros (H3), About/Contact meta (M8), alt-text batches (H5): marketing-seo-specialist.
- Blog and buying guides (M4): marketing-content-creator.
- Merchant Center and brand decision (H2, M7): paid-media-tracking-specialist / paid-media-ppc-strategist.
- Policy wording alignment (C1, C2, M6): support-legal-compliance-checker.
- Homepage intro layout (H4): design-ui-designer.
