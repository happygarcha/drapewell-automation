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

# Add ALL CJ pictures and check video (owner rule, last warning, 2026-11-02)

For every CJ product that goes onto Shopify (new, or a draft being fixed):
- Fetch the full CJ gallery AND the description images (`get_product_detail`: `productImageSet` plus every `<img>` in `description`). Drop exact duplicates by file hash. Do not stop at 2 or 3 photos.
- Upload every unique picture to the product. Apply the image gate (view each one: no third-party logo or watermark).
- If a picture is NOT added, never drop it silently. Send it to the owner (SendUserFile) with the reason (e.g. shows a variant or set we do not sell, unverified claim such as load strength, supplier badge, logo) and let the owner approve or reject. A fixable mark is covered or cropped, not skipped, when the owner approves.
- Always run the video check (`scripts/cj_fetch_video.py <pid> <dir>`) and report the result: found/added, or `NO VIDEO`. Same rule: if a video is not added, report why and show it.
- The report for each product lists: pictures found, added, held (with reason), duplicates, and the video result.

Variant pictures (owner, 2026-11-02): every variant (colour, size, style) must have its own matching picture attached with `productVariantsBulkUpdate` (`mediaId`). Check this on every product before reporting; a variant with no picture is a technical-check fail.

# Owner corrections: do not repeat these (2026-11-02)

Run this checklist on EVERY product I create or edit, and tick it off in the report before saying "done". The owner has pointed out each of these as a mistake already.
1. Only work on what the owner asked. If the owner says hold, drop or dislike something (e.g. a rack), stop all work on it at once; no extra uploads, searches or reports for it. Wasting credits is a mistake.
2. Never leave a product ACTIVE or on sales channels with a placeholder price or unverified cost. Imported or hand-added products start as DRAFT until the gate passes.
3. Pictures: add EVERY unique CJ picture (gallery + description images, dedupe by hash). Anything not added is shown to the owner with the reason.
4. EVERY variant gets its own matching picture (`productVariantsBulkUpdate` mediaId). Read it back and confirm before reporting. Colour pictures may be shared across sizes; a variant with no matching picture is reported, never guessed.
5. Alt text describes what the picture really shows (never "view 1"); it names the colour/variant. If I could not view the photo, say so in the report.
6. Always run the CJ video check and report found/added or NO VIDEO. Mute audio I cannot hear.
7. Safe-use notice (box, third picture, printed on in-use photos) on every product that needs it (batteries, blades, straps, heat, small parts, children).
8. Copy: no supplier claims I cannot back (battery life, "razor sharp", "lifetime"), no brand names, no health claims; no "Shopify Collective" on customer pages.
9. Read back from Shopify after every write (status, variants, media, delivery profile, inventory, collections) and report what I actually saw, with a PASS/FAIL table. Say plainly what I could not check (page load, schema, US price, photos not viewable).
10. Honest reporting only: no faking, no guessing, no claiming a check was done when it was not.

# Batch workflow (owner batches of CJ SKUs, learned 2026-11-03)

For a list of CJ SKUs: (1) research each with the CJ API (variant given, weight, freight CA and US for that exact variant, media counts, video count); (2) pricing: min price giving C$12 profit, profit CA and US; (3) Amazon.ca checkout total median vs ours (ratio at most 1.5x; "not checked" if blocked, spaced 20 s apart); (4) verdict PASS / BORDERLINE / HOLD / FAIL with plain reasons (baby products, health claims, battery + liquid shipping, heavy or oversize, brand-licensed designs, mixed listings); (5) report table with profits Canada and USA, saved in reports/. Build only the ones the owner picks, as DRAFT, then: all unique pictures, variant pictures, Safe use where needed, CJ video check with audio muted, read back everything. Earlier batch: reports/2026-11-02-cj-batch-15-research.md and reports/2026-11-03-cj-batch-8-drafts.md. Scripts used live in the session scratchpad (research, pricing, media); recreate from this description if gone.

Amazon.ca checks (owner, 2026-11-08: "always do this way"): use the pre-installed Playwright Chromium with its default settings (no custom user agent, headers or other disguise), one search page per product, about 20 s apart, read the first page of non-sponsored results (price plus the delivery text), and STOP at the first robot-check page; mark the rest "not checked" and say so. Plain curl or requests get a 503 at once; do not try to get around the block. Amazon usually serves the first search of a session and blocks the following ones, so spread a long list over several sessions or ask the owner for totals.

# Variant limit (owner, 2026-11-03)

Never list 20, 30 or 70 variants. Cap every listing at 8 variants, usually 3 to 6. How to cut: (1) keep ONE option axis the shopper really chooses (usually colour or style) and fix the others to a single standard (one size, one length, one plug); (2) start from the variant the owner gave; (3) drop wrong-plug (EU/AU), "random", bundle/multi-pack, unsold-size and near-duplicate variants; (4) keep only variants with their own clean picture, the same weight band, and that each clear C$12 profit at one common price and stay within 1.5x the competitor total; (5) show the owner the kept and dropped list with reasons before building. Large option lists go in the description (e.g. "other sizes on request"), not in the variant picker.

# Standing authorization for pictures and videos (owner, 2026-11-03, repeated)

The owner AUTHORIZES adding, editing and blurring pictures and videos on their own. Never ask again for permission to add, blur, cover or edit pictures or videos. Add ALL CJ pictures and ALL usable CJ videos, no skipping. A third-party logo, brand name, watermark or unwanted overlay text is blurred or covered (pictures with ImageMagick, videos with scripts/video_mark_cover.py) and the picture or video is still added. Mute video audio I cannot verify. Report afterwards what was blurred or muted; do not ask before doing it.

# Alcohol in pictures (owner, 2026-11-03)

Where a product picture shows alcohol (bottles, wine, spirits, bar scenes, drinks being served), add a calm banner strip on the picture itself: "We do not sell alcohol. Drinks, bottles and glasses shown are not included. Alcohol can harm your health. Please drink responsibly and only if of legal age." (dark navy strip, cyan edge, white text; at the top if the bottom holds Safe use text). Replace the picture in place with `fileUpdate` + `originalSource` so order and variant pictures stay, and repeat the notice in the alt text. Add a matching "Please note" box (same style as the Safe use box) at the top of the description. Brand labels are still blurred. Done for the wine opener, shot dispenser and ice ball kettle. Never ask permission for this.

# Google Search Console access (owner, 2026-11-03)

The owner AUTHORIZES read-only Search Console checks without asking. Property: `https://drapewell.myshopify.com/` (service account `gsc-reader@gsc-reader-512320.iam.gserviceaccount.com`, restricted/read-only user). The two Search Console MCP tools do NOT work in cloud sessions (they look for a key file). Use `scripts/gsc_query.sh sites|totals|dates|queries|pages|pq|countries|sitemaps [days]` instead: it signs in with the environment variable `GSC_SERVICE_ACCOUNT_JSON`, (or `GSC_SERVICE_ACCOUNT_B64`, the same JSON as one base64 line, for settings boxes that cut long values; B64 wins if both are set), which must hold the WHOLE downloaded JSON key file (a real `private_key` is about 1,700 characters; the script says so if it is a placeholder). A new session is needed after the variable changes. Never print, log, commit or paste the key. First check on 2026-11-03: 3 clicks, 124 impressions in 90 days, average position 15.8; the Oct 28 traffic spike did not come from Google Search. The key was pasted into a private chat once; the owner decided NOT to rotate it (personal sessions, read-only account). Do not ask again. Google Analytics (GA4) has no tool here; ask the owner for screenshots or connect it via claude.ai connectors.
