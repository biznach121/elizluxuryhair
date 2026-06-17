import type { Metadata } from "next";
import { Suspense } from "react";
import { tags } from "@cimplify/sdk/server";
import { getStoreServerClient } from "@/lib/cimplify-store";
import { ShopClient } from "./shop-client";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Shop — ${brand.name}`,
  description: brand.description,
};

export const revalidate = 3600;

async function getShopData() {
  const client = getStoreServerClient();
  const [p, c] = await Promise.all([
    client.catalogue.getProducts(
      { limit: 50 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
  ]);
  return {
    products: p.ok ? p.value.items : [],
    categories: c.ok ? c.value : [],
  };
}

export default async function ShopPage() {
  const { products, categories } = await getShopData();
  return (
    <>
      <section className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-14">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-background/60 mb-2">
            {brand.shop.eyebrow} · {products.length} units
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold m-0 -tracking-[0.025em] leading-[1.05]">
            {brand.shop.title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-background/75">
            {brand.shop.description}
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        }
      >
        <ShopClient products={products} categories={categories} />
      </Suspense>
    </>
  );
}
