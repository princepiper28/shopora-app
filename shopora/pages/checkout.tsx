// pages/checkout.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <Head><title>Checkout — Shopora</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {step === 1 && (
              <section className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Shipping</h2>
                <form className="space-y-3">
                  <input placeholder="Full name" className="w-full p-2 border rounded" />
                  <input placeholder="Address" className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <input placeholder="City" className="flex-1 p-2 border rounded" />
                    <input placeholder="ZIP" className="w-28 p-2 border rounded" />
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="mt-3 px-4 py-2 bg-shopora-primary text-white rounded">Continue</button>
                </form>
              </section>
            )}

            {step === 2 && (
              <section className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Payment</h2>
                <form className="space-y-3">
                  <input placeholder="Card number" className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <input placeholder="MM/YY" className="flex-1 p-2 border rounded" />
                    <input placeholder="CVC" className="w-28 p-2 border rounded" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(3)} className="px-4 py-2 bg-shopora-primary text-white rounded">Review</button>
                    <button type="button" onClick={() => setStep(1)} className="px-4 py-2 border rounded">Back</button>
                  </div>
                </form>
              </section>
            )}

            {step === 3 && (
              <section className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Review & Place Order</h2>
                <p className="mb-4">Order summary — ensure address & payment are correct.</p>
                <div className="flex gap-3">
                  <button onClick={() => { clearCart(); alert("Order placed!"); }} className="px-4 py-2 bg-shopora-accent text-white rounded">Place Order</button>
                  <button onClick={() => setStep(2)} className="px-4 py-2 border rounded">Back</button>
                </div>
              </section>
            )}
          </div>

          <aside className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-2 mt-3">
              {cart.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span>{c.title} x{c.quantity}</span>
                  <span>${(c.price * c.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p className="text-sm text-gray-500 mt-2">Shipping calculated at next step.</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
