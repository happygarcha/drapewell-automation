# Loyalty Blueprint

Notepad for the Drapewell points and rewards program. Written 2026-10-26. Nothing here is installed or live yet. Owner approval is needed before installing an app or publishing any rule.

## 1. Proposed rules (illustrative, not yet approved)

| Part | Rule | Why |
|---|---|---|
| Earn | 1 point per C$1 of merchandise (not shipping or tax), after the order is paid | Simple |
| Sign-up bonus | 50 points | Small, one time |
| Referral | 100 points when the referred friend completes a paid order | Pays only on results |
| Review points | Points for any verified-buyer review, whatever the rating. Never conditional on a good rating. | Keeps reviews honest; no invented or incentivised-positive reviews |
| Redeem | 100 points = C$2 off. Minimum redemption 250 points (C$5). Orders of C$35 or more. | Protects margin on single-item orders |
| Cap | A redemption takes off at most 15% of the order | Margin protection |
| Expiry | 12 months after the last purchase | Keeps liability small. Check local rules. |
| Exclusions | No points on discounted items or refunded orders | Anti-gaming |

## 2. Profit factor (assumptions, to be replaced with real data)

- 1 point per C$1 with C$0.02 per point = 2% give-back if every point is redeemed. At a 50% redemption rate the real cost would be about 1% of revenue (the 50% is an assumption; we have no data).
- Single item at about C$23 checkout: earning costs about C$0.46.
- A C$5 redemption on a C$35+ order (two items, roughly C$20-25 profit before the discount) leaves roughly C$15-20, above the C$12 per-order profit floor.
- A single beads bag (C$19.98-22.98 checkout, profit about C$12.28-13.44 before the price change) has no room for a C$5 discount. That is why the minimum order is C$35.
- Loyalty does not fix prices that are over the 1.5x competitor rule. Fix pricing first.
- Real payoff is repeat orders, which cost no ad money. We have no repeat-rate data yet.

## 3. Loyalty apps with free plans (researched 2026-10-26)

Caps and prices come mostly from third-party comparison blogs and some of those are vendor-written. They disagree in places. **Confirm on each app's Shopify App Store listing before installing.**

| App | Free plan cap (orders/month) | Next paid tier (as reported) | Notes |
|---|---|---|---|
| LoyaltyLion | 400 (official listing confirms) | $199/month | Largest free cap, steep jump after |
| Appstle Loyalty | 250 (official listing confirms) | $10/month for 500 | Points, store credit, loyalty page, referrals, milestone emails reported on free plan |
| Joy | 250 per two blogs, one source says 50 | not confirmed | Unverified cap |
| Smile | 200 | $15/month for 500 (one report) | Points, referrals, discount and free-shipping rewards, POS reported on free plan |
| Rivo | 200 | $15/month for 500 | |
| Growave | 200 | $15/month for 500 | |
| BON Loyalty | 150 (one guide); other sources say 200 | $29/month for 500 | Cap disagrees between sources |
| Loloyal / CWILL Loyalty | 50 | $19-29/month for 500 | Tightest cap |

Sources:
- https://apps.shopify.com/categories/marketing-and-conversion-customer-loyalty
- https://apps.shopify.com/appstle-loyalty
- https://apps.shopify.com/loyaltylion
- https://apps.shopify.com/bon-loyalty-rewards
- https://joy.so/blog/best-free-shopify-loyalty-apps/
- https://key-stone.app/blogs/free-loyalty-apps-shopify-compared
- https://yuko.so/blog/free-shopify-loyalty-app/

## 4. Selection checklist (before installing any app)

- Free plan cap is above current monthly orders, and the next paid step is affordable.
- Redemption by discount code, with a minimum order and a percentage cap (the rules in section 1).
- Works with Shopify's new checkout and the current theme.
- Does not add a second tracking pixel that duplicates GA4 or Meta events.
- Privacy policy and consent banner cover the data it collects.
- Easy to uninstall without leaving code in the theme.

## 5. Open decisions for the owner

1. Approve the rules in section 1, or change them.
2. Pick an app (suggested to check first: Appstle, Smile, Rivo, LoyaltyLion).
3. Confirm current monthly order volume so the free cap is compared with real numbers.
4. Decide whether to launch only after pricing is fixed against the 1.5x competitor rule.
