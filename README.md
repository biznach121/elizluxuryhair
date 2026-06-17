# Eliz Luxury Hair

A Cimplify storefront — Next.js 16 (App Router), React 19, Tailwind v4 — for **Eliz Luxury Hair**, a Kumasi luxury hair house selling premium human-hair wigs, bundles and professional styling mannequins. Motto: *Your Best Hair Affair.*

Soft, feminine "clean luxury" aesthetic: pearl off-white canvas, deep navy-teal + coral + nude palette (flat colours, no gradients), soft rounded corners, and Playfair Display (serif headings) · Poppins (rounded body) · Great Vibes (script wordmark + tagline) typography.

It ships in two modes (see `AGENTS.md`): **DEMO** (default — an embedded wig + mannequin catalogue, no backend) and **REAL** (paste a `cpk_live_…` / `cpk_test_…` key to talk to hosted Cimplify).

## Run

```bash
bun install
bun dev        # next dev — demo mode, embedded catalogue
```

Open `http://localhost:3000`. Edit `lib/brand.ts` for any visible string and `app/globals.css` `@theme` for the palette/fonts.

## Structure

```
app/
  layout.tsx              # root layout, fonts, providers, header/footer/modal
  page.tsx                # home
  shop/page.tsx           # full catalogue (SDK <CataloguePage/>)
  collections/[slug]/     # collection landing
  categories/[slug]/      # category landing
  cart/page.tsx           # SDK <CartPage/>
  checkout/page.tsx       # SDK <CheckoutPage/>
  orders/[id]/page.tsx    # post-checkout thank-you
  about, faq, terms, privacy
  globals.css             # Tailwind import + theme tokens
components/
  providers.tsx           # CimplifyProvider client wrapper
  header.tsx, footer.tsx, hero.tsx
  store-product-card.tsx  # SDK <ProductCard/> wired to URL-driven modal
  product-modal.tsx       # ?product=<slug> deep-linkable modal
  collection-strip.tsx    # horizontal product strip
  category-grid.tsx       # SDK <CategoryGrid/> with router navigation
lib/
  cart.ts                 # useCartCount() for the header pill
```

## Switch the seed

This template is wired to the `retail` seed. To preview a different industry without re-scaffolding:

```bash
cimplify-mock --seed restaurant   # Mama's Kitchen
cimplify-mock --seed services     # Serene Spa
cimplify-mock --seed grocery      # FreshMart
```

For a fresh scaffold with another design altogether:

```bash
cimplify init my-store --template bakery     # warm food/pastry
cimplify init my-store --template restaurant # coming soon
cimplify init my-store --template services   # coming soon
cimplify init my-store --template grocery    # coming soon
```

## Go live

```diff
# .env.local
- NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY=mock-dev
+ NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY=<your tenant key>
```

Deploy with `cimplify deploy --prod` after linking the project. See [`cimplify` CLI docs](https://www.cimplify.dev/docs/cli). `next.config.ts` already whitelists the SDK image hosts under `images.remotePatterns`.
