"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@cimplify/sdk";
import { StoreProductCard } from "./store-product-card";

/**
 * Horizontal product carousel (dhair-boutique Best Sellers): scroll-snapping
 * row of portrait cards with ‹ › arrows and a CUSTOM scroll indicator (light
 * track + dark thumb that reflects position and visible fraction) in place of
 * the native scrollbar. Native overflow scroll stays touch/trackpad-friendly;
 * the bar is also click-to-seek.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const widthPct = scrollWidth > 0 ? Math.min(100, (clientWidth / scrollWidth) * 100) : 100;
    const max = scrollWidth - clientWidth;
    const leftPct = max > 0 ? (scrollLeft / max) * (100 - widthPct) : 0;
    setThumb({ left: leftPct, width: widthPct });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, products.length]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    el.scrollTo({ left: pct * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <Arrow side="left" onClick={() => scroll(-1)} />
      <div
        ref={ref}
        onScroll={update}
        className="grid grid-flow-col auto-cols-[78%] sm:auto-cols-[44%] lg:auto-cols-[30%] xl:auto-cols-[calc((100%-3rem)/3.4)] gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start">
            <StoreProductCard product={p} />
          </div>
        ))}
      </div>
      <Arrow side="right" onClick={() => scroll(1)} />

      {/* Custom scroll indicator (replaces the native scrollbar) */}
      <div
        onClick={seek}
        role="scrollbar"
        aria-controls="best-sellers-track"
        aria-orientation="horizontal"
        aria-label="Scroll products"
        className="mt-8 cursor-pointer py-2"
      >
        <div className="relative h-[3px] w-full bg-muted">
          <span
            className="absolute top-0 h-full bg-foreground/60 transition-[left,width] duration-100"
            style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous products" : "Next products"}
      className={[
        "hidden sm:grid place-items-center absolute top-[34%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background/85 backdrop-blur border border-border text-foreground hover:bg-background shadow-sm transition-colors",
        side === "left" ? "left-1 sm:-left-2" : "right-1 sm:-right-2",
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {side === "left" ? (
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
