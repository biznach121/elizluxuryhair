"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Price,
  QuantitySelector,
  useCart,
  useVariantSelector,
} from "@cimplify/sdk/react";
import type {
  CurrencyCode,
  Product,
  ProductWithDetails,
  CustomAttributeValue,
} from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";
import { isDemoMode } from "@/lib/demo/mode";
import { brand } from "@/lib/brand";

const CURRENCY = brand.currency as CurrencyCode;
const FALLBACK_IMAGE = "https://loremflickr.com/1000/1200/hairstyle?lock=950";

/**
 * Product detail page, dhair-boutique style: a vertical thumbnail gallery + a
 * large image on the left, and an info panel (title · Description · spec sheet ·
 * price · variant selector · quantity · add to bag) on the right.
 *
 * Mode-aware:
 *   • REAL  — variant options come from the fetched `variant_axes` / `variants`
 *     (resolved with the SDK's `useVariantSelector`); the spec sheet is built
 *     from the product's own `custom_attributes` / `properties`. Price reflects
 *     the selected variant's `price_adjustment`, and add-to-bag passes its id.
 *   • DEMO  — the embedded catalogue carries no variants/attributes, so we show
 *     a representative spec sheet + "Length" selector from `brand.product`.
 * Both paths render the same B&W pill UI, so the two modes look identical.
 */
export function ProductDetail({
  product,
  related,
}: {
  product: ProductWithDetails;
  related: Product[];
}) {
  const { addItem } = useCart();
  const demo = isDemoMode();

  const axes = product.variant_axes ?? [];
  const variants = product.variants ?? [];
  const hasRealVariants = axes.length > 0 && variants.length > 0;
  const variantSel = useVariantSelector({ variants, axes });

  const [demoLength, setDemoLength] = useState(
    brand.product.lengths[Math.floor(brand.product.lengths.length / 2)] ?? brand.product.lengths[0],
  );
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const inStock = product.inventory_status?.in_stock !== false;
  const adjustment = variantSel.selectedVariant?.price_adjustment ?? 0;
  const amount = (product.default_price + adjustment) as typeof product.default_price;

  // A real product with axes can't be added until a full variant resolves.
  const variantReady = !hasRealVariants || Boolean(variantSel.selectedVariant);
  const canAdd = inStock && variantReady && !adding;

  const specs = resolveSpecs(product, demo);

  async function addToBag() {
    if (!canAdd) return;
    setAdding(true);
    try {
      await addItem(
        product,
        qty,
        hasRealVariants && variantSel.selectedVariant
          ? { variantId: variantSel.selectedVariant.id }
          : undefined,
      );
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } finally {
      setAdding(false);
    }
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:gap-16">
        <Gallery images={product.images?.length ? product.images : [product.image_url ?? FALLBACK_IMAGE]} name={product.name} />

        <div className="lg:py-2">
          <h1 className="m-0 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Description tab */}
          <div className="mt-7 border-b border-border">
            <span className="inline-block border-b-2 border-foreground pb-3 text-sm font-medium tracking-wide">
              {brand.product.descriptionLabel}
            </span>
          </div>

          {product.description && (
            <p className="mt-6 max-w-prose whitespace-pre-line text-[15px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {specs.length > 0 && (
            <dl className="mt-6 space-y-1.5 text-[15px]">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold text-foreground">{s.label}:</dt>
                  <dd className="m-0 text-muted-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-8 text-2xl font-medium">
            <Price amount={amount} currency={CURRENCY} convert={false} />
          </p>

          {/* Variant selectors */}
          {hasRealVariants ? (
            <div className="mt-8 space-y-6">
              {axes.map((axis) => (
                <div key={axis.id}>
                  <PillLabel>{axis.name}</PillLabel>
                  <div className="flex flex-wrap gap-2">
                    {axis.values.map((value) => {
                      const selected = variantSel.selectedValues[axis.id] === value.id;
                      const available = variantSel.availableValues[axis.id]?.has(value.id) ?? true;
                      return (
                        <Pill
                          key={value.id}
                          selected={selected}
                          disabled={!available}
                          onClick={() => variantSel.selectValue(axis.id, value.id)}
                        >
                          {value.name}
                        </Pill>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : demo ? (
            <div className="mt-8">
              <PillLabel>{brand.product.lengthLabel}</PillLabel>
              <div className="flex flex-wrap gap-2">
                {brand.product.lengths.map((len) => (
                  <Pill key={len} selected={demoLength === len} onClick={() => setDemoLength(len)}>
                    {len}
                  </Pill>
                ))}
              </div>
            </div>
          ) : null}

          {/* Quantity + add to bag */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <QuantitySelector value={qty} onChange={setQty} min={1} max={99} />
            <button
              type="button"
              onClick={addToBag}
              disabled={!canAdd}
              className="flex-1 bg-foreground px-8 py-4 text-[13px] uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {!inStock
                ? brand.product.soldOutLabel
                : added
                  ? brand.product.addedLabel
                  : brand.product.addToCartLabel}
            </button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-8 max-w-7xl border-t border-border px-6 py-14 sm:px-8 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                You may also like
              </p>
              <h2 className="m-0 text-[clamp(1.5rem,2.5vw,2rem)] font-bold -tracking-[0.025em]">
                More from this category.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <StoreProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** Vertical-thumbnail gallery (thumbs left on desktop, below on mobile). */
function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      {/* Thumbnails — vertical strip on desktop */}
      {images.length > 1 && (
        <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:max-h-[80vh] sm:w-20 sm:flex-col sm:overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden bg-secondary transition sm:w-full ${
                i === active ? "ring-1 ring-foreground" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative order-1 aspect-[4/5] flex-1 overflow-hidden bg-secondary sm:order-2">
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground">
      {children}
    </p>
  );
}

function Pill({
  children,
  selected,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`min-w-[3rem] border px-4 py-2.5 text-sm transition-colors ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground"
      } ${disabled ? "cursor-not-allowed opacity-30 line-through" : ""}`}
    >
      {children}
    </button>
  );
}

/** Build the spec rows: real product attributes when present, else the demo set. */
function resolveSpecs(
  product: ProductWithDetails,
  demo: boolean,
): { label: string; value: string }[] {
  if (product.custom_attributes?.length) {
    return product.custom_attributes
      .map((a) => ({ label: a.name, value: formatAttributeValue(a) }))
      .filter((s) => s.value);
  }
  if (product.properties?.length) {
    return product.properties
      .map((p) => ({
        label: p.name,
        value: p.values.filter((v) => v != null).join(", ") + (p.unit ? ` ${p.unit}` : ""),
      }))
      .filter((s) => s.value);
  }
  return demo ? brand.product.specs : [];
}

function formatAttributeValue(attr: CustomAttributeValue): string {
  const { value, unit } = attr;
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    const m = value as { value?: number | string; unit?: string };
    return [m.value, m.unit ?? unit].filter(Boolean).join(" ");
  }
  return unit ? `${value} ${unit}` : String(value);
}
