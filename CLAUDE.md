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

# CJ product video + images to Shopify (owner rule, set 2026-10-25)

Whenever a CJ product's pictures or video go onto a Shopify product, follow this section. Full detail and report format: `docs/cj-video-images-workflow.md`. The image rules stay exactly as they are in the publish gate above (no visible logo or watermark; a marked photo is removed or replaced).

How to get the CJ video:
1. Use the CJ product ID (`pid`, from the product's `CJ pid` tag), never a video ID. The CJ MCP only returns video IDs and the CJ product page is behind a human check, so use the documented API instead.
2. Token: the environment variable `CJ_ACCESS_TOKEN` holds the CJ API key. Exchange it with `POST https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken` and body `{"apiKey": "<key>"}`. Keep the returned tokens in memory only. Never print, log, save or paste the key, tokens, email or password.
3. `POST https://developers.cjdropshipping.com/api2.0/v1/product/queryVideosByProductId` with body `{"productId": "<pid>"}` and header `CJ-Access-Token`. Use only a video with `videoState` = `ON_STATE` and (`isFree` = `"1"` or `isBuy` = true). Never buy a video. If none: report `NO VIDEO` ("No active video found for this CJ product.") and stop.
4. Download `videoUrl` (host `download-only-api.cjdropshipping.com`) with the header `Referer: https://developers.cjdropshipping.com/`. Save as `cj-video-<pid>.mp4` and check it is a valid MP4 with size above 0. Helper: `scripts/cj_fetch_video.py <pid> <out_dir>`. Hosts that must be allowed in the environment: `developers.cjdropshipping.com`, `download-only-api.cjdropshipping.com`.

Video gate (before upload):
5. View a contact sheet of the whole video plus finer frames at the corners and at every scene change. A third-party logo, trademark, watermark, brand name or competitor branding is covered, not rejected: use `scripts/video_mark_cover.py` (blur, pixelate or opaque cover, kept on for every frame the mark appears, moving marks tracked with keyframes). Never cover or alter the product itself. Keep duration, resolution and aspect ratio. Add no text, captions, branding or music. View the check sheet the tool writes.
6. Audio: if it contains copyrighted audio, remove or mute it (`--mute-audio`). The assistant cannot hear audio, so mute it unless the owner says it is safe, and report `AUDIO MUTED (could not verify)`. Never add replacement music unless the owner provides an approved audio file.
7. If a mark cannot be reliably covered, stop before uploading, report the timestamps and the reason, and ask whether to skip the video or approve it manually.

How to upload the video to Shopify (only after 5 and 6 are done and the file is a valid MP4):
8. `stagedUploadsCreate` with `resource: VIDEO`, `mimeType: video/mp4`, `filename: cj-video-<pid>.mp4`, `fileSize` as the exact byte count (string), `httpMethod: POST`.
9. Upload the bytes: multipart POST to the returned URL, all returned parameters first and the file last, no manual Content-Type on the file part. Success is HTTP 204.
10. `fileCreate` with `originalSource` = the returned `resourceUrl`, `contentType: VIDEO`, `alt` describing the video, `filename`. Never paste a raw CJ video URL into Shopify.
11. Poll the file until `fileStatus` = READY (it passes through UPLOADED and PROCESSING). Do not attach before READY.
12. Attach with `fileUpdate` and `referencesToAdd: [<product gid>]`. Never remove or replace existing images or media.
13. Verify with `product.media`: the video is READY, on the right product, and every earlier image is still there.
14. Report: image gate result (PASSED / BLURRED / FLAGGED / BLOCKED), video gate result (NO VIDEO / CLEAN / BLURRED / AUDIO MUTED / FLAGGED / BLOCKED), what was blurred or muted with timestamps, final Shopify video status, and confirmation that existing images and media were preserved.

Playback: the live theme (published by the owner 2026-10-25, repo 8432a85) shows a product's video in the gallery. The product page lists `product.media`; a video gets a play-badged thumbnail after the photos that swaps the main photo for a Shopify video player (controls, no autoplay). So once a video is READY and attached it plays on the website with no further theme work. Keep this working: any theme change to `theme/sections/product.liquid`, `theme/assets/theme.js` or `theme/assets/theme.css` must keep the `data-video-pane` / `data-thumb-video` gallery code. After attaching a video to a live product, load the live product page and confirm it contains the `data-video-pane` block and a `<video>` tag.

# Pin on go-live (owner rule, set 2026-11-01)

When a listing PASSES the publish gate and is live on the storefront (Online Store), create one Pinterest pin for it immediately, without asking again. Use a clean Shopify photo (viewed, no logo, watermark or text overlay), the matching board, a title under 100 and a description under 500 characters written only from the product page facts (no ratings, reviews, health or performance claims, no invented prices, delivery only as "13-25 days to Canada, 10-20 days to the US, tracked"), alt text describing the photo, and the link `https://drapewell.myshopify.com/products/<handle>?utm_source=pinterest&utm_medium=social&utm_campaign=nov2026&utm_content=<short-code>`. Record the pin id in the gate or publish report. The scheduled Pinterest runs (8 AM and 8 PM PT, Nov 1-30) are not changed by this: they keep running as they are.

# Safe use notice on page and in pictures (owner rule, set 2026-11-01)

Every product that needs safe-use advice (hanging or restraint items, anything with straps, clips, heat, electricity or batteries, small parts, or children's use) gets the same notice, in the same style, in two places: (1) a "Safe use" box at the top of the product description (inline-styled `<div class="safe-use">` using the theme variables: `--surface` card, `--line` border, 4px `--neon-b` left edge, bold "Safe use" heading, 2 to 4 short plain lines; calm wording, no "WARNING", no scare words, no health or injury claims); (2) a "Safe use" picture added to the product gallery as the third image (1200x1200, same dark card and cyan edge as the box, same lines as the box, numbered 1 to 3), with alt text that repeats the lines. Pins for that product start with the key safety line. Check both on a desktop and a phone-sized screenshot before reporting. The gate's copywriting check fails a product that needs the notice and does not have it. Reference build: `pet-grooming-hammock-kit-nail-clippers-comb` (the render script is the scratchpad `safe.html`; rebuild it with the product's own lines).

Addendum (owner, 2026-11-01): the Safe use text is also PRINTED ON the photos that show the item in use (hanging, worn, strapped or operated), as calm text printed directly on the photo with NO background panel (text background fully transparent): dark text in a colour that contrasts with the photo behind it (measure the photo's brightness under the text; light photo gives dark navy text, dark photo gives white text), a thin outline in the opposite colour so it stays readable over busy areas, bold deep-magenta (or bright yellow on dark photos) "Safe use" heading, one short line with the key points at about 28 px on a 1000 px photo, kept clear of the face and body of the product where possible, and repeated in the photo's alt text. Photos that only show the item laid out do not need the strip. The standalone Safe use picture stays as the third gallery image. Replace the plain version of a printed photo instead of leaving both in the gallery, and keep the gallery order: printed in-use photo first, contents photo, Safe use picture, then the rest, video last.

# SEO Checker app (SEOWILL by Channelwill): what we learned (2026-11-02)

The owner runs this app in Shopify admin and sends screenshots; I cannot open it. Fix what it flags through the Admin API and tell the owner what only the app or theme editor can do.

- Limits it checks: meta title 50-70 characters, meta description 120-160. Count with a script before saving. Pages: `metafieldsSet` on `global.title_tag` / `global.description_tag`. Collections: `collectionUpdate(collection: {id, seo:{title, description}})` (the `input:` form is deprecated).
- Per-page editor: Target Keyword box, SEO checklist (title, meta title and meta description should include the target keyword; 3-8 images; H2 headings), Structured Data card, Advanced settings (index/follow), Search Performance (needs Google Search Console data, empty until connected).
- Use the target keyword only where it reads naturally; never stuff keywords or invent text to raise the score.
- Structured data: the theme already outputs Product, Organization, WebSite, FAQPage (on /pages/about) and BreadcrumbList in `snippets/seo-meta.liquid`. Leave the app's Enable buttons off (duplicate markup). FAQ shows "Detected externally": that is ours.
- How-To schema: only on a page that has real numbered steps. Generate finds none on hidden or step-less pages; the form can be filled by hand with the page's own words. Never invent steps. Real how-to page: `/pages/standard-shower-curtain-size`; hidden twin: `/pages/how-to-measure-shower-curtain` (unpublished).
- Hidden leftover page `reviewing-your-brand-assessment` (unpublished, 404): ignore its warnings; delete only if the owner says.
- Site Verification tab: the live store already has a `google-site-verification` tag. Bing and Pinterest codes come from the owner's own accounts (Bing Webmaster Tools HTML meta tag; Pinterest Claim website). Yandex and Norton stay empty.
- Favicon: set by the owner in Online Store > Themes > Customize > Theme settings > Favicon (never upload `config/settings_data.json`). No logo file exists in the repo; do not invent a brand mark without the owner's yes.
- seowill.com is not reachable from this session (network); ask the owner to paste text from its guides.
