import Link from "next/link";
import Image from "next/image";
import { Price } from "@cimplify/sdk/react";
import type { Product, CurrencyCode } from "@cimplify/sdk";
import { brand } from "@/lib/brand";

const CURRENCY = brand.currency as CurrencyCode;

/**
 * Shoppable Instagram card (dhair-boutique): a tall portrait VIDEO of someone
 * wearing the hair that AUTOPLAYS (muted, looped — like an IG reel), with the
 * product PHOTO as a small thumbnail bottom-left and the name + red price
 * below. The whole tile links to the product. Videos are placeholders — swap
 * `video` for the client's real Instagram reels.
 */
export function InstagramCard({ product, video }: { product: Product; video: string }) {
  const slug = product.slug || product.id;
  const href = `/products/${encodeURIComponent(slug)}`;
  const poster = product.images?.[2] ?? product.images?.[0] ?? product.image_url;
  const thumb = product.image_url ?? product.images?.[0];

  return (
    <div>
      <Link
        href={href}
        aria-label={product.name}
        className="relative block aspect-[3/4] overflow-hidden bg-secondary"
      >
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* product photo thumbnail */}
        {thumb && (
          <span className="absolute bottom-3 left-3 z-10 w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-md border-2 border-background bg-background shadow-md">
            <Image src={thumb} alt="" fill sizes="56px" className="object-cover" />
          </span>
        )}
      </Link>
      <div className="pt-3">
        <h3 className="text-[14px] font-medium leading-snug">{product.name}</h3>
        <p className="mt-0.5 text-[14px] font-medium text-destructive">
          <Price amount={product.default_price} currency={CURRENCY} convert={false} />
        </p>
      </div>
    </div>
  );
}
