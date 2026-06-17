/**
 * Server-side Cimplify client, mode-aware.
 *
 *   • REAL mode → the stock `getServerClient()` from @cimplify/sdk/server,
 *     completely untouched (reads CIMPLIFY_SECRET_KEY / public key, talks to
 *     hosted Cimplify).
 *
 *   • DEMO mode → a client whose transport calls the in-process wig mock
 *     directly (no network), so Server Components and `generateStaticParams`
 *     render real wig data at build/SSR time with zero backend.
 *
 * Pages import this instead of `getServerClient`; `tags` and the `revalidate*`
 * helpers still come straight from @cimplify/sdk/server.
 */
import { cache } from "react";
import { createCimplifyClient } from "@cimplify/sdk";
import { getServerClient } from "@cimplify/sdk/server";
import { isDemoMode } from "./demo/mode";
import { getDemoMock } from "./demo/mock";

const DEMO_BASE_URL = "http://demo.local";

function createDemoServerClient() {
  const mock = getDemoMock();
  const demoFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const path = url.startsWith(DEMO_BASE_URL) ? url.slice(DEMO_BASE_URL.length) : url;
    return mock.app.request(path, {
      method: init?.method,
      headers: init?.headers,
      body: init?.body as BodyInit | null | undefined,
    });
  };
  return createCimplifyClient({
    baseUrl: DEMO_BASE_URL,
    linkApiUrl: DEMO_BASE_URL,
    publicKey: "mock-dev",
    suppressPublicKeyWarning: true,
    fetch: demoFetch as typeof fetch,
  });
}

/** Request-memoized store client. Use everywhere a page used `getServerClient()`. */
export const getStoreServerClient = cache(() =>
  isDemoMode() ? createDemoServerClient() : getServerClient(),
);
