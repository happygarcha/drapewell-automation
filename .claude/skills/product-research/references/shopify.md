# Shopify (own store) rules and research notes

A Shopify store is not a marketplace with its own search algorithm. Traffic comes from Google and other search engines, social, email and ads, so classic SEO, structured data and conversion matter most. Confirm current guidance in Shopify Help Center and Google Search Central, and note the date.

This store: drapewell.myshopify.com, prices in CAD, themed with the Drapewell Discover theme, navigation is room-based (Bathroom, Bedroom, Kitchen, Living Room, Pet Supplies, Seasonal). A listing should fit a room collection.

## Where research evidence comes from
- Google results for the target queries: who ranks (marketplaces, big retailers, small stores), what the SERP shows (shopping results, reviews, images, "people also ask"), result titles and snippets. Search in the target country.
- Competitor product pages: title, price, description depth, images, reviews, shipping and returns, structured data present.
- Google Search Console data for the store through the `gsc` MCP server once the user has connected credentials. This is real query, impression, click and position data for the user's own site. Without it, there is none.
- Google autocomplete and related searches. Free tools only unless the user connects one.

## Listing fields
- Product title (the H1): clear, includes the main product type and a distinguishing attribute. No keyword stuffing.
- Page title (SEO title) and meta description: edit them in the product's search engine listing section. Keep the title within roughly 50 to 60 characters and the description within roughly 150 to 160 so they are not truncated. Verify current display behaviour. Write the meta description for click-through, with a real benefit.
- URL handle: short, lowercase, hyphenated, descriptive.
- Description: unique copy, not the supplier's text copied. Cover what it is, dimensions, materials, care, use cases, shipping and returns. Short intro, scannable bullets, then detail. Use only supported facts.
- Images: hero on a clean background plus lifestyle, scale, detail, and variant shots. Descriptive file names and alt text that describe the image, not a keyword list.
- Variants and options: clear names, accurate stock and prices, an image per variant where they differ.
- Collections: place it in the right room collection and any relevant themed collection. Collection pages are often the better landing page for broader keywords, so decide which page targets which keyword and avoid two pages competing for the same one.
- Structured data: Product schema with price, currency, availability and reviews if real. Shopify themes usually output Product JSON-LD already. Check what the theme emits before adding more, and avoid duplicates. Use `claude-seo:seo-schema`.
- Internal links: from the collection, from related products, from relevant content.
- Google Merchant Center free listings: a product feed can make the product eligible for free listings. Mention it as an option, with the data it needs.

## Keyword approach
Commercial and long-tail terms, mapped one primary keyword per page. Check the search results to confirm the intent matches a product page and not a guide. Informational terms go to content pages.

## Policy and risk checks
Unsupported claims, trademark use, restricted products, accurate shipping and returns information, and consumer-law basics for the selling country. Check the store's own policy pages are present.

## Final audit additions
- Primary keyword in H1, page title, handle, and naturally in the description and one image alt.
- Page title and meta description lengths checked.
- One Product JSON-LD block, valid, with correct price and availability.
- Indexable (not noindex), canonical correct, in the sitemap.
- Mobile layout and image weights are acceptable (use `claude-seo:seo-page` and `claude-seo:seo-technical`).
