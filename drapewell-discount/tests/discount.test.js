import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { evaluate, cart_lines_discounts_generate_run, parseConfig } from "../extensions/rush-discount/src/cart_lines_discounts_generate_run.js";
import { cart_delivery_options_discounts_generate_run } from "../extensions/rush-discount/src/cart_delivery_options_discounts_generate_run.js";
import { buildOfferConfig, configMetafieldInput, createDiscountVariables, discountEnabled, DiscountDisabledError, syncActiveOffers, verifyAppProxySignature, additionalDiscountCents } from "../app/services/discount.server.js";

const P1 = "gid://shopify/Product/1";
const P2 = "gid://shopify/Product/2";
const line = (id, pid, q) => ({ id, quantity: q, merchandise: { __typename: "ProductVariant", product: { id: pid } } });
const input = ({ offer = "abc", active = ["abc"], lines = [line("l1", P1, 1), line("l2", P2, 1)], extra = {} } = {}) => ({
  cart: { offerAttribute: offer === null ? null : { value: offer }, lines },
  discount: { config: { jsonValue: { qualifyingProductIds: [P1, P2], activeOffers: active, minQuantity: 2, percentage: 1, ...extra } } },
});

test("Function: active offer + 2 qualifying items gives one 1% ORDER discount with the native-looking message", () => {
  const ops = evaluate(input());
  assert.equal(ops.length, 1);
  const c = ops[0].orderDiscountsAdd.candidates[0];
  assert.equal(c.message, "Additional 1% off applied");
  assert.deepEqual(c.value, { percentage: { value: 1 } });
  assert.deepEqual(c.targets, [{ orderSubtotal: { excludedCartLineIds: [] } }]);
  assert.equal(ops[0].orderDiscountsAdd.selectionStrategy, "FIRST");
  assert.deepEqual(cart_lines_discounts_generate_run(input()), { operations: ops });
});

test("Function: non-qualifying lines are excluded from the discounted subtotal", () => {
  const ops = evaluate(input({ lines: [line("l1", P1, 2), line("other", "gid://shopify/Product/99", 1)] }));
  assert.deepEqual(ops[0].orderDiscountsAdd.candidates[0].targets[0].orderSubtotal.excludedCartLineIds, ["other"]);
});

test("Function: no discount when the offer id is missing, unknown (forged) or no longer active (expired or redeemed)", () => {
  assert.deepEqual(evaluate(input({ offer: null })), []);
  assert.deepEqual(evaluate(input({ offer: "forged-id" })), []);
  assert.deepEqual(evaluate(input({ offer: "abc", active: [] })), []); // server removed it: expired
  assert.deepEqual(evaluate(input({ offer: "abc", active: ["xyz"] })), []);
  assert.deepEqual(evaluate(input({ offer: "ABC" })), []); // exact match only
});

test("Function: a forged timestamp or extra attributes change nothing because the Function never reads them", () => {
  const i = input({ offer: "forged" });
  i.cart.expiresAt = { value: "2099-01-01T00:00:00Z" };
  i.cart.issuedAt = { value: "2026-11-03T00:00:00Z" };
  assert.deepEqual(evaluate(i), []);
});

test("Function: fewer than 2 qualifying items (cart manipulation after the offer was issued) removes the discount", () => {
  assert.deepEqual(evaluate(input({ lines: [line("l1", P1, 1)] })), []);
  assert.deepEqual(evaluate(input({ lines: [line("l1", P1, 1), line("o", "gid://shopify/Product/99", 4)] })), []);
  assert.equal(evaluate(input({ lines: [line("l1", P1, 2)] })).length, 1);
});

test("Function: bad or missing config fails closed", () => {
  assert.deepEqual(evaluate({ cart: { offerAttribute: { value: "abc" }, lines: [] }, discount: { config: null } }), []);
  assert.deepEqual(evaluate({}), []);
  assert.deepEqual(parseConfig(null).activeOffers, []);
  assert.equal(parseConfig({ percentage: 500 }).percentage, 1); // out-of-range falls back to 1
  assert.equal(parseConfig({ minQuantity: "x" }).minQuantity, 2);
});

test("Function: the shipping target never discounts shipping", () => {
  assert.deepEqual(cart_delivery_options_discounts_generate_run({}), { operations: [] });
});

