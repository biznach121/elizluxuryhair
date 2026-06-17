"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "./nav-link";
import { CartPill, CartPillSkeleton } from "./cart-pill";
import { MobileNav } from "./mobile-nav";
import { brand } from "@/lib/brand";

/**
 * dhair-boutique header. On the homepage it OVERLAYS the full-screen hero:
 * transparent background with dark text by default, turning solid black with
 * white text on hover. On every other route it's a solid black sticky bar.
 * All children inherit `currentColor`, so the single colour switch on the
 * <header> drives the whole bar.
 */
export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return (
    <header
      className={[
        "group z-40 w-full transition-colors duration-300",
        overlay
          ? "absolute inset-x-0 top-0 bg-transparent text-foreground hover:bg-foreground hover:text-background"
          : "sticky top-0 bg-foreground text-background",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 px-5 sm:px-8 py-4">
        {/* Logo — script wordmark, left */}
        <Link href="/" className="shrink-0">
          <span className="text-[28px] sm:text-[32px] leading-none" style={{ fontFamily: "var(--font-script)" }}>
            {brand.shortName}
          </span>
        </Link>

        {/* Nav — centred */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-x-6 gap-y-1 flex-wrap uppercase tracking-wide text-[12px]">
          {brand.header.nav.map((link) => (
            <Suspense key={link.href} fallback={<NavLinkFallback>{link.label}</NavLinkFallback>}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </Suspense>
          ))}
        </nav>

        {/* Right — utilities */}
        <div className="flex flex-1 xl:flex-none items-center justify-end gap-4 sm:gap-5">
          <span className="hidden md:inline text-[12px] opacity-80 whitespace-nowrap">GH (GHS ₵)</span>
          <Link href="/account" className="hidden xl:inline text-[13px] opacity-90 hover:opacity-100 transition-opacity">
            Account
          </Link>
          <Link href="/search" aria-label="Search" className="hidden xl:inline-flex opacity-90 hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="w-5 h-5">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
            </svg>
          </Link>
          <Suspense fallback={<CartPillSkeleton />}>
            <CartPill />
          </Suspense>
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLinkFallback({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] font-medium uppercase tracking-wider opacity-60">{children}</span>
  );
}
