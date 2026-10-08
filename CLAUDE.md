# Drapewell: agent routing

All 76 agents in `.claude/agents/` stay installed. Do not open, list or read them to decide which to use. Pick from this table by task, run only the ones the task needs (usually 1 to 3), and skip the rest. If nothing fits, do the task directly without an agent.

| Task | Agent file(s) |
|---|---|
| Product titles, descriptions, meta tags, keywords | marketing-seo-specialist |
| Getting cited by ChatGPT, Gemini, Perplexity; llms.txt | marketing-ai-citation-strategist, marketing-aeo-foundations |
| New product ideas, trends, what to add | product-trend-researcher |
| Reviews, customer messages, feedback themes | product-feedback-synthesizer |
| Selling to Canada/US, marketplaces, duties | marketing-cross-border-ecommerce |
| Email: welcome, abandoned cart, post-purchase | marketing-email-strategist |
| Social plans and captions (Pinterest, Facebook) | marketing-social-media-strategist |
| Instagram | marketing-instagram-curator |
| TikTok | marketing-tiktok-strategist |
| Carousels for Instagram/TikTok | marketing-carousel-growth-engine |
| Blog, editorial calendar, copy | marketing-content-creator |
| Experiments, conversion ideas, funnel | marketing-growth-hacker |
| Google Shopping / Search campaigns | paid-media-ppc-strategist |
| Meta / Pinterest / TikTok ads | paid-media-paid-social-strategist |
| Ad copy and creative tests | paid-media-creative-strategist |
| Conversion tracking, GA4, pixels | paid-media-tracking-specialist |
| Auditing existing ad accounts | paid-media-auditor |
| Wasted ad spend, negative keywords | paid-media-search-query-analyst |
| Display / retargeting | paid-media-programmatic-buyer |
| Shopper walkthrough of a page, CRO | design-persona-walkthrough |
| Theme design, usability, brand consistency | design-ui-designer, design-ux-researcher, design-brand-guardian |
| Image prompts, visual stories | design-image-prompt-engineer, design-visual-storyteller |
| Privacy, consent, policy wording | support-legal-compliance-checker |
| Customer support replies | support-support-responder |
| Sales and margin reports | support-analytics-reporter, support-finance-tracker |

Not relevant to this store (never use): the Chinese-platform agents (Baidu, Bilibili, China E-Commerce, Douyin, Kuaishou, Weibo, WeChat, Xiaohongshu, Zhihu, private-domain, livestream, multi-platform-publisher), B2B sales agents, developer/product-team agents.

Rules for using agents:
- Name the agent in the task. Give it the specific data it needs; do not hand over whole files or long histories.
- Agents write advice and drafts. They never publish, change prices, spend money or deploy; the main session does that after the owner approves.

# Theme deploys (read before touching any Shopify theme)

- Source of truth: the `theme/` folder on `main`. Shopify themes are only deploy targets. Every fix is committed here first; a theme has a fix only after it has been uploaded to it.
- Never write to the published (MAIN) theme. Before every upload, query the target theme and check `role` is UNPUBLISHED. The owner publishes themes; the harness blocks writes to MAIN.
- Keep themes from drifting: deploy as a FULL SYNC. Upload every file under `theme/` (not just the changed ones), then read every file's size back and compare with the repo. Report any mismatch.
- Do not overwrite what the editor or apps own:
  - `config/settings_data.json` (theme editor settings and app embeds): never upload it.
  - GemPages was uninstalled by the owner on 2026-10-03; it was never part of our theme. Its leftover files are inert: `layout/theme.gempages.*`, `assets/gp-global.css`, `sections/gp-variant-selected.liquid`, `snippets/gp-head.liquid`, `templates/*.gp-template-bk-*.json`. Delete them from the staging copy in a full sync (never from the published theme), and drop the `gempages` block when merging `locales/en.default.json`.
  - `locales/en.default.json`: merge. Start from the target theme's current file, apply the repo keys on top, and keep any other keys the repo does not have, except the old `gempages` block.
- Preferred workflow: the owner duplicates the live theme (so editor settings and apps carry over); the full sync goes onto that copy; the owner previews and publishes it. The previously live theme becomes the next staging copy.
- Log every deploy in `docs/deploys.md` (date, commit, theme name and id).

# Product publish gate (owner rule, set 2026-10-08)

When the owner says to make products active or publish them on the website, EVERY product goes through all of the checks below first, each time, with no exceptions and without asking again. A product that fails stays DRAFT; report why and what would fix it. Nothing here replaces the owner's approval to publish: the owner's "publish" starts the gate, and only products that pass go live.

1. SEO audit: unique title (about 45-70 chars), SEO title (60 or fewer), meta description (130-155, no run-together words), tags and product type, alt text that describes each image (not just "view 1"), the page is not noindex, and it sits in the right collection. Keyword demand: run Ubersuggest when quota allows and say plainly when it was unavailable. Use claude-seo:seo-ecommerce and claude-seo:seo-page or the matching agent for the check.
2. Technical audit: every image is READY and has no visible logo or watermark (view the photos), weight is set on every variant, variants are in the "CJ Dropshipping Fulfillment" delivery profile, inventory is active at the cjdropshipping location, SKU and CJ pid tag are present, price and CAD profit were re-checked against a fresh CJ freight quote, and the page loads (HTTP 200) with valid markup. Use claude-seo:seo-technical.
3. Schema: the Product JSON-LD on the page parses, offers carry the right CAD price and availability, shipping and return data are present (once the theme that carries them is live), and no ratings or reviews are invented. Use claude-seo:seo-schema.
4. Copywriting: original text (no copied supplier copy), no brand or trademark names, no health, skin, medical or performance claims, every claim traceable to the CJ data, honest size/material/what's-included lines, and the shipping sentence. Use marketing:content-creation or the marketing-seo-specialist agent for drafting only.
5. GEO / AI-search readiness: plain factual answers a citation engine can lift (what it is, size, material, what's included, who it suits, delivery and returns), consistent store facts, no unverifiable superlatives. Use claude-seo:seo-geo.

Also before publishing: check the competitor price for the item shipped to Canada (checkout total within about 1.5x the typical total) and record the result as checked or not checked; never invent competitor prices, demand or sales figures.

Report each product as PASS or FAIL against the five checks, in one table, before and after publishing. Publish only the PASS products to the sales channels (Online Store, Google & YouTube, Pinterest, Microsoft Copilot, Meta AI and Muse, Shopify Collective). Log what was published and when in `reports/`.
