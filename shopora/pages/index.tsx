// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";

interface HomeProps {
  products: Product[];
}

export default function Home({ products = [] }: HomeProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 22;

  const filtered = products.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "All" || p.category.toLowerCase() === category.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));
  const start = (currentPage - 1) * productsPerPage;
  const visible = filtered.slice(start, start + productsPerPage);

  return (
    <>
      <Head>
        <title>Shopora — Product Catalog</title>
      </Head>


      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <Hero />
          <Categories />
        {/* filter */}
        <section className="mb-6 sticky top-16 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-md border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-shopora-accent"
            />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 rounded-lg border border-gray-200"
            >
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </section>

        {/* grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {visible.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>

          {visible.length === 0 && <p className="text-center py-12 text-gray-500">No products found.</p>}
        </section>

        {/* pagination */}
        <section className="mt-8 flex justify-center items-center gap-4">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded bg-gray-100 disabled:opacity-40">Previous</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-gray-100 disabled:opacity-40">Next</button>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await fetchProducts();
    return { props: { products } };
  } catch (err) {
    console.error(err);
    return { props: { products: [] } };
  }
};
