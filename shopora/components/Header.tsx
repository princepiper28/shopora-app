"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Menu,
  Search,
  User,
} from "lucide-react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const [hidden, setHidden] = useState(false);
  const [floating, setFloating] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { scrollY } = useScroll();

  /* =========================
     Hide Header on Scroll Down
  ========================= */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  /* =========================
     Detect Hero Section Exit
  ========================= */
  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      animate={{
        y: hidden && floating ? -120 : 0,
      }}
      transition={{ duration: 0.35 }}
      className={`top-0 left-0 right-0 z-50 ${
        floating ? "fixed" : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div
          className="
            bg-white/80 dark:bg-black/50
            backdrop-blur-2xl
            border border-white/20
            shadow-2xl
            rounded-3xl
            px-5 md:px-8
            py-4
          "
        >
          <div className="flex items-center justify-between gap-4">
            {/* =========================
                Logo
            ========================= */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="
                  w-11 h-11 rounded-2xl
                  bg-gradient-to-br from-[#4F6EF7] to-[#3B5BDB]
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Shopora
                </h1>
                <p className="text-xs text-gray-500">
                  Modern Shopping Experience
                </p>
              </div>
            </Link>

          
            {/* =========================
                Search Bar
            ========================= */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div
                className="
                  w-full flex items-center gap-3
                  bg-gray-100 dark:bg-white/10
                  rounded-2xl
                  px-4 py-3
                  border border-transparent
                  focus-within:border-[#4F6EF7]
                  transition-all
                "
              >
                <Search className="w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search for products..."
                  className="
                    bg-transparent
                    outline-none
                    w-full
                    text-sm
                    text-gray-700 dark:text-white
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            {/* =========================
                Actions
            ========================= */}
            <div className="flex items-center gap-3">
              {/* Favorites */}
              <Link href="/favorites">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    relative
                    w-11 h-11
                    rounded-2xl
                    bg-gray-100 dark:bg-white/10
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-[#4F6EF7]
                    hover:text-white
                    transition-all duration-300
                  "
                >
                  <Heart className="w-5 h-5" />

                  {wishlistCount > 0 && (
                    <span
                      className="
                        absolute -top-1 -right-1
                        min-w-[20px] h-5
                        px-1
                        rounded-full
                        bg-red-500
                        text-white
                        text-[11px]
                        font-bold
                        flex items-center justify-center
                      "
                    >
                      {wishlistCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    relative
                    w-11 h-11
                    rounded-2xl
                    bg-gray-100 dark:bg-white/10
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-[#4F6EF7]
                    hover:text-white
                    transition-all duration-300
                  "
                >
                  <ShoppingCart className="w-5 h-5" />

                  {cartCount > 0 && (
                    <span
                      className="
                        absolute -top-1 -right-1
                        min-w-[20px] h-5
                        px-1
                        rounded-full
                        bg-[#4F6EF7]
                        text-white
                        text-[11px]
                        font-bold
                        flex items-center justify-center
                      "
                    >
                      {cartCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* Profile */}
              <button
                className="
                  hidden md:flex
                  w-11 h-11
                  rounded-2xl
                  bg-gray-100 dark:bg-white/10
                  items-center justify-center
                  hover:bg-[#4F6EF7]
                  hover:text-white
                  transition-all duration-300
                "
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="
                  lg:hidden
                  w-11 h-11
                  rounded-2xl
                  bg-gray-100 dark:bg-white/10
                  flex items-center justify-center
                "
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* =========================
              Mobile Menu
          ========================= */}
          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-6 flex flex-col gap-5">
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700"
                  >
                    Home
                  </Link>

                  <Link
                    href="/shop"
                    className="text-sm font-medium text-gray-700"
                  >
                    Shop
                  </Link>

                  <Link
                    href="/categories"
                    className="text-sm font-medium text-gray-700"
                  >
                    Categories
                  </Link>

                  <Link
                    href="/deals"
                    className="text-sm font-medium text-gray-700"
                  >
                    Deals
                  </Link>

                  <div
                    className="
                      flex items-center gap-3
                      bg-gray-100
                      rounded-2xl
                      px-4 py-3
                    "
                  >
                    <Search className="w-5 h-5 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Search..."
                      className="
                        bg-transparent
                        outline-none
                        w-full
                        text-sm
                      "
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}