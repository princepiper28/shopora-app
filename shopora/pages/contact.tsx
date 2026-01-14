// pages/contact.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert("Message sent (demo).");
    setName(""); setEmail(""); setMessage("");
  }

  return (
    <>
      <Head><title>Contact — Shopora</title></Head>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

        <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded shadow">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded" placeholder="Your name" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded" placeholder="Your email" required />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 border rounded h-36" placeholder="Message" required />
          <button className="px-4 py-2 bg-shopora-primary text-white rounded">Send Message</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
