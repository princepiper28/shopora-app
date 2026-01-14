"use client";

import { ShoppingBag, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-4 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#4F6EF7] to-[#3B5BDB] rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl">
          
          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-7 h-7" />
            <span className="text-xl font-bold tracking-wide">Shopora</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-white">
            {/* Wishlist */}
            <div className="relative flex items-center gap-1">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#FF7A00] text-xs px-2 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative flex items-center gap-1">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#FF7A00] text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}


