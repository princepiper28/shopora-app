// pages/login.tsx
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // placeholder — integrate real auth later
    alert(`Logging in as ${email}`);
  }

  return (
    <>
      <Head>
        <title>Login — Shopora</title>
      </Head>

      <Header />

      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
            <button className="w-full bg-shopora-primary text-white py-3 rounded-lg">Login</button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-shopora-accent font-medium">Create one</Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
