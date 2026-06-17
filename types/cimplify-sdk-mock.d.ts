/**
 * Ambient types for `@cimplify/sdk/mock` — the SDK ships this entry without
 * .d.ts files, so we declare the narrow surface we use to drive the embedded
 * demo backend. See node_modules/@cimplify/sdk/dist/mock/library.mjs.
 */
declare module "@cimplify/sdk/mock" {
  interface HonoLike {
    request(input: string | URL | Request, init?: RequestInit): Promise<Response>;
  }
  interface MockHandle {
    app: HonoLike;
    deps: { defaultBusinessId: string; resetAll(next?: unknown): string };
    request(path: string, init?: RequestInit): Promise<Response>;
  }
  interface CreateMockAppOptions {
    seed?: unknown;
    cors?: string | string[] | false;
    frozenAt?: string;
    rngSeed?: string;
    authMode?: "permissive" | "strict";
    defaultOtp?: string;
  }
  export function createMockApp(options?: CreateMockAppOptions): MockHandle;
  export function defineSeed<T>(seed: T): T;
}
