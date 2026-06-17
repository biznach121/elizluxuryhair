import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";

/**
 * "Shop by texture" tiles (dhair-boutique): a two-up grid of large square
 * portraits, each with a white uppercase label and a "Shop this" button that
 * reveals on hover (image zooms, button slides up). Pure CSS hover, so this
 * stays a Server Component. Whole tile links to the product.
 */
export function ShopByLook() {
  const s = brand.home.shopByLook;
  if (s.items.length === 0) return null;

  return (
    <section className="grid grid-cols-1 gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-2">
      {s.items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="group relative block aspect-square overflow-hidden bg-secondary"
        >
          <Image
            src={item.image}
            alt={item.label}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
            <h3 className="m-0 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase tracking-[0.04em] text-white">
              {item.label}
            </h3>
            {/* Collapsed to 0 height until hover, so the label sits low when idle
                and rises as the button reveals. */}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <span className="mt-5 inline-flex items-center bg-foreground px-7 py-3 text-[12px] uppercase tracking-[0.18em] text-background">
                  {s.ctaLabel}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
