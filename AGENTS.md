# AGENTS.md — Best Hairline (wig boutique storefront)

If you are an AI agent (Claude, Cursor, Aider, devin, …) working on this storefront, **start here.**

Best Hairline is a Kumasi, Ghana wig boutique. This project began as the
Cimplify fashion template and was redesigned into a black-and-white wig
storefront (visually modelled on dhair-boutique.com).

## TL;DR for rebranding

1. **Edit `lib/brand.ts`** — every visible string lives here.
2. **Edit `app/globals.css`** — `@theme { … }` for palette + radius + font references.
3. **Edit `.env.local`** — `NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY` (see "Two modes" below).

## Two modes — DEMO vs REAL (read this before touching data)

The storefront runs in one of two modes, decided by the public-key prefix
(`lib/demo/mode.ts`):

- **DEMO (default, key = `mock-dev` / blank)** — a fully self-contained wig
  shop. Catalogue, categories, images, cart and checkout are served by an
  **in-process Cimplify mock seeded with wig data** (`lib/demo/wig-seed.ts`).
  No backend, no Cimplify account — `next build` + Vercel just work, and the
  storefront only ever shows wig products. This is what the client reviews.

- **REAL (key = `cpk_live_…` / `cpk_test_…`)** — the demo layer is bypassed
  entirely and the storefront talks to hosted Cimplify exactly like the stock
  template. Pulls the client's live catalogue. Nothing about the real Cimplify
  integration is modified — to switch, just set the key.

Override with `NEXT_PUBLIC_DEMO=1|0` if ever needed.

### Demo-mode files (don't delete as "unused")

| File | Role |
|---|---|
| `lib/demo/mode.ts` | `isDemoMode()` — the single mode switch (pure, server+client safe). |
| `lib/demo/wig-seed.ts` | The wig catalogue: business, categories, collections, products, images. **Edit this to change demo products.** Exports `wigSeedSource`, `WIG_BUSINESS_ID`. |
| `lib/demo/mock.ts` | Server-only singleton `getDemoMock()` = `createMockApp({ seed: wigSeedSource })` (the real SDK mock — cart/checkout/pricing all work). |
| `lib/cimplify-store.ts` | `getStoreServerClient()` — demo → in-process mock client; real → stock `getServerClient()`. **Pages import this instead of `getServerClient`.** |
| `app/api/mock/[...path]/route.ts` | Browser-side demo API. The client's baseUrl points here in demo mode; proxies to the in-process mock. Unused in real mode. |
| `types/cimplify-sdk-mock.d.ts` | Ambient types for `@cimplify/sdk/mock` (ships no .d.ts). |

**Rules:**
- Server Components/`generateStaticParams` use `getStoreServerClient()` from
  `@/lib/cimplify-store`, **not** `getServerClient`. `tags` and the
  `revalidate*` helpers still come from `@cimplify/sdk/server`.
- The browser client baseUrl is set in `components/providers.tsx` (demo →
  `/api/mock`, real → origin).
- To change demo products/categories/images, edit only `lib/demo/wig-seed.ts`.
- Product/category/lookbook images are stock placeholders (loremflickr,
  keyword-matched + locked). Swap them — or go REAL — for production photos.

## Aesthetic

Close visual clone of dhair-boutique.com — **pure black & white, no accent colour**:

- **Fonts**: Inter (body) · **Montserrat** heavy/black (`--font-display`,
  bold uppercase headings) · **Parisienne** script (`--font-script`, the logo
  wordmark). All wired in `app/layout.tsx`.
- **Monochrome** — white bg, near-black text; `--color-primary` is near-black so
  buttons/links stay B&W. `destructive` keeps a restrained red for errors only.
