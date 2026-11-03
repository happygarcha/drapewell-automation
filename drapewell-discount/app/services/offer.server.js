import crypto from "node:crypto";
import { qualification, parseConfig } from "../../extensions/rush-discount/src/cart_lines_discounts_generate_run.js";

export const OFFER_TTL_SECONDS = 900;

/**
 * In-memory store. It exists for tests and local runs. Production needs a durable store (the Remix app template's
 * Prisma/SQLite or Postgres): implement the same five methods and pass it to createOfferService.
 * An offer record: { offerId, cartId, issuedAt, expiresAt, eligible, status: "active" | "expired" | "redeemed", redeemedAt, orderId }
 */
export function createMemoryStore() {
  const byId = new Map();
  const byCart = new Map();
  return {
    async getById(offerId) {
      return byId.get(offerId) || null;
    },
    async getByCart(cartId) {
      const id = byCart.get(cartId);
      return id ? byId.get(id) : null;
    },
    /** Atomic: returns the existing record for the cart, or inserts the new one. */
    async insertIfCartFree(record) {
      const existing = byCart.get(record.cartId);
      if (existing) return { created: false, record: byId.get(existing) };
      byId.set(record.offerId, record);
      byCart.set(record.cartId, record.offerId);
      return { created: true, record };
    },
    async update(offerId, patch) {
      const rec = byId.get(offerId);
      if (!rec) return null;
      Object.assign(rec, patch);
      return rec;
    },
    async listAll() {
      return [...byId.values()];
    },
  };
}

/**
 * @param {object} deps
 * @param {object} deps.store            persistence (see createMemoryStore)
 * @param {Function} deps.fetchCart      (cartId) => cart as read from Shopify by the SERVER: { id, lines: [{ id, quantity, merchandise }] }
 * @param {Function} deps.getConfig      () => { qualifyingProductIds, minQuantity, percentage }
 * @param {Function} deps.syncActive     (activeOfferIds) => Promise, writes the active list into the discount metafield
 * @param {Function} [deps.now]          server clock in ms (never the browser clock)
 * @param {Function} [deps.randomId]     cryptographically secure id
 */
export function createOfferService({ store, fetchCart, getConfig, syncActive, now = () => Date.now(), randomId = () => crypto.randomBytes(16).toString("hex"), ttlSeconds = OFFER_TTL_SECONDS }) {
  function view(rec) {
    const t = now();
    let status = rec.status;
    if (status === "active" && t >= rec.expiresAt) status = "expired";
    return {
      offerId: rec.offerId,
      status,
      issuedAt: rec.issuedAt,
      expiresAt: rec.expiresAt,
      serverNow: t,
      remainingSeconds: status === "active" ? Math.max(0, Math.ceil((rec.expiresAt - t) / 1000)) : 0,
    };
  }

  async function eligibility(cartId) {
    const cart = await fetchCart(cartId);
    if (!cart) return { ok: false, reason: "cart_not_found" };
    const config = parseConfig(getConfig());
    const { quantity } = qualification(cart.lines, config);
    return { ok: quantity >= config.minQuantity, reason: quantity >= config.minQuantity ? null : "not_enough_qualifying_items", quantity };
  }

  async function activeIds() {
    const t = now();
    return (await store.listAll()).filter((r) => r.status === "active" && t < r.expiresAt).map((r) => r.offerId);
  }

  return {
    /** Starts the window the FIRST time the server sees a qualifying cart. A cart never gets a second window. */
    async start({ cartId }) {
      if (!cartId || typeof cartId !== "string") return { error: "bad_request" };
      const existing = await store.getByCart(cartId);
      if (existing) return view(existing);
      const el = await eligibility(cartId);
      if (!el.ok) return { error: el.reason };
      const issuedAt = now();
      const { created, record } = await store.insertIfCartFree({
        offerId: randomId(),
        cartId,
        issuedAt,
        expiresAt: issuedAt + ttlSeconds * 1000,
        eligible: true,
        status: "active",
        redeemedAt: null,
        orderId: null,
      });
      if (created) await syncActive(await activeIds());
      return view(record);
    },

    /** Read-only. Safe to poll from every tab. */
    async status({ offerId }) {
      const rec = typeof offerId === "string" ? await store.getById(offerId) : null;
      if (!rec) return { error: "not_found" };
      return view(rec);
    },

    /** Re-checks everything on the server: offer exists, belongs to this cart, not expired/redeemed, cart still qualifies. */
    async validate({ offerId, cartId }) {
      const rec = typeof offerId === "string" ? await store.getById(offerId) : null;
      if (!rec) return { valid: false, reason: "not_found" };
      if (rec.cartId !== cartId) return { valid: false, reason: "cart_mismatch" };
      const v = view(rec);
      if (v.status !== "active") return { valid: false, reason: v.status };
      const el = await eligibility(cartId);
      if (!el.ok) return { valid: false, reason: el.reason };
      return { valid: true, remainingSeconds: v.remainingSeconds, serverNow: v.serverNow };
    },

    /** Marks expired offers and rewrites the active list in Shopify. Run it on a schedule (every 30 to 60 seconds). */
    async sweep() {
      const t = now();
      for (const r of await store.listAll()) {
        if (r.status === "active" && t >= r.expiresAt) await store.update(r.offerId, { status: "expired" });
      }
      const ids = await activeIds();
      await syncActive(ids);
      return { active: ids.length };
    },

    /** Called from the orders/create webhook with the offer id read from the order's note attributes. */
    async redeem({ offerId, orderId }) {
      const rec = typeof offerId === "string" ? await store.getById(offerId) : null;
      if (!rec) return { error: "not_found" };
      if (rec.status === "redeemed") return view(rec);
      await store.update(offerId, { status: "redeemed", redeemedAt: now(), orderId: orderId || null });
      await syncActive(await activeIds());
      return view(await store.getById(offerId));
    },
  };
}
