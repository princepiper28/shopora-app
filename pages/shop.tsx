"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  Search,
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const ALL_SECTION_LIMIT = 1500;

const DUMMYJSON_PRODUCTS_URL =
  process.env.NEXT_PUBLIC_DUMMYJSON_PRODUCTS_URL ||
  "https://dummyjson.com/products?limit=1500";

/* =============================================================
   PRODUCT DATA

   SHOPORA uses DummyJSON only for this shop catalogue.

   We preserve additional marketplace information from DummyJSON
   so SHOPORA can power:
   - Hot Deals
   - Trending Now
   - Ratings
   - Brand information
   - Stock indicators
============================================================= */

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
};

type DummyJsonResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

/* =============================================================
   SHOP PRODUCT

   Extends the existing Product type with marketplace data
   needed by the featured sections.
============================================================= */

type ShopProduct = Product & {
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
};

/* =============================================================
   MAP DUMMYJSON PRODUCT
============================================================= */

function mapDummyJsonProduct(item: DummyJsonProduct): ShopProduct {
  return {
    id: Number(item.id),
    title: item.title,
    price: Number(item.price),
    description: item.description,
    category: item.category,
    image: item.thumbnail || item.images?.[0] || "",
    discountPercentage: Number(item.discountPercentage || 0),
    rating: Number(item.rating || 0),
    stock: Number(item.stock || 0),
    brand: item.brand || "",
  };
}

/* =============================================================
   CATEGORY MAPPING

   Converts DummyJSON's detailed categories into SHOPORA's
   customer-facing marketplace categories.
============================================================= */

function mapCategory(category: string) {
  const value = category.toLowerCase().trim();

  if (
    value.includes("shirt") ||
    value.includes("tops") ||
    value.includes("dress") ||
    value.includes("shoes") ||
    value.includes("mens") ||
    value.includes("womens") ||
    value.includes("clothing")
  ) {
    return "Fashion";
  }

  if (
    value.includes("jewel") ||
    value.includes("watch") ||
    value.includes("bag") ||
    value.includes("accessor")
  ) {
    return "Accessories";
  }

  if (
    value.includes("laptop") ||
    value.includes("phone") ||
    value.includes("mobile") ||
    value.includes("tablet") ||
    value.includes("computer") ||
    value.includes("smartphone")
  ) {
    return "Electronics";
  }

  if (
    value.includes("beauty") ||
    value.includes("skin") ||
    value.includes("fragrance") ||
    value.includes("makeup")
  ) {
    return "Beauty";
  }

  if (
    value.includes("furniture") ||
    value.includes("home") ||
    value.includes("kitchen") ||
    value.includes("grocer")
  ) {
    return "Home";
  }

  if (
    value.includes("vehicle") ||
    value.includes("motorcycle") ||
    value.includes("car")
  ) {
    return "Automotive";
  }

  return "More";
}

/* =============================================================
   FETCH SHOP PRODUCTS

   DummyJSON only.
============================================================= */

