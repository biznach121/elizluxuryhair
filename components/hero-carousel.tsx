"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Hero background carousel. Slide 0 is the lifestyle image (shown first), slide
 * 1 is the brand video. The image dwells for a few seconds then crossfades to
 * the video, which plays through and advances back on `ended` — so it loops
 * image → video → image. Honours prefers-reduced-motion (no auto-advance; the
 * dots still let visitors switch). Sits behind FeatureHero's gradient + copy.
 */
export function HeroCarousel({
  imageUrl,
  imageAlt,
  videoUrl,
}: {
  imageUrl: string;
  imageAlt: string;
  videoUrl: string;
}) {
  const [active, setActive] = useState(0); // 0 = image, 1 = video
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceRef = useRef(false);

  const next = () => setActive((a) => (a === 0 ? 1 : 0));

  useEffect(() => {
    reduceRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (active === 0) {
      // Image slide — dwell, then advance (unless the visitor opted out).
      if (reduceRef.current) return;
      const t = setTimeout(next, 6000);
      return () => clearTimeout(t);
    }
    // Video slide — restart and play; `onEnded` advances back to the image.
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    el.play().catch(() => {
      // Autoplay blocked → don't freeze on a still video frame.
      if (!reduceRef.current) fallback = setTimeout(next, 6000);
    });
    return () => {
      el.pause();
      if (fallback) clearTimeout(fallback);
    };
  }, [active]);

  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          active === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover" priority />
      </div>

      <div
        aria-hidden={active !== 1}
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          active === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={imageUrl}
          muted
          playsInline
          preload="metadata"
          onEnded={next}
          onError={next}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={i === 0 ? "Show photo" : "Play video"}
            aria-current={active === i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === i ? "w-7 bg-background" : "w-2.5 bg-background/50 hover:bg-background/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
