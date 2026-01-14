// pages/about.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Head><title>About — Shopora</title></Head>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Shopora</h1>
        <p className="text-gray-700 mb-4">
          Shopora is a modern, smooth and stylish e-commerce demo built for developers and designers.
        </p>

        <section className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Our Mission</h3>
            <p className="text-sm text-gray-500">Deliver high-quality shopping experiences.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Design</h3>
            <p className="text-sm text-gray-500">Inter + Poppins, modern e-commerce patterns.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Team</h3>
            <p className="text-sm text-gray-500">Small, focused, and design-first.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
