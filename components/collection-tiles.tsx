import Link from "next/link";
import Image from "next/image";
import type { Category } from "@cimplify/sdk";
import { brand } from "@/lib/brand";

/**
 * "SHOP OUR COLLECTIONS" — portrait image tiles with a centred label and a
 * "VIEW" box that appears on hover (dhair-boutique style). Sharp corners, no
 * gradient frill. The mock/category `image` isn't on the typed Category, so
 * it's read via a narrow cast.
 */
export function CollectionTiles({ categories }: { categories: Category[] }) {
  const items = categories.slice(0, 4);
  if (items.length === 0) return null;
  return (
    <section className="max-w-[110rem] mx-auto px-6 sm:px-8 min-h-[100svh] flex flex-col justify-center py-16">
      <h2 className="font-display font-black uppercase text-center text-[clamp(2rem,5.5vw,3.75rem)] tracking-tight mb-10 sm:mb-14">
        {brand.home.collections.title}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {items.map((cat) => {
          const image = (cat as { image?: string }).image;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-[3/4] lg:aspect-auto lg:h-[68vh] overflow-hidden bg-muted"
            >
              {image && (
                <Image
                  src={image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/45 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-3">
                <span className="text-background text-[clamp(1.25rem,1.8vw,1.75rem)] font-light tracking-wide">
                  {cat.name}
                </span>
                <span className="bg-foreground text-background text-[11px] uppercase tracking-[0.22em] px-5 py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  View
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
