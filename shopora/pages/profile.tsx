// pages/profile.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  // For now use static/mocked info; later replace with real user state
  return (
    <>
      <Head><title>Profile — Shopora</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <section className="col-span-1 bg-white p-4 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 mb-3" />
              <h2 className="font-semibold">Jane Doe</h2>
              <p className="text-sm text-gray-500">jane@example.com</p>
              <button className="mt-3 px-3 py-2 bg-shopora-primary text-white rounded">Edit profile</button>
            </div>
          </section>

          <section className="md:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Recent Orders</h3>
              <p className="text-sm text-gray-500">No recent orders in this demo.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-gray-500">Manage notifications, addresses, and payment methods here.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
