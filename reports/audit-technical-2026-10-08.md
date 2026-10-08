# Technical SEO audit: drapewell.myshopify.com (2026-10-08)

Method: read-only curl of live pages (live theme is `t/17`) plus local `theme/` source. No Lighthouse/CrUX tool was available, so there are no measured Core Web Vitals. Anything marked ESTIMATE is inferred from HTML/asset weight. Sampled: home, 4 collections (bathroom, kitchen, seasonal, gifts-under-25), 6 products (modern-bath-set, terrazzo-shower-curtain, poached-egg-doormat, nordic-knitted-throw-blanket-tassel, foldable-cat-tent-bed, crescent-moon-candle-holder...), /pages/about, a 404.

Technical score (my judgement, not a tool score): about 78/100. The Shopify base is sound. The gaps are indexability hygiene, a few theme details, and the pre-launch domain.

## Pass summary
- HTTPS, HSTS, http to https 301: pass. `X-Frame-Options: DENY`; the CSP only sets `frame-ancestors` and `upgrade-insecure-requests`.
- Canonical: present and self-referencing on every sampled page. `?variant=` and `/collections/x/products/y` URLs canonicalise to `/products/y` (tested). Pass.
- Titles: all unique across the 11 pages sampled. Meta descriptions: unique, 109-165 chars (exceptions below). Exactly one H1 per page, no skipped levels in the samples.
- Viewport meta is present (`theme.liquid:5`), `viewport-fit=cover`, `lang="en-CA"`. Pass.
- Images: every `<img>` has `width`/`height` (no CLS risk from them) and `srcset`. No `<head>` render-blocking JS: all scripts are `defer`/`async`. Pass.
- Sitemap: index at `/sitemap.xml`, declared in robots.txt. Child sitemaps: products 77 (plus the homepage entry, 78 `<url>` in total), collections 15, pages 6, blogs 1, agentic_discovery 1 (`/agents.md`), metaobject_pages 0. All 77 sitemap product URLs are linked from the home page or a collection page 1, so there are no orphan products.
- 404: `/products/nope`, `/this-is-404` return a real HTTP 404 with the custom template (title "404 Not Found | Drapewell"). Pass.
- hreflang: none. Correct for a single-locale store (`en-CA`, CAD). Currency is set via the `cart_currency=CAD` cookie. Nothing to fix.

## Critical
None. Nothing blocks crawling or indexing today.

## High

### H1. Domain: myshopify.com will not serve long term (Shopify admin and DNS)
- Evidence: every canonical, og:url, sitemap `<loc>` and JSON-LD `url` is `https://drapewell.myshopify.com/...` (`seo-meta.liquid` uses `canonical_url`, `shop.url`).
- Why it matters: Shopify keeps myshopify.com crawlable and indexable (robots.txt allows everything), but the brand has no domain authority there. After the custom domain is attached, Shopify 301s myshopify.com to the primary domain and sitemaps/canonicals switch automatically. Anything indexed before then is effectively re-indexed.
- Fix (Shopify admin): buy/connect the domain, set it as Primary, and keep "Redirect all traffic to this domain" on. After the switch: submit the new sitemap in Search Console and Bing, and update every hard-coded myshopify URL in ads, feeds and Merchant Center. The theme needs no change because it uses relative or `shop.url` values.
- Interim: if the domain is months away, do not build backlinks or run SEO campaigns against myshopify URLs.

### H2. Blog URL in the sitemap returns 404 (Shopify admin)
- Evidence: `sitemap_blogs_1.xml` lists `https://drapewell.myshopify.com/blogs/news`, which returns 404 (curl).
- The `news` blog has no published articles, and the theme has no blog template (`theme/templates/` has no `blog.json` or `article.json`).
- Fix: either (a) Admin > Online Store > Blog posts: delete the empty "News" blog, or (b) add `templates/blog.json` and `templates/article.json` and `sections/blog.liquid` and publish at least one article before launch. A sitemap entry that 404s is a Search Console "submitted URL not found" error.

### H3. Two empty collections are published and in the sitemap (Shopify admin)
- Evidence: `/collections/beauty` and `/collections/home-kitchen` return 200 with 0 product links. Both are in `sitemap_collections_1.xml`. Both are also in the title-only state: `<title>Beauty | Drapewell`, `Home & Kitchen | Drapewell`, no meta description. Thin or empty pages that Google will treat as soft 404s.
- Fix: Admin > Products > Collections: unpublish both from the Online Store channel (removes them from the sitemap), or fill them. Same check for `frontpage` (14 products, title "Home page | Drapewell", no meta description): unpublish, or set an SEO title/description. `/` already is the home page, and it exposes duplicate product lists.

## Medium