test("combination arithmetic: $100 cart, 10% then 1% of the remainder", () => {
  const subtotal = 10000;
  const afterTen = subtotal - Math.round(subtotal * 0.1);
  const extra = additionalDiscountCents(afterTen);
  assert.equal(afterTen, 9000);
  assert.equal(extra, 90);
  assert.equal(afterTen - extra, 8910);
});

test("combination arithmetic: the owner's real checkout ($32.40 after 10% gives $0.32, total $32.08)", () => {
  assert.equal(additionalDiscountCents(3240), 32);
  assert.equal(3240 - 32, 3208);
});

test("rounding helper rounds DOWN, matching the three real checkouts seen (arithmetic only; Shopify's own allocation is NOT simulated here)", () => {
  assert.equal(additionalDiscountCents(4770), 47); // real order: 47.70 -> 0.477 shown as 0.47
  assert.equal(additionalDiscountCents(3240), 32); // real order: 32.40 -> 0.324 shown as 0.32
  assert.equal(additionalDiscountCents(9000), 90); // exact cent stays exact
});

test("safety switch: discount stays disabled by default and refuses to be created or synced", async () => {
  assert.equal(discountEnabled({}), false);
  assert.equal(discountEnabled({ DRAPEWELL_RUSH_DISCOUNT_ENABLED: "yes" }), false);
  assert.equal(discountEnabled({ DRAPEWELL_RUSH_DISCOUNT_ENABLED: "true" }), true);
  assert.throws(() => createDiscountVariables({ functionId: "f", startsAt: "2026-11-04T00:00:00Z", env: {} }), DiscountDisabledError);
  await assert.rejects(syncActiveOffers({ admin: { graphql: async () => ({}) }, discountNodeId: "d", getConfigBase: () => ({ qualifyingProductIds: [] }), activeOfferIds: [], env: {} }), DiscountDisabledError);
});

test("discount creation variables: ORDER class, combines with product discounts only, no code", () => {
  const v = createDiscountVariables({ functionId: "fn", startsAt: "2026-11-04T00:00:00Z", env: { DRAPEWELL_RUSH_DISCOUNT_ENABLED: "true" } });
  assert.deepEqual(v.automaticAppDiscount.discountClasses, ["ORDER"]);
  assert.deepEqual(v.automaticAppDiscount.combinesWith, { orderDiscounts: false, productDiscounts: true, shippingDiscounts: false });
  assert.equal("code" in v.automaticAppDiscount, false);
});

test("syncActiveOffers writes the active list into the discount metafield", async () => {
  const calls = [];
  const admin = { graphql: async (q, o) => { calls.push(o.variables); return { json: async () => ({ data: { metafieldsSet: { userErrors: [] } } }) }; } };
  const errors = await syncActiveOffers({ admin, discountNodeId: "gid://shopify/DiscountAutomaticNode/1", getConfigBase: () => ({ qualifyingProductIds: [P1, P2] }), activeOfferIds: ["a", "b"], env: { DRAPEWELL_RUSH_DISCOUNT_ENABLED: "true" } });
  assert.deepEqual(errors, []);
  const mf = calls[0].metafields[0];
  assert.equal(mf.ownerId, "gid://shopify/DiscountAutomaticNode/1");
  assert.equal(mf.type, "json");
  assert.deepEqual(JSON.parse(mf.value), buildOfferConfig({ qualifyingProductIds: [P1, P2], activeOfferIds: ["a", "b"] }));
  assert.deepEqual(configMetafieldInput({ discountNodeId: "x", config: { a: 1 } }).key, "offer-config");
});

test("app proxy signature: valid accepted, tampered or missing rejected", () => {
  const secret = "test-secret";
  const params = { shop: "drapewell.myshopify.com", path_prefix: "/apps/drapewell", timestamp: "1700000000", offer: "abc" };
  const message = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("");
  const signature = crypto.createHmac("sha256", secret).update(message).digest("hex");
  const qs = new URLSearchParams({ ...params, signature });
  assert.equal(verifyAppProxySignature(qs, secret), true);
  const tampered = new URLSearchParams({ ...params, offer: "other", signature });
  assert.equal(verifyAppProxySignature(tampered, secret), false);
  assert.equal(verifyAppProxySignature(new URLSearchParams(params), secret), false);
  assert.equal(verifyAppProxySignature(qs, "wrong"), false);
  assert.equal(verifyAppProxySignature(qs, ""), false);
});
