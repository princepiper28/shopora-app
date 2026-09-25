// components/CartDrawer.tsx

import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "./CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40"
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
          <h3 className="text-lg font-semibold">Your Cart</h3>

          <button
            type="button"
            onClick={onClose}
            className="p-2"
            aria-label="Close cart"
          >
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="mt-4 max-h-[70vh] space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>

                  <div className="text-sm text-gray-500">
                    ${item.price}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={String(item.quantity)}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Number(e.target.value)
                        )
                      }
                      className="w-16 rounded border p-1"
                      aria-label={`Quantity for ${item.title}`}
                    />

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout */}
        <div className="mt-4">
          <Link
            href="/checkout"
            className="block w-full rounded bg-shopora-accent py-3 text-center text-white"
            onClick={onClose}
          >
            Proceed to Checkout
          </Link>
        </div>
      </motion.aside>
    </>
  );
}