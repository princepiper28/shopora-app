"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Tag } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";

/* =========================
   Deterministic "fake" discount, seeded by product id
   so it stays consistent across reloads instead of
   jumping around randomly
========================= */
function getDiscount(id: number) {
  const percent = 10 + ((id * 17) % 41); // 10% - 50%
  return percent;
}

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const deals = useMemo(() => {
    // Only even-id products count as "on sale" — keeps it a curated
    // subset instead of literally everything having a discount
    return products
      .filter((p) => p.id % 2 === 0)
      .map((p) => {
        const discount = getDiscount(p.id);
        const originalPrice = p.price / (1 - discount / 100);
        return { ...p, discount, originalPrice };
      });
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      {/* =========================
          Page Header
      ========================= */}
      <div className="mb-8 flex items-center gap-3">
        <div
          className="
            w-11 h-11 rounded-2xl
            bg-gradient-to-br from-red-500 to-orange-500
            flex items-center justify-center
            shadow-lg
          "
        >
          <Tag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Best Deals
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {deals.length} discounted products, limited time
          </p>
        </div>
      </div>

      {/* =========================
          Loading State
      ========================= */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        /* =========================
            Deals Grid
        ========================= */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {deals.map((item) => {
              const isFav = isInWishlist(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="
                    group
                    bg-white dark:bg-white/5
                    border border-gray-100 dark:border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-xl
                    transition-shadow
                  "
                >
                  {/* Image */}
                  <div className="relative w-full aspect-square bg-gray-50 dark:bg-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                    />

                    {/* Discount Badge */}
                    <span
                      className="
                        absolute top-3 left-3
                        px-2.5 py-1
                        rounded-full
                        bg-red-500
                        text-white
                        text-[11px]
                        font-bold
                      "
                    >
                      -{item.discount}%
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="
                        absolute top-3 right-3
                        w-9 h-9
                        rounded-full
                        bg-white/90 dark:bg-black/60
                        backdrop-blur
                        flex items-center justify-center
                        shadow-md
                        hover:bg-red-500 hover:text-white
                        transition-colors
                      "
                      aria-label={
                        isFav ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      <Heart
                        className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-[#4F6EF7]">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="
                        mt-4 w-full
                        flex items-center justify-center gap-2
                        py-2.5
                        rounded-xl
                        bg-gray-100 dark:bg-white/10
                        text-sm font-semibold text-gray-800 dark:text-white
                        hover:bg-[#4F6EF7] hover:text-white
                        transition-colors
                      "
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}