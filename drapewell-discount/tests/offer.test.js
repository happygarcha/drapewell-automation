import test from "node:test";
import assert from "node:assert/strict";
import { createOfferService, createMemoryStore } from "../app/services/offer.server.js";
import { toCartGid } from "../app/services/runtime.server.js";

const QUALIFYING = ["gid://shopify/Product/1", "gid://shopify/Product/2"];
const line = (id, productId, quantity) => ({ id, quantity, merchandise: { __typename: "ProductVariant", product: { id: productId } } });

function harness({ carts = {} } = {}) {
  let t = 1_000_000;
  const synced = [];
  const store = createMemoryStore();
  let n = 0;
  const svc = createOfferService({
    store,
    now: () => t,
    randomId: () => `offer${++n}`,
    fetchCart: async (id) => carts[id] || null,
    getConfig: () => ({ qualifyingProductIds: QUALIFYING, minQuantity: 2, percentage: 1 }),
    syncActive: async (ids) => { synced.push([...ids]); },
  });
  return { svc, store, synced, advance: (s) => { t += s * 1000; }, carts };
}

test("qualification: needs 2 qualifying items, other products do not count", async () => {
  const h = harness({ carts: { c1: { id: "c1", lines: [line("l1", QUALIFYING[0], 1)] }, c2: { id: "c2", lines: [line("l1", QUALIFYING[0], 1), line("l2", "gid://shopify/Product/99", 5)] }, c3: { id: "c3", lines: [line("l1", QUALIFYING[0], 1), line("l2", QUALIFYING[1], 1)] }, c4: { id: "c4", lines: [line("l1", QUALIFYING[0], 2)] } } });
  assert.equal((await h.svc.start({ cartId: "c1" })).error, "not_enough_qualifying_items");
  assert.equal((await h.svc.start({ cartId: "c2" })).error, "not_enough_qualifying_items");
  assert.equal((await h.svc.start({ cartId: "c3" })).status, "active");
  assert.equal((await h.svc.start({ cartId: "c4" })).status, "active");
  assert.equal((await h.svc.start({ cartId: "missing" })).error, "cart_not_found");
  assert.equal((await h.svc.start({})).error, "bad_request");
});

test("window is 900 seconds from the SERVER clock and counts down", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  assert.equal(a.remainingSeconds, 900);
  assert.equal(a.expiresAt - a.issuedAt, 900_000);
  h.advance(300);
  assert.equal((await h.svc.status({ offerId: a.offerId })).remainingSeconds, 600);
  h.advance(599);
  assert.equal((await h.svc.status({ offerId: a.offerId })).status, "active");
  h.advance(1);
  const s = await h.svc.status({ offerId: a.offerId });
  assert.equal(s.status, "expired");
  assert.equal(s.remainingSeconds, 0);
});

test("browser refresh and quantity changes never restart the timer (same cart returns the same offer)", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  h.advance(400);
  h.carts.c = { id: "c", lines: [line("l", QUALIFYING[0], 5)] }; // quantity changed
  const b = await h.svc.start({ cartId: "c" }); // "refresh"
  assert.equal(b.offerId, a.offerId);
  assert.equal(b.issuedAt, a.issuedAt);
  assert.equal(b.remainingSeconds, 500);
});

test("after expiry the same cart gets its expired offer back, never a new window", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  h.advance(901);
  const b = await h.svc.start({ cartId: "c" });
  assert.equal(b.offerId, a.offerId);
  assert.equal(b.status, "expired");
  assert.equal(b.remainingSeconds, 0);
});

test("multiple tabs starting at the same moment create exactly one offer", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const results = await Promise.all([h.svc.start({ cartId: "c" }), h.svc.start({ cartId: "c" }), h.svc.start({ cartId: "c" })]);
  assert.equal(new Set(results.map((r) => r.offerId)).size, 1);
  assert.equal((await h.store.listAll()).length, 1);
});

