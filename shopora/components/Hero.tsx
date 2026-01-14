"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcaseProducts = [
  { id: 1, image: "/products/p1.png", name: "Smart Watch" },
  { id: 2, image: "/products/p2.png", name: "Headphones" },
  { id: 3, image: "/products/p3.png", name: "Sneakers" },
  { id: 4, image: "/products/p4.png", name: "Backpack" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-12">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Shop Smart. <br /> Live Better.
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">
            Discover trending products, exclusive deals, and premium brands.
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Shop Now
            </button>
            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition">
              Best Deals
            </button>
          </div>
        </motion.div>

        {/* RIGHT MOVING CARDS */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="flex gap-6 absolute"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...showcaseProducts, ...showcaseProducts].map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 w-40 shadow-xl text-gray-900"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={120}
                  height={120}
                  className="mx-auto"
                />
                <p className="text-sm text-center mt-2 font-medium">
                  {p.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
