"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFav = isInWishlist(product.id);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        group relative
        bg-white dark:bg-gray-800
        rounded-2xl
        border border-gray-100 dark:border-white/10
        shadow-sm hover:shadow-2xl
        overflow-hidden
        flex flex-col
        transition-shadow duration-300
      "
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 dark:bg-white/5 overflow-hidden">
        <motion.div
          className="relative w-full h-full p-6"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Wishlist */}
        <motion.button
          onClick={() => toggleWishlist(product)}
          whileTap={{ scale: 0.8 }}
          className="
            absolute top-3 right-3
            w-9 h-9 rounded-full
            bg-white/90 dark:bg-black/60
            backdrop-blur
            flex items-center justify-center
            shadow-md
            transition-colors
          "
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <motion.span
            key={isFav ? "fav" : "not-fav"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`text-base ${isFav ? "" : "opacity-60"}`}
          >
            {isFav ? "❤️" : "🤍"}
          </motion.span>
        </motion.button>

        {/* Quick-add overlay, appears on hover (desktop) */}
        <motion.button
          onClick={handleAddToCart}
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          animate={{ y: "100%" }}
          whileInView={{ y: "100%" }}
          className="
            hidden md:flex
            absolute bottom-0 left-0 right-0
            items-center justify-center gap-2
            bg-gray-900/90 backdrop-blur
            text-white text-xs font-semibold
            py-2.5
            translate-y-full
            group-hover:translate-y-0
            transition-transform duration-300
          "
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Quick Add
        </motion.button>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[11px] uppercase tracking-wide text-[#4F6EF7] font-semibold mb-1">
          {product.category}
        </p>

        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.92 }}
            className="
              relative
              flex items-center justify-center
              w-9 h-9 rounded-xl
              bg-[#4F6EF7] text-white
              shadow-sm
              overflow-hidden
              md:hidden
            "
            aria-label="Add to cart"
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}