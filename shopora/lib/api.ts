// lib/api.ts
import { Product } from "@/types/product";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  return res.json();
}