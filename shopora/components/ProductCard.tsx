// components/ProductCard.tsx
import Image from "next/image";
import { Product } from "@/types/product";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFav = wishlist.includes(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Next/Image needs remote host configured in next.config.js */}
        <img src={product.image} alt={product.title} className="max-h-36 object-contain" />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-shopora-accent">${product.price}</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => toggleWishlist(product.id)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              {isFav ? "❤️" : "🤍"}
            </button>
            <button onClick={() => addToCart(product)} className="bg-shopora-primary text-white px-3 py-2 rounded">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
