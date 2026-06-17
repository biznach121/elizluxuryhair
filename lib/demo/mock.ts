/**
 * Embedded Cimplify mock for DEMO mode — server-only.
 *
 * `createMockApp` is the same in-process Hono backend the SDK is tested
 * against (catalogue, cart, checkout, pricing — all real), here seeded with the
 * Eliz Luxury Hair wig catalogue (./wig-seed.ts). One module-scoped singleton is
 * shared by the SSR client (lib/cimplify-store.ts) and the browser route
 * handler (app/api/mock), so a cart added in the browser is visible to the same
 * in-memory store.
 *
 * Never import this from a Client Component — it must stay on the server.
 */
import { createMockApp } from "@cimplify/sdk/mock";
import { wigSeedSource } from "./wig-seed";

type MockHandle = ReturnType<typeof createMockApp>;

let instance: MockHandle | null = null;

export function getDemoMock(): MockHandle {
  if (!instance) {
    instance = createMockApp({ seed: wigSeedSource });
  }
  return instance;
}
