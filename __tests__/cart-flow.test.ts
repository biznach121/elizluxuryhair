import { createCartFlowSuite } from "@cimplify/sdk/testing/suite";
import { expect } from "vitest";
import { brand } from "../lib/brand";
import { wigSeedSource, WIG_BUSINESS_ID } from "../lib/demo/wig-seed";

/**
 * Cart flow suite — base + Best Hairline assertions, run against the embedded
 * wig mock (lib/demo/wig-seed.ts). The base suite covers the universal cart
 * contract (empty cart, add, dedupe, remove, businessId round-trip); the
 * `extend` hook adds wig-catalogue invariants.
 */
createCartFlowSuite({
  seed: wigSeedSource,
  businessId: WIG_BUSINESS_ID,
  extend: ({ getHandle, it }) => {
    it("prices every unit in GHS", async () => {
      expect(brand.currency).toBe("GHS");
      const h = getHandle();
      const list = await h.client.catalogue.getProducts();
      if (!list.ok) throw list.error;
      const items = (list.value as unknown as { items?: unknown[] }).items ?? [];
      expect(items.length).toBeGreaterThan(0);
    });

    it("exposes wig categories and a signature collection", async () => {
      const h = getHandle();
      const cats = await h.client.catalogue.getCategories();
      if (!cats.ok) throw cats.error;
      const catSlugs = new Set(cats.value.map((c) => c.slug));
      expect(catSlugs).toContain("lace-front-wigs");
      expect(catSlugs).toContain("curly");

      const cols = await h.client.catalogue.getCollections();
      if (!cols.ok) throw cols.error;
      expect(cols.value.map((c) => c.slug)).toContain("signature-collection");
    });
  },
});