- **Sharp corners**: `--radius: 0`. Tiles, cards and buttons are square.
- **Header** (`components/header.tsx`, client — uses `usePathname`): cursive
  **script wordmark left**, centred uppercase nav (active underlined,
  `nav-link.tsx`), right utilities (currency label · Account · search · basket
  cart icon, `cart-pill.tsx`). On the **homepage it OVERLAYS the hero**:
  `absolute`, transparent, **dark text by default → solid black + white text on
  hover**. On every other route it's a solid black `sticky` bar. All children
  inherit `currentColor`, so one colour switch on `<header>` drives the bar;
  collapses to a hamburger below `xl`.
- **Full-screen hero** (`feature-hero.tsx`, `h-[100svh]`): lifestyle image
  filling the viewport (header overlays it), **light sentence-case** headline +
  **outlined square** CTA. Reads `brand.hero` (`image`, `title`, `subtitle`,
  CTAs). Use a LIGHT-at-top hero image so the dark overlay nav stays legible.
- **Collection tiles** (`collection-tiles.tsx`): portrait 3/4, centred light
  label, **"VIEW" box on hover**, sharp corners, centred heavy heading.
- **Product cards** — `components/store-product-card.tsx` is a custom client
  card (NOT the SDK `RetailProductCard`): **portrait 3/4** shot on a light-grey
  panel, left-aligned name + **"From <price>"** (SDK `<Price prefix="From ">`).
  **Multi-stage hover**: holding the pointer cycles the product's `images`
  (product → texture → lifestyle, ~850ms each via `requestAnimationFrame`) with
  a **progress bar** filling along the bottom + a **"QUICK VIEW"** box; leaving
  resets to frame 0. Demo products carry **3 images** (`lib/demo/wig-seed.ts`).
  On the homepage Best Sellers is a **horizontal carousel** with ‹ › arrows
  and a **custom scroll-progress bar** (light track + dark thumb; native
  scrollbar hidden, click-to-seek) — `components/product-carousel.tsx`.
  Shop/category/collection use grids.
- Section headings are centred, heavy (`font-display font-black uppercase`).
- Schema.org `@type` is `Store`.

## Page surface

```
app/
  page.tsx                       Home, dhair flow: full-screen hero → "Shop our
                                  collections" (full-viewport, hover-zoom portrait
                                  tiles) → "Human Braiding Hair" feature (bullets +
                                  rounded image) → Best Sellers carousel → shoppable
                                  Instagram REEL feed → "Get the look" feature →
                                  about → newsletter → testimonials. (trust-bar /
                                  promo-banner / brand-marquee / trade-in-cta
                                  components still exist but are off the home page.)
  shop/page.tsx                  SDK <CataloguePage/> with custom hero (brand.shop)
  search/page.tsx                Search (client island)
  collections/[slug]/page.tsx    Collection landing (best-sellers / new-arrivals / signature)
  categories/[slug]/page.tsx     Category landing (lace fronts, curly, straight, …)
  products/[slug]/page.tsx       Full product detail page (Product JSON-LD)

  size-guide/page.tsx            ⭐ Wig cap sizes + length guide + how to measure
  lookbook/page.tsx              ⭐ "Find Your Style" — shop-by-look gallery

  cart/page.tsx, checkout/page.tsx, orders/[id]/page.tsx
  account/page.tsx, account/orders/page.tsx, login/page.tsx, signup/page.tsx
  contact/page.tsx, track-order/page.tsx
  about/page.tsx, faq/page.tsx
  shipping/page.tsx, returns/page.tsx, accessibility/page.tsx, terms/page.tsx, privacy/page.tsx
  sitemap-page/page.tsx, sitemap.ts, robots.ts, llms.txt/route.ts, opensearch.xml/route.ts
  api/mock/[...path]/route.ts    DEMO storefront API (see "Two modes")
  error.tsx, not-found.tsx
```

## File ↔ brand-field map

