"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  ShoppingCart,
  Menu,
  User,
  Settings,
  LogOut,
  UserCircle,
  Package,
} from "lucide-react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const [hidden, setHidden] = useState(false);
  const [floating, setFloating] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

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

  /* =========================
     Close Profile Menu on Outside Click
  ========================= */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     Log Out

     signOut() clears the NextAuth session cookie server-side and
     redirects — callbackUrl sends them to the landing page where
     they'll see the logged-out header.
  ========================= */
  function handleLogout() {
    setProfileMenu(false);
    signOut({ callbackUrl: "/" });
  }

  return (
    <>
      {/* =========================
          Full-width opaque backdrop
          Covers the entire top strip so nothing scrolls up
          behind/around the rounded header card while floating
      ========================= */}
      {floating && (
        <div className="fixed top-0 left-0 right-0 h-24 bg-white dark:bg-black z-40" />
      )}

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
                <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-lg relative">
                  <Image
                     src="/branding/shopora-logo.png"
                     alt="Shopora logo"
                     fill
                     className="object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    SHOPORA
                  </h1>
                  <p className="text-xs text-gray-500">
                    Modern Shopping Experience
                  </p>
                </div>
              </Link>


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

                {/* =========================
                    Profile (logged in) OR
                    Login / Sign Up (logged out)
                ========================= */}
                {isAuthenticated ? (
                  <div className="relative hidden md:block" ref={profileRef}>
                    <button
                      onClick={() => setProfileMenu((prev) => !prev)}
                      className="
                        flex
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

                    <AnimatePresence>
                      {profileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="
                            absolute right-0 mt-3
                            w-56
                            bg-white dark:bg-gray-900
                            border border-gray-100 dark:border-white/10
                            shadow-2xl
                            rounded-2xl
                            overflow-hidden
                            z-50
                          "
                        >
                          {/* Signed-in-as header — small real-data
                              touch that's easy to add now that the
                              session is real. */}
                          {session?.user?.name && (
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                              <p className="text-xs text-gray-400">
                                Signed in as
                              </p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                                {session.user.name}
                              </p>
                            </div>
                          )}

                          <Link
                            href="/profile"
                            onClick={() => setProfileMenu(false)}
                            className="
                              flex items-center gap-3
                              px-4 py-3
                              text-sm font-medium text-gray-700 dark:text-gray-200
                              hover:bg-gray-50 dark:hover:bg-white/10
                              transition-colors
                            "
                          >
                            <UserCircle className="w-4 h-4" />
                            My Profile
                          </Link>

                          <Link
                            href="/orders"
                            onClick={() => setProfileMenu(false)}
                            className="
                              flex items-center gap-3
                              px-4 py-3
                              text-sm font-medium text-gray-700 dark:text-gray-200
                              hover:bg-gray-50 dark:hover:bg-white/10
                              transition-colors
                            "
                          >
                            <Package className="w-4 h-4" />
                            My Orders
                          </Link>

                          <Link
                            href="/settings"
                            onClick={() => setProfileMenu(false)}
                            className="
                              flex items-center gap-3
                              px-4 py-3
                              text-sm font-medium text-gray-700 dark:text-gray-200
                              hover:bg-gray-50 dark:hover:bg-white/10
                              transition-colors
                            "
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>

                          <div className="border-t border-gray-100 dark:border-white/10" />

                          <button
                            onClick={handleLogout}
                            className="
                              w-full
                              flex items-center gap-3
                              px-4 py-3
                              text-sm font-medium text-red-500
                              hover:bg-red-50 dark:hover:bg-red-500/10
                              transition-colors
                            "
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      href="/login"
                      className="
                        h-11
                        px-4
                        rounded-2xl
                        flex items-center justify-center
                        text-sm font-semibold
                        text-gray-700 dark:text-gray-200
                        bg-gray-100 dark:bg-white/10
                        hover:bg-gray-200 dark:hover:bg-white/20
                        transition-all duration-300
                      "
                    >
                      Log In
                    </Link>

                    <Link
                      href="/register"
                      className="
                        h-11
                        px-4
                        rounded-2xl
                        flex items-center justify-center
                        text-sm font-semibold
                        text-white
                        bg-[#4F6EF7]
                        hover:bg-[#405BD4]
                        transition-all duration-300
                      "
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

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

                    <div className="border-t border-gray-100 dark:border-white/10 pt-5 flex flex-col gap-5">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href="/profile"
                            onClick={() => setMobileMenu(false)}
                            className="text-sm font-medium text-gray-700"
                          >
                            My Profile
                          </Link>

                          <Link
                            href="/orders"
                            onClick={() => setMobileMenu(false)}
                            className="text-sm font-medium text-gray-700"
                          >
                            My Orders
                          </Link>

                          <Link
                            href="/settings"
                            onClick={() => setMobileMenu(false)}
                            className="text-sm font-medium text-gray-700"
                          >
                            Settings
                          </Link>

                          <button
                            onClick={() => {
                              setMobileMenu(false);
                              handleLogout();
                            }}
                            className="text-sm font-medium text-red-500 text-left"
                          >
                            Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={() => setMobileMenu(false)}
                            className="text-sm font-medium text-gray-700"
                          >
                            Log In
                          </Link>

                          <Link
                            href="/register"
                            onClick={() => setMobileMenu(false)}
                            className="text-sm font-semibold text-[#4F6EF7]"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  );
}
