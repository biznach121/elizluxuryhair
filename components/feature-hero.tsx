import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "./hero-carousel";

interface FeatureHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl: string;
  imageAlt: string;
  /** When set, the hero becomes an image→video carousel (image shown first). */
  videoUrl?: string;
  badge?: string;
}

/**
 * Full-bleed lifestyle hero (dhair-boutique style): image fills the viewport,
 * copy sits bottom-left over a subtle gradient. Light sentence-case headline,
 * outlined square CTA. Strings come from `brand.hero` at the call site.
 */
export function FeatureHero({
  title,
  description,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
  videoUrl,
}: FeatureHeroProps) {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-foreground text-background">
      {videoUrl ? (
        <HeroCarousel imageUrl={imageUrl} imageAlt={imageAlt} videoUrl={videoUrl} />
      ) : (
        <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-foreground/0 pointer-events-none" />
      {/* Faint top scrim so the overlaid (dark) nav stays legible on any hero image. */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 lg:pb-20">
          <h1 className="font-sans font-light text-[clamp(2.25rem,7vw,5.5rem)] m-0 mb-7 leading-[1.05] tracking-tight max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="sr-only">{description}</p>
          )}
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-4 border border-background text-background text-[13px] uppercase tracking-[0.18em] hover:bg-background hover:text-foreground transition-colors"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="text-[13px] uppercase tracking-[0.14em] text-background/85 hover:text-background underline underline-offset-8 decoration-1"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
