import { brand } from "@/lib/brand";

/**
 * Customer testimonials strip (dhair-boutique runs reviews + press here).
 * Reads brand.home.testimonials.
 */
export function Testimonials() {
  const t = brand.home.testimonials;
  if (t.items.length === 0) return null;
  return (
    <section className="bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
            {t.eyebrow}
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold m-0 -tracking-[0.025em]">
            {t.title}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.items.map((it) => (
            <figure
              key={it.name}
              className="bg-card border border-border p-6 flex flex-col"
            >
              <div className="flex gap-0.5 text-primary mb-3" aria-label={`${it.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < it.rating} />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-foreground/90 m-0 flex-1">
                “{it.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {it.name}
                <span className="text-muted-foreground font-normal"> · {it.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinejoin="round"
        d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8z"
      />
    </svg>
  );
}
