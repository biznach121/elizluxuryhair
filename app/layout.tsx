import type { Metadata } from "next";
import { Inter, Montserrat, Parisienne } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { tags } from "@cimplify/sdk/server";
import { getStoreServerClient } from "@/lib/cimplify-store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductModal } from "@/components/product-modal";
import { CartDrawer } from "@/components/cart-drawer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { HairBadge } from "@/components/hair-badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Suspense } from "react";
import { brand } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Heavy geometric grotesque for headings (dhair-boutique's bold uppercase look).
const display = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

// Calligraphic script for the wordmark logo (dhair's cursive logo).
const script = Parisienne({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: brand.name,
      template: `%s — ${brand.name}`,
    },
    description: brand.description,
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: brand.locale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const server = getStoreServerClient();
  const [bizResult, locResult] = await Promise.all([
    server.business.getInfo({ cacheOptions: { revalidate: 3600, tags: [tags.business()] } }),
    server.business.getLocations({ cacheOptions: { revalidate: 3600, tags: [tags.locations()] } }),
  ]);
  const initialBusiness = bizResult.ok ? bizResult.value : null;
  const initialLocations = locResult.ok ? locResult.value : [];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${display.variable} ${script.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground font-sans"
      >
        <Suspense fallback={null}>
          <OrganizationJsonLd />
        </Suspense>
        <Providers initialBusiness={initialBusiness} initialLocations={initialLocations}>
          <Header />
          <main className="flex-1 pb-12 w-full">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ProductModal />
          </Suspense>
          <CartDrawer />
        </Providers>
        <Suspense fallback={null}>
          <ScrollReveal />
        </Suspense>
        <HairBadge />
      </body>
    </html>
  );
}
