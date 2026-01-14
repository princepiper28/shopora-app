// pages/register.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Registering ${name} (${email})`);
  }

  return (
    <>
      <Head><title>Register — Shopora</title></Head>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full p-3 border rounded" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded" required />
            <button className="w-full bg-shopora-primary text-white py-3 rounded-lg">Create account</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