async function fetchShopProducts(
  signal?: AbortSignal
): Promise<ShopProduct[]> {
  const response = await fetch(DUMMYJSON_PRODUCTS_URL, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}).`);
  }

  const data = (await response.json()) as DummyJsonResponse;

  if (!Array.isArray(data.products)) {
    throw new Error("Invalid product response.");
  }

  return data.products.map(mapDummyJsonProduct);
}

/* =============================================================
   SHOP PAGE
============================================================= */

export default function ShopPage() {
  const router = useRouter();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";
  const authLoading = status === "loading";

  const searchQuery =
    typeof router.query.search === "string" ? router.query.search : "";

  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [showAllCategories, setShowAllCategories] = useState(false);

  /* =============================================================
     AUTH GUARD
  ============================================================= */

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(router.asPath)}`
      );
    }
  }, [authLoading, isAuthenticated, router]);

  /* =============================================================
     LOAD SHOP CATALOGUE — DUMMYJSON ONLY
  ============================================================= */

  useEffect(() => {
    const controller = new AbortController();

    fetchShopProducts(controller.signal)
      .then(setProducts)
      .catch((error) => {
        if (error?.name !== "AbortError") {
          console.error("SHOPORA product loading error:", error);
          setProducts([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  /* =============================================================
     CATEGORY OPTIONS
  ============================================================= */

  const categoryOptions = useMemo(() => {
    const categories = products.map((product) =>
      mapCategory(product.category)
    );

    return ["All", ...Array.from(new Set(categories))];
  }, [products]);

  /* =============================================================
     FILTERED COLLECTION
  ============================================================= */

  const filtered = useMemo(() => {
    let list = products;

    /* CATEGORY */
    if (activeCategory !== "All") {
      list = list.filter(
        (product) => mapCategory(product.category) === activeCategory
      );
    }

    /* SEARCH */
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();

      list = list.filter((product) => {
        return (
          product.title.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.brand?.toLowerCase().includes(q)
        );
      });
    }

    /* MAIN COLLECTION LIMIT */
    if (activeCategory === "All" && !searchQuery.trim()) {
      list = list.slice(0, ALL_SECTION_LIMIT);
    }

    return list;
  }, [products, activeCategory, searchQuery]);

  /* =============================================================
     HOT DEALS

     Prioritises products with the strongest actual discounts.
  ============================================================= */

  const hotDeals = useMemo(() => {
    return [...products]
      .filter((product) => product.discountPercentage >= 10)
      .sort(
        (a, b) =>
          b.discountPercentage - a.discountPercentage
      )
      .slice(0, 6);
  }, [products]);

  /* =============================================================
     TRENDING NOW

     Creates a simple merchandising score using:
     - Rating
     - Discount
     - Stock availability

     This is not pretending to be real purchase analytics.
     It simply creates a useful marketplace ranking from the
     information currently available from DummyJSON.
  ============================================================= */

  const trendingProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.rating >= 4.5)
      .sort((a, b) => {
        const scoreA =
          a.rating * 10 +
          a.discountPercentage * 0.35 +
          Math.min(a.stock, 100) * 0.03;

        const scoreB =
          b.rating * 10 +
          b.discountPercentage * 0.35 +
          Math.min(b.stock, 100) * 0.03;

        return scoreB - scoreA;
      })
      .slice(0, 8);
  }, [products]);

  /* =============================================================
     FEATURED SECTIONS VISIBILITY

     Featured merchandising only appears on the main shop view.

     It disappears when the customer:
     - Searches
     - Selects a category

     This keeps search/category browsing focused.
  ============================================================= */

  const showFeaturedSections =
    !loading &&
    activeCategory === "All" &&
    !searchQuery.trim();

  /* =============================================================
     RESULT LABEL
  ============================================================= */

  const resultLabel = searchQuery
    ? `Results for "${searchQuery}"`
    : activeCategory === "All"
      ? "All products"
      : activeCategory;

  /* =============================================================
     AUTH GATE
  ============================================================= */

  if (authLoading || !isAuthenticated) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#060914] px-4 pb-20 pt-28 text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-[#4F6EF7]/10 blur-[120px]" />

          <div className="absolute -right-40 top-[35%] h-[600px] w-[600px] rounded-full bg-violet-500/[0.07] blur-[130px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-52 animate-pulse rounded-xl bg-white/[0.06]" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-white/[0.035] p-2"
              >
                <div className="aspect-square animate-pulse rounded-[1.25rem] bg-white/[0.055]" />

                <div className="space-y-2 p-3">
                  <div className="h-2 w-1/3 animate-pulse rounded bg-white/[0.06]" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/[0.06]" />

                  <div className="h-5 w-1/3 animate-pulse rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060914] text-white selection:bg-[#4F6EF7]/30">
      {/* =========================================================
          PREMIUM SHOP BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_4%,rgba(79,110,247,0.19),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(99,102,241,0.12),transparent_25%),radial-gradient(circle_at_50%_95%,rgba(34,211,238,0.07),transparent_30%)]" />

        <div className="absolute -left-56 top-[12%] h-[620px] w-[620px] rounded-full bg-[#4F6EF7]/10 blur-[130px]" />

        <div className="absolute -right-64 top-[34%] h-[720px] w-[720px] rounded-full bg-violet-500/[0.08] blur-[140px]" />

        <div className="absolute left-[28%] bottom-[-420px] h-[760px] w-[760px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,110,247,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(79,110,247,0.055) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,9,20,0.16)_58%,rgba(6,9,20,0.78)_100%)]" />
      </div>

      {/* =========================================================
          SHOP HEADER
      ========================================================= */}

      <section className="relative border-b border-white/[0.07] px-4 pb-5 pt-24 sm:pb-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.035] px-5 py-5 shadow-[0_24px_80px_-48px_rgba(79,110,247,0.45)] backdrop-blur-2xl sm:px-7 sm:py-6 lg:px-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#4F6EF7]/15 blur-[90px]"
            />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8EA3FF]">
                  <Sparkles className="h-3.5 w-3.5" />

                  Curated marketplace
                </div>

                <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.75rem]">
                  Shop what fits your world.
                </h1>

                <p className="mt-2 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
                  Explore fashion, technology, beauty, home and everyday
                  essentials.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Catalogue
                  </p>

                  <p className="mt-0.5 text-base font-black text-white">
                    {products.length}

                    <span className="ml-1 text-[10px] font-medium text-slate-500">
                      items
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FILTER BAR
      ========================================================= */}

      <section className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#060914]/85 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          {/* DESKTOP CATEGORIES */}

          <div className="hidden min-w-0 flex-1 items-center gap-2 overflow-hidden md:flex">
            {categoryOptions.slice(0, 6).map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                    active
                      ? "bg-[#4F6EF7] text-white shadow-lg shadow-[#4F6EF7]/20"
                      : "border border-white/[0.07] bg-white/[0.035] text-slate-400 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}

            {categoryOptions.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllCategories(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.07] px-3.5 py-2.5 text-xs font-black text-[#9BAEFF] transition hover:border-[#4F6EF7]/35 hover:bg-[#4F6EF7]/[0.12]"
              >
                See more

                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* MOBILE FILTER */}

          <div className="flex min-w-0 flex-1 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs font-bold text-slate-200"
            >
              <SlidersHorizontal className="h-4 w-4" />

              Filters
            </button>

            <div className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2.5 text-xs font-bold text-slate-400">
              {activeCategory}
            </div>
          </div>

          {/* RESULTS */}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2.5 text-xs text-slate-400 sm:flex">
              <Filter className="h-3.5 w-3.5" />

              {filtered.length} results
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => router.push("/shop")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.08] px-3 py-2.5 text-xs font-bold text-[#9BAEFF]"
              >
                <Search className="h-3.5 w-3.5" />

                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          ALL CATEGORIES SHEET
      ========================================================= */}

      <AnimatePresence>
        {showAllCategories && (
          <>
            <motion.button
              type="button"
              aria-label="Close all categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllCategories(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/[0.09] bg-[#0A0E1C] p-5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7F94FF]">
                    Explore
                  </p>

                  <h2 className="mt-1 text-xl font-black text-white">
                    All categories
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllCategories(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setShowAllCategories(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                      activeCategory === category
                        ? "border-[#4F6EF7]/40 bg-[#4F6EF7]/15 text-white"
                        : "border-white/[0.07] bg-white/[0.035] text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================
          MOBILE FILTER SHEET
      ========================================================= */}

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t border-white/[0.08] bg-[#0A0E1C] p-5 shadow-2xl"
            >
              <div className="mx-auto max-w-lg">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7F94FF]">
                      Browse
                    </p>

                    <h2 className="mt-1 text-xl font-black text-white">
                      Categories
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setMobileFiltersOpen(false);
                      }}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                        activeCategory === category
                          ? "border-[#4F6EF7]/40 bg-[#4F6EF7]/15 text-white"
                          : "border-white/[0.07] bg-white/[0.035] text-slate-400"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================
          HOT DEALS + TRENDING NOW
      ========================================================= */}

      {showFeaturedSections && (
        <section className="relative px-4 pt-10 sm:pt-14">
          <div className="mx-auto max-w-7xl space-y-10">
            {/* =====================================================
                HOT DEALS
            ===================================================== */}

            {hotDeals.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-4 shadow-[0_30px_100px_-60px_rgba(79,110,247,0.5)] backdrop-blur-xl sm:p-6">
                  {/* AMBIENT GLOW */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-500/[0.09] blur-[100px]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-32 bottom-[-180px] h-80 w-80 rounded-full bg-[#4F6EF7]/[0.07] blur-[110px]"
                  />

                  <div className="relative">
                    {/* HEADING */}

                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
                          <span className="text-sm">🔥</span>

                          Limited-time offers
                        </div>

                        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                          Hot Deals
                        </h2>

                        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                          Bigger savings on products worth grabbing right
                          now.
                        </p>
                      </div>

                      <div className="hidden rounded-xl border border-orange-400/10 bg-orange-400/[0.05] px-3 py-2 text-right sm:block">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-orange-300/70">
                          Deals
                        </p>

                        <p className="mt-0.5 text-sm font-black text-white">
                          Up to{" "}
                          {Math.round(
                            hotDeals[0]?.discountPercentage || 0
                          )}
                          % off
                        </p>
                      </div>
                    </div>

                    {/* PRODUCTS */}

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                      {hotDeals.map((product, index) => (
                        <motion.div
                          key={`deal-${product.id}`}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.045,
                          }}
                          className="relative min-w-0"
                        >
                          {/* DISCOUNT BADGE */}

                          <div className="absolute left-3 top-3 z-10 rounded-lg bg-orange-500 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/20">
                            -
                            {Math.round(
                              product.discountPercentage
                            )}
                            %
                          </div>

                          <div className="group rounded-[1.4rem] border border-white/[0.07] bg-black/10 p-1.5 transition duration-300 hover:-translate-y-1 hover:border-orange-400/20 hover:bg-white/[0.045]">
                            <ProductCard product={product} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =====================================================
                TRENDING NOW
            ===================================================== */}

            {trendingProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="relative">
                  {/* HEADING */}

                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#4F6EF7]/20 bg-[#4F6EF7]/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#9BAEFF]">
                        <Sparkles className="h-3.5 w-3.5" />

                        Popular right now
                      </div>

                      <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                        Trending Now
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        What shoppers are discovering and loving right now.
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 text-xs font-bold text-slate-500 sm:flex">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                      Popular picks
                    </div>
                  </div>

                  {/* HORIZONTAL MARKETPLACE RAIL */}

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#060914] to-transparent" />

                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#060914] to-transparent" />

                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                      {trendingProducts.map((product, index) => (
                        <motion.div
                          key={`trending-${product.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.04,
                          }}
                          className="w-[190px] shrink-0 snap-start sm:w-[220px] md:w-[240px] lg:w-[250px]"
                        >
                          <div className="group relative h-full rounded-[1.6rem] border border-white/[0.07] bg-white/[0.025] p-1.5 transition duration-500 hover:-translate-y-1 hover:border-[#4F6EF7]/25 hover:bg-white/[0.045] hover:shadow-[0_30px_70px_-40px_rgba(79,110,247,0.45)]">
                            {/* TRENDING INDICATOR */}

                            <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white backdrop-blur-md">
                              <span className="text-[#7F94FF]">
                                ↗
                              </span>

                              Trending
                            </div>

                            <ProductCard product={product} />

                            {/* RATING / BRAND */}

                            <div className="flex items-center justify-between px-2 pb-2 pt-1">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300">
                                ★ {product.rating.toFixed(1)}
                              </div>

                              {product.brand && (
                                <span className="max-w-[100px] truncate text-[9px] font-bold uppercase tracking-wide text-slate-600">
                                  {product.brand}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================
          MAIN PRODUCT COLLECTION
      ========================================================= */}

      <section className="relative px-4 pb-24 pt-14 sm:pt-20">
        <div className="mx-auto max-w-7xl">
          {/* COLLECTION HEADER */}

          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7187FF]">
                {resultLabel}
              </p>

              <div className="mt-2 flex items-center gap-3">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                  {searchQuery ? "Your search" : "The collection"}
                </h2>

                {!searchQuery && activeCategory === "All" && (
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Everything
                  </span>
                )}

                <ChevronDown className="hidden h-5 w-5 text-slate-600 sm:block" />
              </div>
            </div>

            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              {filtered.length}{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.035] p-2 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
                >
                  <div className="aspect-square animate-pulse rounded-[1.25rem] bg-white/[0.055]" />

                  <div className="space-y-2 p-3">
                    <div className="h-2 w-1/3 animate-pulse rounded bg-white/[0.06]" />

                    <div className="h-4 w-4/5 animate-pulse rounded bg-white/[0.06]" />

                    <div className="h-5 w-1/3 animate-pulse rounded bg-white/[0.06]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* =====================================================
               EMPTY STATE
            ===================================================== */

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] px-6 py-24 text-center backdrop-blur-xl"
            >
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6EF7]/10 blur-[90px]" />

              <div className="relative mx-auto flex max-w-md flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4F6EF7]/20 bg-[#4F6EF7]/10 text-[#7E92FF] shadow-lg shadow-[#4F6EF7]/10">
                  <ShoppingBag className="h-7 w-7" />
                </div>

                <h2 className="mt-6 text-xl font-black text-white">
                  No products found
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {searchQuery
                    ? `We couldn't find anything matching "${searchQuery}".`
                    : "There are no products in this category yet."}
                </p>

                {(searchQuery || activeCategory !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("All");

                      if (searchQuery) {
                        router.push("/shop");
                      }
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#4F6EF7] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#4F6EF7]/20 transition hover:-translate-y-0.5 hover:bg-[#5B78FF]"
                  >
                    View all products

                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            /* =====================================================
               PRODUCT GRID
            ===================================================== */

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(
                        (index % 8) * 0.035,
                        0.28
                      ),
                    }}
                    className="min-w-0"
                  >
                    <div className="group rounded-[1.65rem] border border-white/[0.07] bg-white/[0.025] p-1.5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] transition duration-500 hover:-translate-y-1 hover:border-white/[0.13] hover:bg-white/[0.04] hover:shadow-[0_30px_70px_-38px_rgba(79,110,247,0.28)]">
                      <ProductCard product={product} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* =====================================================
              END OF COLLECTION
          ===================================================== */}

          {!loading && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-14 flex flex-col items-center justify-center gap-3 border-t border-white/[0.07] pt-10 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                You&apos;ve reached the collection
              </p>

              <p className="max-w-md text-sm leading-6 text-slate-500">
                Keep exploring categories or search for something specific
                to discover more from SHOPORA.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
