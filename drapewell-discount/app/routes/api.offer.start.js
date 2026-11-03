import { verifyAppProxySignature } from "../services/discount.server.js";
import { getOfferService, toCartGid } from "../services/runtime.server.js";

/** POST /apps/drapewell/offer/start (Shopify app proxy). Body: { "cart": "<token from /cart.js>" } */
export async function action({ request }) {
  const url = new URL(request.url);
  if (!verifyAppProxySignature(url.searchParams, process.env.SHOPIFY_APP_SECRET)) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (request.method !== "POST") return Response.json({ error: "method_not_allowed" }, { status: 405 });
  const body = await request.json().catch(() => ({}));
  const cartId = toCartGid(body.cart);
  if (!cartId) return Response.json({ error: "bad_request" }, { status: 400 });
  const result = await getOfferService().start({ cartId });
  return Response.json(result, { status: result.error ? 422 : 200, headers: { "Cache-Control": "no-store" } });
}
