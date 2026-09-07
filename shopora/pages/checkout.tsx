// pages/checkout.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, CartItem} from  "@/components/CartContext";

type CheckoutStep = 1 | 2 | 3;

const STEPS = [
  {
    number: 1,
    label: "Delivery",
    description: "Shipping information",
  },
  {
    number: 2,
    label: "Payment",
    description: "Payment method",
  },
  {
    number: 3,
    label: "Review",
    description: "Confirm order",
  },
];

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

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      ),
    [cart]
  );

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const tax = subtotal * TAX_RATE;

  const total = subtotal + shipping + tax;

  function updateShipping(
    field: keyof typeof shippingInfo,
    value: string
  ) {
    setShippingInfo((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updatePayment(
    field: keyof typeof paymentInfo,
    value: string
  ) {
    setPaymentInfo((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function continueToPayment() {
    setStep(2);
  }

  function continueToReview() {
    setStep(3);
  }

  function goBack() {
    if (step === 2) {
      setStep(1);
    }

    if (step === 3) {
      setStep(2);
    }
  }

  async function placeOrder() {
    setIsPlacingOrder(true);

    /*
      DEMO ONLY

      Later this is where you will call your real order API,
      Supabase, payment gateway, etc.
    */

    await new Promise((resolve) => setTimeout(resolve, 1400));

    clearCart();
    setIsPlacingOrder(false);
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <>
        <Head>
          <title>Order Confirmed — Shopora</title>
        </Head>

        <OrderSuccess />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout — Shopora</title>
        </Head>

        <EmptyCheckout />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout — Shopora</title>

        <meta
          name="description"
          content="Complete your Shopora order through our secure checkout."
        />

        <meta name="theme-color" content="#060914" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060914] dark:text-white">
        {/* =====================================================
            AMBIENT BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-blue-500/[0.06] blur-[130px] dark:bg-blue-500/[0.1]" />

          <div className="absolute right-[-200px] top-[25%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.05] blur-[130px] dark:bg-indigo-500/[0.09]" />

          <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-cyan-400/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
            {/* =================================================
                HEADER
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/cart"
                className="group mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-500 dark:text-slate-400"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to cart
              </Link>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                    <Lock className="h-3.5 w-3.5" />
                    Secure checkout
                  </div>

                  <h1 className="text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl dark:text-white">
                    Complete your order
                  </h1>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    You&apos;re just a few steps away from your Shopora order.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Secure & encrypted
                </div>
              </div>
            </motion.div>

            {/* =================================================
                PROGRESS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-white/[0.08] dark:bg-white/[0.035]"
            >
              <div className="flex items-center justify-between">
                {STEPS.map((item, index) => {
                  const completed = step > item.number;
                  const active = step === item.number;

                  return (
                    <div
                      key={item.number}
                      className="flex flex-1 items-center"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all ${
                            completed
                              ? "bg-emerald-500 text-white"
                              : active
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-slate-100 text-slate-400 dark:bg-white/[0.07]"
                          }`}
                        >
                          {completed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            item.number
                          )}
                        </div>

                        <div className="hidden sm:block">
                          <p
                            className={`text-xs font-bold ${
                              active || completed
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-400"
                            }`}
                          >
                            {item.label}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {index < STEPS.length - 1 && (
                        <div className="mx-3 h-px flex-1 bg-slate-200 sm:mx-6 dark:bg-white/[0.08]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: step > item.number ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.4 }}
                            className="h-full bg-emerald-500"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* =================================================
                MAIN
            ================================================= */}

            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
              {/* =================================================
                  LEFT
              ================================================= */}

              <div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="delivery"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DeliveryStep
                        shippingInfo={shippingInfo}
                        updateShipping={updateShipping}
                        onContinue={continueToPayment}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PaymentStep
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        paymentInfo={paymentInfo}
                        updatePayment={updatePayment}
                        onContinue={continueToReview}
                        onBack={goBack}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ReviewStep
                        shippingInfo={shippingInfo}
                        paymentMethod={paymentMethod}
                        paymentInfo={paymentInfo}
                        onPlaceOrder={placeOrder}
                        onBack={goBack}
                        isPlacingOrder={isPlacingOrder}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* =================================================
                  ORDER SUMMARY
              ================================================= */}

              <OrderSummary
                cart={cart}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>

            {/* =================================================
                TRUST STRIP
            ================================================= */}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <TrustCard
                icon={<Lock className="h-4 w-4" />}
                title="Secure checkout"
                text="Your information is protected."
              />

              <TrustCard
                icon={<Truck className="h-4 w-4" />}
                title="Reliable delivery"
                text="Your order is handled with care."
              />

              <TrustCard
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Shop with confidence"
                text="Protected purchases with Shopora."
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================================================================
   DELIVERY STEP
================================================================ */

function DeliveryStep({
  shippingInfo,
  updateShipping,
  onContinue,
}: {
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  updateShipping: (
    field:
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "address"
      | "apartment"
      | "city"
      | "state"
      | "postalCode"
      | "country",
    value: string
  ) => void;
  onContinue: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="border-b border-slate-100 p-5 sm:p-7 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950 dark:text-white">
              Delivery information
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Where should we deliver your order?
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-7">
        {/* Contact */}

        <div>
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Contact details
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              placeholder="John"
              value={shippingInfo.firstName}
              onChange={(value) =>
                updateShipping("firstName", value)
              }
            />

            <Input
              label="Last name"
              placeholder="Doe"
              value={shippingInfo.lastName}
              onChange={(value) =>
                updateShipping("lastName", value)
              }
            />

            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              value={shippingInfo.email}
              onChange={(value) =>
                updateShipping("email", value)
              }
            />

            <Input
              label="Phone number"
              type="tel"
              placeholder="+234 801 234 5678"
              value={shippingInfo.phone}
              onChange={(value) =>
                updateShipping("phone", value)
              }
            />
          </div>
        </div>

        {/* Address */}

        <div>
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Shipping address
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Street address"
              placeholder="123 Example Street"
              value={shippingInfo.address}
              onChange={(value) =>
                updateShipping("address", value)
              }
            />

            <Input
              label="Apartment, suite, etc. (optional)"
              placeholder="Apartment 4B"
              value={shippingInfo.apartment}
              onChange={(value) =>
                updateShipping("apartment", value)
              }
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="City"
                placeholder="Lagos"
                value={shippingInfo.city}
                onChange={(value) =>
                  updateShipping("city", value)
                }
              />

              <Input
                label="State"
                placeholder="Lagos"
                value={shippingInfo.state}
                onChange={(value) =>
                  updateShipping("state", value)
                }
              />

              <Input
                label="Postal code"
                placeholder="100001"
                value={shippingInfo.postalCode}
                onChange={(value) =>
                  updateShipping("postalCode", value)
                }
              />
            </div>
          </div>
        </div>

        {/* Delivery */}

        <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4 dark:bg-blue-500/[0.05]">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Truck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Standard delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your order will be carefully packed and delivered to
                your address.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Continue to payment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

/* ================================================================
   PAYMENT STEP
================================================================ */

function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  paymentInfo,
  updatePayment,
  onContinue,
  onBack,
}: {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  paymentInfo: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  updatePayment: (
    field: "cardNumber" | "expiry" | "cvc" | "name",
    value: string
  ) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="border-b border-slate-100 p-5 sm:p-7 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950 dark:text-white">
              Payment method
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Choose your preferred way to pay.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const selected = paymentMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? "border-blue-500/50 bg-blue-500/[0.06] shadow-sm"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-white/[0.08] dark:bg-white/[0.025]"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-500 dark:bg-white/[0.07] dark:text-slate-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {method.label}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {method.description}
                  </p>
                </div>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    selected
                      ? "border-blue-500 bg-blue-500"
                      : "border-slate-300 dark:border-white/20"
                  }`}
                >
                  {selected && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {paymentMethod === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/[0.06] dark:bg-white/[0.025]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Card details
              </p>

              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <Lock className="h-3 w-3" />
                Secure
              </div>
            </div>

            <Input
              label="Cardholder name"
              placeholder="John Doe"
              value={paymentInfo.name}
              onChange={(value) =>
                updatePayment("name", value)
              }
            />

            <Input
              label="Card number"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={(value) =>
                updatePayment("cardNumber", value)
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Expiry date"
                placeholder="MM/YY"
                value={paymentInfo.expiry}
                onChange={(value) =>
                  updatePayment("expiry", value)
                }
              />

              <Input
                label="Security code"
                placeholder="CVC"
                value={paymentInfo.cvc}
                onChange={(value) =>
                  updatePayment("cvc", value)
                }
              />
            </div>
          </motion.div>
        )}

        {paymentMethod === "paypal" && (
          <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-5 dark:bg-blue-500/[0.05]">
            <div className="flex gap-3">
              <Wallet className="h-5 w-5 text-blue-500" />

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  PayPal selected
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  You&apos;ll be redirected to PayPal when payment
                  processing is connected.
                </p>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="rounded-2xl border border-amber-400/10 bg-amber-500/[0.05] p-5">
            <div className="flex gap-3">
              <Banknote className="h-5 w-5 text-amber-500" />

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Cash on Delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Pay in cash when your Shopora order arrives.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.04]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="group flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5"
          >
            Review order
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   REVIEW STEP
================================================================ */

function ReviewStep({
  shippingInfo,
  paymentMethod,
  paymentInfo,
  onPlaceOrder,
  onBack,
  isPlacingOrder,
}: {
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentInfo: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  onPlaceOrder: () => void;
  onBack: () => void;
  isPlacingOrder: boolean;
}) {
  const paymentLabel =
    PAYMENT_METHODS.find((method) => method.id === paymentMethod)
      ?.label ?? "Payment method";

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="border-b border-slate-100 p-5 sm:p-7 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Check className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950 dark:text-white">
              Review your order
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Everything look good? You&apos;re ready to place your order.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-7">
        {/* Delivery */}

        <ReviewCard
          icon={<MapPin className="h-4 w-4" />}
          title="Delivery address"
        >
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {shippingInfo.address}
            {shippingInfo.apartment &&
              `, ${shippingInfo.apartment}`}
            <br />
            {shippingInfo.city}, {shippingInfo.state}{" "}
            {shippingInfo.postalCode}
            <br />
            {shippingInfo.country}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {shippingInfo.email} · {shippingInfo.phone}
          </p>
        </ReviewCard>

        {/* Payment */}

        <ReviewCard
          icon={<CreditCard className="h-4 w-4" />}
          title="Payment method"
        >
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {paymentLabel}
          </p>

          {paymentMethod === "card" &&
            paymentInfo.cardNumber && (
              <p className="mt-1 text-xs text-slate-400">
                Card ending in{" "}
                {paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)}
              </p>
            )}
        </ReviewCard>

        {/* Delivery promise */}

        <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-5 dark:bg-blue-500/[0.05]">
          <div className="flex gap-3">
            <Truck className="h-5 w-5 shrink-0 text-blue-500" />

            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Your order is almost ready
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                After placing your order, we&apos;ll begin preparing
                your items for delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={isPlacingOrder}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={isPlacingOrder}
            className="group flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-sm font-black text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {isPlacingOrder ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Placing order...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Place order
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ORDER SUMMARY
================================================================ */

function OrderSummary({
  cart,
  subtotal,
  shipping,
  tax,
  total,
}: {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) {
  return (
    <aside className="space-y-5 xl:sticky xl:top-28">
      <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.04] dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-black/20">
        <div className="border-b border-slate-100 p-5 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                Your order
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {cart.length}{" "}
                {cart.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="max-h-[360px] space-y-3 overflow-y-auto p-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-white/[0.06] dark:bg-white/[0.025]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-white/[0.06]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />

                <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[9px] font-black text-white">
                  {item.quantity}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-bold text-slate-900 dark:text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  ${Number(item.price).toFixed(2)} each
                </p>
              </div>

              <p className="shrink-0 text-xs font-black text-slate-900 dark:text-white">
                $
                {(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-5 dark:border-white/[0.06]">
          <div className="space-y-3">
            <SummaryRow
              label="Subtotal"
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
                shipping === 0 ? "text-emerald-500" : ""
              }
            />

            <SummaryRow
              label="Estimated tax"
              value={`$${tax.toFixed(2)}`}
            />
          </div>

          <div className="my-5 h-px bg-slate-100 dark:bg-white/[0.08]" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                Total
              </p>

              <p className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                ${total.toFixed(2)}
              </p>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Secure order
            </span>
          </div>
        </div>
      </section>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.035]">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Shopora protection
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Your order is protected from checkout through delivery.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ================================================================
   INPUT
================================================================ */

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-blue-400 dark:focus:bg-white/[0.06]"
      />
    </label>
  );
}

/* ================================================================
   REVIEW CARD
================================================================ */

function ReviewCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          {icon}
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h3>
      </div>

      {children}
    </div>
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
   TRUST CARD
================================================================ */

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   ORDER SUCCESS
================================================================ */

function OrderSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-20 dark:bg-[#060914]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl sm:p-12 dark:border-white/[0.08] dark:bg-white/[0.035]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl shadow-emerald-500/20"
        >
          <Check className="h-10 w-10" />
        </motion.div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
          Order confirmed
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Thank you for shopping with Shopora.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Your order has been placed successfully. We&apos;ll keep you
          updated as your order moves through delivery.
        </p>

        <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left dark:border-white/[0.06] dark:bg-white/[0.025]">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-500" />

            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                What happens next?
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Your order will be prepared, dispatched, and delivered
                to your selected address.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5"
        >
          Continue shopping
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </main>
  );
}

/* ================================================================
   EMPTY CHECKOUT
================================================================ */

function EmptyCheckout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-20 dark:bg-[#060914]">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-white/[0.08] dark:bg-white/[0.035]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-500/10 text-blue-500">
          <ShoppingBag className="h-9 w-9" />
        </div>

        <h1 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
          Your cart is empty
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Add something to your Shopora cart before proceeding to
          checkout.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Browse products
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
