import { brand } from "@/lib/brand";

/**
 * "As featured in" press strip (dhair-boutique): a centred, letter-spaced
 * label over a row of large grey publication wordmarks. Typography-led — no
 * logo licensing. Names are placeholders; swap for the merchant's real press.
 */
export function FeaturedIn() {
  const f = brand.home.featuredIn;
  if (f.logos.length === 0) return null;
  return (
    <section className="border-t border-border py-14 sm:py-20">
      <p className="text-center text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-muted-foreground mb-10 sm:mb-14">
        {f.title}
      </p>
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 gap-y-8">
        {f.logos.map((name) => (
          <span
            key={name}
            className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-foreground/65 hover:text-foreground transition-colors"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
