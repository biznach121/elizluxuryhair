import Link from "next/link";
import Image from "next/image";
import type { Product } from "@cimplify/sdk";
import { brand } from "@/lib/brand";

const FALLBACK = "https://loremflickr.com/1000/1200/hairstyle?lock=950";

/**
 * "Get the look" feature — heavy heading + underline dash, copy and a filled
 * black square CTA on the left, large image on the right (dhair-boutique's
 * "Human Braiding Hair" block).
 */
export function GetTheLook({ product }: { product?: Product }) {
  const g = brand.home.getTheLook;
  const image = product?.image_url ?? product?.images?.[0] ?? FALLBACK;
  const href = product ? `/products/${product.slug ?? product.id}` : "/shop";
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] tracking-tight m-0">
            {g.title}
          </h2>
          <span className="block w-12 h-0.5 bg-foreground mt-5 mb-7" />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            {g.body}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors"
          >
            {g.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="order-1 lg:order-2 relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
          <Image
            src={image}
            alt={product?.name ?? g.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
