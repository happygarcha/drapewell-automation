# Request-indexing checklist: new collections and guides, 2026-10-21

I cannot submit these myself. The Search Console API has no "Request indexing" call, and the gsc connection has no credentials yet. Do these by hand in Search Console (URL Inspection), about 10 a day allowed.

Live status checked 2026-10-21: all five pages return HTTP 200 with the right titles.
Sitemap status checked 2026-10-21: the Shopify sitemap does not list them yet (its collection and page ranges end before the new IDs). Shopify rebuilds it on its own schedule, so re-check in a day. Requesting indexing by hand does not depend on the sitemap.

For each address: paste it into the search bar at the top of Search Console, wait for the result, click Request indexing.

## Order (collections first, then guides)
- [ ] https://drapewell.myshopify.com/collections/shower-curtains
- [ ] https://drapewell.myshopify.com/collections/bath-mats
- [ ] https://drapewell.myshopify.com/collections/christmas-table-runners
- [ ] https://drapewell.myshopify.com/pages/standard-shower-curtain-size
- [ ] https://drapewell.myshopify.com/pages/shower-curtain-materials

Also worth re-requesting once, because their menu links changed:
- [ ] https://drapewell.myshopify.com/collections/bathroom
- [ ] https://drapewell.myshopify.com/collections/seasonal

## Afterwards
In a week, check each address in URL Inspection: "URL is on Google" means it is indexed.
