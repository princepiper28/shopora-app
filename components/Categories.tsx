"use client";

import {
  Activity,
  Baby,
  BookOpen,
  ChevronDown,
  CircleX,
  Cpu,
  Dumbbell,
  Gamepad2,
  Gem,
  House,
  Menu,
  MoreHorizontal,
  Music2,
  Palette,
  Shirt,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CategoriesProps = {
  active: string;
  onChange: (category: string) => void;
};

type Category = {
  name: string;
  icon: React.ElementType;
};

const categories: Category[] = [
  { name: "All", icon: ShoppingBag },
  { name: "Electronics", icon: Cpu },
  { name: "Fashion", icon: Shirt },
  { name: "Men", icon: Shirt },
  { name: "Women", icon: Shirt },
  { name: "Kids", icon: Baby },
  { name: "Jewelry", icon: Gem },
  { name: "Home", icon: House },
  { name: "Sports", icon: Dumbbell },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Beauty", icon: Sparkles },
  { name: "Industrial", icon: Wrench },
  { name: "Crafts", icon: Palette },
  { name: "Office", icon: Menu },
  { name: "Musical", icon: Music2 },
  { name: "Appliances", icon: Activity },
  { name: "Food", icon: Utensils },
  { name: "Books", icon: BookOpen },
];

const VISIBLE_COUNT = 8;

function CategoryNavItem({
  category,
  active,
  onChange,
}: {
  category: Category;
  active: boolean;
  onChange: (category: string) => void;
}) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={() => onChange(category.name)}
      aria-pressed={active}
      className={[
        "group relative flex h-11 shrink-0 items-center gap-2.5",
        "rounded-xl border px-4",
        "text-[13px] font-medium tracking-[-0.01em]",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        active
          ? "border-white/10 bg-white text-[#050711] shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
          : "border-transparent bg-transparent text-white/55 hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white",
      ].join(" ")}
    >
      <Icon
        size={16}
        strokeWidth={active ? 2.1 : 1.7}
        className={[
          "shrink-0 transition-colors duration-200",
          active
            ? "text-[#050711]"
            : "text-white/40 group-hover:text-blue-400",
        ].join(" ")}
      />

      <span>{category.name}</span>

      {active && (
        <motion.span
          layoutId="category-active-dot"
          className="ml-0.5 h-1 w-1 rounded-full bg-blue-500"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
        />
      )}
    </button>
  );
}

function MobileCategoryItem({
  category,
  active,
  onChange,
}: {
  category: Category;
  active: boolean;
  onChange: (category: string) => void;
}) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={() => onChange(category.name)}
      aria-pressed={active}
      className={[
        "flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5",
        "text-[12px] font-medium tracking-[-0.01em]",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        active
          ? "border-white/10 bg-white text-[#050711]"
          : "border-white/[0.07] bg-white/[0.025] text-white/55 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white",
      ].join(" ")}
    >
      <Icon
        size={15}
        strokeWidth={active ? 2.1 : 1.7}
        className={
          active ? "text-[#050711]" : "text-white/40"
        }
      />

      <span>{category.name}</span>
    </button>
  );
}

export default function Categories({
  active,
  onChange,
}: CategoriesProps) {
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const visibleCategories = categories.slice(0, VISIBLE_COUNT);
  const overflowCategories = categories.slice(VISIBLE_COUNT);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setShowMore(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setShowMore(false);
  }, [active]);

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-5 bg-blue-500/80" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-400/90">
                Explore
              </span>
            </div>

            <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-white sm:text-[25px]">
              Shop by category
            </h2>
          </div>

          {active !== "All" && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              onClick={() => onChange("All")}
              className="group hidden items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white sm:flex"
            >
              <span>Browsing:</span>

              <span className="text-white/75">
                {active}
              </span>

              <CircleX
                size={14}
                strokeWidth={1.7}
                className="ml-0.5 transition-transform duration-200 group-hover:rotate-90"
              />
            </motion.button>
          )}
        </div>

        {/* Desktop / Tablet Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center rounded-2xl border border-white/[0.07] bg-white/[0.018] p-1.5">
            <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
              {visibleCategories.map((category) => (
                <CategoryNavItem
                  key={category.name}
                  category={category}
                  active={active === category.name}
                  onChange={onChange}
                />
              ))}
            </div>

            {/* More */}
            {overflowCategories.length > 0 && (
              <div
                ref={moreRef}
                className="relative ml-1 shrink-0 border-l border-white/[0.07] pl-1"
              >
                <button
                  type="button"
                  onClick={() => setShowMore((value) => !value)}
                  aria-expanded={showMore}
                  aria-haspopup="menu"
                  className={[
                    "flex h-11 items-center gap-2 rounded-xl px-4",
                    "text-[13px] font-medium",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                    showMore
                      ? "bg-white/[0.07] text-white"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                  ].join(" ")}
                >
                  <MoreHorizontal
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span>More</span>

                  <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className={[
                      "transition-transform duration-200",
                      showMore ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.16,
                        ease: "easeOut",
                      }}
                      className="absolute right-0 top-[calc(100%+10px)] z-40 w-60 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d17]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                      role="menu"
                    >
                      <div className="mb-1 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                          More categories
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        {overflowCategories.map((category) => {
                          const Icon = category.icon;
                          const isActive = active === category.name;

                          return (
                            <button
                              key={category.name}
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                onChange(category.name);
                                setShowMore(false);
                              }}
                              className={[
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
                                "text-left text-[13px] font-medium",
                                "transition-colors duration-150",
                                isActive
                                  ? "bg-white text-[#050711]"
                                  : "text-white/55 hover:bg-white/[0.05] hover:text-white",
                              ].join(" ")}
                            >
                              <Icon
                                size={16}
                                strokeWidth={isActive ? 2 : 1.7}
                              />

                              <span className="flex-1">
                                {category.name}
                              </span>

                              {isActive && (
                                <span className="h-1 w-1 rounded-full bg-blue-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-2">
              {categories.map((category) => (
                <MobileCategoryItem
                  key={category.name}
                  category={category}
                  active={active === category.name}
                  onChange={onChange}
                />
              ))}
            </div>
          </div>

          {/* Mobile active state */}
          <AnimatePresence mode="wait">
            {active !== "All" && (
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -4,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-white/30">
                      Browsing
                    </span>

                    <span className="h-1 w-1 rounded-full bg-blue-500" />

                    <span className="font-medium text-white/75">
                      {active}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onChange("All")}
                    aria-label="Clear category filter"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <X size={14} strokeWidth={1.8} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
