"use client";

import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";
import { fetchAllProducts } from "@/lib/api";

const showcaseProducts = [
  {
    id: 1,
    image: "/products/p1.avif",
    name: "Smart Watch",
    position: "top-[2%] left-[30%]",
    size: "w-[190px]",
  },
  {
    id: 2,
    image: "/products/p2.jpeg",
    name: "Headphones",
    position: "top-[35%] left-[2%]",
    size: "w-[180px]",
  },
  {
    id: 3,
    image: "/products/p3.avif",
    name: "Sneakers",
    position: "top-[16%] right-[0%]",
    size: "w-[190px]",
  },
  {
    id: 4,
    image: "/products/p4.jpeg",
    name: "Backpack",
    position: "bottom-[2%] left-[34%]",
    size: "w-[180px]",
  },
];

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const headingLine: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function AnimatedNumber({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;
    const duration = 1400;
    let raf: number;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

function ProductsCounter({ isInView }: { isInView: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    async function run() {
      for (let i = 1; i <= 999; i += 9) {
        if (cancelled) return;
        setDisplay(String(i));
        await new Promise((r) => setTimeout(r, 6));
      }
      if (cancelled) return;
      setDisplay("999");
      await new Promise((r) => setTimeout(r, 150));

      for (let k = 1; k <= 10; k++) {
        if (cancelled) return;
        setDisplay(`${k}K`);
        await new Promise((r) => setTimeout(r, 90));
      }
      if (cancelled) return;
      setDisplay("10K+");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [isInView]);

  return <>{display}</>;
}

const metrics = [
  { label: "Products", type: "products" as const },
  { label: "Brands", target: 50, suffix: "+" },
  { label: "Delivery", target: 24, suffix: "H" },
];

function MobileShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const product = showcaseProducts[index];

  return (
    <div className="flex w-[112px] shrink-0 flex-col items-center lg:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.94 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.08]
            p-2
            shadow-[0_20px_45px_rgba(0,0,0,0.3)]
            backdrop-blur-2xl
          "
        >
          <div className="overflow-hidden rounded-xl bg-white">
            <Image
              src={product.image}
              alt={product.name}
              width={140}
              height={140}
              className="aspect-square w-full object-cover"
            />
          </div>

          <p className="mt-2 truncate text-center text-[10px] font-semibold text-white">
            {product.name}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-2 flex gap-1">
        {showcaseProducts.map((p, i) => (
          <span
            key={p.id}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-3 bg-white" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();

  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  /* =========================
     Live search — now backed by the shared fetchAllProducts()
  ========================= */
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllProducts()
      .then(setAllProducts)
      .catch((err) => {
        console.error(err);
        setAllProducts([]);
      })
      .finally(() => setLoadingProducts(false));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmedQuery = query.trim().toLowerCase();
  const queryWords = trimmedQuery.split(/\s+/).filter(Boolean);

  const results = trimmedQuery
    ? allProducts
        .filter((p) => {
          const haystack = `${p.title} ${p.category} ${p.description ?? ""}`.toLowerCase();
          return queryWords.every((word) => haystack.includes(word));
        })
        .slice(0, 6)
    : [];

  function goToFullResults() {
    if (!trimmedQuery) return;
    setIsFocused(false);
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  }

  function goToProduct(id: number) {
    setIsFocused(false);
    router.push(`/product/${id}`);
  }

  return (
    <section
      id="hero"
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-blue-900
        text-white
        min-h-[calc(100svh-110px)]
        flex
        items-center
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/20
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-[380px]
          w-[380px]
          rounded-full
          bg-indigo-500/20
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-6
          py-8
          lg:px-8
          lg:py-10
        "
      >
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-8
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-3.5
                py-1.5
                text-xs
                font-medium
                text-blue-100
                backdrop-blur-xl
              "
            >
              <Sparkles size={14} className="text-blue-300" />
              New arrivals every week
            </motion.div>

            <div className="flex flex-row items-center gap-4 lg:block">
              <motion.h1
                variants={headingContainer}
                initial="hidden"
                animate="show"
                className="
                  flex-1
                  text-4xl
                  font-black
                  leading-[0.98]
                  tracking-tight
                  sm:text-5xl
                  lg:max-w-3xl
                  lg:text-[clamp(2.8rem,5vw,5.2rem)]
                  lg:leading-[0.94]
                  lg:tracking-[-0.045em]
                "
              >
                <motion.span variants={headingLine} className="block">
                  Anything
                </motion.span>

                <motion.span
                  variants={headingLine}
                  className="block text-blue-300"
                >
                  You Want.
                </motion.span>

                <motion.span variants={headingLine} className="block">
                  Delivered
                </motion.span>

                <motion.span variants={headingLine} className="block">
                  <motion.span
                    className="
                      bg-gradient-to-r from-white via-blue-300 to-white
                      bg-[length:200%_100%]
                      bg-clip-text
                      text-transparent
                    "
                    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                  >
                    Beautifully.
                  </motion.span>
                </motion.span>
              </motion.h1>

              <MobileShowcase />
            </div>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-6
                text-blue-100/80
                sm:text-base
              "
            >
              Discover trending products, premium brands,
              and exclusive deals crafted for modern
              shopping.
            </p>

            <div ref={searchRef} className="relative mt-6 max-w-xl">
              <div
                className="
                  flex
                  items-center
                  rounded-full
                  border
                  border-white/10
                  bg-white
                  p-1.5
                  shadow-[0_20px_60px_rgba(0,0,0,0.2)]
                "
              >
                <Search size={19} className="ml-3 shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToFullResults();
                  }}
                  placeholder="Search anything..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    py-2.5
                    text-sm
                    text-black
                    outline-none
                    placeholder:text-gray-400
                  "
                />

                <button
                  onClick={goToFullResults}
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    bg-[#4F6EF7]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:scale-[1.03]
                    hover:bg-[#5d7afb]
                  "
                >
                  Explore
                  <ArrowRight size={16} />
                </button>
              </div>

              <AnimatePresence>
                {isFocused && trimmedQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="
                      absolute
                      left-0
                      right-0
                      top-[calc(100%+10px)]
                      z-30
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      text-black
                      shadow-2xl
                    "
                  >
                    {loadingProducts ? (
                      <p className="px-4 py-4 text-sm text-gray-500">
                        Loading products...
                      </p>
                    ) : results.length > 0 ? (
                      <>
                        {results.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => goToProduct(p.id)}
                            className="
                              flex w-full items-center gap-3
                              px-4 py-3
                              text-left
                              hover:bg-gray-50
                              transition-colors
                            "
                          >
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                              <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {p.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${p.price}
                              </p>
                            </div>
                          </button>
                        ))}

                        <button
                          onClick={goToFullResults}
                          className="
                            w-full
                            border-t border-gray-100
                            px-4 py-3
                            text-center text-xs font-semibold text-[#4F6EF7]
                            hover:bg-gray-50
                            transition-colors
                          "
                        >
                          See all results for &quot;{query.trim()}&quot;
                        </button>
                      </>
                    ) : (
                      <p className="px-4 py-4 text-sm text-gray-500">
                        No products found for &quot;{query.trim()}&quot;
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-x-2
                text-xs
                text-blue-200/70
              "
            >
              <span className="font-medium text-blue-100">Trending:</span>
              <span>iPhone</span>
              <span>•</span>
              <span>Sneakers</span>
              <span>•</span>
              <span>Watches</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:scale-[1.03]
                  hover:bg-blue-50
                  "
              >
                Shop Now
              </Link>

              <Link
                href="/deals"
                 className="
                  rounded-xl
                  border
                  border-white/15
                  bg-white/[0.04]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                "
              >
                Best Deals
              </Link>
            </div>

            <div ref={metricsRef} className="mt-7 flex items-center gap-7 sm:gap-10">
              {metrics.map((item, index) => (
                <div key={item.label} className="flex items-center gap-7 sm:gap-10">
                  <div>
                    <p className="text-xl font-bold tracking-tight sm:text-2xl">
                      {item.type === "products" ? (
                        <ProductsCounter isInView={metricsInView} />
                      ) : (
                        <AnimatedNumber
                          target={item.target!}
                          suffix={item.suffix!}
                          isInView={metricsInView}
                        />
                      )}
                    </p>

                    <p className="mt-0.5 text-[11px] text-blue-200/70 sm:text-xs">
                      {item.label}
                    </p>
                  </div>

                  {index !== metrics.length - 1 && (
                    <div className="h-8 w-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative hidden h-[480px] lg:block"
          >
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[360px]
                w-[360px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/[0.06]
                bg-white/[0.025]
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[270px]
                w-[270px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/[0.05]
              "
            />

            {showcaseProducts.map((product, index) => (
              <motion.div
                key={product.id}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, index % 2 === 0 ? 1 : -1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + index * 0.5,
                  ease: "easeInOut",
                }}
                className={`
                  absolute
                  ${product.position}
                  ${product.size}
                  rounded-[26px]
                  border
                  border-white/10
                  bg-white/[0.08]
                  p-3
                  shadow-[0_25px_60px_rgba(0,0,0,0.3)]
                  backdrop-blur-2xl
                `}
              >
                <div className="overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    priority={index < 2}
                    className="
                      aspect-square
                      w-full
                      object-cover
                      transition
                      duration-500
                      hover:scale-105
                    "
                  />
                </div>

                <div className="px-1 pb-1 pt-2">
                  <p className="text-center text-xs font-semibold text-white">
                    {product.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
