// pages/cart.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <>
      <Head><title>Cart — Shopora</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="number" value={item.quantity} min={1} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} className="w-20 p-1 border rounded" />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-white shadow flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Subtotal</p>
                <p className="text-xl font-semibold">${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => clearCart()} className="px-4 py-2 border rounded">Clear</button>
                <a href="/checkout" className="px-4 py-2 bg-shopora-accent text-white rounded">Checkout</a>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
