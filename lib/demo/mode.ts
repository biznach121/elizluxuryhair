/**
 * Demo vs. real mode.
 *
 * Eliz Luxury Hair ships in two modes:
 *
 *   • DEMO (default) — a fully self-contained wig storefront. The catalogue,
 *     categories, images and cart are served by an in-process mock seeded with
 *     wig data (see ./wig-seed.ts). No backend, no Cimplify account — the
 *     Vercel preview just works, and only ever shows wig products.
 *
 *   • REAL — paste a live/test Cimplify public key (`cpk_live_…` / `cpk_test_…`)
 *     and the storefront talks to hosted Cimplify exactly like the stock
 *     template. The demo layer is bypassed entirely; nothing about the real
 *     Cimplify integration is altered.
 *
 * The mode is decided purely by the public key prefix (same rule next.config.ts
 * uses to pick its proxy target), so flipping to real is a one-line env change.
 * `NEXT_PUBLIC_DEMO=1|0` can force it either way if ever needed.
 *
 * Pure + dependency-free so it is safe to import from both server and client.
 */

const PUBLIC_KEY = (process.env.NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY ?? "").trim();

function keyTargetsHostedCimplify(key: string): boolean {
  return key.startsWith("cpk_live_") || key.startsWith("cpk_test_");
}

export function isDemoMode(): boolean {
  const flag = (process.env.NEXT_PUBLIC_DEMO ?? "").trim().toLowerCase();
  if (flag === "1" || flag === "true" || flag === "on") return true;
  if (flag === "0" || flag === "false" || flag === "off") return false;
  // Default: demo unless a real hosted key is present.
  return !keyTargetsHostedCimplify(PUBLIC_KEY);
}

/** Path prefix the browser client uses to reach the embedded mock in demo mode. */
export const DEMO_API_PREFIX = "/api/mock";
