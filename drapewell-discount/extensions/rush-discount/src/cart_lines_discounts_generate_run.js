/**
 * Additional 1% ORDER discount, valid only for carts that carry an offer id the server still lists as active.
 *
 * Pure function: no network, no clock, no randomness (Shopify Functions cannot use them).
 * The Function trusts ONLY (a) the opaque offer id in the cart attribute `drapewell_offer_id`, which is an
 * unguessable 128-bit random value issued by our server, and (b) the list of active ids that our server writes
 * into the discount metafield. A forged attribute (or an edited timestamp, there is none) matches nothing.
 */

export const ATTRIBUTE_KEY = "drapewell_offer_id";

export function parseConfig(raw) {
  const cfg = raw && typeof raw === "object" ? raw : {};
  const percentage = Number(cfg.percentage);
  return {
    qualifyingProductIds: Array.isArray(cfg.qualifyingProductIds) ? cfg.qualifyingProductIds.map(String) : [],
    activeOffers: Array.isArray(cfg.activeOffers) ? cfg.activeOffers.map(String) : [],
    minQuantity: Number.isInteger(cfg.minQuantity) && cfg.minQuantity > 0 ? cfg.minQuantity : 2,
    percentage: Number.isFinite(percentage) && percentage > 0 && percentage <= 100 ? percentage : 1,
  };
}

function lineProductId(line) {
  const m = line && line.merchandise;
  return m && m.__typename === "ProductVariant" && m.product ? String(m.product.id) : null;
}

/** Shared by the Function and the server so both use the same qualification rule. */
export function qualification(lines, config) {
  const qualifying = new Set(config.qualifyingProductIds);
  let quantity = 0;
  const excludedCartLineIds = [];
  for (const line of lines || []) {
    const pid = lineProductId(line);
    if (pid && qualifying.has(pid)) quantity += Number(line.quantity) || 0;
    else excludedCartLineIds.push(line.id);
  }
  return { quantity, excludedCartLineIds };
}

export function evaluate(input) {
  const config = parseConfig(input && input.discount && input.discount.config && input.discount.config.jsonValue);
  const offerId = input && input.cart && input.cart.offerAttribute && input.cart.offerAttribute.value;
  if (!offerId || !config.activeOffers.includes(String(offerId))) return [];
  const { quantity, excludedCartLineIds } = qualification(input.cart.lines, config);
  if (quantity < config.minQuantity) return [];
  return [
    {
      orderDiscountsAdd: {
        candidates: [
          {
            message: "Additional 1% off applied",
            targets: [{ orderSubtotal: { excludedCartLineIds } }],
            value: { percentage: { value: config.percentage } },
          },
        ],
        selectionStrategy: "FIRST",
      },
    },
  ];
}

export function cart_lines_discounts_generate_run(input) {
  return { operations: evaluate(input) };
}
