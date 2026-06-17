"use client";

import { useRef, useState } from "react";
import { brand } from "@/lib/brand";

/**
 * Full-bleed promo video shown after "Get the look" (dhair-boutique's
 * full-screen brand reel). Autoplays muted + looped so it works on load
 * everywhere; a single custom button lets visitors unmute — no other native
 * controls. Source lives in `brand.home.video` (placeholder stock clip).
 */
export function BrandVideo() {
  const v = brand.home.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  if (!v?.src) return null;

  function toggleMute() {
    const el = ref.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    // Unmuting is a user gesture, so it's safe to (re)start playback.
    if (!next) el.play().catch(() => {});
    setMuted(next);
  }

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-foreground">
      <video
        ref={ref}
        src={v.src}
        poster={v.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="absolute bottom-6 right-6 z-10 grid h-12 w-12 place-items-center bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
      >
        {muted ? <MutedIcon /> : <SoundIcon />}
      </button>
    </section>
  );
}

function MutedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
