"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Price } from "@cimplify/sdk/react";
import type { Product, CurrencyCode } from "@cimplify/sdk";
import { brand } from "@/lib/brand";

const CURRENCY = brand.currency as CurrencyCode;

/** ms each frame is shown while the pointer rests on the card. */
const FRAME_MS = 850;

/**
 * dhair-boutique product card: portrait product shot on a light-grey panel,
 * left-aligned name + "From <price>". On hover it runs a MULTI-STAGE reveal —
 * the longer you hold the pointer, the more of the product's images it cycles
 * through (product → texture → lifestyle), with a progress bar filling along
 * the bottom and a "QUICK VIEW" box. Leaving the card resets to the first frame.
 */
export function StoreProductCard({ product }: { product: Product }) {
  const slug = product.slug || product.id;
  const href = `/products/${encodeURIComponent(slug)}`;
  const soldOut = product.inventory_status?.in_stock === false;

  const images = useMemo(() => {
    const arr = (product.images?.length ? product.images : [product.image_url]).filter(
      Boolean,
    ) as string[];
    return arr.length ? arr : [];
  }, [product]);

  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across all frames
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const total = FRAME_MS * images.length;

  const tick = useCallback(
    (now: number) => {
      const p = Math.min((now - startRef.current) / total, 1);
      setProgress(p);
      setIdx(Math.min(images.length - 1, Math.floor(p * images.length)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    },
    [total, images.length],
  );

  const start = () => {
    if (images.length <= 1) return;
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  };
  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setIdx(0);
    setProgress(0);
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="group" onMouseEnter={start} onMouseLeave={reset}>
      <Link
        href={href}
        aria-label={product.name}
        className="relative block aspect-[3/4] overflow-hidden bg-secondary"
      >
        {images.map((src, i) => (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, 50vw"
            className={`object-cover transition-opacity duration-300 ${
              i === idx ? "opacity-100" : "opacity-0"
            } ${soldOut ? "opacity-60" : ""}`}
          />
        ))}

        {soldOut && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Sold out
          </span>
        )}

        {/* Multi-stage progress bar */}
        {progress > 0 && (
          <div
            className="absolute bottom-0 left-0 z-10 h-[3px] bg-foreground"
            style={{ width: `${progress * 100}%` }}
          />
        )}

        {/* QUICK VIEW */}
        <span className="absolute inset-x-3 bottom-3 z-10 text-center border border-foreground bg-background text-foreground text-[11px] uppercase tracking-[0.22em] py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Quick view
        </span>
      </Link>

      <Link href={href} className="block pt-4">
        <h3 className="text-[15px] font-medium leading-snug text-foreground">{product.name}</h3>
        <p className="mt-1 text-[14px] text-muted-foreground">
          <Price amount={product.default_price} currency={CURRENCY} convert={false} prefix="From " />
        </p>
      </Link>
    </div>
  );
}
