import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";

/**
 * "Human Braiding Hair" feature (dhair-boutique): heavy heading + underline
 * dash, intro copy, a "Perfect for:" bullet list and a filled black square
 * CTA on the left; large rounded editorial image on the right.
 */
export function BraidingFeature() {
  const b = brand.home.braiding;
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="font-display font-black text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight m-0">
            {b.title}
          </h2>
          <span className="block w-12 h-0.5 bg-foreground mt-5 mb-7" />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            {b.body}
          </p>
          <p className="mt-6 font-medium">{b.bulletsTitle}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-muted-foreground">
            {b.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            href={b.ctaHref}
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 mt-8 text-[13px] uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors"
          >
            {b.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
          <Image
            src={b.image}
            alt={b.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
