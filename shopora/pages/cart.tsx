"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../components/CartContext";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, Verve",
    icon: CreditCard,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal balance",
    icon: Wallet,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("card");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length === 0 ? 0 : subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.075; // adjust rate to your region
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      {/* =========================
          Page Header
      ========================= */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {cart.length} {cart.length === 1 ? "item" : "items"} in cart
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
      {cart.length === 0 ? (
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
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Looks like you haven&apos;t added anything yet. Explore our products
            and find something you You&apos;re going to love.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* =========================
              Cart Items
          ========================= */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="
                    flex items-center gap-4
                    bg-white dark:bg-white/5
                    border border-gray-100 dark:border-white/10
                    rounded-3xl
                    p-4
                    shadow-sm
                  "
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/10 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm font-bold text-[#4F6EF7] mt-1">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-xl">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            hover:text-[#4F6EF7]
                            transition-colors
                          "
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            hover:text-[#4F6EF7]
                            transition-colors
                          "
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          flex items-center gap-1.5
                          text-xs font-medium text-red-500
                          hover:underline
                        "
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* =========================
              Order Summary + Payment
          ========================= */}
          <div className="lg:col-span-1">
            <div
              className="
                sticky top-32
                bg-white dark:bg-white/5
                border border-gray-100 dark:border-white/10
                rounded-3xl
                p-6
                shadow-sm
              "
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Tax</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-100 dark:border-white/10 my-2" />

                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* =========================
                  Payment Methods
              ========================= */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Payment Method
                </h3>

                <div className="flex flex-col gap-2">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedPayment === method.id;

                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`
                          flex items-center gap-3
                          p-3
                          rounded-2xl
                          border
                          text-left
                          transition-all
                          ${
                            isSelected
                              ? "border-[#4F6EF7] bg-[#4F6EF7]/5"
                              : "border-gray-100 dark:border-white/10 hover:border-gray-200"
                          }
                        `}
                      >
                        <div
                          className={`
                            w-9 h-9 rounded-xl
                            flex items-center justify-center
                            shrink-0
                            ${
                              isSelected
                                ? "bg-[#4F6EF7] text-white"
                                : "bg-gray-100 dark:bg-white/10 text-gray-500"
                            }
                          `}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {method.label}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {method.description}
                          </p>
                        </div>

                        <div
                          className={`
                            ml-auto w-4 h-4 rounded-full border-2 shrink-0
                            ${
                              isSelected
                                ? "border-[#4F6EF7] bg-[#4F6EF7]"
                                : "border-gray-300"
                            }
                          `}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="
                  mt-6 w-full
                  flex items-center justify-center gap-2
                  py-3.5
                  rounded-2xl
                  bg-[#4F6EF7]
                  text-white
                  text-sm font-bold
                  hover:bg-[#3B5BDB]
                  transition-colors
                "
              >
                <Lock className="w-4 h-4" />
                Checkout · ${total.toFixed(2)}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Secure checkout. Your payment info is encrypted.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}