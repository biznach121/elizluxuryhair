"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Gentle "fade + rise on enter" reveals for any element marked `data-reveal`.
 * A single IntersectionObserver per page; re-scans on client navigation.
 *
 * Adds `reveal-ready` to <html> so the hidden state (in globals.css) only
 * applies once JS is running — content is never hidden for no-JS visitors or
 * crawlers. Honours prefers-reduced-motion by revealing everything immediately.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
