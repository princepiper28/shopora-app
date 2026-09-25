// pages/product/[id].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { fetchProductById } from "@/lib/api";

interface Props {
  product: Product | null;
}

export default function ProductPage({ product }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto">Product not found</main>
        <Footer />
      </>
    );
  }

  const isFav = isInWishlist(product.id);

  return (
    <>
      <Head>
        <title>{product.title} — Shopora</title>
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        <div className="relative bg-white rounded-lg p-4 h-96">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4 capitalize">{product.category}</p>
          <p className="text-3xl font-extrabold text-shopora-accent mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product)}
              className="px-5 py-3 rounded-lg bg-shopora-primary text-white"
            >
              Add to cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`px-5 py-3 rounded-lg border ${
                isFav ? "border-red-500 text-red-500" : ""
              }`}
            >
              {isFav ? "❤️ In Wishlist" : "🤍 Wishlist"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const product = await fetchProductById(id);
  return { props: { product } };
};
