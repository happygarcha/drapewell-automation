# Media removal, slice 1 (2026-10-08)

Method: Shopify Admin API has no `productDeleteMedia` in this schema version; `fileDelete` (which removes the file from its product) was used, only on candidate ids. Backup of full media lists: `reports/media-before-1-2026-10-08.json`. All four products re-queried: still ACTIVE, lead image clean (no reorder needed).

| Handle | Removed | Remaining | Removed ids / reason |
|---|---|---|---|
| 4d-mesh-bath-pillow-with-suction-cups-... | 3 | 4 | 57339106001205 (marketing text, was lead), 57339106066741 ("quick drying/machine washable" claims), 57339106132277 ("ergonomic support" claim). New lead: 57339106033973 |
| absorbent-non-slip-door-mat-latex-backing-grey | 1 | 4 | 57351839121717 (watermark/URL text, was lead). New lead: 57351839154485 |
| anti-mildew-shower-curtain | 1 | 6 | 56055328538933 (red "3pc" label). VARIANT IMAGE: it was linked to variant 53224537391413, which now has no image |
| cardinal-christmas-fleece-blanket-soft-flannel-throw-150-200-cm | 1 | 7 | 57351826964789 (marketing text overlay) |

Kept (Minor / dimension labels only): 3-piece jewellery 57360115499317, door mat 60*90 and 60*150, book pen holder dimension arrows, cardinal blanket size labels 57351826997557.

## Needs new photos (nothing deleted)
- christmas-shower-curtain-printed-polyester-bathroom-curtain-3-festive-designs: 4 of 5 flagged (text labels, extra mats not in listing, last image mats only, wrong product); only 1 clean.
- chunky-yarn-crochet-fawn-diy-adult-craft-kit-navy: all 5 are phone selfies with doodles/stickers, one with a cap logo.
- cotton-embroidered-snowflake-christmas-cushion-cover: all 7 have a supplier crown logo and pixelated watermark bars.

All other handles in the slice had no removal candidates.
