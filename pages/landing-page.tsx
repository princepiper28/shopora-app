"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Flame,
  Tag,
  ArrowUpRight,
  Check,
  ShoppingBag,
  Heart,
  Zap,
} from "lucide-react";

import type { Product } from "@/types/product";
import { fetchAllProducts } from "@/lib/api";

/* =========================================================
   DATA
========================================================= */

const CATEGORIES = [
  {
    slug: "mens-shirts",
    label: "Men's style",
    blurb: "Shirts, shoes, watches and everyday essentials",
    span: "md:col-span-2 md:row-span-2",
    tone: "from-[#4F6EF7] to-[#6C4FF7]",
  },
  {
    slug: "jewellery",
    label: "Jewellery",
    blurb: "Elegant pieces and everyday accessories",
    span: "md:col-span-1",
    tone: "from-amber-500 to-orange-500",
  },
  {
    slug: "electronics",
    label: "Electronics",
    blurb: "Smart devices and tech essentials",
    span: "md:col-span-1",
    tone: "from-slate-700 to-slate-950",
  },
  {
    slug: "womens-dresses",
    label: "Women's style",
    blurb: "New season fashion and accessories",
    span: "md:col-span-2",
    tone: "from-rose-500 to-pink-600",
  },
];

const PROMISES = [
  {
    icon: Truck,
    title: "Free delivery over $50",
    body: "Ships within two working days across Lagos and nationwide.",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    body: "Changed your mind? Send it back, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    body: "Card details are encrypted end to end. We never store them.",
  },
];

const FAQS = [
  {
    question: "What can I buy on SHOPORA?",
    answer:
      "SHOPORA brings everyday shopping into one place, including fashion, jewellery, electronics and other carefully selected products.",
  },
  {
    question: "Do I need an account to browse products?",
    answer:
      "No. You can explore the public SHOPORA experience without an account. Create an account when you are ready to save your basket, manage your wishlist and place orders.",
  },
  {
    question: "How do I create a SHOPORA account?",
    answer:
      "Select Create an account and follow the registration steps. Once registered, you can sign in and access your personalized shopping experience.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are prepared for dispatch within two working days. Delivery time can vary depending on your location and the delivery option available at checkout.",
  },
  {
    question: "Where does SHOPORA deliver?",
    answer:
      "SHOPORA is designed to support delivery across Lagos and nationwide. The available delivery options and fees are shown during checkout.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "Delivery fees depend on your order and delivery destination. Any applicable shipping charge is presented clearly during checkout before you place your order.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes. SHOPORA currently presents a 30-day return promise for eligible purchases. Product-specific conditions may apply.",
  },
  {
    question: "What if I receive the wrong or damaged item?",
    answer:
      "Contact SHOPORA support with your order details as soon as possible. The order can then be reviewed and the appropriate return or resolution process started.",
  },
  {
    question: "Is checkout secure?",
    answer:
      "Yes. SHOPORA is designed around secure checkout and protected account sessions. Payment details should only be entered through the secure checkout flow.",
  },
  {
    question: "What payment methods can I use?",
    answer:
      "Available payment methods are shown at checkout. The exact options can vary depending on the payment setup enabled for your SHOPORA store.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once you have an account and an order, your order information can be accessed from your account experience. Delivery updates depend on the order and shipping process.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "If you need to cancel an order, contact SHOPORA as soon as possible. Cancellation availability can depend on whether the order has already entered fulfilment or dispatch.",
  },
  {
    question: "Can I save products for later?",
    answer:
      "Yes. A registered SHOPORA account can be used to save products and manage your wishlist so you can return to them later.",
  },
  {
    question: "Do product prices include delivery?",
    answer:
      "Product prices and delivery charges are presented separately where applicable. Your final order total is shown before you confirm checkout.",
  },
  {
    question: "How can I contact SHOPORA?",
    answer:
      "Use the contact or support option provided by SHOPORA to reach the team. Keep your order number available when contacting support about an existing order.",
  },
];

/* =========================================================
   MOTION
========================================================= */

const SECTION_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: SECTION_EASE,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

/* =========================================================
   HERO PRODUCT CARD POSITIONS
========================================================= */

