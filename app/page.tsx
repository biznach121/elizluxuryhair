import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { tags, type Product } from "@cimplify/sdk/server";
import { getStoreServerClient } from "@/lib/cimplify-store";
import { FeatureHero } from "@/components/feature-hero";
import { CollectionTiles } from "@/components/collection-tiles";
import { BraidingFeature } from "@/components/braiding-feature";
import { ProductCarousel } from "@/components/product-carousel";
import { GetTheLook } from "@/components/get-the-look";
import { BrandVideo } from "@/components/brand-video";
import { ShopByLook } from "@/components/shop-by-look";
import { AboutHome } from "@/components/about-home";
import { Newsletter } from "@/components/newsletter";
import { InstagramStrip } from "@/components/instagram-strip";
import { FeaturedIn } from "@/components/featured-in";
import { Testimonials } from "@/components/testimonials";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: brand.hero.title,
  description: brand.description,
};

export const revalidate = 3600;

async function getHomeData() {
  const client = getStoreServerClient();
  const [catRes, productsRes] = await Promise.all([
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
    client.catalogue.getProducts(
      { limit: 12 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
  ]);
  return {
    categories: catRes.ok ? catRes.value : [],
    products: productsRes.ok ? productsRes.value.items : [],
  };
}

// Lifestyle hero placeholder — swap for the merchant's own campaign shot.
const HERO_FALLBACK_IMAGE =
  "https://loremflickr.com/1920/1100/hairstyle,woman?lock=901";

export default async function HomePage() {
  const { categories, products } = await getHomeData();
  const bestSellers = products.slice(0, 8);
  const lookSlug = brand.home.getTheLook.productSlug;
  const getTheLookProduct: Product | undefined =
    products.find((p) => (p.slug ?? p.id) === lookSlug) ?? products[0];

  return (
    <>
      <FeatureHero
        tagline={brand.hero.tagline}
        title={brand.hero.title}
        description={brand.hero.subtitle}
        primaryCta={{ label: brand.hero.primaryCtaLabel, href: "/shop" }}
        secondaryCta={
          brand.hero.secondaryCtaLabel && brand.hero.secondaryCtaHref
            ? { label: brand.hero.secondaryCtaLabel, href: brand.hero.secondaryCtaHref }
            : undefined
        }
        imageUrl={brand.hero.image ?? HERO_FALLBACK_IMAGE}
        imageAlt={`${brand.name} — premium human hair wigs`}
        videoUrl={brand.hero.video}
      />

      <div data-reveal>
        <CollectionTiles categories={categories} />
      </div>

      <div data-reveal>
        <BraidingFeature />
      </div>

      <section data-reveal className="max-w-[110rem] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12">
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight m-0">
            {brand.home.bestSellers.title}
          </h2>
          <Link
            href="/shop"
            className="text-[13px] uppercase tracking-[0.14em] hover:underline whitespace-nowrap shrink-0"
          >
            View all →
          </Link>
        </div>
        <Suspense fallback={<GridSkeleton count={4} />}>
          <ProductCarousel products={bestSellers} />
        </Suspense>
      </section>

      <div data-reveal>
        <InstagramStrip products={products} />
      </div>

      <div data-reveal>
        <FeaturedIn />
      </div>

      <div data-reveal>
        <GetTheLook product={getTheLookProduct} />
      </div>

      <div data-reveal>
        <BrandVideo />
      </div>

      <div data-reveal>
        <ShopByLook />
      </div>

      <div data-reveal>
        <AboutHome />
      </div>

      <div data-reveal>
        <Newsletter />
      </div>

      <div data-reveal>
        <Testimonials />
      </div>
    </>
  );
}

function GridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-flow-col auto-cols-[78%] sm:auto-cols-[44%] lg:auto-cols-[30%] xl:auto-cols-[calc((100%-3rem)/3.4)] gap-4 sm:gap-6 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
      ))}
    </div>
  );
}
