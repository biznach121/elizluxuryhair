"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header nav link. Inherits the header's `currentColor` (so it works on both
 * the transparent overlay and the solid black bar); muted via opacity, with an
 * underline on the active item.
 */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "text-[12px] font-medium uppercase tracking-wide transition-opacity pb-1 border-b border-current",
        active ? "opacity-100" : "opacity-70 hover:opacity-100 border-transparent",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