const HERO_POSITIONS = [
  "left-[1%] top-[4%] sm:left-[6%] sm:top-[3%]",
  "right-[1%] top-[10%] sm:right-[5%] sm:top-[6%]",
  "left-[4%] bottom-[3%] sm:left-[9%] sm:bottom-[4%]",
  "right-[4%] bottom-[6%] sm:right-[8%] sm:bottom-[7%]",
];

const HERO_ROTATIONS = [-7, 6, 5, -6];

/* =========================================================
   COMPONENT
========================================================= */

export default function Landing() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /*
   * Controls which group of four products is shown
   * inside the hero.
   */
  const [heroSet, setHeroSet] = useState(0);

  /*
   * Controls which single product is shown
   * inside the "Built for discovery" section.
   */
  const [spotlightSet, setSpotlightSet] = useState(0);

  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        console.log("SHOPORA: Loading products...");

        const data = await fetchAllProducts();

        console.log("SHOPORA: Product API response:", data);

        console.log(
          "SHOPORA: Number of products received:",
          Array.isArray(data) ? data.length : "Invalid response"
        );

        if (!Array.isArray(data)) {
          throw new Error("fetchAllProducts() did not return an array.");
        }

        if (!cancelled) {
          /*
           * Keep up to 45 products for the landing page.
           */
          setFeatured(data.slice(0, 45));
        }
      } catch (error) {
        console.error("SHOPORA: Failed to load products:", error);

        if (!cancelled) {
          setFeatured([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     HERO AUTO ROTATION
     
     Every 3 seconds we move to the next group of 4.
  ======================================================= */

  useEffect(() => {
    if (featured.length < 5) return;

    const heroInterval = window.setInterval(() => {
      setHeroSet((current) => current + 1);
    }, 3000);

    return () => {
      window.clearInterval(heroInterval);
    };
  }, [featured.length]);

  /* =======================================================
     SPOTLIGHT AUTO ROTATION
     
     Gives the "Built for discovery" section its own
     product rotation.
  ======================================================= */

  useEffect(() => {
    if (featured.length < 6) return;

    const spotlightInterval = window.setInterval(() => {
      setSpotlightSet((current) => current + 1);
    }, 4500);

    return () => {
      window.clearInterval(spotlightInterval);
    };
  }, [featured.length]);

  /* =======================================================
     HERO PRODUCTS
  ======================================================= */

  const heroProducts = useMemo(() => {
    if (!featured.length) return [];

    const totalSets = Math.max(1, Math.ceil(featured.length / 4));

    const currentSet = heroSet % totalSets;

    const start = currentSet * 4;

    /*
     * We use modulo so the hero never runs out of products.
     */
    return Array.from({ length: 4 }, (_, index) => {
      return featured[(start + index) % featured.length];
    });
  }, [featured, heroSet]);

  /* =======================================================
     SPOTLIGHT PRODUCTS
  ======================================================= */

  const spotlightProducts = useMemo(() => {
    if (!featured.length) return [];

    /*
     * Start further into the catalogue so the spotlight
     * doesn't simply repeat the first hero products.
     */
    const startOffset = 12;

    const totalProducts = Math.max(1, featured.length - startOffset);
    const productIndex = startOffset + (spotlightSet % totalProducts);

    // Show exactly one product at a time beside the copy.
    return [featured[productIndex % featured.length]];
  }, [featured, spotlightSet]);

  const featuredProducts = featured.slice(0, 45);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060914] text-white">
      {/* ===================================================
          GLOBAL BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,110,247,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(79,110,247,0.055) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        id="hero"
        className="relative overflow-hidden px-4 pb-24 pt-12 sm:pt-16 md:pb-32 md:pt-24"
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[680px] w-[980px] -translate-x-1/2 rounded-full bg-[#4F6EF7]/10 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="absolute left-[-200px] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.035] blur-[100px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          {/* HERO COPY */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-20 max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#4F6EF7]/20 bg-white/[0.05] px-3.5 py-1.5 text-xs font-bold text-[#4F6EF7] shadow-sm backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F6EF7]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4F6EF7]" />
              </span>

              <Sparkles className="h-3.5 w-3.5" />

              New season, new prices
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]"
            >
              Everything you need,{" "}
              <span className="bg-gradient-to-r from-[#4F6EF7] via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                in one place.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
            >
              Clothing, jewellery and electronics from brands worth buying —
              with honest prices, fast delivery and returns that actually
              work.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/signup"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#4F6EF7] px-6 text-sm font-bold text-white shadow-[0_18px_45px_-15px_rgba(79,110,247,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#405BD4]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0b1020]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <ShoppingBag className="relative h-4 w-4" />

                <span className="relative">Create an account</span>

                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.055] px-6 text-sm font-bold text-slate-100 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#4F6EF7]/30 hover:text-[#4F6EF7]"
              >
                Browse the shop

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-400"
            >
              {[
                "10000+ products",
                "Secure checkout",
                "30-day returns",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </span>

                  {item}
                </span>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm text-slate-400"
            >
              Already shopping with us?{" "}
              <Link
                href="/login"
                className="font-bold text-[#4F6EF7] underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </motion.p>
          </motion.div>

          {/* =================================================
              HERO PRODUCT ORBIT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: SECTION_EASE,
            }}
            className="relative mx-auto h-[470px] w-full max-w-2xl sm:h-[530px] lg:h-[590px]"
          >
            {/* Glow */}

            <motion.div
              aria-hidden="true"
              animate={{
                scale: [1, 1.07, 1],
                opacity: [0.32, 0.55, 0.32],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6EF7]/20 blur-[75px] sm:h-[380px] sm:w-[380px]"
            />

            {/* Outer circle */}

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4F6EF7]/10 bg-white/[0.025] shadow-[inset_0_0_80px_rgba(255,255,255,0.45)] backdrop-blur-[2px] sm:h-[390px] sm:w-[390px]"
            />

            {/* Inner orbit */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-[215px] w-[215px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4F6EF7]/15 sm:h-[275px] sm:w-[275px]"
            />

            {/* Product cards */}

            <div className="absolute inset-0">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={`absolute ${HERO_POSITIONS[index]} z-10 h-[40%] w-[39%] animate-pulse overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-2.5 sm:h-[43%] sm:w-[37%] sm:p-3`}
                    >
                      <div className="h-full w-full rounded-[1.55rem] bg-white/[0.06]" />
                    </div>
                  ))
                : heroProducts.map((product, index) => (
                    <AnimatePresence
                      key={`${heroSet}-${product.id}-${index}`}
                      mode="sync"
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                          y: 35,
                          rotate: HERO_ROTATIONS[index] + 8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: [0, index % 2 ? -13 : -9, 0],
                          rotate: [
                            HERO_ROTATIONS[index] + 3,
                            HERO_ROTATIONS[index] - 2,
                            HERO_ROTATIONS[index],
                          ],
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.82,
                          y: -25,
                          rotate: HERO_ROTATIONS[index] * -1,
                          transition: {
                            duration: 0.45,
                            ease: SECTION_EASE,
                          },
                        }}
                        transition={{
                          opacity: {
                            duration: 0.55,
                            delay: index * 0.08,
                          },
                          scale: {
                            duration: 0.65,
                            delay: index * 0.08,
                            ease: SECTION_EASE,
                          },
                          y: {
                            duration: 4.8 + index * 0.35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.8 + index * 0.2,
                          },
                          rotate: {
                            duration: 5.5 + index * 0.35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.8 + index * 0.2,
                          },
                        }}
                        whileHover={{
                          y: -14,
                          scale: 1.055,
                          rotate: 0,
                          zIndex: 50,
                          transition: {
                            duration: 0.25,
                          },
                        }}
                        className={`absolute ${HERO_POSITIONS[index]} z-10 h-[40%] w-[39%] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-2.5 shadow-[0_30px_80px_-24px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:h-[43%] sm:w-[37%] sm:p-3`}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-[#151b2e] to-[#0b1020]">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 40vw, 22vw"
                            className="object-contain p-4 drop-shadow-2xl"
                            priority={index < 2}
                          />

                          <div className="pointer-events-none absolute inset-x-4 bottom-3 h-10 rounded-full bg-[#4F6EF7]/10 blur-xl" />

                          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 opacity-0 backdrop-blur-xl transition duration-300 hover:opacity-100">
                            <p className="truncate text-[10px] font-bold text-white">
                              {product.title}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ))}
            </div>

            {/* Floating accent */}

            <motion.div
              aria-hidden="true"
              animate={{
                x: [0, 20, 0],
                y: [0, -12, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[13%] top-[2%] hidden h-14 w-14 rounded-2xl border border-white/10 bg-white/[0.045] shadow-xl backdrop-blur-xl sm:block"
            />
          </motion.div>
        </div>

        {/* Rotation indicator */}

        {!loading && featured.length > 4 && (
          <div className="relative z-20 mx-auto mt-2 flex justify-center gap-1.5">
            {Array.from({
              length: Math.ceil(featured.length / 4),
            })
              .slice(0, 8)
              .map((_, index) => (
                <motion.span
                  key={index}
                  animate={{
                    width: index === heroSet % Math.ceil(featured.length / 4) ? 22 : 5,
                    opacity:
                      index === heroSet % Math.ceil(featured.length / 4)
                        ? 1
                        : 0.3,
                  }}
                  className="h-1.5 rounded-full bg-[#4F6EF7]"
                />
              ))}
          </div>
        )}
      </section>

      {/* ===================================================
          TRUST
      =================================================== */}

      <section className="relative border-y border-white/[0.08] bg-white/[0.025] px-4 py-9 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/[0.08]">
          {PROMISES.map(({ icon: Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="flex gap-4 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#4F6EF7]/10 bg-[#4F6EF7]/[0.07] text-[#4F6EF7] shadow-sm">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================================
          CATEGORIES
      =================================================== */}

      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#4F6EF7]">
              <Flame className="h-3.5 w-3.5" />

              Shop by mood
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Find your next favourite.
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Four departments, one beautifully simple checkout.
            </p>
          </motion.div>

          <Link
            href="/categories"
            className="hidden items-center gap-2 text-sm font-bold text-[#4F6EF7] sm:inline-flex"
          >
            See all categories

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: SECTION_EASE,
              }}
              className={category.span}
            >
              <Link
                href={`/categories/${encodeURIComponent(
                  category.slug
                )}`}
                className={`group relative flex h-full overflow-hidden rounded-[2rem] bg-gradient-to-br ${category.tone} p-6 text-white shadow-[0_22px_60px_-28px_rgba(15,23,42,0.4)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(15,23,42,0.5)]`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.28),transparent_30%)]" />

                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/15 bg-white/10 transition duration-700 group-hover:scale-125" />

                <div className="relative z-10 flex h-full w-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-md">
                      Explore
                    </span>

                    <ArrowUpRight className="h-5 w-5 opacity-70 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                      {category.label}
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-white/75">
                      {category.blurb}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                      Shop now

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================================================
          PRODUCTS
      =================================================== */}

      <section className="relative border-y border-white/[0.07] bg-white/[0.018] px-4 py-24 backdrop-blur-[2px] sm:py-28">
        <div
          aria-hidden="true"
          className="absolute left-[-180px] top-20 h-80 w-80 rounded-full bg-indigo-400/10 blur-[90px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#4F6EF7]">
                <Zap className="h-3.5 w-3.5" />

                Curated for you
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                Picked for you.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Explore a bigger selection of products worth discovering,
                all in one place.
              </p>
            </motion.div>

            <Link
              href="/shop"
              className="hidden items-center gap-2 text-sm font-bold text-[#4F6EF7] sm:inline-flex"
            >
              View everything

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {loading
              ? Array.from({
                  length: 45,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.035] p-2 shadow-sm"
                  >
                    <div className="aspect-square animate-pulse rounded-[1.15rem] bg-white/[0.06]" />

                    <div className="space-y-2 p-3">
                      <div className="h-2 w-1/3 animate-pulse rounded bg-white/[0.06]" />

                      <div className="h-4 w-4/5 animate-pulse rounded bg-white/[0.06]" />

                      <div className="h-5 w-1/3 animate-pulse rounded bg-white/[0.06]" />
                    </div>
                  </div>
                ))
              : featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{
                      opacity: 0,
                      y: 22,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: (index % 5) * 0.045,
                      ease: SECTION_EASE,
                    }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.045] p-2 shadow-[0_16px_45px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-[#4F6EF7]/20 hover:shadow-[0_28px_55px_-25px_rgba(79,110,247,0.28)]"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-[#111729] via-[#0b1020] to-[#121a32]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(79,110,247,0.12),transparent_52%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          className="object-contain p-5 drop-shadow-lg transition duration-700 group-hover:scale-110 group-hover:-rotate-1"
                        />

                        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-slate-300 opacity-0 shadow-sm backdrop-blur-xl transition duration-300 group-hover:opacity-100">
                          View product
                        </div>

                        <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-[-4px] items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-slate-400 opacity-0 shadow-sm backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <Heart className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col px-2.5 pb-2.5 pt-3">
                        <p className="truncate text-[9px] font-black uppercase tracking-[0.14em] text-[#4F6EF7]">
                          {product.category}
                        </p>

                        <h3 className="mt-1 line-clamp-2 min-h-[2.65rem] text-sm font-bold leading-5 text-slate-100">
                          {product.title}
                        </h3>

                        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                          <span className="text-lg font-black tracking-tight text-white">
                            ${product.price}
                          </span>

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1020] text-white transition duration-300 group-hover:bg-[#4F6EF7]">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          BUILT FOR DISCOVERY
      =================================================== */}

      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:py-28">
        <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-slate-950 px-6 py-10 text-white shadow-[0_35px_90px_-35px_rgba(15,23,42,0.55)] sm:min-h-[560px] sm:px-10 sm:py-14 lg:min-h-[520px] lg:px-14">
          {/* Background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(79,110,247,0.42),transparent_32%),radial-gradient(circle_at_84%_80%,rgba(34,211,238,0.18),transparent_30%)]" />

          <div
            aria-hidden="true"
            className="absolute right-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full border border-white/[0.05]"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-150px] left-[35%] h-[350px] w-[350px] rounded-full border border-white/[0.04]"
          />

          <div className="relative grid items-center gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
            {/* COPY */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="relative z-20"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                <Tag className="h-3.5 w-3.5" />

                Built for discovery
              </span>

              <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                A better way to discover what you actually want.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                SHOPORA brings categories, products and checkout together
                without making shopping feel complicated.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-6 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Explore the collection

                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Rotation indicator */}

              {!loading && spotlightProducts.length > 0 && (
                <div className="mt-7 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Discovering
                  </span>

                  <div className="flex gap-1.5">
                    {Array.from({ length: 6 }).map((_, index) => {
                      const totalProducts = Math.max(featured.length - 12, 1);
                      const productsPerDot = Math.ceil(totalProducts / 6);
                      const activeDot = Math.min(
                        5,
                        Math.floor(
                          (spotlightSet % totalProducts) / productsPerDot
                        )
                      );

                      return (
                        <span
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            index === activeDot
                              ? "w-6 bg-[#4F6EF7]"
                              : "w-1.5 bg-white/20"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* =================================================
                SPOTLIGHT PRODUCT STAGE

                One featured product is shown at a time beside the copy,
                with enough room to display the full image.
            ================================================= */}

            <div className="relative w-full">
              {/* Ground glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6EF7]/15 blur-3xl"
              />

              <div className="relative">
                <AnimatePresence mode="wait">
                  {!loading &&
                    spotlightProducts.map((product, index) => (
                      <motion.div
                        key={`${spotlightSet}-${product.id}`}
                        initial={{
                          opacity: 0,
                          x: 70,
                          y: 24,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          x: -60,
                          y: -20,
                          scale: 0.96,
                          transition: {
                            duration: 0.45,
                            ease: SECTION_EASE,
                          },
                        }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.14,
                          ease: SECTION_EASE,
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.015,
                          transition: {
                            duration: 0.25,
                          },
                        }}
                        className="relative h-[340px] w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.07] p-2 shadow-2xl backdrop-blur-xl sm:h-[400px] lg:h-[420px]"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-white/[0.09] to-white/[0.025]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,110,247,0.18),transparent_55%)]" />

                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-contain p-8 drop-shadow-2xl sm:p-10"
                          />

                          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-slate-950/75 px-4 py-3 backdrop-blur-xl">
                            <p className="truncate text-xs font-bold text-white sm:text-sm">
                              {product.title}
                            </p>

                            <p className="mt-1 text-xs font-black text-[#7F96FF]">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading state */}

                {loading &&
                  Array.from({
                    length: 1,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="h-[340px] w-full animate-pulse rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-2 sm:h-[400px] lg:h-[420px]"
                    >
                      <div className="h-full w-full rounded-[1.35rem] bg-white/[0.06]" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          HOW IT WORKS
      =================================================== */}

      <section className="relative overflow-hidden px-4 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#4F6EF7]">
              Simple by design
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Shopping made effortless.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Discover what you want, save what you love, and checkout when
              you&apos;re ready.
            </p>
          </motion.div>

          <div className="relative grid gap-5 md:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-transparent via-[#4F6EF7]/20 to-transparent md:block"
            />

            {[
              {
                number: "01",
                title: "Discover",
                body: "Explore categories and browse a growing collection of products selected for everyday shopping.",
              },
              {
                number: "02",
                title: "Choose",
                body: "Compare products, save favourites and build your basket around what works for you.",
              },
              {
                number: "03",
                title: "Checkout",
                body: "Review your order, choose delivery and complete your purchase through the secure checkout flow.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: SECTION_EASE,
                }}
                className="group relative rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-7 shadow-[0_20px_55px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#4F6EF7]/20 hover:shadow-[0_30px_65px_-30px_rgba(79,110,247,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4F6EF7]/10 text-sm font-black text-[#4F6EF7] ring-1 ring-[#4F6EF7]/10">
                    {step.number}
                  </span>

                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#4F6EF7]" />
                </div>

                <h3 className="mt-8 text-xl font-black text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ
      =================================================== */}

      <section className="relative border-y border-white/[0.07] bg-white/[0.018] px-4 py-24 backdrop-blur-xl sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#4F6EF7]">
                <Sparkles className="h-3.5 w-3.5" />

                Need to know?
              </span>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                Questions, answered.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                Everything you need to know before you start shopping with
                SHOPORA.
              </p>

              <div className="mt-8 hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.035] p-5 sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F6EF7]/10 text-[#4F6EF7]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-100">
                      Shop with confidence
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Secure checkout and clear order information.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={faq.question}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.025, 0.25),
                    }}
                    className={`group overflow-hidden rounded-[1.35rem] border backdrop-blur-xl transition duration-300 ${
                      isOpen
                        ? "border-[#4F6EF7]/25 bg-white/[0.055] shadow-[0_18px_45px_-32px_rgba(79,110,247,0.55)]"
                        : "border-white/[0.07] bg-white/[0.025] hover:border-[#4F6EF7]/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`text-sm font-bold sm:text-base ${
                          isOpen
                            ? "text-[#4F6EF7]"
                            : "text-slate-100"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isOpen
                            ? "bg-[#4F6EF7] text-white"
                            : "bg-white/[0.06] text-slate-400"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: "easeInOut",
                          }}
                        >
                          <p className="px-5 pb-5 text-sm leading-7 text-slate-400 sm:px-6">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CLOSING CTA
      =================================================== */}

      <section className="relative px-4 pb-24 pt-24 sm:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-slate-950 px-6 py-16 text-center shadow-[0_40px_100px_-35px_rgba(15,23,42,0.65)] sm:px-10 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,110,247,0.5),transparent_38%),radial-gradient(circle_at_20%_100%,rgba(34,211,238,0.15),transparent_28%)]" />

          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200">
              <ShoppingBag className="h-3.5 w-3.5" />

              Your shopping journey starts here
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
              Save your basket. Track your orders. Shop your way.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Create an account and your cart, wishlist and delivery details
              follow you to every device.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-7 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Create an account

                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 text-sm font-black text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Log in

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
