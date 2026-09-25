import "dotenv/config";
import { PrismaClient, ProductSource } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

const DUMMYJSON_URL = "https://dummyjson.com/products?limit=200";
const FAKESTORE_URL = "https://fakestoreapi.com/products";

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  stock: number;
};

type DummyJsonResponse = {
  products: DummyJsonProduct[];
};

type NormalizedProduct = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  source: ProductSource;
  sourceId: number;
};

function normalizeFakeStoreProduct(
  product: FakeStoreProduct
): NormalizedProduct {
  return {
    name: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    stock: 25,
    source: ProductSource.FAKESTORE,
    sourceId: product.id,
  };
}

function normalizeDummyJsonProduct(
  product: DummyJsonProduct
): NormalizedProduct {
  return {
    name: product.title,
    description: product.description,
    price: product.price,
    image: product.thumbnail,
    category: product.category,
    stock: product.stock,
    source: ProductSource.DUMMYJSON,
    sourceId: product.id,
  };
}

async function fetchProducts(): Promise<NormalizedProduct[]> {
  console.log("Fetching products...");

  const [fakeStoreResponse, dummyJsonResponse] = await Promise.all([
    fetch(FAKESTORE_URL),
    fetch(DUMMYJSON_URL),
  ]);

  if (!fakeStoreResponse.ok) {
    throw new Error(
      `FakeStore request failed: ${fakeStoreResponse.status} ${fakeStoreResponse.statusText}`
    );
  }

  if (!dummyJsonResponse.ok) {
    throw new Error(
      `DummyJSON request failed: ${dummyJsonResponse.status} ${dummyJsonResponse.statusText}`
    );
  }

  const fakeStoreProducts =
    (await fakeStoreResponse.json()) as FakeStoreProduct[];

  const dummyJsonData =
    (await dummyJsonResponse.json()) as DummyJsonResponse;

  return [
    ...fakeStoreProducts.map(normalizeFakeStoreProduct),
    ...dummyJsonData.products.map(normalizeDummyJsonProduct),
  ];
}

async function importProducts() {
  try {
    const products = await fetchProducts();

    console.log(`Found ${products.length} products.`);

    let processed = 0;

    for (const product of products) {
      await prisma.product.upsert({
        where: {
          source_sourceId: {
            source: product.source,
            sourceId: product.sourceId,
          },
        },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: product.stock,
        },
        create: product,
      });

      processed++;

      if (processed % 25 === 0) {
        console.log(
          `Processed ${processed}/${products.length} products...`
        );
      }
    }

    console.log("");
    console.log("Product import completed.");
    console.log(`Processed: ${processed}`);
  } catch (error) {
    console.error("Product import failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

importProducts();