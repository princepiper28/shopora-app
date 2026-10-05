// lib/api.ts

import type { Product } from "@/types/product";

const API_TIMEOUT_MS = 15000;

const DUMMYJSON_URL =
  process.env.NEXT_PUBLIC_DUMMYJSON_PRODUCTS_URL ||
  "https://dummyjson.com/products?limit=150";

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images?: string[];
}

interface DummyJsonListResponse {
  products: DummyJsonProduct[];
}

/**
 * Fetch JSON with a timeout and HTTP status validation.
 */
async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with HTTP ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Request timed out after ${API_TIMEOUT_MS / 1000}s: ${url}`
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Convert a DummyJSON product into SHOPORA's Product format.
 *
 * SHOPORA uses the original DummyJSON product ID directly.
 * There is no ID offset or legacy product-source mapping.
 */
function mapDummyJsonProduct(p: DummyJsonProduct): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price,
    image: p.thumbnail || p.images?.[0] || "",
  };
}

/**
 * Fetch all SHOPORA products from DummyJSON.
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const data = await fetchJson<DummyJsonListResponse>(DUMMYJSON_URL);

    if (!data || !Array.isArray(data.products)) {
      throw new Error("DummyJSON returned an invalid product list.");
    }

    const products = data.products.map(mapDummyJsonProduct);

    console.info(
      `SHOPORA: Loaded ${products.length} products from DummyJSON.`
    );

    return products;
  } catch (error) {
    console.error(
      "SHOPORA: DummyJSON products could not be loaded.",
      error
    );

    throw new Error(
      "SHOPORA could not load products from DummyJSON. " +
        "Please check your internet connection and API availability."
    );
  }
}

/**
 * Fetch a single product from DummyJSON.
 *
 * The ID is the original DummyJSON product ID.
 */
export async function fetchProductById(
  id: string | number
): Promise<Product | null> {
  const numericId = Number(id);

  if (!Number.isSafeInteger(numericId) || numericId <= 0) {
    return null;
  }

  try {
    const data = await fetchJson<DummyJsonProduct>(
      `https://dummyjson.com/products/${numericId}`
    );

    if (!data || typeof data.id !== "number") {
      return null;
    }

    return mapDummyJsonProduct(data);
  } catch (error) {
    console.error(
      `SHOPORA: Could not load product ${numericId}.`,
      error
    );

    return null;
  }
}

/* =========================================================
   NORMALIZE PRODUCT CATEGORIES

   Converts DummyJSON's raw category strings into the
   display names used by SHOPORA.
========================================================= */

export function mapToDisplayCategory(
  rawCategory: string
): string | null {
  const c = rawCategory.toLowerCase().replace(/[-_]/g, "");

  if (c === "electronics") return "Electronics";
  if (c === "jewelery" || c === "jewellery") return "Jewelry";

  if (c === "mensclothing") return "Men";
  if (c === "womensclothing") return "Women";

  if (
    [
      "smartphones",
      "laptops",
      "tablets",
      "mobileaccessories",
    ].includes(c)
  ) {
    return "Electronics";
  }

  if (
    [
      "fragrances",
      "skincare",
      "beauty",
    ].includes(c)
  ) {
    return "Beauty";
  }

  if (
    [
      "furniture",
      "homedecoration",
      "kitchenaccessories",
    ].includes(c)
  ) {
    return "Home";
  }

  if (c === "groceries") return "Food";

  if (
    [
      "mensshirts",
      "mensshoes",
      "menswatches",
    ].includes(c)
  ) {
    return "Men";
  }

  if (
    [
      "womensdresses",
      "womensshoes",
      "womenswatches",
      "womensbags",
      "womensjewellery",
      "tops",
    ].includes(c)
  ) {
    return "Women";
  }

  if (c === "sportsaccessories") return "Sports";

  if (c === "sunglasses") return "Fashion";

  if (
    [
      "motorcycle",
      "vehicle",
      "automotive",
    ].includes(c)
  ) {
    return "Industrial";
  }

  if (c === "lighting") return "Home";

  return null;
}
