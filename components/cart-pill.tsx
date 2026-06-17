"use client";

import { useCartDrawer } from "@cimplify/sdk/react";
import { useCartCount } from "@/lib/cart";

/**
 * Cart — basket icon + count badge for the black header (dhair-boutique
 * style). Opens the side cart drawer on click.
 */
function BasketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="w-6 h-6">
      <path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export function CartPill() {
  const { count } = useCartCount();
  const { open } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
    >
      <BasketIcon />
      <span className="absolute -top-1 -right-2.5 text-[11px] font-bold tabular-nums">{count}</span>
    </button>
  );
}

export function CartPillSkeleton() {
  return (
    <span aria-hidden className="relative opacity-60">
      <BasketIcon />
      <span className="absolute -top-1 -right-2.5 text-[11px] font-bold">0</span>
    </span>
  );
}
