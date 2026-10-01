---
name: product-research
description: End-to-end product and listing research for Etsy, Shopify and Amazon. Runs discovery, demand, market and competitor research, gap and pricing analysis, keyword research, a GO / TEST / REJECT viability verdict, then (only if approved) creates an SEO listing and runs a final SEO and conversion audit. Use whenever the user asks to research a product, validate a product idea, find out if something will sell, analyse competitors or pricing for a product, or write and optimise a marketplace listing. Never invents search volume, sales, revenue or conversion data.
---

# Product research workflow

Pipeline: DISCOVERY → DEMAND → MARKET → COMPETITORS → GAPS → PRICING → KEYWORDS → VIABILITY → LISTING → LISTING SEO → FINAL AUDIT.

Stages 1 to 8 decide whether the product is worth selling. Stages 9 to 11 only run after a GO or an approved TEST.

## Rules that never bend

1. **Research the real market.** Every claim about a competitor, price, review or keyword comes from a page, tool result or document you actually opened this session. Search with WebSearch and open pages with WebFetch. If a page cannot be reached, say so and do not fill the gap from memory.
2. **Never invent numbers.** Do not produce search volume, sales, revenue, conversion rate, market size, ranking position or review counts unless a source gave them. A missing number is written as `Unavailable`, with what would provide it.
3. **Label every finding** with one of: `VERIFIED` (seen in a source, cite it), `ESTIMATE` (computed from verified inputs, show the arithmetic), `INFERENCE` (your reasoning, say what it rests on), `UNAVAILABLE`. Keep an evidence ledger (see the end of this file).
4. **Marketplaces are separate.** Read only the reference for the target marketplace: `references/etsy.md`, `references/shopify.md`, `references/amazon.md`. Do not carry keyword, title or tag rules from one to another. Research the competing listings on the marketplace being targeted.
5. **Rules change.** The marketplace references hold limits as last known. Before writing the final listing, confirm the current limits against the marketplace's own seller documentation and note the date checked.
6. **Free first.** Use free sources. Do not subscribe to, buy or switch on a paid tool or API. If a paid or credentialed tool would add something, list it under "Optional integrations" and carry on without it. Never print, store or commit credentials.
7. **Prices are shown in the currency found.** Do not convert or round to a currency you did not see. This store prices in CAD.
8. **No claims you cannot support.** Listing copy must not promise materials, dimensions, certifications, shipping times or results that the supplier or product data does not state. Mark anything unconfirmed as `TO CONFIRM WITH SUPPLIER`.

## Inputs to collect first

Ask once, briefly, and proceed with sensible defaults if the user does not answer:
- The product (name, a link, or a supplier listing) and who it is for.
- Target marketplace: Etsy, Shopify, or Amazon. Do each separately if more than one.
- Target country and currency.
- Cost data if known (supplier cost, shipping). If the store sources through CJ Dropship, the CJ tools can supply real cost and variants. Use them read-only (search and product detail, never create or order anything).

## Stage 1. Product discovery
Pin down exactly what the product is: type, variants, materials, sizes, who buys it, use cases, season. List what the supplier data confirms and what it does not. Output: a one-paragraph product definition and a `TO CONFIRM` list.

## Stage 2. Demand research
Find real evidence that people want it: search suggestions and related searches, marketplace search autosuggest, forum and community threads, review text, trend sources. For each signal give the source and what it shows. No volume figures unless a tool returned them. If a keyword tool is connected, check its free allowance before using it and report what it returned. Output: demand signals with labels and an honest overall read: strong, moderate, weak, or unproven.

## Stage 3. Market analysis
Describe the market: how many distinct kinds of competing product exist, price spread, seasonality, the buyer segments, and typical buying drivers (see what reviews praise and complain about). Size is `UNAVAILABLE` unless a source states it.

## Stage 4. Competitor research
Use the `competitor-research` skill's structure, and open the actual listings. Pick 5 to 10 comparable listings on the target marketplace, a mix of top-ranked, mid-ranked and newer ones. For each, record only what you can see: title, price, key features, imagery approach, review count and rating, positive and negative review themes, shipping or fulfilment promises. For the SEO side (SERP overlap, content depth) use `seo-competitor`. For the product-page side use `claude-seo:seo-ecommerce`.

## Stage 5. Competition and gap analysis
Compare the competitors side by side. Name gaps that the evidence supports: unmet complaints in reviews, missing sizes or variants, weak imagery, thin descriptions, price points with no good option, poor shipping promises. Each gap cites the listings that show it. Then name one or two differentiation angles.

## Stage 6. Pricing analysis
Build the price ladder from the collected listings: low, median, high, and where premium listings sit and why. If cost data exists, work out the margin range with the arithmetic shown, covering product cost, shipping, marketplace fees (look the current fee schedule up, do not recall it), payment fees, ad spend allowance, and returns allowance. Recommend a price range as an `INFERENCE` and state what it assumes. If cost is unknown, say what is needed.

