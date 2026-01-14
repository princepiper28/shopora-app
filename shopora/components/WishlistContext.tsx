// components/WishlistContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextValue {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const s = localStorage.getItem("shopora_wishlist");
    if (s) setWishlist(JSON.parse(s));
  }, []);

  useEffect(() => {
    localStorage.setItem("shopora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(id: number) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  return <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
