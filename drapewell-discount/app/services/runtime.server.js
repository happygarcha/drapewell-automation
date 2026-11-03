import { createOfferService, createMemoryStore } from "./offer.server.js";
import { createStorefrontCartFetcher, syncActiveOffers } from "./discount.server.js";

/**
 * Wires the offer service for the running app. Replace createMemoryStore() with a durable store before production.
 * Configuration comes from environment variables so no secret or id is hard-coded:
 *   SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN, SHOPIFY_APP_SECRET (app proxy), RUSH_QUALIFYING_PRODUCT_IDS (comma-separated gids),
 *   RUSH_DISCOUNT_NODE_ID, DRAPEWELL_RUSH_DISCOUNT_ENABLED ("true" only after the owner approves).
 */
let service;
export function getOfferService({ admin } = {}, env = process.env) {
  if (service) return service;
  const qualifying = (env.RUSH_QUALIFYING_PRODUCT_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  service = createOfferService({
    store: createMemoryStore(),
    fetchCart: createStorefrontCartFetcher({ shopDomain: env.SHOPIFY_STORE_DOMAIN, storefrontToken: env.SHOPIFY_STOREFRONT_TOKEN }),
    getConfig: () => ({ qualifyingProductIds: qualifying, minQuantity: 2, percentage: 1 }),
    syncActive: async (activeOfferIds) => {
      if (!admin) return [];
      return syncActiveOffers({ admin, discountNodeId: env.RUSH_DISCOUNT_NODE_ID, getConfigBase: () => ({ qualifyingProductIds: qualifying }), activeOfferIds, env });
    },
  });
  return service;
}

/** The theme sends the cart token from /cart.js ("c1-abc?key=..."); the Storefront API wants the cart gid. */
export function toCartGid(token) {
  if (typeof token !== "string" || !token) return null;
  const clean = token.split("?")[0];
  return /^[A-Za-z0-9_-]{8,}$/.test(clean) ? `gid://shopify/Cart/${clean}` : null;
}
