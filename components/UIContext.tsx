// components/UIContext.tsx
import React, { createContext, useContext, useState } from "react";

interface UIContextValue {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  return (
    <UIContext.Provider value={{
      isCartOpen,
      isWishlistOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openWishlist: () => setWishlistOpen(true),
      closeWishlist: () => setWishlistOpen(false),
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
};
