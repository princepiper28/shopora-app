// pages/home.tsx

import Head from "next/head";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import { fetchAllProducts } from "@/lib/api";

const BATCH_SIZE = 22;

/**
 * SHOPORA category rules
 *
 * DummyJSON uses very specific product categories such as:
 * - womens-dresses
 * - womens-shoes
 * - womens-bags
 * - womens-jewellery
 * - mens-shirts
 * - mens-shoes
 * - mens-watches
 * - laptops
 * - smartphones
 * - tablets
 * - beauty
 * - fragrances
 * - skin-care
 * - furniture
 * - home-decoration
 * - kitchen-accessories
 * - sports-accessories
 *
 * SHOPORA presents these as broader, customer-friendly categories.
 */

const SHOPORA_CATEGORY_RULES: Record<string, string[]> = {
  Electronics: [
    "laptops",
    "smartphones",
    "tablets",
    "mobile-accessories",
  ],

  Fashion: [
    "tops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
  ],

  Men: [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
  ],

  Women: [
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
  ],

  Kids: [
    "tops",
  ],

  Jewelry: [
    "womens-jewellery",
  ],

  Home: [
    "furniture",
    "home-decoration",
    "kitchen-accessories",
  ],

  Sports: [
    "sports-accessories",
  ],

  Beauty: [
    "beauty",
    "skin-care",
    "fragrances",
  ],

  Appliances: [
    "kitchen-accessories",
  ],

  Automotive: [
    "vehicle",
    "motorcycle",
  ],

  Industrial: [
    "vehicle",
    "motorcycle",
  ],
};

/**
 * Some SHOPORA categories don't have a direct DummyJSON category.
 *
 * For these, we also inspect the product title and description.
 * This gives the UI a useful result instead of returning an
 * empty category immediately.
 */
const SHOPORA_KEYWORDS: Record<string, string[]> = {
  Gaming: [
    "gaming",
    "game",
    "console",
    "playstation",
    "xbox",
    "nintendo",
    "controller",
    "joystick",
    "gamer",
    "video game",
  ],

  Office: [
    "office",
    "printer",
    "scanner",
    "desk",
    "keyboard",
    "mouse",
    "monitor",
    "laptop",
    "tablet",
    "notebook",
    "stationery",
  ],

  Musical: [
    "guitar",
    "piano",
    "keyboard",
    "drum",
    "violin",
    "microphone",
    "speaker",
    "music",
    "musical",
    "instrument",
  ],

  Crafts: [
    "craft",
    "art",
    "paint",
    "painting",
    "canvas",
    "brush",
    "drawing",
    "creative",
    "handmade",
  ],
};

/**
 * Returns true when a DummyJSON product belongs to
 * one of SHOPORA's customer-facing categories.
 */
function matchesShoporaCategory(
  product: Product,
  selectedCategory: string
): boolean {
  if (selectedCategory === "All") {
    return true;
  }

  const rawCategory = String(product.category ?? "").toLowerCase();

  /**
   * 1. Check direct DummyJSON category mapping.
   */
  const mappedCategories =
    SHOPORA_CATEGORY_RULES[selectedCategory] ?? [];

  if (mappedCategories.includes(rawCategory)) {
    return true;
  }

  /**
   * 2. Check title + description for categories that
   * don't have an exact DummyJSON category.
   */
  const keywords =
    SHOPORA_KEYWORDS[selectedCategory] ?? [];

  if (keywords.length > 0) {
    const searchableText = [
      product.title ?? "",
      product.description ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return keywords.some((keyword) =>
      searchableText.includes(keyword)
    );
  }

  return false;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * Load all products once.
   */
  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Filter products based on the SHOPORA category system.
   */
  const filtered = useMemo(() => {
    return products.filter((product) => {
      const normalizedQuery = query.trim().toLowerCase();

      const searchableText = [
        product.title ?? "",
        product.description ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      const matchesCategory = matchesShoporaCategory(
        product,
        category
      );

      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  /**
   * Only render the current batch.
   */
  const visible = filtered.slice(0, visibleCount);

  const hasMore = visibleCount < filtered.length;

  /**
   * Reset pagination whenever the category changes.
   */
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [category, query]);

  /**
   * Infinite scrolling.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) =>
            Math.min(
              prev + BATCH_SIZE,
              filtered.length
            )
          );
        }
      },
      {
        rootMargin: "400px",
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, filtered.length]);

  function handleCategoryChange(next: string) {
    setCategory(next);
  }

  return (
    <>
      <Head>
        <title>SHOPORA — Discover. Shop. Enjoy.</title>

        <meta
          name="description"
          content="Explore products across electronics, fashion, beauty, lifestyle and more on SHOPORA."
        />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-[#060914] text-white">
        {/* =========================================================
            PREMIUM AMBIENT BACKGROUND
        ========================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Top blue glow */}
          <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#3155ff]/10 blur-[140px]" />

          {/* Left cyan glow */}
          <div className="absolute top-[30%] -left-40 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />

          {/* Right indigo glow */}
          <div className="absolute top-[55%] -right-40 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.05] blur-[150px]" />

          {/* Bottom glow */}
          <div className="absolute bottom-[-300px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[150px]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Top-to-bottom dark gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,110,247,0.07),transparent_32%),linear-gradient(to_bottom,#060914_0%,#070b16_45%,#060914_100%)]" />
        </div>

        {/* =========================================================
            CONTENT
        ========================================================== */}

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8">
          <Hero />

          {/* =======================================================
              CATEGORIES

              The previous code had:

              <div className="mb-8 sm:mb-10"></div>
              <Categories />

              That empty div doesn't create spacing.

              The margin now belongs directly to the category section.
          ======================================================== */}

          <div className="mb-10 sm:mb-12 lg:mb-14">
            <Categories
              active={category}
              onChange={handleCategoryChange}
            />
          </div>

          {/* =======================================================
              PRODUCT GRID
          ======================================================== */}

          <section className="relative">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.035]"
                  >
                    <div className="h-full rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.015]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                <AnimatePresence mode="popLayout">
                  {visible.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.94,
                      }}
                      transition={{
                        delay:
                          (index % BATCH_SIZE) * 0.03,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* =====================================================
                EMPTY STATE
            ====================================================== */}

            {!loading && visible.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] px-8 py-12 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="mb-4 text-4xl">
                    🛍️
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    No products found
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Try selecting another category.
                  </p>

                  {category !== "All" && (
                    <button
                      type="button"
                      onClick={() => setCategory("All")}
                      className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.09]"
                    >
                      View all products
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* =====================================================
                INFINITE LOADING
            ====================================================== */}

            {!loading && hasMore && (
              <div
                ref={sentinelRef}
                className="flex justify-center py-12"
              >
                <div className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.035] px-5 py-3 text-sm text-slate-400 backdrop-blur-xl">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#4F6EF7]" />

                  <span>
                    Loading more products...
                  </span>
                </div>
              </div>
            )}

            {/* =====================================================
                END STATE
            ====================================================== */}

            {!loading &&
              !hasMore &&
              filtered.length > BATCH_SIZE && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <p className="text-sm text-slate-500">
                    You&apos;ve reached the end —{" "}
                    <span className="text-slate-300">
                      {filtered.length}
                    </span>{" "}
                    products shown.
                  </p>
                </div>
              )}
          </section>
        </div>
      </main>
    </>
  );
}
