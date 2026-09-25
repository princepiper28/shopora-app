// components/WishlistDrawer.tsx

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useWishlist } from "./WishlistContext";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types/product";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
}: WishlistDrawerProps) {
  const { wishlist } = useWishlist();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    async function loadWishlistItems() {
      try {
        const products = await fetchAllProducts();

        const wishlistProducts = products.filter((product) =>
          wishlist.some((item) => item.id === product.id)
        );
        setItems(wishlistProducts);
      } catch (error) {
        console.error("Failed to load wishlist products:", error);
        setItems([]);
      }
    }

    loadWishlistItems();
  }, [wishlist]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white p-4 shadow-lg dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Wishlist</h3>

          <button
            type="button"
            onClick={onClose}
            className="p-2"
            aria-label="Close wishlist"
          >
            <X />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-gray-500">
              No items in wishlist.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

                <div>
                  <div className="font-semibold">
                    {item.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    ${item.price}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.aside>
    </>
  );
}