"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";
import { fetchAllProducts, mapToDisplayCategory } from "@/lib/api";

const ALL_SECTION_LIMIT = 150;

export default function ShopPage() {
  const router = useRouter();
  const searchQuery =
    typeof router.query.search === "string" ? router.query.search : "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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
    let list = products;

    if (activeCategory !== "All") {
      list = list.filter(
        (p) => mapToDisplayCategory(p.category) === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (activeCategory === "All" && !searchQuery.trim()) {
      list = list.slice(0, ALL_SECTION_LIMIT);
    }

    return list;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      {/* =========================
          Page Header
      ========================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Shop by Categories
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : `${filtered.length} products available`}
        </p>
      </div>

      {/* =========================
          Categories
      ========================= */}
      <Categories active={activeCategory} onChange={setActiveCategory} />

      {/* =========================
          Loading State
      ========================= */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* =========================
            Empty State
        ========================= */
        <div
          className="
            flex flex-col items-center justify-center
            text-center
            py-24
            bg-gray-50 dark:bg-white/5
            rounded-3xl
            border border-gray-100 dark:border-white/10
          "
        >
          <div
            className="
              w-16 h-16 rounded-2xl
              bg-gradient-to-br from-[#4F6EF7] to-[#3B5BDB]
              flex items-center justify-center
              shadow-lg
              mb-5
            "
          >
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No products found
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            {searchQuery
              ? `We couldn't find anything matching "${searchQuery}".`
              : "We don't have products in this category yet — check back soon."}
          </p>
        </div>
      ) : (
        /* =========================
            Product Grid
        ========================= */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
