"use client";

import type { Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Category listing — a large 2-up editorial grid of product cards
 * (dhair-boutique). Receives server-fetched products as props (serializable).
 */
export function ListingClient({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
      {products.map((p) => (
        <StoreProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
