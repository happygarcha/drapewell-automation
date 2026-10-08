# Meta (Facebook / Instagram) setup record

Recorded 2026-10-08 from the owner's screenshots of the Meta Ads Data Advisor "Automation summary" (3:19-3:20 pm PT, 1m 3s, status Success) and from Meta Ads reads. These are identifiers only; no passwords or tokens are stored here.

| Item | Value |
|---|---|
| Business portfolio | Drapewell, ID 925757720347630 |
| Pixel / dataset | "Drapewell Ads", ID 1633661854815014, created 2026-10-08 14:53 PT, active, first-party cookies on, data use "advertising and analytics" |
| Data sharing level in Shopify app | Maximum (per the Data Advisor) |
| Ad account used by tools | 70063950, CAD, ACTIVE, has payment method, owned by Drapewell |
| Ad account shown in the Data Advisor "IDs accessed" screen | 6002682012025 (read from the screenshot). NOT visible to our tools ("not found or no access"). Needs checking, see below. |
| Other ad account | 975647715581430, CAD, no business, no payment method. Ignore. |
| Catalog | "Shopify Product Catalog (aqudpc-ca.myshopify.com)", ID 3340274306160323, partner integration Shopify active, 30 products at first read (sync still running), 16 product sets |
| Recommended product set for ad account 70063950 | 2606518563116698 |
| Facebook page | Aappo, ID 1180605065142566 |
| Shopify admin (store handle) | admin.shopify.com/store/drapewell (API domain aqudpc-ca.myshopify.com) |
| Shopify Facebook & Instagram app | Installed, "Run ads on Facebook and Instagram: Active"; "Create shop" and "Sync products" done; "Syncing additional info" in progress; Commerce Eligibility review can take up to 4 weeks (affects Shops selling only, not ads) |

## Open checks
1. Pixel last-fired time is still empty (no event received). After the sync finishes, browse the storefront in a normal tab and re-check with `ads_get_datasets`.
2. The pixel is not yet listed under ad account 70063950. Business Settings > Data sources > Datasets > Drapewell Ads > assign ad account 70063950.
3. The ad account ID 6002682012025 in the Data Advisor summary does not match 70063950. Confirm in Meta Business Settings which ad account the Shopify app is using. Possibly a transcription difference in the photo; verify before running any ad.
4. Catalog: 166 variants have a single image (Meta "opportunity", not blocking).
5. The Data Advisor Chrome extension had debugging access to the browser during setup; remove or cancel it when not needed.

No campaign, ad set or ad exists. Nothing has been spent.

## Update 2026-10-08 (later)
- Pixel 1633661854815014 now appears under ad account 70063950 (connected).
- Catalog 3340274306160323 now shows 64 products and 16 product sets, matching the 64 live products.
- Pixel still shows no last-fired time (no events yet). Next step: browse the storefront as a visitor, then re-check.

- 2026-10-08 15:34 PT: pixel first fired (browser and server side). Event-count stats were still empty at 15:35 (reporting lag). Re-check event types (PageView, ViewContent, AddToCart) later.

- 2026-10-08 15:39 PT: Business Settings > Ad accounts lists exactly one ad account, 70063950 (opportunity score 100, one person with full access: the owner). The page URL shows selected_asset_id=6002682012025 for it, so 6002682012025 is the same asset, not a second account. Open check 3 closed.
