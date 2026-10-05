// pages/cart.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Gift,
  Lock,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartContext";

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
    description: "Fast and secure payment",
    icon: Wallet,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.075;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      ),
    [cart]
  );

  const shipping =
    cart.length === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE;

  const tax = subtotal * TAX_RATE;

  const discount = promoApplied ? subtotal * 0.1 : 0;

  const total = Math.max(0, subtotal + shipping + tax - discount);

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === "SHOPORA10") {
      setPromoApplied(true);
    }
  }

  function removePromo() {
    setPromoApplied(false);
    setPromoCode("");
  }

  return (
    <>
      <Head>
        <title>Your Cart — Shopora</title>

        <meta
          name="description"
          content="Review your Shopora cart, manage your items, choose your payment method, and continue to secure checkout."
        />

        <meta name="theme-color" content="#060914" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        {/* =========================================================
            AMBIENT BACKGROUND
        ========================================================= */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-blue-500/[0.06] blur-[130px] dark:bg-blue-500/[0.1]" />

          <div className="absolute right-[-220px] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.05] blur-[130px] dark:bg-indigo-500/[0.09]" />

          <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                    <ShoppingBag className="h-4 w-4" />
                    Shopping bag
                  </div>

                  <h1 className="text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                    Your cart
                  </h1>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {cart.length === 0
                      ? "Your shopping bag is waiting for something special."
                      : `${cart.length} ${
                          cart.length === 1 ? "item" : "items"
                        } ready for checkout.`}
                  </p>
                </div>

                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-500 sm:self-auto dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-blue-400/30"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Continue shopping
                </Link>
              </div>
            </motion.div>

            {/* =====================================================
                EMPTY CART
            ===================================================== */}

            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                {/* =================================================
                    FREE SHIPPING PROGRESS
                ================================================= */}

                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mb-6 overflow-hidden rounded-[1.5rem] border border-blue-200/60 bg-white shadow-sm dark:border-blue-400/10 dark:bg-white/[0.035]"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                          <Truck className="h-5 w-5" />
                        </div>

                        <div>
                          {remainingForFreeShipping > 0 ? (
                            <>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                You&apos;re{" "}
                                <span className="text-blue-500">
                                  ${remainingForFreeShipping.toFixed(2)}
                                </span>{" "}
                                away from free shipping
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Add another item and we&apos;ll cover delivery.
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                <Check className="h-4 w-4" />
                                You&apos;ve unlocked free shipping
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Nice choice. Your order qualifies for free
                                delivery.
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-500"
                      >
                        Keep shopping
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.07]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${shippingProgress}%` }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
                      />
                    </div>
                  </div>
                </motion.section>

                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
                  {/* ===============================================
                      CART ITEMS
                  =============================================== */}

                  <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <h2 className="text-lg font-black text-slate-950 dark:text-white">
                          Your items
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Review your selection before checkout.
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                        {cart.length}{" "}
                        {cart.length === 1 ? "product" : "products"}
                      </span>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {cart.map((item, index) => (
                        <motion.article
                          key={item.id}
                          layout
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -30,
                            scale: 0.97,
                          }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.04,
                          }}
                          className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.04] sm:p-5 dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-blue-400/20"
                        >
                          <div className="flex gap-4 sm:gap-5">
                            {/* Product image */}

                            <Link
                              href={`/product/${item.id}`}
                              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-32 dark:bg-white/[0.06]"
                            >
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 112px, 128px"
                                className="object-cover transition duration-500 group-hover:scale-105"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>

                            {/* Product information */}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <Link
                                    href={`/product/${item.id}`}
                                    className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 transition hover:text-blue-500 sm:text-base dark:text-white"
                                  >
                                    {item.title}
                                  </Link>

                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                      <Check className="h-3 w-3" />
                                      In stock
                                    </span>

                                    <span className="hidden text-[11px] text-slate-400 sm:inline">
                                      Ships from Shopora
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label={`Remove ${item.title}`}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                                <div>
                                  <p className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                                    ${Number(item.price).toFixed(2)}
                                  </p>

                                  <p className="mt-0.5 text-[11px] text-slate-400">
                                    Unit price
                                  </p>
                                </div>

                                {/* Quantity */}

                                <div className="flex items-center gap-3">
                                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-white/[0.05]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          Math.max(1, item.quantity - 1)
                                        )
                                      }
                                      aria-label="Decrease quantity"
                                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-blue-500 dark:hover:bg-white/10"
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </button>

                                    <span className="w-9 text-center text-sm font-bold text-slate-900 dark:text-white">
                                      {item.quantity}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                      aria-label="Increase quantity"
                                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-blue-500 dark:hover:bg-white/10"
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Line total */}

                          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/[0.06]">
                            <span className="text-xs text-slate-400">
                              {item.quantity} × $
                              {Number(item.price).toFixed(2)}
                            </span>

                            <span className="text-sm font-black text-slate-950 dark:text-white">
                              $
                              {(
                                Number(item.price) * item.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>

                    {/* Continue shopping */}

                    <Link
                      href="/shop"
                      className="group flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 py-4 text-sm font-semibold text-slate-500 transition hover:border-blue-300 hover:bg-blue-500/[0.02] hover:text-blue-500 dark:border-white/10 dark:text-slate-400 dark:hover:border-blue-400/30"
                    >
                      <Plus className="h-4 w-4" />
                      Add more products
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </section>

                  {/* ===============================================
                      CHECKOUT SIDEBAR
                  =============================================== */}

                  <aside className="space-y-5 xl:sticky xl:top-28">
                    {/* Order summary */}

                    <motion.section
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12,
                      }}
                      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.04] dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-black/20"
                    >
                      <div className="border-b border-slate-100 p-5 sm:p-6 dark:border-white/[0.06]">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-black text-slate-950 dark:text-white">
                              Order summary
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                              Your order at a glance.
                            </p>
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                            <ShoppingBag className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="space-y-3">
                          <SummaryRow
                            label={`Subtotal (${cart.length} ${
                              cart.length === 1 ? "item" : "items"
                            })`}
                            value={`$${subtotal.toFixed(2)}`}
                          />

                          <SummaryRow
                            label="Shipping"
                            value={
                              shipping === 0
                                ? "Free"
                                : `$${shipping.toFixed(2)}`
                            }
                            valueClassName={
                              shipping === 0
                                ? "text-emerald-500"
                                : undefined
                            }
                          />

                          <SummaryRow
                            label="Estimated tax"
                            value={`$${tax.toFixed(2)}`}
                          />

                          {promoApplied && (
                            <SummaryRow
                              label="Shopora10 discount"
                              value={`-$${discount.toFixed(2)}`}
                              valueClassName="text-emerald-500"
                            />
                          )}
                        </div>

                        <div className="my-5 h-px bg-slate-100 dark:bg-white/[0.08]" />

                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-400">
                              Total
                            </p>
                            <p className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                              ${total.toFixed(2)}
                            </p>
                          </div>

                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Best available price
                          </span>
                        </div>

                        {/* Promo */}

                        <div className="mt-6">
                          <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <Tag className="h-3.5 w-3.5 text-blue-500" />
                            Promo code
                          </label>

                          {promoApplied ? (
                            <div className="flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-emerald-500" />

                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                  SHOPORA10 applied
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={removePromo}
                                className="text-slate-400 transition hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <input
                                value={promoCode}
                                onChange={(e) =>
                                  setPromoCode(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    applyPromo();
                                  }
                                }}
                                placeholder="Enter code"
                                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                              />

                              <button
                                type="button"
                                onClick={applyPromo}
                                disabled={!promoCode.trim()}
                                className="rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
                              >
                                Apply
                              </button>
                            </div>
                          )}

                          <p className="mt-2 text-[10px] text-slate-400">
                            Try{" "}
                            <span className="font-bold text-blue-500">
                              SHOPORA10
                            </span>{" "}
                            for 10% off.
                          </p>
                        </div>

                        {/* Checkout */}
                        <Link
                          href="/checkout"
                          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-600/30"
                        >
                          <Lock className="h-4 w-4" />
                          Proceed to checkout
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
                          <Lock className="h-3.5 w-3.5" />
                          Secure encrypted checkout
                        </div>
                      </div>
                    </motion.section>

                    {/* Payment methods */}

                    <motion.section
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.18,
                      }}
                      className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/[0.08] dark:bg-white/[0.035]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-base font-black text-slate-950 dark:text-white">
                            Payment method
                          </h2>

                          <p className="mt-1 text-xs text-slate-400">
                            Choose how you&apos;d like to pay.
                          </p>
                        </div>

                        <CreditCard className="h-5 w-5 text-blue-500" />
                      </div>

                      <div className="mt-5 space-y-2">
                        {PAYMENT_METHODS.map((method) => {
                          const Icon = method.icon;
                          const isSelected =
                            selectedPayment === method.id;

                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() =>
                                setSelectedPayment(method.id)
                              }
                              className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                                isSelected
                                  ? "border-blue-500/50 bg-blue-500/[0.06] shadow-sm shadow-blue-500/5"
                                  : "border-slate-100 bg-slate-50/60 hover:border-slate-200 hover:bg-slate-50 dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/10"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                                  isSelected
                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-slate-100 text-slate-500 dark:bg-white/[0.07] dark:text-slate-300"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                                  {method.label}
                                </p>

                                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                  {method.description}
                                </p>
                              </div>

                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                                  isSelected
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-slate-300 dark:border-white/20"
                                }`}
                              >
                                {isSelected && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.section>

                    {/* Trust */}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      <TrustMiniCard
                        icon={<ShieldCheck className="h-4 w-4" />}
                        title="Secure payment"
                        text="256-bit encryption"
                      />

                      <TrustMiniCard
                        icon={<Truck className="h-4 w-4" />}
                        title="Fast delivery"
                        text="Reliable shipping"
                      />

                      <TrustMiniCard
                        icon={<Package className="h-4 w-4" />}
                        title="Easy returns"
                        text="Hassle-free returns"
                      />

                      <TrustMiniCard
                        icon={<Gift className="h-4 w-4" />}
                        title="Shopora rewards"
                        text="Earn points"
                      />
                    </motion.div>
                  </aside>
                </div>

                {/* =================================================
                    BOTTOM EXPERIENCE STRIP
                ================================================= */}

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="mt-8 overflow-hidden rounded-[1.75rem] border border-blue-400/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white"
                >
                  <div className="relative p-6 sm:p-8">
                    <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-blue-400/20 blur-[90px]" />

                    <div className="relative grid gap-6 md:grid-cols-3">
                      <ExperienceItem
                        icon={<Zap className="h-5 w-5" />}
                        title="Built for speed"
                        text="A faster, smoother shopping experience from cart to checkout."
                      />

                      <ExperienceItem
                        icon={<ShieldCheck className="h-5 w-5" />}
                        title="Protected every step"
                        text="Your account and payment details stay protected with Shopora."
                      />

                      <ExperienceItem
                        icon={<Sparkles className="h-5 w-5" />}
                        title="Shopping, elevated"
                        text="Discover products you love without unnecessary friction."
                      />
                    </div>
                  </div>
                </motion.section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

/* ================================================================
   EMPTY CART
================================================================ */

function EmptyCart() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.035]"
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="relative mb-7"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-blue-500/20 blur-2xl" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-500 shadow-2xl shadow-blue-600/20">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Shopora
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          Your cart is waiting
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Looks like you haven&apos;t added anything yet. Explore Shopora and
          discover products carefully selected for your next great purchase.
        </p>

        <Link
          href="/shop"
          className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Start shopping
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Secure checkout
          </span>

          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-blue-500" />
            Reliable delivery
          </span>

          <span className="flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5 text-indigo-500" />
            Shopora rewards
          </span>
        </div>
      </div>
    </motion.section>
  );
}

/* ================================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span
        className={`font-semibold text-slate-900 dark:text-white ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

/* ================================================================
   TRUST MINI CARD
================================================================ */

function TrustMiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold text-slate-900 dark:text-white">
            {title}
          </p>

          <p className="mt-0.5 truncate text-[9px] text-slate-400">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   EXPERIENCE ITEM
================================================================ */

function ExperienceItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-blue-300 backdrop-blur-xl">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}
