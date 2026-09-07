"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Sparkles } from "lucide-react";

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

// How many pills show inline on desktop/tablet before "See more"
const VISIBLE_COUNT = 8;

export default function Categories({ active, onChange }: Props) {
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visible = categories.slice(0, VISIBLE_COUNT);
  const overflow = categories.slice(VISIBLE_COUNT);
  const activeInOverflow = overflow.some((c) => c.name === active);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(name: string) {
    onChange(name);
    setShowMore(false);
  }

  return (
    <section className="mb-10">
      {/* =========================
          Rebranded Heading
      ========================= */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl"
            >
              <Sparkles className="w-5 h-5 text-[#4F6EF7]" />
            </motion.span>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Shop Your{" "}
              <motion.span
                className="
                  bg-gradient-to-r from-[#4F6EF7] via-indigo-500 to-[#4F6EF7]
                  bg-[length:200%_100%]
                  bg-clip-text
                  text-transparent
                "
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                World
              </motion.span>
            </h2>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Tap a category, we&apos;ll handle the rest
          </p>
        </div>
      </div>

      {/* =========================
          Active Category Indicator
      ========================= */}
      <AnimatePresence>
        {active !== "All" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="
                inline-flex items-center gap-2
                px-3.5 py-1.5
                rounded-full
                bg-[#4F6EF7]/10
                border border-[#4F6EF7]/20
                text-xs font-semibold text-[#4F6EF7]
              "
            >
              Browsing:
              <span className="font-bold">{active}</span>
              <button
                onClick={() => handleSelect("All")}
                className="ml-1 rounded-full hover:bg-[#4F6EF7]/20 p-0.5 transition-colors"
                aria-label="Clear category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          Desktop / Tablet — wrapped pills + See More dropdown
      ========================= */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <div className="flex flex-wrap items-center gap-3">
          {visible.map((cat, i) => (
            <CategoryPill
              key={cat.name}
              cat={cat}
              index={i}
              isActive={active === cat.name}
              onClick={() => handleSelect(cat.name)}
            />
          ))}

          {/* See More Button */}
          <motion.button
            onClick={() => setShowMore((prev) => !prev)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: VISIBLE_COUNT * 0.04 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2
              px-5 py-3 rounded-2xl
              border transition-all duration-300
              backdrop-blur-xl
              shadow-sm hover:shadow-lg
              text-sm font-semibold
              ${
                activeInOverflow
                  ? "bg-gradient-to-r from-[#4F6EF7] to-[#3B5BDB] text-white border-transparent"
                  : "bg-white/80 text-gray-700 border-gray-200 hover:border-[#4F6EF7] hover:text-[#4F6EF7]"
              }
            `}
          >
            {activeInOverflow ? active : "See more"}
            <motion.span
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </div>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="
                absolute left-0 top-full mt-3
                w-full max-w-md
                grid grid-cols-2 sm:grid-cols-3 gap-2
                p-4
                bg-white
                border border-gray-100
                rounded-2xl
                shadow-2xl
                z-30
              "
            >
              {overflow.map((cat) => {
                const isActive = active === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleSelect(cat.name)}
                    className={`
                      flex items-center gap-2
                      px-3 py-2.5 rounded-xl
                      text-sm font-medium
                      transition-colors
                      ${
                        isActive
                          ? "bg-[#4F6EF7] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span>{cat.emoji}</span>
                    {cat.name}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================
          Mobile — horizontal scroll, unchanged behavior
      ========================= */}
      <div
        className="
          md:hidden
          flex items-center gap-4
          overflow-x-auto
          whitespace-nowrap
          scrollbar-hide
          snap-x snap-mandatory
          scroll-smooth
          py-2
        "
      >
        {categories.map((cat, i) => (
          <CategoryPill
            key={cat.name}
            cat={cat}
            index={i}
            isActive={active === cat.name}
            onClick={() => handleSelect(cat.name)}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================
   Shared Pill Component
========================= */
function CategoryPill({
  cat,
  index,
  isActive,
  onClick,
}: {
  cat: { name: string; emoji: string };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.06, y: -2 }}
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
            ? "bg-gradient-to-r from-[#4F6EF7] to-[#3B5BDB] text-white border-transparent shadow-blue-200"
            : "bg-white/80 text-gray-700 border-gray-200 hover:border-[#4F6EF7] hover:text-[#4F6EF7]"
        }
      `}
    >
      <span className="text-lg">{cat.emoji}</span>
      <span className="text-sm font-semibold">{cat.name}</span>
    </motion.button>
  );
}