import { verifyAppProxySignature } from "../services/discount.server.js";
import { getOfferService } from "../services/runtime.server.js";

/** GET /apps/drapewell/offer/status?offer=<id>. The remaining time is computed from the SERVER clock. */
export async function loader({ request }) {
  const url = new URL(request.url);
  if (!verifyAppProxySignature(url.searchParams, process.env.SHOPIFY_APP_SECRET)) return Response.json({ error: "unauthorized" }, { status: 401 });
  const result = await getOfferService().status({ offerId: url.searchParams.get("offer") });
  return Response.json(result, { status: result.error ? 404 : 200, headers: { "Cache-Control": "no-store" } });
}
