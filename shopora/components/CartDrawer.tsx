// components/CartDrawer.tsx
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { X } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2"><X /></button>
        </div>

        <div className="mt-4 space-y-3 overflow-y-auto max-h-[70vh]">
          {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b pb-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-500">${item.price}</div>
                <div className="mt-2 flex items-center gap-2">
                  <input value={String(item.quantity)} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} className="w-16 p-1 border rounded" />
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a href="/checkout" className="block w-full text-center bg-shopora-accent text-white py-3 rounded">Proceed to Checkout</a>
        </div>
      </motion.aside>
    </>
  );
}
