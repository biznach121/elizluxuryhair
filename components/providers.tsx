"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { createCimplifyClient, type Business, type Location } from "@cimplify/sdk";
import { CimplifyProvider, CartDrawerProvider } from "@cimplify/sdk/react";
import { AuthErrorToast } from "@/components/auth-error-toast";
import { isDemoMode, DEMO_API_PREFIX } from "@/lib/demo/mode";

// Same-origin client — every request goes through the Next.js rewrite in
// next.config.ts, so no CORS preflight ever hits the browser.
export function Providers({
  children,
  initialBusiness,
  initialLocations,
}: {
  children: ReactNode;
  // Server-fetched in app/layout.tsx so prices render in the right currency
  // during SSR (no default-currency flash before the client bootstrap).
  initialBusiness?: Business | null;
  initialLocations?: Location[];
}) {
  const client = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:8787";
    // DEMO mode: route every request to the embedded wig mock at /api/mock.
    // REAL mode: hit the origin's /api/v1 (rewritten to hosted Cimplify by
    // next.config.ts) exactly like the stock template.
    const baseUrl = isDemoMode() ? `${origin}${DEMO_API_PREFIX}` : origin;
    const publicKey = process.env.NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY ?? "mock-dev";
    return createCimplifyClient({
      baseUrl,
      ...(isDemoMode() ? { linkApiUrl: `${origin}${DEMO_API_PREFIX}` } : {}),
      publicKey,
      suppressPublicKeyWarning: true,
    });
  }, []);

  return (
    <CimplifyProvider
      client={client}
      initialBusiness={initialBusiness}
      initialLocations={initialLocations}
      linkComponent={Link}
    >
      <CartDrawerProvider>
        {children}
        <AuthErrorToast />
      </CartDrawerProvider>
    </CimplifyProvider>
  );
}
