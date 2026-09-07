// lib/api.ts
import { Product } from "@/types/product";

const DUMMYJSON_ID_OFFSET = 100000;

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
}

interface DummyJsonListResponse {
  products: DummyJsonProduct[];
}

function mapDummyJsonProduct(p: DummyJsonProduct): Product {
  return {
    id: p.id + DUMMYJSON_ID_OFFSET,
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price,
    image: p.thumbnail,
  };
}

/* =========================
   Fetch and merge products from both FakeStoreAPI and DummyJSON.
   Used by the homepage, /shop, and the Hero search bar.
========================= */
export async function fetchAllProducts(): Promise<Product[]> {
  const [fakeStoreRes, dummyJsonRes] = await Promise.all([
    fetch("https://fakestoreapi.com/products"),
    fetch("https://dummyjson.com/products?limit=200"),
  ]);

  if (!fakeStoreRes.ok) {
    throw new Error(`Failed to fetch FakeStore products: ${fakeStoreRes.statusText}`);
  }
  if (!dummyJsonRes.ok) {
    throw new Error(`Failed to fetch DummyJSON products: ${dummyJsonRes.statusText}`);
  }

  const fakeStoreData: Product[] = await fakeStoreRes.json();
  const dummyJsonData: DummyJsonListResponse = await dummyJsonRes.json();

  const dummyJsonMapped = dummyJsonData.products.map(mapDummyJsonProduct);

  return [...fakeStoreData, ...dummyJsonMapped];
}

/* =========================
   Fetch a single product by id, routing to the correct API
   based on whether the id carries the DummyJSON offset.
   Used by /product/[id].
========================= */
export async function fetchProductById(
  id: string | number
): Promise<Product | null> {
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return null;
  }

  if (numericId >= DUMMYJSON_ID_OFFSET) {
    const realId = numericId - DUMMYJSON_ID_OFFSET;
    const res = await fetch(`https://dummyjson.com/products/${realId}`);

    if (!res.ok) return null;

    const data: DummyJsonProduct = await res.json();
    return mapDummyJsonProduct({ ...data, id: realId });
  }

  const res = await fetch(`https://fakestoreapi.com/products/${numericId}`);

  if (!res.ok) return null;

  return res.json();
}

/* =========================
   Normalize both APIs' raw category strings into
   the display names used by Categories.tsx pills
========================= */
export function mapToDisplayCategory(rawCategory: string): string | null {
  const c = rawCategory.toLowerCase().replace(/[-_]/g, "");

  if (c === "electronics") return "Electronics";
  if (c === "jewelery") return "Jewelry";
  if (c === "mensclothing") return "Men";
  if (c === "womensclothing") return "Women";

  if (["smartphones", "laptops", "tablets", "mobileaccessories"].includes(c))
    return "Electronics";
  if (["fragrances", "skincare", "beauty"].includes(c)) return "Beauty";
  if (["furniture", "homedecoration", "kitchenaccessories"].includes(c))
    return "Home";
  if (c === "groceries") return "Food";
  if (["mensshirts", "mensshoes", "menswatches"].includes(c)) return "Men";
  if (
    [
      "womensdresses",
      "womensshoes",
      "womenswatches",
      "womensbags",
      "womensjewellery",
      "tops",
    ].includes(c)
  )
    return "Women";
  if (c === "sportsaccessories") return "Sports";
  if (c === "sunglasses") return "Fashion";
  if (["motorcycle", "vehicle", "automotive"].includes(c)) return "Industrial";
  if (c === "lighting") return "Home";

  return null;
}