| File | Reads from `brand` |
|---|---|
| `app/layout.tsx` | identity, contact, socials, Store JSON-LD |
| `app/page.tsx` | `brand.hero` (incl. `image`), `brand.home` (collections / bestSellers / getTheLook / instagram / testimonials), `brand.newsletter` |
| `components/collection-tiles.tsx`, `braiding-feature.tsx`, `get-the-look.tsx`, `about-home.tsx`, `instagram-strip.tsx`, `testimonials.tsx`, `product-carousel.tsx` | `brand.home.*`, `brand.about` (new homepage sections) |

`instagram-strip.tsx` (+ `instagram-card.tsx`, client) is a **shoppable UGC reel feed** placed right after Best Sellers: a horizontal row of tall portrait **`<video>`** tiles of people wearing the hair (**autoplay, muted, looped** like IG reels, hair-image `poster`, placeholder mixkit clips in `VIDEOS` — swap for the client's real reels), each tagged with the product **photo thumbnail** + name + **red price** (`text-destructive`); tiles link to the product. `<Price>` is always called with `currency={brand.currency} convert={false}` (single-currency demo — avoids the SDK's post-hydration FX path).
| `app/shop/page.tsx` | `brand.shop` (hero copy) |
| `app/about/page.tsx` | `brand.about` |
| `app/faq/page.tsx` | `brand.faq` |
| `app/shipping/page.tsx` … `privacy/page.tsx` | `brand.shipping` / `returns` / `accessibility` / `terms` / `privacy` |
| `app/contact/page.tsx` | `brand.contactPage`, `brand.contact` |
| `app/track-order/page.tsx` | `brand.trackOrder` |
| `app/account/*/page.tsx` | `brand.account` |
| `app/products/[slug]/page.tsx` | `brand.name`, `brand.currency` (Product JSON-LD) |
| `app/size-guide/page.tsx` | charts inlined (wig cap/length); copy reads `brand.faq.contactEmail` |
| `app/lookbook/page.tsx` | style entries inlined; links to `/categories/*` |
| `app/llms.txt/route.ts` | `brand.llms`, contact, currency |
| `components/header.tsx`, `footer.tsx` | `brand.header`, `brand.footer`, `brand.contact`, `brand.socials` |
| `components/promo-banner.tsx`, `trade-in-cta.tsx`, `brand-marquee.tsx`, `trust-bar.tsx`, `newsletter.tsx` | corresponding sections in `brand` |

## Wig-specific notes

- **`brand.tradeIn`** is repurposed as the **Best Hairline Club** (loyalty /
  rewards) — a three-step join → earn → redeem flow.
- **`brand.brandStrip`** is repurposed as a quality-claims marquee
  ("100% RAW HUMAN HAIR", "HD TRANSPARENT LACE", …) rather than press logos.
- **Header nav** links to demo category slugs (lace-front-wigs, curly, straight,
  body-wave, bundles) + `/lookbook`. If you change `wig-seed.ts` category slugs,
  update `brand.header.nav` and `brand.footer.sitemap` to match.
- **Currency is GHS** (`brand.currency`), prices live on each demo product.

## Known TODOs

- Contact form (`app/contact/contact-form.tsx`) and newsletter (`components/newsletter.tsx`)
  are **fake submits** — wire them to a real handler before launch.
- Stock placeholder imagery (hero, products, lookbook) should be replaced with
  the client's own photography, or superseded by a REAL Cimplify catalogue.
- `size-guide` / `lookbook` content is inlined; hoist to `brand` if the client
  needs to edit it without touching components.

## Mock / test data

- Demo runtime + the vitest cart/contract suites both use the custom wig seed
  in `lib/demo/wig-seed.ts` (`createTestClient({ seed: wigSeedSource })`).
- `brand.mock.seed` only satisfies the brand contract (it must name a builtin
  `SeedName`); it is **not** the demo catalogue.
- Run `bun run test:run` (vitest) — never `bun test`.

## Quick start

```bash
bun install
bun dev        # next dev — demo mode, embedded wig catalogue
```

Open <http://localhost:3000>.
