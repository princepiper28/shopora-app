// pages/login.tsx

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Placeholder for real authentication.
    alert(`Logging in as ${email}`);
  }

  return (
    <>
      <Head>
        <title>Login — Shopora</title>
      </Head>

      <Header />

      <main className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold">
            Welcome back
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border p-3"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-3"
              required
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-shopora-primary py-3 text-white"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            <span>Don&apos;t have an account? </span>

            <Link
              href="/register"
              className="font-medium text-shopora-accent"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}