### M1. First visible product cards are lazy-loaded on collection pages (theme code, ESTIMATE of impact)
- Evidence: `snippets/product-card.liquid:6` and `:9` hard-code `loading: 'lazy'`. Measured on `/collections/bathroom`: 44 of 44 `<img>` are `loading="lazy"`. Home: 23 of 28 lazy. The above-the-fold first row of cards is therefore lazy, which usually delays LCP on collection pages (ESTIMATE; unmeasured).
- Also the hover "alt" image (`:9`, the second product image) is fetched for every card, doubling the image count (25 of 44 on bathroom are `alt=""` hover images).
- Fix: above line 6 add `{%- assign img_load = 'lazy' -%}{%- if index < 4 -%}{%- assign img_load = 'eager' -%}{%- endif -%}`, then use `loading: img_load` on line 6 and add `fetchpriority: 'high'` only when `index == 0`. Keep line 9 lazy always.
- Confirm `index` is passed from `sections/collection.liquid` and `sections/home.liquid` first.

### M2. HTML and inline script weight (ESTIMATE of impact; sizes measured)
- Evidence (curl `size_download`, uncompressed body as served): home 178 KB, bathroom collection 276 KB, terrazzo product 347 KB, a typical product 180-200 KB, about 140 KB, 404 135 KB. 90-280 KB of each page is inline `<script>` (Shopify/app-injected: 91 KB even on the 404 page).
- About 90 KB is platform baseline you cannot change. The extra on bathroom (190 KB inline) and terrazzo (280 KB) is variant/product JSON plus the 24-per-page grid.
- Fix (theme code): `sections/collection.liquid:42` set `per_page` default from 24 to 16 (bathroom 24 products and 44 images). On `sections/product.liquid` avoid dumping full product JSON twice if present. Re-measure after.
- No Lighthouse score can be claimed from this. Run PageSpeed Insights on the `t/17` home and one product page once a domain exists.

### M3. About page meta description is 320 characters and runs words together (Shopify admin or theme)
- Evidence: `/pages/about` meta description is auto-generated from the page body: "Home, outdoor, pet and everyday findsDrapewell is an online store ... How we workDrapewell is a dropshipping st..." (320 chars; Google shows about 155). No SEO description is set on the page.
- Fix (Shopify admin): Pages > About > Search engine listing > set a 140-155 char description. Do the same for Contact, Shipping and Refund policy pages (not sampled).

### M4. Long titles over about 60 characters (Shopify admin)
- Evidence: bathroom collection title is 64 chars: "Bathroom Decor – Shower Curtains, Bath Mats & Towels | Drapewell". The page title is appended with `| Drapewell` at `theme.liquid:7`.
- Fix: Collections > Bathroom > SEO title: "Bathroom Decor: Shower Curtains & Bath Mats" (about 43 chars + brand = 54). Product titles 53-59 are fine.
- Also `gifts-under-25` title "Gifts under $25 | Drapewell" (27 chars) is short; add "Home & Pet" keywords. Low priority.

### M5. Gifts collection is not in the main menu; footer is weak for internal linking (Shopify admin)
- Evidence: home HTML links 10 collections; `gifts-under-25`, `recently-added`, `frontpage`, `beauty`, `home-kitchen` are not linked from nav . `/collections/gifts-under-25` is not linked from the home page HTML (I did not check whether product pages link to it). Footer shows policy links plus main-menu non-collection links (`theme.liquid:117-136`).
- Fix (Shopify admin): Navigation > main-menu: add "Gifts under $25" (and "Seasonal" is already there). Footer menu: add About, Contact, Shipping, Refund policy, Privacy, Terms, plus gifts.

### M6. Product JSON-LD is missing shipping and return details, and review fields (theme code)
- Evidence: `snippets/seo-meta.liquid` Product block (lines about 66-95) outputs `offers` only. Missing `shippingDetails` (OfferShippingDetails) and `hasMerchantReturnPolicy`, which Google Merchant listings use and which the store already states (CA$9.99 CA / CA$12.99 US; no change-of-mind returns, 30-day damage claims). `priceValidUntil` also absent. No aggregateRating is correct while there are no reviews (do not add fake ones).
- Fix: inside each Offer add
  `"hasMerchantReturnPolicy": {"@type":"MerchantReturnPolicy","applicableCountry":["CA","US"],"returnPolicyCategory":"https://schema.org/MerchantReturnNotPermitted"}` and a `shippingDetails` block with `shippingRate` value 9.99/12.99 CAD, `shippingDestination` CA/US, `deliveryTime` handling 3-5 days, transit 13-25 (CA) / 10-20 (US). Match exact policy wording; re-verify with the Rich Results Test.
