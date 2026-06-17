"use client";

import { useEffect, useMemo, useState } from "react";
import { Price } from "@cimplify/sdk/react";
import type { Category, Product, CurrencyCode } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";
import { brand } from "@/lib/brand";

const CURRENCY = brand.currency as CurrencyCode;

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "name", label: "Name: A–Z" },
];

/**
 * Shop listing — a styled, live search box plus a "Filter" button that opens an
 * off-canvas sidebar with every filtering option (sort · category · max price).
 * All products + categories are server-fetched (ISR) and filtered client-side,
 * so it works the same in demo and real mode.
 */
export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxIdx, setMaxIdx] = useState<number | null>(null); // index into `prices`, null = no cap
  const [open, setOpen] = useState(false);

  // Distinct prices (real Money values) ascending — the max-price slider snaps
  // to these, so we never have to synthesise a Money value.
  const prices = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.default_price))).sort(
        (a, b) => Number(a) - Number(b),
      ),
    [products],
  );
  const hasPriceFilter = prices.length > 1;
  const topIdx = prices.length - 1;
  const capActive = maxIdx != null && maxIdx < topIdx;

  const activeCount =
    selectedCats.size + (capActive ? 1 : 0) + (sort !== "featured" ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cap = capActive ? Number(prices[maxIdx as number]) : null;
    const list = products.filter((p) => {
      if (q && !`${p.name} ${p.description ?? ""}`.toLowerCase().includes(q)) return false;
      if (selectedCats.size && !(p.category_id && selectedCats.has(p.category_id))) return false;
      if (cap != null && Number(p.default_price) > cap) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => Number(a.default_price) - Number(b.default_price));
    else if (sort === "price-desc") sorted.sort((a, b) => Number(b.default_price) - Number(a.default_price));
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, query, selectedCats, sort, capActive, maxIdx, prices]);

  function toggleCat(id: string) {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function clearAll() {
    setSelectedCats(new Set());
    setSort("featured");
    setMaxIdx(null);
    setQuery("");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 sm:py-10">
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchField value={query} onChange={setQuery} />
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-[13px] tabular-nums text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background"
          >
            <FunnelIcon />
            Filter{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <StoreProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">No products match your filters.</p>
          <button onClick={clearAll} className="mt-4 text-sm uppercase tracking-[0.16em] underline">
            Clear all filters
          </button>
        </div>
      )}

      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        products={products}
        selectedCats={selectedCats}
        toggleCat={toggleCat}
        sort={sort}
        setSort={setSort}
        prices={prices}
        maxIdx={maxIdx}
        setMaxIdx={setMaxIdx}
        hasPriceFilter={hasPriceFilter}
        topIdx={topIdx}
        onClear={clearAll}
        resultCount={filtered.length}
      />
    </div>
  );
}

function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full sm:max-w-md">
      <SearchIcon />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search wigs, textures, lengths…"
        aria-label="Search products"
        className="w-full border border-border bg-background py-3 pl-11 pr-9 text-sm transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      )}
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  categories,
  products,
  selectedCats,
  toggleCat,
  sort,
  setSort,
  prices,
  maxIdx,
  setMaxIdx,
  hasPriceFilter,
  topIdx,
  onClear,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  products: Product[];
  selectedCats: Set<string>;
  toggleCat: (id: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  prices: Product["default_price"][];
  maxIdx: number | null;
  setMaxIdx: (n: number | null) => void;
  hasPriceFilter: boolean;
  topIdx: number;
  onClear: () => void;
  resultCount: number;
}) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const sliderIdx = maxIdx ?? topIdx;

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="m-0 font-display text-lg font-bold uppercase tracking-wide">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-9 w-9 place-items-center border border-border text-sm transition-colors hover:bg-muted"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 space-y-9 overflow-y-auto px-6 py-7">
          <FilterGroup title="Sort by">
            {SORTS.map((s) => (
              <OptionRow
                key={s.key}
                kind="radio"
                checked={sort === s.key}
                onChange={() => setSort(s.key)}
                label={s.label}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Category">
            {categories.map((c) => (
              <OptionRow
                key={c.id}
                kind="checkbox"
                checked={selectedCats.has(c.id)}
                onChange={() => toggleCat(c.id)}
                label={c.name}
                count={products.filter((p) => p.category_id === c.id).length}
              />
            ))}
          </FilterGroup>

          {hasPriceFilter && (
            <FilterGroup title="Max price">
              <input
                type="range"
                min={0}
                max={topIdx}
                step={1}
                value={sliderIdx}
                onChange={(e) => {
                  const i = Number(e.target.value);
                  setMaxIdx(i >= topIdx ? null : i);
                }}
                aria-label="Maximum price"
                className="w-full accent-foreground"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Up to{" "}
                <span className="font-medium text-foreground">
                  <Price amount={prices[sliderIdx]} currency={CURRENCY} convert={false} />
                </span>
              </p>
            </FilterGroup>
          )}
        </div>

        <footer className="flex items-center gap-3 border-t border-border px-6 py-5">
          <button
            type="button"
            onClick={onClear}
            className="flex-1 border border-border py-3 text-[12px] uppercase tracking-[0.16em] transition-colors hover:border-foreground"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-foreground py-3 text-[12px] uppercase tracking-[0.16em] text-background transition-colors hover:bg-foreground/90"
          >
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </button>
        </footer>
      </aside>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}

function OptionRow({
  kind,
  checked,
  onChange,
  label,
  count,
}: {
  kind: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-3">
        <input
          type={kind}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-foreground"
        />
        <span>{label}</span>
      </span>
      {typeof count === "number" && (
        <span className="text-[12px] tabular-nums text-muted-foreground">{count}</span>
      )}
    </label>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FunnelIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}
