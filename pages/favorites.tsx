"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";

export default function FavoritesPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      {/* =========================
          Page Header
      ========================= */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your Favorites
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <Link
          href="/shop"
          className="
            flex items-center gap-2
            text-sm font-medium text-[#4F6EF7]
            hover:underline
          "
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      {/* =========================
          Empty State
      ========================= */}
      {wishlist.length === 0 ? (
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
            <Heart className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Items you love will show up here. Tap the heart icon on any
            product to save it for later.
          </p>

          <Link
            href="/shop"
            className="
              px-6 py-3
              rounded-2xl
              bg-[#4F6EF7]
              text-white
              text-sm font-semibold
              hover:bg-[#3B5BDB]
              transition-colors
            "
          >
            Browse Products
          </Link>
        </div>
      ) : (
        /* =========================
            Favorites Grid
        ========================= */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlist.map((item) => (
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
                    className="object-cover"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
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
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-[#4F6EF7] mt-1">
                    ${Number(item.price).toFixed(2)}
                  </p>

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
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}