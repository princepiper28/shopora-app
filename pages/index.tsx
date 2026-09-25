// pages/index.tsx
import Head from "next/head";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import { fetchAllProducts, mapToDisplayCategory } from "@/lib/api";

const BATCH_SIZE = 22;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query,] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "All" || mapToDisplayCategory(p.category) === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [category, query]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
        }
      },
      { rootMargin: "400px" }
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
        <title>Shopora — Product Catalog</title>
      </Head>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <Hero />
        <Categories active={category} onChange={handleCategoryChange} />

        {/* grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              <AnimatePresence>
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: (i % BATCH_SIZE) * 0.03 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && visible.length === 0 && (
            <p className="text-center py-12 text-gray-500">
              No products found.
            </p>
          )}

          {!loading && hasMore && (
            <div ref={sentinelRef} className="flex justify-center py-10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-4 h-4 border-2 border-gray-300 border-t-[#4F6EF7] rounded-full animate-spin" />
                Loading more products...
              </div>
            </div>
          )}

          {!loading && !hasMore && filtered.length > BATCH_SIZE && (
            <p className="text-center py-10 text-sm text-gray-400">
              You&apos;ve reached the end — {filtered.length} products shown.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
