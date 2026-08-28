// components/WishlistContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";

interface WishlistContextValue {
  wishlist: Product[];
  toggleWishlist: (p: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("shopora_wishlist");
    if (s) setWishlist(JSON.parse(s));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shopora_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

  function toggleWishlist(p: Product) {
    setWishlist((prev) =>
      prev.some((i) => i.id === p.id)
        ? prev.filter((i) => i.id !== p.id)
        : [...prev, p]
    );
  }

  function removeFromWishlist(id: number) {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  }

  function isInWishlist(id: number) {
    return wishlist.some((i) => i.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};