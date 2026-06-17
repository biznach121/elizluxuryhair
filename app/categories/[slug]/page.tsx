import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  tags,
  type Category,
  type Product,
} from "@cimplify/sdk/server";
import { getStoreServerClient } from "@/lib/cimplify-store";
import { ListingClient } from "./listing-client";
import { brand } from "@/lib/brand";

// See app/products/[slug]/page.tsx for the rationale on generateStaticParams.
export async function generateStaticParams() {
  const r = await getStoreServerClient().catalogue.getCategories();
  if (!r.ok || r.value.length === 0) {
    return [{ slug: "__placeholder__" }];
  }
  return r.value.map((c) => ({ slug: c.slug ?? c.id }));
}

export const revalidate = 3600;

interface CategoryData {
  category: Category;
  products: Product[];
}

type CategoryResult =
  | { ok: true; data: CategoryData }
  | { ok: false; code: string };

async function getCategory(slug: string): Promise<CategoryResult> {
  const client = getStoreServerClient();
  const catRes = await client.catalogue.getCategoryBySlug(slug, {
    cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
  });
  if (!catRes.ok) return { ok: false, code: catRes.error.code };

  const r = await client.catalogue.getCategoryProducts(catRes.value.id, undefined, {
    cacheOptions: {
      revalidate: 3600,
      tags: [
        tags.category(catRes.value.id),
        tags.categoryProducts(catRes.value.id),
      ],
    },
  });
  const products = r.ok
    ? ((r.value as { items?: Product[] }).items ?? (r.value as Product[]))
    : [];
  return { ok: true, data: { category: catRes.value, products } };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCategory(slug);
  if (!result.ok) return {};
  const data = result.data;
  return {
    title: `${data.category.name} — ${brand.name}`,
    description: data.category.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCategory(slug);
  if (!result.ok) {
    if (result.code === "NOT_FOUND") notFound();
    return <CategorySkeleton />;
  }
  const { category, products } = result.data;
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-20 sm:pb-12">
        <h1 className="m-0 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-tight">
          {category.name}
        </h1>
        <span className="mx-auto mb-7 mt-5 block h-0.5 w-12 bg-foreground" />
        {category.description && (
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {category.description}
          </p>
        )}
      </section>
      <section className="mx-auto max-w-[110rem] px-4 pb-16 sm:px-6 sm:pb-24">
        <ListingClient products={products} />
        {products.length === 0 && (
          <p className="mt-8 text-center">
            <Link href="/shop" className="font-semibold text-primary hover:underline">
              ← Browse all products
            </Link>
          </p>
        )}
      </section>
    </>
  );
}

function CategorySkeleton() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-20 sm:pb-12">
        <div className="mx-auto h-10 w-56 animate-pulse rounded bg-muted" />
        <div className="mx-auto mb-7 mt-6 h-0.5 w-12 bg-border" />
        <div className="mx-auto h-4 w-full max-w-md animate-pulse rounded bg-muted" />
      </section>
      <section className="mx-auto max-w-[110rem] px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse bg-muted" />
          ))}
        </div>
      </section>
    </>
  );
}