## Stage 7. Keyword research
Use `seo-keyword` for method and `references/` for marketplace specifics. Build buyer-intent and long-tail terms from real sources: marketplace autosuggest, competitor titles, tags and bullets, review language, related searches. Group by intent (browse, compare, ready to buy, gift, problem-solving). For each keyword record where it was found. Volume and difficulty appear only if a tool gave them. Choose a primary keyword and supporting terms per listing, and note terms to avoid (irrelevant, restricted, or trademark-adjacent).

## Stage 8. Product viability verdict
Score the opportunity and give exactly one verdict.

| Factor | What to weigh |
|---|---|
| Demand evidence | real signals found, not volume guesses |
| Competition | how crowded, how strong the leaders are |
| Differentiation | credible gap you can actually fill |
| Margin | from real cost and fee data, or unknown |
| Operational risk | fragility, returns, sizing, shipping time, restricted categories, IP risk |
| Listing leverage | can better SEO and imagery realistically win here |

- **GO**: evidence of demand, a supported gap, workable margin, low risk. State the first listing to publish.
- **TEST**: promising but a key factor is unproven or unknown. Define a small, cheap test, the exact measure, the threshold, and a stop condition. Do not spend money to run it without the user's agreement.
- **REJECT**: weak demand evidence, saturated with no gap, margin does not work, or high risk. Give the decisive reasons and what would change the answer.

Show the reasons with their labels. A verdict resting mostly on `INFERENCE` or `UNAVAILABLE` items is a TEST at best, and says so.

Stop here if REJECT. If GO or TEST, ask the user to confirm before creating the listing.

## Stage 9. Listing creation
Read the target marketplace reference and write the listing to that marketplace's structure: title, description, attributes, tags or search terms, bullet points or feature list, variants, FAQs, and an image plan. Use only facts from the product definition. Facts not confirmed go in as `TO CONFIRM` and are kept out of the public copy. Produce one primary version and, where it helps, two title alternatives.

## Stage 10. Listing SEO
Optimise within that marketplace's rules: primary keyword placement, natural use of secondary and long-tail terms, no stuffing, no repeating the same words across title, tags and search fields without reason. For a Shopify listing, also use `claude-seo:seo-schema` (Product JSON-LD), `claude-seo:seo-ecommerce` and `claude-seo:seo-page`. For image strategy give a shot list: hero, scale, detail, lifestyle, variants, infographic, and alt text where the platform uses it.

## Stage 11. Final SEO and conversion audit
Check the listing against this list and report PASS / FIX / UNKNOWN for each. Fix items before calling the listing complete.

1. Primary keyword appears in the title, early, and reads naturally.
2. Title, description, tags or search terms fit the marketplace's current limits (checked and dated).
3. Every factual claim is supported by supplier or product data. No unconfirmed claims remain.
4. Search intent matches the listing (what a buyer typing the primary keyword wants).
5. Description answers the top buyer questions and the complaints found in competitor reviews.
6. Price sits inside the researched ladder and the margin holds.
7. Image plan covers the main buyer questions, with alt text where available.
8. FAQs address objections: size, material, care, shipping, returns.
9. No restricted-claim, trademark or policy risks for the marketplace.
10. Shopify only: Product structured data valid, page title and meta length OK, indexable, sensible URL handle, internal links to the collection.
11. Conversion: clear value in the first line, scannable bullets, trust signals that are real, clear call to action.

Close with: what was verified, what is still unknown, what the user must confirm, and optional integrations that would remove unknowns.

## Skills to call along the way

| Need | Skill |
|---|---|
| Competitor products and positioning | `competitor-research` |
| SERP and content competitors | `seo-competitor` |
| Keyword method, intent, clusters | `seo-keyword` |
| Shopify product pages and e-commerce SEO | `claude-seo:seo-ecommerce` |
| On-page audit of a live page | `claude-seo:seo-page` |
| Product structured data | `claude-seo:seo-schema` |
| Technical checks | `claude-seo:seo-technical` |
| Auditing existing store content | `seo-content-audit` |

## Evidence ledger (keep this running table, show it at the end)

| # | Claim | Label | Source (URL or tool) | Date |
|---|---|---|---|---|

## Optional integrations (never required, never switched on without asking)

- Keyword and SERP data providers (for example DataForSEO, Ahrefs, Semrush): volume, difficulty, backlinks. Paid.
- Google Search Console (the `gsc` MCP server): real query data for an existing Shopify store. Free, needs a Google credential from the user.
- CJ Dropship tools: real supplier cost, variants and stock. Read-only use.
- Marketplace seller dashboards: real impressions, conversion and keyword data once a listing exists. Only the user can provide these.
