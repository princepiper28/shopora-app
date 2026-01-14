// pages/wishlist.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/components/WishlistContext";
import { fetchProducts } from "@/lib/api";
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function WishlistPage({ products }: { products: Product[] }) {
  const { wishlist } = useWishlist();
  const favorites = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <Head><title>Wishlist — Shopora</title></Head>
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((p) => <ProductCard product={p} key={p.id} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchProducts();
  return { props: { products } };
};
