// components/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, q: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("shopora_cart");
    if (s) setCart(JSON.parse(s));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shopora_cart", JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  function addToCart(p: Product) {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex)
        return prev.map((i) =>
          i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...p, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id: number, q: number) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, q) } : i))
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