test("active list handed to Shopify contains only live offers and shrinks on sweep", async () => {
  const h = harness({ carts: { a: { id: "a", lines: [line("l", QUALIFYING[0], 2)] }, b: { id: "b", lines: [line("l", QUALIFYING[1], 2)] } } });
  const a = await h.svc.start({ cartId: "a" });
  h.advance(500);
  const b = await h.svc.start({ cartId: "b" });
  assert.deepEqual(h.synced.at(-1), [a.offerId, b.offerId]);
  h.advance(450); // a is now 950 s old, b 450 s
  await h.svc.sweep();
  assert.deepEqual(h.synced.at(-1), [b.offerId]);
  h.advance(500);
  const r = await h.svc.sweep();
  assert.equal(r.active, 0);
  assert.deepEqual(h.synced.at(-1), []);
});

test("forged or manipulated offer ids and carts are rejected", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] }, other: { id: "other", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  assert.equal((await h.svc.status({ offerId: "offer999" })).error, "not_found"); // invented id
  assert.equal((await h.svc.status({ offerId: { $ne: null } })).error, "not_found"); // object injection
  assert.equal((await h.svc.validate({ offerId: "9999999999", cartId: "c" })).valid, false);
  assert.equal((await h.svc.validate({ offerId: a.offerId, cartId: "other" })).reason, "cart_mismatch"); // id copied to another cart
  assert.equal((await h.svc.validate({ offerId: a.offerId, cartId: "c" })).valid, true);
});

test("validate fails once the cart stops qualifying, and after expiry", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  h.carts.c = { id: "c", lines: [line("l", QUALIFYING[0], 1)] }; // customer removed an item
  assert.equal((await h.svc.validate({ offerId: a.offerId, cartId: "c" })).reason, "not_enough_qualifying_items");
  h.carts.c = { id: "c", lines: [line("l", QUALIFYING[0], 2)] };
  h.advance(901);
  assert.equal((await h.svc.validate({ offerId: a.offerId, cartId: "c" })).reason, "expired");
});

test("checkout after expiry: an expired offer is removed from the active list so Shopify no longer applies it", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  h.advance(901);
  await h.svc.sweep();
  assert.ok(!h.synced.at(-1).includes(a.offerId));
});

test("redeeming an offer removes it from the active list and cannot be redeemed twice", async () => {
  const h = harness({ carts: { c: { id: "c", lines: [line("l", QUALIFYING[0], 2)] } } });
  const a = await h.svc.start({ cartId: "c" });
  const r1 = await h.svc.redeem({ offerId: a.offerId, orderId: "o1" });
  assert.equal(r1.status, "redeemed");
  assert.ok(!h.synced.at(-1).includes(a.offerId));
  const rec = await h.store.getById(a.offerId);
  assert.equal(rec.orderId, "o1");
  const r2 = await h.svc.redeem({ offerId: a.offerId, orderId: "o2" });
  assert.equal(r2.status, "redeemed");
  assert.equal((await h.store.getById(a.offerId)).orderId, "o1");
});

test("offer ids are 128-bit hex by default and unique", async () => {
  const store = createMemoryStore();
  const svc = createOfferService({ store, fetchCart: async (id) => ({ id, lines: [line("l", QUALIFYING[0], 2)] }), getConfig: () => ({ qualifyingProductIds: QUALIFYING }), syncActive: async () => {} });
  const ids = new Set();
  for (let i = 0; i < 50; i++) ids.add((await svc.start({ cartId: `cart${i}` })).offerId);
  assert.equal(ids.size, 50);
  for (const id of ids) assert.match(id, /^[0-9a-f]{32}$/);
});

test("cart token from the theme becomes a Storefront cart id, junk is refused", () => {
  assert.equal(toCartGid("c1-abcdef123456?key=xyz"), "gid://shopify/Cart/c1-abcdef123456");
  assert.equal(toCartGid("../../etc"), null);
  assert.equal(toCartGid(""), null);
  assert.equal(toCartGid(undefined), null);
});
