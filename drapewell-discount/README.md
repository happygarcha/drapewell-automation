# Drapewell additional 1% (15-minute window): status and report

**Status: built, unit-tested, NOT deployed, discount DISABLED.** Nothing in this folder has touched the Shopify store, any theme, or any discount.
The current live 1% (a code applied from the cart) is unchanged and still works; this project is its replacement once a compatible app exists.

## Shopify Basic restriction (checked against Shopify's current docs, 2026-11-03)

Shopify's Functions documentation says: "Only stores on a Shopify Plus plan can use custom apps that contain Shopify Function APIs."
and "Stores on any plan can use public apps that are distributed through the Shopify App Store and contain functions."
The page says nothing about unlisted apps. So on Basic this Function **cannot** be deployed as a custom app (including with the Shopify CLI).
Routes that work on Basic: publish it as a **public App Store app** (needs a Shopify Partner account, app review and a public listing) or
have an existing public app provide this behaviour. Until then `DRAPEWELL_RUSH_DISCOUNT_ENABLED` stays unset and the code refuses to create or sync the discount.

## Is the 15-minute expiry enforceable?

**Partly, and with one honest gap.**

1. A Shopify Function has no clock. The only time access is `shop.localTime`, which returns booleans such as `dateTimeBefore(<fixed value>)`; there is no
   "current timestamp" and a per-cart expiry cannot be passed in as an argument. A "compare the cart's expiry with now" check inside the Function is therefore **not possible**.
2. What is built instead is a **server-side revocation list**: the server issues a random 128-bit offer id, the theme stores only that id in the cart attribute
   `drapewell_offer_id`, and the server writes the list of still-active ids into the discount's metafield. The Function applies the 1% only if the cart's id is on the list
   and 2 or more qualifying items are in the cart. Expired and redeemed ids are removed by `sweep()` (run it every 30 to 60 seconds).
   Forged ids match nothing; there is no timestamp in the cart to tamper with.
3. **The gap:** Shopify re-runs a Function when the cart or checkout is recalculated. If a shopper's checkout is already calculated and nothing triggers another
   recalculation, the 1% can stay on that checkout for a while after the id is revoked (up to the sweep interval plus however long Shopify keeps the calculation).
   I could not find a Shopify statement that a final recalculation always runs at order submission, so **do not treat the expiry as exact to the second**.
   It must be tested on a real store before relying on it. Revocation also has a delay equal to the sweep interval.
4. Other limits: a shopper who creates a brand-new cart gets a new window (the server keys the window to the cart; per-customer or per-device caps are not built);
   the store is in-memory (replace `createMemoryStore` with a durable store before production); the `orders/create` webhook that calls `redeem()` is not written.

## What was built

| Path | Purpose |
|---|---|
| `extensions/rush-discount/shopify.extension.toml` | Targets `cart.lines.discounts.generate.run` and `cart.delivery-options.discounts.generate.run` (api_version 2026-10). Written by hand: the Shopify CLI was not run, so scaffold with `shopify app generate extension --template discount` and merge. |
| `extensions/rush-discount/src/cart_lines_discounts_generate_run.{graphql,js}` | Order-level 1% for qualifying lines only, label "Additional 1% off applied". |
| `extensions/rush-discount/src/cart_delivery_options_discounts_generate_run.{graphql,js}` | No-op (the offer never touches shipping). |
| `app/services/offer.server.js` | Server-authoritative offers: `issuedAt`/`expiresAt` from the server clock, secure random id, one window per cart, validate, sweep, redeem. |
| `app/services/discount.server.js` | Discount/metafield builders, safety switch, Storefront cart reader, app-proxy signature check, rounding helper. |
| `app/services/runtime.server.js` | Wiring from environment variables. |
| `app/routes/api.offer.{start,status,validate}.js` | App-proxy endpoints (signature-verified). |
| `theme/snippets/drapewell-offer.liquid`, `theme/assets/drapewell-offer.{js,css}` | Countdown for the cart drawer and cart page only; isolated `.dwo*` styles; counts down with `performance.now()` after the server says how many seconds remain. |
| `tests/offer.test.js`, `tests/discount.test.js` | 26 tests. |

## Checkout rules

No file here touches checkout: no timer, popup, banner, widget or message, and no DOM manipulation. On Basic checkout cannot be edited anyway. The snippet header says to
render it only in the cart drawer and cart page. Shopify prints its own discount line from the Function's `message`; that native line is not hidden or altered.
**Unverified:** exactly how Shopify labels an app-created automatic order discount at checkout. Check it on a real checkout.

## Results

* `npm test`: **26 of 26 passed** (qualification, 900-second expiry with a fake server clock, no restart on refresh or quantity change, one offer for simultaneous "tabs",
  forged ids and cart mismatch, cart manipulation, active-list shrinkage after expiry, redemption, signature checks, combination arithmetic, the safety switch).
* `npx eslint .`: clean.
* Combination arithmetic: $100 cart gives -$10, then -$0.90, total $89.10 (matches your example). The three real Drapewell checkouts are consistent with Shopify rounding **down** to the cent
  (0.324 shows 0.32; 0.477 shows 0.47). This is an observation of three orders, not documented behaviour.

## NOT done or NOT tested (be clear before relying on any of this)

* The Function was never run by Shopify, never deployed, never installed. The 26 tests call the JavaScript directly with hand-made input.
* Shopify's real discount allocation and rounding were not tested. Checkout after expiration, mobile checkout, real multi-tab and real browser refresh were **not** tested
  (this sandbox cannot open Shopify checkout; the theme script was not loaded in a browser). The multi-tab and refresh behaviour is covered only at the server-logic level.
* No duplicate unpublished theme was used. I did not upload the theme files anywhere (the owner's spare theme "Drapewell Discover Copy 1" is waiting to be published, so I left it alone).
* The app proxy, Storefront token, webhook, durable storage, scheduler for `sweep()`, and App Store submission are not set up.
* No paid app was installed, no theme was published, no discount was created or activated.

## To go live (needs the owner's approval at each step)

1. Create a Shopify Partner app from the CLI template, merge `extensions/rush-discount`, add Remix routes from `app/`, durable storage, a scheduler and an `orders/create` webhook.
2. Publish it as a public App Store app (Basic cannot run a custom app's Functions), install it on Drapewell.
3. Create the app-owned discount with `createDiscountVariables(...)` and set `DRAPEWELL_RUSH_DISCOUNT_ENABLED=true`.
4. In a duplicate unpublished theme, include `{% render 'drapewell-offer' %}` in the cart drawer and cart page only, preview, test a real checkout (including after 15 minutes), then publish.
5. Only then switch off the current code-based 1% (code `custom.quick_code` and the "Quick checkout extra 1%" discount).
