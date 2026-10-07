"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Heart,
  ShoppingCart,
  Plus,
} from "lucide-react";

import { Product } from "@/types/product";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFav = isInWishlist(product.id);

  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    if (justAdded) return;

    addToCart(product);
    setJustAdded(true);

    window.setTimeout(() => {
      setJustAdded(false);
    }, 1600);
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        dark:bg-gray-800

        ${
          justAdded
            ? "border-[#4F6EF7] shadow-[0_12px_40px_rgba(79,110,247,0.18)]"
            : "border-gray-100 hover:border-[#4F6EF7]/30 hover:shadow-2xl dark:border-white/10"
        }
      `}
    >
      {/* =========================================================
          SELECTED BADGE
      ========================================================= */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.9,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              left-3
              top-3
              z-40

              flex
              items-center
              gap-1.5

              rounded-full
              bg-[#4F6EF7]

              px-3
              py-1.5

              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-white

              shadow-lg
            "
          >
            <Check className="h-3 w-3" />
            Selected
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          PRODUCT IMAGE
      ========================================================= */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-gray-50
          dark:bg-white/5
        "
      >
        {/* Product link */}
        <Link
          href={`/product/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 z-0"
        >
          <motion.div
            className="
              relative
              h-full
              w-full
              p-6
            "
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
              className="object-contain"
            />
          </motion.div>
        </Link>

        {/* =======================================================
            HOVER OVERLAY

            Appears whenever the user hovers ANYWHERE on the card.
        ======================================================= */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10

            bg-gradient-to-t
            from-black/20
            via-black/0
            to-black/0

            opacity-0

            transition-opacity
            duration-300

            group-hover:opacity-100
          "
        />

        {/* =========================================================
            WISHLIST BUTTON
        ========================================================= */}
        <motion.button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleWishlist(product);
          }}
          whileTap={{
            scale: 0.8,
          }}
          className="
            absolute
            right-3
            top-3
            z-30

            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full
            border
            border-black/5

            bg-white/90
            shadow-md
            backdrop-blur-md

            transition-all
            duration-200

            hover:scale-105

            dark:border-white/10
            dark:bg-black/60
          "
          aria-label={
            isFav
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <motion.span
            key={isFav ? "fav" : "not-fav"}
            initial={{
              scale: 0.4,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <Heart
              className={`
                h-4
                w-4
                transition-colors
                duration-200

                ${
                  isFav
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 dark:text-gray-300"
                }
              `}
            />
          </motion.span>
        </motion.button>

        {/* =======================================================
            DESKTOP ADD TO CART

            Wrapper div owns static positioning/centering
            (-translate-x-1/2) so Framer Motion's inline
            transform style — driven by animate/whileHover/
            whileTap on the button itself — never has to share
            the transform property with a Tailwind utility class.
        ======================================================= */}
        <div
          className="
            absolute
            left-1/2
            bottom-5
            z-30

            -translate-x-1/2

            hidden
            md:block
          "
        >
          <motion.button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleAddToCart();
            }}
            initial={false}
            animate={{
              y: 16,
              opacity: 0,
            }}
            whileHover={{
              y: 0,
              opacity: 1,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              pointerEvents: "auto",
            }}
            className={`
              flex
              w-[170px]
              h-11
              items-center
              justify-center

              rounded-full

              text-xs
              font-bold
              tracking-wide
              text-white

              shadow-[0_10px_30px_rgba(79,110,247,0.35)]

              backdrop-blur-xl

              ${
                justAdded
                  ? "bg-emerald-600 shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                  : "bg-[#4F6EF7] hover:bg-[#405BD4]"
              }
            `}
          >
            <span className="relative flex h-full w-full items-center justify-center">
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <ShoppingCart className="h-4 w-4 shrink-0" />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </div>

      {/* =========================================================
          PRODUCT DETAILS
      ========================================================= */}
      <div
        className="
          flex
          flex-1
          flex-col
          p-4
        "
      >
        {/* Category */}
        <Link
          href={`/product/${product.id}`}
          className="w-fit"
        >
          <p
            className="
              mb-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#4F6EF7]
              transition-colors
              duration-200
              hover:text-[#405BD4]
            "
          >
            {product.category}
          </p>
        </Link>

        {/* Product title */}
        <Link
          href={`/product/${product.id}`}
          className="group/title"
        >
          <h3
            className="
              min-h-[2.5rem]
              line-clamp-2

              text-sm
              font-semibold
              leading-5

              text-gray-900

              transition-colors
              duration-200

              group-hover/title:text-[#4F6EF7]

              dark:text-white
            "
          >
            {product.title}
          </h3>
        </Link>

        {/* =====================================================
            PRICE + MOBILE ADD BUTTON
        ===================================================== */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* Price */}
          <span
            className="
              text-lg
              font-extrabold
              text-gray-900
              dark:text-white
            "
          >
            ${product.price}
          </span>

          {/* ===================================================
              MOBILE ADD BUTTON
          =================================================== */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{
              scale: 0.9,
            }}
            className={`
              relative
              flex
              h-10
              w-[100px]

              items-center
              justify-center

              overflow-hidden
              rounded-xl

              text-white

              shadow-sm

              transition-all
              duration-300

              md:hidden

              ${
                justAdded
                  ? "bg-emerald-600"
                  : "bg-[#4F6EF7] hover:bg-[#405BD4]"
              }
            `}
            aria-label={
              justAdded
                ? `${product.title} added to cart`
                : `Add ${product.title} to cart`
            }
          >
            <span className="relative h-full w-full">
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      gap-1.5
                    "
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-bold">
                      Added
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="cart"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      gap-1.5
                    "
                  >
                    <Plus className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-bold">
                      Add
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
