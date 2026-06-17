"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * Hamburger button + slide-in drawer for narrow viewports. Header hides
 * its inline nav links, Search, and Account below `xl` and folds them into
 * this drawer; only the cart pill stays in the header chrome.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="grid place-items-center w-10 h-10 -mr-1 rounded-md text-current hover:opacity-70 transition-opacity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 right-0 w-[85%] max-w-sm flex flex-col bg-background border-l border-border shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid place-items-center w-11 h-11 -mr-2 rounded-md text-foreground hover:bg-muted transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-1 px-3 py-4">
              {brand.header.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search + Account — folded in from the header below `xl`. */}
            <div className="mt-auto flex flex-col gap-1 border-t border-border px-3 py-4">
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                Search
              </Link>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                </svg>
                Account
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
