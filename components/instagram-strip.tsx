import type { Product } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { InstagramCard } from "./instagram-card";

// Eliz Luxury Hair TikTok/reel clips (Cloudinary) of people wearing the hair.
// Cards cycle through these in order; add more URLs to extend the rotation.
const VIDEOS = [
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781710941/zclhwfrz5mq7r42v4cw5.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781710941/dtfjw2rtzrnqadlnoyw3.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781710782/tbkcamrdkwydhmeuznbr.mp4",
  "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781710514/f0z9mbxx6kjb7fz1m4oi.mp4",
];

/**
 * "Follow @… on Instagram" — a shoppable UGC reel feed (dhair-boutique): a
 * horizontal row of tall portrait VIDEOS of people wearing the hair, each
 * tagged with the product photo (thumbnail) + name + red price. See
 * InstagramCard for the per-tile video/hover behaviour.
 */
export function InstagramStrip({ products }: { products: Product[] }) {
  const ig = brand.home.instagram;
  if (products.length === 0) return null;
  // One tile per provided reel (each paired with a product so it stays
  // shoppable) — every video shows exactly once, no repeats.
  const items = VIDEOS.map((video, i) => ({ video, product: products[i % products.length] }));

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

      <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[52%] lg:auto-cols-[calc((100%-2rem)/3)] gap-3 sm:gap-4 overflow-x-auto snap-x scroll-smooth px-5 sm:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(({ video, product }, i) => (
          <div key={`${product.id}-${i}`} className="snap-start">
            <InstagramCard product={product} video={video} />
          </div>
        ))}
      </div>
    </section>
  );
}
