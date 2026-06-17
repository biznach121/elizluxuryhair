"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

/**
 * Decorative brand flourish — a small "Eliz Luxury Hair" script wordmark next to a
 * gently-swaying curly-hair motif, fixed to the bottom-left corner on every
 * page (mounted in app/layout.tsx). Links home.
 *
 * `mix-blend-difference` keeps the monochrome mark legible over anything behind
 * it — black on the light sections, white on the dark footer — without needing
 * a background panel. It fades out while the footer is on screen (the footer
 * now carries its own "Eliz Luxury Hair" wordmark, so the floating one would just
 * collide) and fades back in once the footer scrolls away. Animation is pure
 * CSS and honours prefers-reduced-motion (keyframes in app/globals.css).
 */
export function HairBadge() {
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) =>
      setAtFooter(entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      aria-hidden={atFooter}
      tabIndex={atFooter ? -1 : undefined}
      className={[
        "hair-badge group fixed bottom-6 left-4 z-30 flex items-center gap-2 text-white mix-blend-difference select-none",
        atFooter && "pointer-events-none opacity-0",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden className="hair-sway block">
        <span className="hair-perk block">
          <CurlyHair />
        </span>
      </span>
      <span
        className="text-[17px] leading-none font-semibold lowercase tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-[20px]"
        style={{ fontFamily: "var(--font-wordmark)" }}
      >
        {brand.name}
      </span>
    </Link>
  );
}

/** A small clump of coiled strands hanging from a crown — reads as curly hair. */
function CurlyHair() {
  return (
    <svg
      width="32"
      height="40"
      viewBox="0 0 42 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 7 Q21 1 34 7" />
      <path d="M10 7 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c5 2 -5 5 0 8" />
      <path d="M18 7 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c5 2 -5 5 0 10" />
      <path d="M25 7 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c5 2 -5 5 0 8" />
      <path d="M33 7 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c6 3 -6 6 0 9 c5 2 -5 5 0 9" />
    </svg>
  );
}
