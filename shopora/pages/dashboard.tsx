// pages/dashboard.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Head><title>Dashboard — Shopora</title></Head>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$0.00</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Products</h3>
            <p className="text-2xl font-bold mt-2">20</p>
          </div>
        </section>

        <section className="mt-6 bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-3">Recent activity</h2>
          <p className="text-sm text-gray-500">No activity in the demo.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
