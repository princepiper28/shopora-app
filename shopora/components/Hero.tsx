"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";

const showcaseProducts = [
  { id: 1, image: "/products/p1.avif", name: "Smart Watch" },
  { id: 2, image: "/products/p2.jpeg", name: "Headphones" },
  { id: 3, image: "/products/p3.avif", name: "Sneakers" },
  { id: 4, image: "/products/p4.jpeg", name: "Backpack" },
];

const metrics = [
  {
    value: "10K+",
    label: "Products",
  },
  {
    value: "50+",
    label: "Brands",
  },
  {  
    value: "24H",
    label: "Delivery",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative
        overflow-hidden
        rounded-[40px]
        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-blue-900
        text-white
        mb-12
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-[-220px]
          right-[-220px]
          w-[520px]
          h-[520px]
          rounded-full
          bg-blue-500/20
          blur-[160px]
        "
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Announcement */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                mb-8
              "
            >
              ✨ New arrivals every week
            </motion.div>

            {/* Heading */}

            <h1
              className="
                text-5xl
                lg:text-7xl
                font-black
                leading-[1.05]
                mb-6
              "
            >
              Anything
              <br />

              <span className="text-blue-300">
                You Want.
              </span>

              <br />

              Delivered
              <br />

              Beautifully.
            </h1>

            {/* Description */}

            <p
              className="
                text-lg
                text-blue-100
                max-w-xl
                mb-8
              "
            >
              Discover trending products, premium brands,
              and exclusive deals crafted for modern shopping.
            </p>

            {/* SEARCH */}

            <div
              className="
                bg-white
                rounded-full
                p-2
                flex
                items-center
                mb-5
                max-w-xl
              "
            >
              <Search className="text-gray-400 ml-4" />

              <input
                placeholder="Search anything..."
                className="
                  flex-1
                  px-4
                  py-3
                  outline-none
                  text-black
                  bg-transparent
                "
              />

              <button
                className="
                  bg-[#4F6EF7]
                  hover:scale-105
                  transition
                  px-7
                  py-3
                  rounded-full
                  font-semibold
                "
              >
                Explore
              </button>
            </div>

            {/* Trending */}

            <p className="text-blue-200 mb-8">
              Trending:
              <span className="ml-2">
                iPhone • Sneakers • Watches
              </span>
            </p>

            {/* CTA */}

            <div className="flex gap-4 mb-10">
              <button
                className="
                  bg-white
                  text-black
                  px-7
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Shop Now
              </button>

              <button
                className="
                  border
                  border-white/20
                  px-7
                  py-4
                  rounded-2xl
                  hover:bg-white/10
                "
              >
                Best Deals
              </button>
            </div>

            {/* Metrics */}

            <div className="flex gap-8">
              {metrics.map((item) => (
                <div key={item.label}>
                  <h3 className="text-3xl font-bold">
                    {item.value}
                  </h3>

                  <p className="text-blue-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}

          <div className="relative h-[520px]">

            {showcaseProducts.map((p, i) => (
              <motion.div
                key={p.id}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + i,
                }}
                className={`
                  absolute
                  bg-white/10
                  backdrop-blur-2xl
                  rounded-[32px]
                  shadow-[0_30px_80px_rgba(0,0,0,0.3)]
                  border
                  border-white/10
                  p-5
                `}
                style={{
                  top:
                    i === 0
                      ? "0%"
                      : i === 1
                      ? "35%"
                      : i === 2
                      ? "18%"
                      : "60%",

                  left:
                    i === 0
                      ? "28%"
                      : i === 1
                      ? "5%"
                      : i === 2
                      ? "60%"
                      : "35%",
                }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={220}
                  height={220}
                  priority
                  className="
                    rounded-3xl
                    object-cover
                  "
                />

                <p
                  className="
                    mt-4
                    text-center
                    font-semibold
                  "
                >
                  {p.name}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}