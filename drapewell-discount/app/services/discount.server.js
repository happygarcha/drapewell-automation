import crypto from "node:crypto";

/**
 * Safety switch. The additional 1% stays OFF until a compatible PUBLIC app containing this Function is installed
 * on the store (Shopify Basic cannot run a custom app's Functions) and the owner approves activation.
 */
export function discountEnabled(env = process.env) {
  return env.DRAPEWELL_RUSH_DISCOUNT_ENABLED === "true";
}

export class DiscountDisabledError extends Error {
  constructor() {
    super("The additional 1% discount is disabled (DRAPEWELL_RUSH_DISCOUNT_ENABLED is not 'true').");
    this.name = "DiscountDisabledError";
  }
}

/** The JSON the Function reads from the discount's metafield "$app:drapewell" / "offer-config". */
export function buildOfferConfig({ qualifyingProductIds, activeOfferIds, minQuantity = 2, percentage = 1 }) {
  return {
    qualifyingProductIds: [...qualifyingProductIds],
    activeOffers: [...activeOfferIds],
    minQuantity,
    percentage,
  };
}

/** Admin API 2026-10 input for metafieldsSet on the automatic discount node. */
export function configMetafieldInput({ discountNodeId, config }) {
  return {
    ownerId: discountNodeId,
    namespace: "$app:drapewell",
    key: "offer-config",
    type: "json",
    value: JSON.stringify(config),
  };
}

const METAFIELDS_SET = `#graphql
  mutation SetOfferConfig($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields { key }
      userErrors { field message code }
    }
  }`;

/**
 * Writes the active-offer list. `admin.graphql(query, { variables })` is the Shopify app Admin client.
 * Returns the userErrors so callers can alert; throws only when the discount is switched off.
 */
export async function syncActiveOffers({ admin, discountNodeId, getConfigBase, activeOfferIds, env = process.env }) {
  if (!discountEnabled(env)) throw new DiscountDisabledError();
  const base = getConfigBase();
  const config = buildOfferConfig({ ...base, activeOfferIds });
  const res = await admin.graphql(METAFIELDS_SET, { variables: { metafields: [configMetafieldInput({ discountNodeId, config })] } });
  const body = typeof res.json === "function" ? await res.json() : res;
  return body.data.metafieldsSet.userErrors;
}

/**
 * Variables for discountAutomaticAppCreate. combinesWith.productDiscounts = true is what lets this ORDER discount sit on top of
 * the existing automatic "Buy 2 Save 10%" PRODUCT discount; the existing discount must allow orderDiscounts (it already does).
 * Call it only after the owner approves; it refuses while the safety switch is off.
 */
export function createDiscountVariables({ functionId, startsAt, env = process.env }) {
  if (!discountEnabled(env)) throw new DiscountDisabledError();
  return {
    automaticAppDiscount: {
      title: "Additional 1% off",
      functionId,
      startsAt,
      discountClasses: ["ORDER"],
      combinesWith: { orderDiscounts: false, productDiscounts: true, shippingDiscounts: false },
    },
  };
}

export const CREATE_DISCOUNT = `#graphql
  mutation CreateRushDiscount($automaticAppDiscount: DiscountAutomaticAppInput!) {
    discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
      automaticAppDiscount { discountId status }
      userErrors { field message code }
    }
  }`;

/** Storefront API cart read, done by the SERVER. The browser's cart JSON is never trusted. */
export function createStorefrontCartFetcher({ shopDomain, storefrontToken, apiVersion = "2026-10", fetchImpl = fetch }) {
  const query = `query Cart($id: ID!) { cart(id: $id) { id lines(first: 100) { nodes { id quantity merchandise { __typename ... on ProductVariant { product { id } } } } } } }`;
  return async function fetchCart(cartId) {
    const res = await fetchImpl(`https://${shopDomain}/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": storefrontToken },
      body: JSON.stringify({ query, variables: { id: cartId } }),
    });
    if (!res.ok) return null;
    const body = await res.json();
    const cart = body && body.data && body.data.cart;
    return cart ? { id: cart.id, lines: cart.lines.nodes } : null;
  };
}

/**
 * Shopify app proxy signature (documented scheme): remove `signature`, sort the remaining params as `key=value` (multiple values joined by ","),
 * concatenate WITHOUT separators, HMAC-SHA256 with the app secret, hex digest, compare in constant time.
 */
export function verifyAppProxySignature(searchParams, secret) {
  const params = new URLSearchParams(searchParams);
  const signature = params.get("signature");
  if (!signature || !secret) return false;
  params.delete("signature");
  const grouped = {};
  for (const [k, v] of params) grouped[k] = grouped[k] ? `${grouped[k]},${v}` : v;
  const message = Object.keys(grouped).sort().map((k) => `${k}=${grouped[k]}`).join("");
  const digest = crypto.createHmac("sha256", secret).update(message).digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * 1% of the post-product-discount subtotal, rounded DOWN to the cent. Rounding down matches every real Drapewell checkout seen so far
 * (0.324 shown as 0.32, 0.477 shown as 0.47, per-unit 10% of 17.99 = 1.799 shown as 1.79), but Shopify does not document its rounding,
 * so this is an observation, not a guarantee. Shopify's own allocation is NOT simulated.
 */
export function additionalDiscountCents(subtotalAfterProductDiscountCents, percentage = 1) {
  return Math.floor((subtotalAfterProductDiscountCents * percentage) / 100 + 1e-9);
}
