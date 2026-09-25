"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types/product";

/* =========================================================
   CATEGORY TILES

   Mapped to the real fakestoreapi category slugs so the
   links land on a populated page instead of an empty grid.
========================================================= */
const CATEGORIES = [
  {
    slug: "men's clothing",
    label: "Men's clothing",
    blurb: "Jackets, tees and everyday staples",
    span: "md:col-span-2 md:row-span-2",
    tone: "from-[#4F6EF7] to-[#6C4FF7]",
  },
  {
    slug: "jewelery",
    label: "Jewellery",
    blurb: "Rings, chains and gifts",
    span: "md:col-span-1",
    tone: "from-amber-500 to-orange-500",
  },
  {
    slug: "electronics",
    label: "Electronics",
    blurb: "Drives, monitors and more",
    span: "md:col-span-1",
    tone: "from-slate-700 to-slate-900",
  },
  {
    slug: "women's clothing",
    label: "Women's clothing",
    blurb: "New season arrivals",
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

export default function Landing() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data: Product[]) => setFeatured(data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* =====================================================
          HERO

          NOTE: id="hero" is required — Header.tsx observes
          this element to decide when to switch to its
          floating state. Do not rename or remove it.
      ===================================================== */}
      <section
        id="hero"
        className="
          relative
          overflow-hidden
          px-4
          pb-20
          pt-16
          md:pb-28
          md:pt-24
        "
      >
        {/* Soft brand wash behind the hero */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -top-40
            left-1/2
            h-[520px]
            w-[820px]
            -translate-x-1/2
            rounded-full
            bg-[#4F6EF7]/10
            blur-3xl
            dark:bg-[#4F6EF7]/20
          "
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          {/* ---------- Left: copy ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#4F6EF7]/20
                bg-[#4F6EF7]/5
                px-3.5
                py-1.5
                text-xs
                font-semibold
                text-[#4F6EF7]
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              New season, new prices
            </span>

            <h1
              className="
                mt-6
                text-4xl
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-gray-900
                sm:text-5xl
                lg:text-6xl
                dark:text-white
              "
            >
              Everything you need,
              <br />
              in one place.
            </h1>

            <p
              className="
                mt-5
                max-w-md
                text-base
                leading-relaxed
                text-gray-600
                dark:text-gray-400
              "
            >
              Clothing, jewellery and electronics from brands worth buying —
              with honest prices, fast delivery and returns that actually work.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#4F6EF7]
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#4F6EF7]/25
                  transition-colors
                  duration-200
                  hover:bg-[#405BD4]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#4F6EF7]
                "
              >
                Create an account
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/shop"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-6
                  text-sm
                  font-bold
                  text-gray-900
                  transition-colors
                  duration-200
                  hover:border-[#4F6EF7]/40
                  hover:text-[#4F6EF7]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#4F6EF7]
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              >
                Browse the shop
              </Link>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Already shopping with us?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#4F6EF7] underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </p>
          </motion.div>

          {/* ---------- Right: product collage ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md md:max-w-none"
          >
            <div className="grid grid-cols-2 gap-4">
              {(loading ? Array.from({ length: 4 }) : featured.slice(0, 4)).map(
                (item, i) => (
                  <div
                    key={(item as Product)?.id ?? i}
                    className={`
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-3xl
                      border
                      border-gray-100
                      bg-gray-50
                      shadow-sm
                      dark:border-white/10
                      dark:bg-white/5

                      ${i % 2 === 1 ? "md:translate-y-8" : ""}
                    `}
                  >
                    {!loading && (item as Product)?.image && (
                      <Image
                        src={(item as Product).image}
                        alt={(item as Product).title}
                        fill
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className="object-contain p-6"
                        priority={i < 2}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PROMISES
      ===================================================== */}
      <section className="border-y border-gray-100 bg-gray-50/60 px-4 py-12 dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-[#4F6EF7]
                  shadow-sm
                  dark:bg-white/10
                "
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Shop by category
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Four departments, one checkout.
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden shrink-0 text-sm font-semibold text-[#4F6EF7] hover:underline sm:block"
          >
            See all categories
          </Link>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${encodeURIComponent(cat.slug)}`}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-gradient-to-br
                ${cat.tone}
                ${cat.span}

                p-6
                text-white
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-xl
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#4F6EF7]
              `}
            >
              <div className="relative z-10 flex h-full flex-col justify-end">
                <h3 className="text-xl font-extrabold tracking-tight">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-white/80">{cat.blurb}</p>

                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Shop now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>

              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-10
                  -top-10
                  h-40
                  w-40
                  rounded-full
                  bg-white/10
                  transition-transform
                  duration-500
                  group-hover:scale-125
                "
              />
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Picked for you
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              A sample of what's moving this week.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden shrink-0 text-sm font-semibold text-[#4F6EF7] hover:underline sm:block"
          >
            View everything
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"
                />
              ))
            : featured.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="
                    group
                    flex
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-shadow
                    duration-300
                    hover:shadow-xl
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#4F6EF7]
                    dark:border-white/10
                    dark:bg-gray-800
                  "
                >
                  <div className="relative aspect-square bg-gray-50 dark:bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] font-semibold text-[#4F6EF7]">
                      {product.category}
                    </p>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-gray-900 dark:text-white">
                      {product.title}
                    </h3>

                    <span className="mt-3 text-lg font-extrabold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* =====================================================
          CLOSING CTA
      ===================================================== */}
      <section className="px-4 pb-24">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-[#4F6EF7]
            to-[#3B4FD6]
            px-8
            py-16
            text-center
            shadow-2xl
            shadow-[#4F6EF7]/20
          "
        >
          <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Save your basket, track your orders
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/80">
            Create an account and your cart, wishlist and delivery details
            follow you to every device.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                rounded-2xl
                bg-white
                px-7
                text-sm
                font-bold
                text-[#4F6EF7]
                transition-transform
                duration-200
                hover:scale-[1.02]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              Create an account
            </Link>

            <Link
              href="/login"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/30
                px-7
                text-sm
                font-bold
                text-white
                transition-colors
                duration-200
                hover:bg-white/10
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}