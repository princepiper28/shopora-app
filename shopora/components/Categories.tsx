"use client";

import { motion } from "framer-motion";

interface Props {
  active: string;
  onChange: (category: string) => void;
}

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Electronics", emoji: "💻" },
  { name: "Fashion", emoji: "👕" },
  { name: "Men", emoji: "👔" },
  { name: "Women", emoji: "👗" },
  { name: "Kids", emoji: "🧸" },
  { name: "Jewelry", emoji: "💎" },
  { name: "Home", emoji: "🏠" },
  { name: "Sports", emoji: "⚽" },
  { name: "Gaming", emoji: "🎮" },
  { name: "Beauty", emoji: "💄" },
  { name: "Industrial", emoji: "🏭" },
  { name: "Crafts", emoji: "🎨" },
  { name: "Office", emoji: "🖨️" },
  { name: "Musical", emoji: "🎵" },
  { name: "Appliances", emoji: "🧊" },
  { name: "Food", emoji: "🍔" },
  { name: "Books", emoji: "📚" },
];

export default function Categories({ active, onChange }: Props) {
  return (
    <section className="mb-10">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Shop by Category
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Explore products by category
          </p>
        </div>
      </div>

      {/* Categories */}
      <div
        className="
          flex items-center gap-4
          overflow-x-auto
          whitespace-nowrap
          scrollbar-hide
          snap-x snap-mandatory
          scroll-smooth
          py-2
        "
      >
        {categories.map((cat, i) => {
          const isActive = active === cat.name;

          return (
            <motion.button
              key={cat.name}
              onClick={() => onChange(cat.name)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{
                scale: 1.06,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className={`
                snap-start flex-shrink-0
                flex items-center gap-3
                px-5 py-3 rounded-2xl
                border transition-all duration-300
                backdrop-blur-xl
                shadow-sm hover:shadow-lg
                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-[#4F6EF7]
                      to-[#3B5BDB]
                      text-white
                      border-transparent
                      shadow-blue-200
                    `
                    : `
                      bg-white/80
                      text-gray-700
                      border-gray-200
                      hover:border-[#4F6EF7]
                      hover:text-[#4F6EF7]
                    `
                }
              `}
            >
              {/* Emoji */}
              <span className="text-lg">
                {cat.emoji}
              </span>

              {/* Name */}
              <span className="text-sm font-semibold">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}