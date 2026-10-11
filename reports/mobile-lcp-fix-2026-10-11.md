# Mobile LCP fix (repo only, not deployed)

Status: committed to main, NOT uploaded to any Shopify theme. Deploy only after owner approval, as a full sync to an UNPUBLISHED theme (CLAUDE.md rules).

## Diagnosis (live theme, Pixel 5 emulation, 2x CPU throttle, live storefront)
- The LCP element on the home page is the first hero slide image (`f4c0c5d3...jpg`, ~43 KB of paint area).
- In 4 of 5 live runs it first painted at 7.0-7.4 s. Network was not the cause: the image arrived in ~1 s. `show(0)` ran `enterSlide()`, which set the already-visible image to opacity 0 and re-animated it, so the largest paint was a late re-paint (element render delay). Autoplay and the progress bar started immediately as well.
- All 5 slide images were `loading="eager" fetchpriority="high"` at width 900 and the first product card was also high priority, so 6 images competed for the same bandwidth.
- PageSpeed Insights API quota was exhausted and PSI pages cannot be opened here, so PSI's 8.9 s was not reproduced; the numbers below are lab numbers from this environment.

## Changes
- `hero-slide.liquid`: slide 1 eager + high priority (640 px src, 320/480/640/960 srcset, sizes `(min-width: 457px) 320px, 70vw`); slides 2+ keep their URL in `data-src`/`data-srcset` (plus a `<noscript>` fallback) and load lazily at low priority.
- `theme.js`: initial `show(0, true)` no longer hides/animates the visible slide; autoplay and progress bar arm on first interaction or after 15 s (reduced motion still respected); hidden slide images are hydrated on arm or when a slide is shown.
- `product-card.liquid`, `collection.liquid`: only the first 2 collection cards are eager (first one high); home cards are lazy; hover image low priority.
- `theme.css`: the hide-until-loaded rule applies only to `loading="lazy"` images.

## Validation (lab: live storefront with repo CSS/JS/markup substituted via request interception)
| | live (before) | repo (after) |
|---|---|---|
| Home mobile LCP, 5 runs (ms) | 7044, 7080, 7428, 7352, 768 (median 7080) | 744, 832, 924, 864, 960 (median 864) |
| Late hero repaint (>4 s) | 4 of 5 | 0 of 5 |
| CLS median | 0.000 | 0.000 |
| TBT median (ms) | 264 | 323 (within run-to-run noise; not improved) |

Functional checks passed on mobile (Pixel 5) and desktop (1366x800): first slide visible at opacity 1, no autoplay while idle, next/prev/dots/pause/resume, hidden slide image loads when selected, home sort by price, quick view, search (24 results for "rug"), cart drawer opens. Only console error: a Shopify CDN module blocked by this sandbox proxy.

Not measured: PSI scores, desktop Lighthouse, collection/product page before/after runs with the new markup (the Liquid cannot render without a Shopify upload). The Lighthouse performance score and LCP < 2.5 s target are not demonstrated.

## Remaining bottlenecks (need owner approval to touch)
- Shopify tracking runtime (wpm, trekkie, perf-kit, web pixels): biggest controllable CPU cost in lab (blocking it saved ~0.8 s LCP and ~550 ms TBT on a product page).
- ~127 KB inline `content_for_header` (Judge.me ~34 KB, wpm loader ~30 KB, shopify-chat ~14 KB), web fonts ~138 KB.
- These are business integrations; nothing was removed.
