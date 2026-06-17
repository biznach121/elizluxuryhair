/**
 * DEMO-mode storefront API. The browser Cimplify client points its baseUrl at
 * `/api/mock` (see components/providers.tsx) so every catalogue/cart/checkout
 * request is answered by the in-process wig mock — no backend, works on Vercel.
 *
 * This route is only used in demo mode; in REAL mode the browser hits `/api/v1`
 * directly (rewritten to hosted Cimplify by next.config.ts) and this handler is
 * never touched. The mock's responses (including the `x-session-token` used for
 * cart sessions and CORS headers) are returned verbatim.
 */
import { getDemoMock } from "@/lib/demo/mock";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(
  req: Request,
  ctx: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  const { path = [] } = await ctx.params;
  const { search } = new URL(req.url);
  const target = "/" + path.join("/") + search;

  const method = req.method.toUpperCase();
  const body =
    method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();

  return getDemoMock().app.request(target, {
    method,
    headers: req.headers,
    body,
  });
}

export {
  handle as GET,
  handle as POST,
  handle as PUT,
  handle as PATCH,
  handle as DELETE,
  handle as OPTIONS,
  handle as HEAD,
};
