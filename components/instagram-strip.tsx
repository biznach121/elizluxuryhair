import type { Product } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { InstagramCard } from "./instagram-card";

// Real Instagram-style reels (Cloudinary) of people wearing the hair. Cards
// cycle through these in order; add more URLs to extend the rotation.
const VIDEOS = [
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781649749/li37zzxyfcnjl31dlfvj.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781649759/w3jgybnf8abzr8azhnsu.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781649761/onz7ejjfdebqtrfjq9cn.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781649764/mgtro4urndgzt9wgsxnc.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781649764/j4kg9qfiarnkqjqhfout.mp4",
];

/**
 * "Follow @… on Instagram" — a shoppable UGC reel feed (dhair-boutique): a
 * horizontal row of tall portrait VIDEOS of people wearing the hair, each
 * tagged with the product photo (thumbnail) + name + red price. See
 * InstagramCard for the per-tile video/hover behaviour.
 */
export function InstagramStrip({ products }: { products: Product[] }) {
  const ig = brand.home.instagram;
  const items = products.slice(0, 8);
  if (items.length === 0) return null;

  return (
    <section className="min-h-[100svh] flex flex-col justify-center py-14 sm:py-20">
      <div className="text-center mb-8 sm:mb-10 px-6">
        <a
          href={ig.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-bold text-[clamp(1.25rem,2.6vw,1.875rem)] tracking-tight hover:opacity-70 transition-opacity"
        >
          Follow {ig.handle} on Instagram
        </a>
      </div>

      <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[52%] lg:auto-cols-[34%] xl:auto-cols-[calc((100%-6rem)/2.8)] gap-3 sm:gap-4 overflow-x-auto snap-x scroll-smooth px-5 sm:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p, i) => (
          <div key={p.id} className="snap-start">
            <InstagramCard product={p} video={VIDEOS[i % VIDEOS.length]} />
          </div>
        ))}
      </div>
    </section>
  );
}