- Note: Judge.me also loads on every page (`cdn.shopify.com/extensions/.../judgeme-773/assets/loader.js`). Once reviews exist, check that Judge.me and the theme do not emit duplicate Product schema.

### M7. Third-party / app scripts and head CSS (Shopify admin; ESTIMATE of impact)
- Evidence: 12 `<script src>` per page, all deferred or async. Only 2 are ours (`motion.js` 56 KB, `theme.js` 55 KB source, `defer`, at `theme.liquid:162-163`); the rest are Shopify platform (`origin_trials`, `shopify_pay`, `load_feature`, `remote_product_tracking`, `preloads.js`, `shop-js` loader, `standard-actions.js`) and one app, Judge.me (`loader.js`, plus dns-prefetch to cdn.judge.me, cdn1.judge.me, api.judge.me). Third-party hosts beyond Shopify: judge.me only. That is a small footprint.
- Head CSS: `theme.css` (69 KB, `theme.liquid:17`, preloaded via Link header) is render-blocking, as is a Judge.me CSS file and Shopify's `accelerated-checkout-backwards-compat.css`. Fonts are `font-display: swap` with Inter preloaded. Reasonable.
- Fix: nothing urgent. Optional: if Judge.me is not showing widgets yet (no reviews), disable its app embed in the theme editor to remove its CSS and JS from every page. `theme.css` at 69 KB could be split but is not worth it now.

## Low

### L1. Decorative and gallery images use empty alt, and hero alt is empty (theme code)
- Evidence: `snippets/hero-slide.liquid:10` and homepage hero images have `alt=""` (the first five home images are product shots). Empty alt is correct for hover duplicates (`product-card.liquid:9`) and thumbnails (`product.liquid:12`, 160 px thumbs with `alt=""`), but not for the hero product shots, which are the only image on a link or the main content.
- Fix: in `hero-slide.liquid:10` change `alt: ''` to `alt: product.featured_image.alt | default: product.title`, unless the card already has the title as link text, in which case the empty alt is acceptable. Do not bulk-add alt text to thumbnails.
- Product main images: alt text is present on all sampled products. Some are keyword-stuffed (terrazzo: "Waterproof polyester terrazzo shower curtain product image — neutral Scandinavian-style print — available in multiple sizes and colourways", 130+ chars). Fix in Admin > Products > media: keep under about 125 chars, drop "product image".

### L2. Open Graph gaps (theme code, `snippets/seo-meta.liquid`)
- Evidence: OG is present on all sampled pages (site_name, url, title, description, type, image on product/collection/home). Missing: `og:image` on pages (`/pages/about`) and on the 404. `og:image` on home is the first product in `collections.all` (68904bd3..._trans.jpg, the bath pillow), not a brand image. No `og:image:alt`, no `og:locale`, no `twitter:title`/`twitter:image` (X falls back to og:, so this is fine). Collection fallback uses first product image, acceptable.
- Fix: line 18, add a store-level fallback: `{%- elsif settings.share_image -%}` with a new `share_image` `image_picker` setting in `config/settings_schema.json` (this changes the schema only; do not touch `settings_data.json`). Add `<meta property="og:locale" content="en_CA">`.

### L3. `product:price:amount` / JSON-LD use cart currency (theme code, low risk)
- Evidence: `seo-meta.liquid:12-13` and the Offer `priceCurrency` use `cart.currency.iso_code`; the store is single-currency (CAD), so this is correct. If Shopify Markets adds USD later, Google would see price changes by currency in the same URL. Revisit at that point.

### L4. robots.txt is Shopify-managed and fine (informational)
- Evidence: `Allow: /`, blocks cart/checkout/account/orders, `sort_by`, multi-filter and `+` tag combination URLs; declares `Sitemap: https://drapewell.myshopify.com/sitemap.xml` (line 116). It also advertises `/agents.md` and UCP endpoints. No AI crawler is blocked. If you want to restrict AI training crawlers, add rules in `templates/robots.txt.liquid` (not present in the theme). Not a defect.

### L5. Redirects (informational)
- http to https: single 301. `/collections/Bathroom` (capital B) returns 200 and serves the lowercase canonical, no redirect chain found. Query-string variants (`?sort_by=`, `?variant=`) serve 200 with the clean canonical.

## Notes on what was not measured
- No Lighthouse/CrUX numbers: no tool available in this sandbox and the site has no field data yet. LCP, INP and CLS are unmeasured. Structure suggests low CLS risk (all images sized, fonts swap) and a collection-page LCP risk from M1 (estimate only).
- Not checked: Merchant Center feed, Judge.me widget markup, `/pages/contact` and policy pages, mobile rendering, page counts beyond page 1 of paginated collections.
