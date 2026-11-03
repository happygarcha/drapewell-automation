import { verifyAppProxySignature } from "../services/discount.server.js";
import { getOfferService, toCartGid } from "../services/runtime.server.js";

/** POST /apps/drapewell/offer/validate. Body: { "offer": "<id>", "cart": "<token>" }. Re-checks the offer and the cart on the server. */
export async function action({ request }) {
  const url = new URL(request.url);
  if (!verifyAppProxySignature(url.searchParams, process.env.SHOPIFY_APP_SECRET)) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (request.method !== "POST") return Response.json({ error: "method_not_allowed" }, { status: 405 });
  const body = await request.json().catch(() => ({}));
  const cartId = toCartGid(body.cart);
  if (!cartId) return Response.json({ valid: false, reason: "bad_request" }, { status: 400 });
  const result = await getOfferService().validate({ offerId: body.offer, cartId });
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}
