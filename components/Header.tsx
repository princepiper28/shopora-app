// components/Header.tsx

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
  ChevronDown,
  ArrowUpRight,
  X,
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

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  const [hidden, setHidden] = useState(false);
  const [floating, setFloating] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  /* =========================================================
     HIDE HEADER ON SCROLL DOWN
  ========================================================== */

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollDifference = latest - previous;

  // Always show the header near the top of the page.
    if (latest <= 80) {
      setHidden(false);
      return;
    }

  // Keep the header accessible while a menu is open.
    if (mobileMenu || profileMenu) {
      setHidden(false);
      return;
    }

  // Ignore tiny movements to prevent flickering.
    if (Math.abs(scrollDifference) < 4) return;

  // Hide on scroll down; reveal on scroll up.
    if (scrollDifference > 0 && latest > 120) {
      setHidden(true);
    } else if (scrollDifference < 0) {
      setHidden(false);
    }
    });

  /* =========================================================
     DETECT HERO SECTION EXIT
  ========================================================== */

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFloating(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     CLOSE PROFILE MENU ON OUTSIDE CLICK
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     CLOSE MENUS WHEN ESCAPE IS PRESSED
  ========================================================== */

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenu(false);
        setProfileMenu(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     LOG OUT
  ========================================================== */

  function handleLogout() {
    setProfileMenu(false);
    setMobileMenu(false);

    void signOut({
      callbackUrl: "/",
    });
  }

  /* =========================================================
     CLOSE MOBILE MENU AFTER NAVIGATION
  ========================================================== */

  function handleMobileNavigation() {
    setMobileMenu(false);
  }

  return (
    <>
      {/* Floating header backdrop */}

      {floating && (
        <div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-40 h-24 bg-[#050711]/85 backdrop-blur-xl"
        />
      )}

      {/* Header */}

      <motion.header
        animate={{
          y: hidden && floating ? -120 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`left-0 right-0 top-0 z-50 ${
          floating ? "fixed" : "relative"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={[
              "relative overflow-visible",
              "rounded-2xl",
              "border border-white/[0.07]",
              "bg-[#080b15]/80",
              "backdrop-blur-2xl",
              "shadow-[0_12px_50px_rgba(0,0,0,0.22)]",
            ].join(" ")}
          >
            {/* Desktop / tablet header */}

            <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-5 lg:px-6">
              {/* Logo */}

              <Link
                href="/"
                className="group flex shrink-0 items-center gap-3"
                aria-label="SHOPORA home"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/branding/shopora-logo.png"
                    alt="SHOPORA logo"
                    fill
                    sizes="40px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="hidden sm:block">
                  <h1 className="text-[17px] font-semibold tracking-[-0.035em] text-white">
                    SHOPORA
                  </h1>

                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/30">
                    Discover. Shop. Enjoy.
                  </p>
                </div>
              </Link>

              {/* Primary navigation */}

              <nav className="hidden items-center gap-1 lg:flex">
                <HeaderNavLink
                  href="/home"
                  label="Home"
                />

                <HeaderNavLink
                  href="/shop"
                  label="Shop"
                />

                <HeaderNavLink
                  href="/deals"
                  label="Deals"
                />

                <HeaderNavLink
                  href="/about"
                  label="About"
                />
              </nav>

              {/* Right-side actions */}

              <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                {/* Favorites and Cart: authenticated users only */}

                {isAuthenticated && (
                  <>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Wishlist */}

                      <HeaderIconButton
                        href="/favorites"
                        label="Favorites"
                        count={wishlistCount}
                        countClassName="bg-rose-500"
                      >
                        <Heart
                          size={17}
                          strokeWidth={1.8}
                          className="transition-transform duration-200 group-hover:scale-105"
                        />
                      </HeaderIconButton>

                      {/* Cart */}

                      <HeaderIconButton
                        href="/cart"
                        label="Cart"
                        count={cartCount}
                        countClassName="bg-[#4F6EF7]"
                      >
                        <ShoppingCart
                          size={17}
                          strokeWidth={1.8}
                          className="transition-transform duration-200 group-hover:scale-105"
                        />
                      </HeaderIconButton>
                    </div>

                    <div className="mx-1 hidden h-7 w-px bg-white/[0.08] sm:block" />
                  </>
                )}

                {/* Account */}

                {isAuthenticated ? (
                  <div
                    ref={profileRef}
                    className="relative ml-1 hidden md:block"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setProfileMenu((previous) => !previous)
                      }
                      aria-expanded={profileMenu}
                      aria-haspopup="menu"
                      className={[
                        "flex h-10 items-center gap-2",
                        "rounded-xl",
                        "border border-white/[0.07]",
                        "bg-white/[0.035]",
                        "px-2.5",
                        "text-white/65",
                        "transition-all duration-200",
                        "hover:border-white/[0.12]",
                        "hover:bg-white/[0.07]",
                        "hover:text-white",
                        "focus:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-blue-500/40",
                      ].join(" ")}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.07]">
                        <User
                          size={15}
                          strokeWidth={1.8}
                        />
                      </div>

                      <span className="hidden max-w-[100px] truncate text-xs font-medium lg:block">
                        {session?.user?.name || "Account"}
                      </span>

                      <ChevronDown
                        size={13}
                        strokeWidth={1.7}
                        className={[
                          "hidden transition-transform duration-200 lg:block",
                          profileMenu ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>

                    {/* Profile dropdown */}

                    <AnimatePresence>
                      {profileMenu && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97,
                          }}
                          transition={{
                            duration: 0.16,
                            ease: "easeOut",
                          }}
                          className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d17]/95 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                          role="menu"
                        >
                          {/* Account header */}

                          <div className="border-b border-white/[0.07] px-4 py-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                              Account
                            </p>

                            <p className="mt-1.5 truncate text-sm font-medium text-white">
                              {session?.user?.name ||
                                session?.user?.email ||
                                "SHOPORA customer"}
                            </p>

                            {session?.user?.email && (
                              <p className="mt-0.5 truncate text-xs text-white/30">
                                {session.user.email}
                              </p>
                            )}
                          </div>

                          <div className="p-1.5">
                            <ProfileMenuLink
                              href="/profile"
                              icon={UserCircle}
                              label="My Profile"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuLink
                              href="/orders"
                              icon={Package}
                              label="My Orders"
                              onClick={() => setProfileMenu(false)}
                            />

                            <ProfileMenuLink
                              href="/settings"
                              icon={Settings}
                              label="Settings"
                              onClick={() => setProfileMenu(false)}
                            />

                            <div className="my-1.5 border-t border-white/[0.07]" />

                            <button
                              type="button"
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/[0.08] hover:text-rose-300"
                            >
                              <LogOut
                                size={16}
                                strokeWidth={1.7}
                              />

                              <span>Log Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : status === "loading" ? (
                  <div
                    aria-label="Loading account"
                    className="hidden h-10 w-24 animate-pulse rounded-xl bg-white/[0.04] md:block"
                  />
                ) : (
                  /* Logged-out desktop actions */

                  <div className="ml-1 hidden items-center gap-2 md:flex">
                    <Link
                      href="/login"
                      className="flex h-10 items-center justify-center rounded-xl px-3.5 text-xs font-semibold text-white/60 transition-colors hover:text-white"
                    >
                      Log in
                    </Link>

                    <Link
                      href="/register"
                      className="group flex h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-semibold text-[#050711] transition-all duration-200 hover:bg-[#4F6EF7] hover:text-white"
                    >
                      Get started

                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}

                <button
                  type="button"
                  onClick={() =>
                    setMobileMenu((previous) => !previous)
                  }
                  aria-label={
                    mobileMenu
                      ? "Close navigation"
                      : "Open navigation"
                  }
                  aria-expanded={mobileMenu}
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white lg:hidden"
                >
                  <AnimatePresence
                    mode="wait"
                    initial={false}
                  >
                    {mobileMenu ? (
                      <motion.span
                        key="close"
                        initial={{
                          opacity: 0,
                          rotate: -90,
                        }}
                        animate={{
                          opacity: 1,
                          rotate: 0,
                        }}
                        exit={{
                          opacity: 0,
                          rotate: 90,
                        }}
                      >
                        <X
                          size={18}
                          strokeWidth={1.8}
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{
                          opacity: 0,
                          rotate: 90,
                        }}
                        animate={{
                          opacity: 1,
                          rotate: 0,
                        }}
                        exit={{
                          opacity: 0,
                          rotate: -90,
                        }}
                      >
                        <Menu
                          size={18}
                          strokeWidth={1.8}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Mobile navigation */}

            <AnimatePresence initial={false}>
              {mobileMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden border-t border-white/[0.07] lg:hidden"
                >
                  <div className="px-4 pb-5 pt-4">
                    {/* Main links */}

                    <div className="space-y-1">
                      <MobileNavLink
                        href="/home"
                        label="Home"
                        onClick={handleMobileNavigation}
                      />

                      <MobileNavLink
                        href="/shop"
                        label="Shop"
                        onClick={handleMobileNavigation}
                      />

                      <MobileNavLink
                        href="/categories"
                        label="Categories"
                        onClick={handleMobileNavigation}
                      />

                      <MobileNavLink
                        href="/deals"
                        label="Deals"
                        onClick={handleMobileNavigation}
                      />

                      <MobileNavLink
                        href="/about"
                        label="About"
                        onClick={handleMobileNavigation}
                      />
                    </div>

                    {/* Mobile authenticated actions */}

                    {isAuthenticated && (
                      <div className="mt-4 border-t border-white/[0.07] pt-4">
                        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                          Shopping
                        </p>

                        <MobileNavLink
                          href="/favorites"
                          label={`Favorites${wishlistCount > 0 ? ` (${wishlistCount})` : ""}`}
                          icon={Heart}
                          onClick={handleMobileNavigation}
                        />

                        <MobileNavLink
                          href="/cart"
                          label={`Cart${cartCount > 0 ? ` (${cartCount})` : ""}`}
                          icon={ShoppingCart}
                          onClick={handleMobileNavigation}
                        />
                      </div>
                    )}

                    {/* Account section */}

                    <div className="mt-4 border-t border-white/[0.07] pt-4">
                      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                        {isAuthenticated ? "Account" : "Welcome"}
                      </p>

                      {isAuthenticated ? (
                        <div className="space-y-1">
                          <MobileNavLink
                            href="/profile"
                            label="My Profile"
                            icon={UserCircle}
                            onClick={handleMobileNavigation}
                          />

                          <MobileNavLink
                            href="/orders"
                            label="My Orders"
                            icon={Package}
                            onClick={handleMobileNavigation}
                          />

                          <MobileNavLink
                            href="/settings"
                            label="Settings"
                            icon={Settings}
                            onClick={handleMobileNavigation}
                          />

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/[0.08]"
                          >
                            <LogOut
                              size={16}
                              strokeWidth={1.7}
                            />

                            <span>Log Out</span>
                          </button>
                        </div>
                      ) : status === "loading" ? (
                        <div className="h-11 animate-pulse rounded-xl bg-white/[0.04]" />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/login"
                            onClick={handleMobileNavigation}
                            className="flex h-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
                          >
                            Log in
                          </Link>

                          <Link
                            href="/register"
                            onClick={handleMobileNavigation}
                            className="flex h-11 items-center justify-center rounded-xl bg-[#4F6EF7] text-sm font-semibold text-white transition-colors hover:bg-[#405BD4]"
                          >
                            Get started
                          </Link>
                        </div>
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

/* ===============================================================
   HEADER NAV LINK
================================================================ */

function HeaderNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-9 items-center rounded-lg px-3 text-xs font-medium text-white/45 transition-colors hover:text-white"
    >
      {label}

      <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-white/60 transition-transform duration-200 group-hover:scale-x-100" />
    </Link>
  );
}

/* ===============================================================
   HEADER ICON BUTTON
================================================================ */

function HeaderIconButton({
  href,
  label,
  count,
  countClassName,
  children,
}: {
  href: string;
  label: string;
  count: number;
  countClassName: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-white/50 transition-all duration-200 hover:border-white/[0.07] hover:bg-white/[0.05] hover:text-white"
    >
      <motion.span
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.94,
        }}
      >
        {children}
      </motion.span>

      {count > 0 && (
        <span
          className={[
            "absolute -right-0.5 -top-0.5",
            "flex h-[17px] min-w-[17px]",
            "items-center justify-center",
            "rounded-full px-1",
            "text-[9px] font-bold text-white",
            "ring-2 ring-[#080b15]",
            countClassName,
          ].join(" ")}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

/* ===============================================================
   PROFILE MENU LINK
================================================================ */

function ProfileMenuLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white"
    >
      <Icon
        size={16}
        strokeWidth={1.7}
      />

      <span>{label}</span>

      <ArrowUpRight
        size={12}
        strokeWidth={1.7}
        className="ml-auto opacity-0 transition-opacity group-hover:opacity-50"
      />
    </Link>
  );
}

/* ===============================================================
   MOBILE NAV LINK
================================================================ */

function MobileNavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
    >
      {Icon && (
        <Icon
          size={16}
          strokeWidth={1.7}
        />
      )}

      <span>{label}</span>

      <ArrowUpRight
        size={13}
        strokeWidth={1.7}
        className="ml-auto opacity-25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
      />
    </Link>
  );
}
