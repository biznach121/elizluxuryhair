import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Find Your Style — ${brand.name}`,
  description: "Browse Best Hairline by look — lace fronts, curls, sleek straight, and bundles.",
};

interface StyleEntry {
  label: string;
  title: string;
  blurb: string;
  shopHref: string;
  hero: string;
  tiles: string[];
}

// Stock placeholders (loremflickr, keyword-matched + locked). Swap for real
// editorial photography — or connect a live Cimplify catalogue — before launch.
function img(keyword: string, lock: number, w = 1800, h = 1100): string {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keyword)}?lock=${lock}`;
}

const ENTRIES: StyleEntry[] = [
  {
    label: "Lace fronts",
    title: "The lace front edit.",
    blurb: "Pre-plucked HD lace that melts into your hairline. Part it anywhere, style it any way.",
    shopHref: "/categories/lace-front-wigs",
    hero: img("hairstyle,woman", 301),
    tiles: [img("hairstyle", 302, 900, 1200), img("hair", 303, 900, 1200), img("wig", 304, 900, 1200)],
  },
  {
    label: "Curly",
    title: "Curls & coils.",
    blurb: "From soft loose waves to tight kinky curls — bouncy, defined and full of life.",
    shopHref: "/categories/curly",
    hero: img("curly,hair", 305),
    tiles: [img("curly", 306, 900, 1200), img("afro", 307, 900, 1200), img("curls", 308, 900, 1200)],
  },
  {
    label: "Straight",
    title: "Sleek & straight.",
    blurb: "Glassy bone-straight and silky finishes that hold their shine all day.",
    shopHref: "/categories/straight",
    hero: img("straight,hair", 309),
    tiles: [img("hairstyle", 310, 900, 1200), img("hair", 311, 900, 1200), img("ponytail", 312, 900, 1200)],
  },
  {
    label: "Bundles",
    title: "Bundles & bulk.",
    blurb: "Raw, double-drawn wefts for a custom install — full from top to tip.",
    shopHref: "/categories/bundles",
    hero: img("hair,salon", 313),
    tiles: [img("hair", 314, 900, 1200), img("hairstyle", 315, 900, 1200), img("curly", 316, 900, 1200)],
  },
];

export default function LookbookPage() {
  return (
    <article>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-3">
            Find your style
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] mb-4 -tracking-[0.04em] leading-[0.98]">
            Your look, sorted.
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Not sure where to start? Browse by look. Every unit is 100% raw human
            hair — shop the style, then tap through to the full range.
          </p>
        </div>
      </section>

      {ENTRIES.map((entry, i) => (
        <section key={entry.label} className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {entry.label}
                </p>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] m-0 -tracking-[0.04em] leading-[1.0]">
                  {entry.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-xl">{entry.blurb}</p>
              </div>
              <Link
                href={entry.shopHref}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Shop {entry.label} →
              </Link>
            </div>

            <Link href={entry.shopHref} className="block">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-3">
                <Image
                  src={entry.hero}
                  alt={`${entry.title} — ${entry.label}`}
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {entry.tiles.map((src, ti) => (
                <div
                  key={`${src}-${ti}`}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted"
                >
                  <Image
                    src={src}
                    alt={`${entry.label} look ${ti + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <Link
              href={entry.shopHref}
              className="sm:hidden mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              Shop {entry.label} →
            </Link>
          </div>
        </section>
      ))}
    </article>
  );
}
