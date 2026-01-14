// components/WishlistDrawer.tsx
import { motion } from "framer-motion";
import { useWishlist } from "./WishlistContext";
import { fetchProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function WishlistDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  const { wishlist } = useWishlist();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const products = await fetchProducts();
      setItems(products.filter((p) => wishlist.includes(p.id)));
    }
    load();
  }, [wishlist]);

  if (!isOpen) return null;

  return (
    <>
      <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />
      <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Wishlist</h3>
          <button onClick={onClose} className="p-2"><X /></button>
        </div>

        <div className="mt-4 space-y-3">
          {items.length === 0 ? <p className="text-gray-500">No items in wishlist.</p> : items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <img src={it.image} alt={it.title} className="w-16 h-16 object-contain" />
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-500">${it.price}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
