import { brand } from "@/lib/brand";

/**
 * Slim top announcement bar — a soft-luxury touch unique to Eliz Luxury Hair.
 * Solid deep navy-teal strip (no gradients) carrying a short delivery promise
 * and the brand motto set in the flowing script face. Fixed height `h-9`
 * (2.25rem) in normal document flow: on inner pages the sticky header sits
 * right under it; on the homepage the overlay header is offset by `top-9` to
 * clear it (see components/header.tsx). Single line, never wraps.
 */
export function AnnouncementBar() {
  return (
    <div className="h-9 w-full bg-foreground text-background overflow-hidden">
      <div className="flex h-full items-center justify-center gap-3 px-4 whitespace-nowrap">
        <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] opacity-80">
          {brand.announcement}
        </span>
        <span aria-hidden className="hidden sm:inline opacity-40">·</span>
        <span
          className="text-[18px] leading-none text-brand-nude"
          style={{ fontFamily: "var(--font-script)" }}
        >
          {brand.motto}
        </span>
      </div>
    </div>
  );
}
