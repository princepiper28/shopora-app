import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const DUMMYJSON_PRODUCTS_URL =
  process.env.NEXT_PUBLIC_DUMMYJSON_PRODUCTS_URL ||
  "https://dummyjson.com/products?limit=150";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.075;

type CartItemInput = {
  id: number;
  quantity: number;
};

type CreateOrderBody = {
  items: CartItemInput[];
};

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
};

type DummyJsonResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

type SuccessResponse = {
  orderId: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

type ErrorResponse = {
  error: string;
};

/**
 * Fetch the current DummyJSON catalogue.
 */
async function fetchDummyJsonProducts(): Promise<DummyJsonProduct[]> {
  const response = await fetch(DUMMYJSON_PRODUCTS_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to verify products with DummyJSON (${response.status}).`
    );
  }

  const data = (await response.json()) as DummyJsonResponse;

  if (!Array.isArray(data.products)) {
    throw new Error("Invalid DummyJSON product response.");
  }

  return data.products;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  /*
   * ============================================================
   * METHOD
   * ============================================================
   */

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    /*
     * ============================================================
     * AUTHENTICATION
     * ============================================================
     */

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({
        error: "You must be logged in to place an order.",
      });
    }

    /*
     * ============================================================
     * REQUEST VALIDATION
     * ============================================================
     */

    const body = req.body as CreateOrderBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({
        error: "Your cart is empty.",
      });
    }

    for (const item of body.items) {
      if (
        !Number.isInteger(item.id) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          error: "Invalid cart item.",
        });
      }
    }

    /*
     * ============================================================
     * FETCH CURRENT DUMMYJSON PRODUCTS
     *
     * We verify the products server-side rather than trusting
     * information coming from the browser.
     * ============================================================
     */

    const dummyProducts = await fetchDummyJsonProducts();

    const dummyProductMap = new Map(
      dummyProducts.map((product) => [product.id, product])
    );

    /*
     * ============================================================
     * VERIFY CART PRODUCTS
     * ============================================================
     */

    for (const item of body.items) {
      const product = dummyProductMap.get(item.id);

      if (!product) {
        return res.status(400).json({
          error:
            "One or more products in your cart are no longer available. Please remove them and try again.",
        });
      }

      /*
       * Check available stock when DummyJSON provides it.
       */
      if (
        typeof product.stock === "number" &&
        item.quantity > product.stock
      ) {
        return res.status(400).json({
          error: `${product.title} does not have enough stock for the quantity requested.`,
        });
      }
    }

    /*
     * ============================================================
     * SYNC DUMMYJSON PRODUCTS INTO PRISMA
     *
     * Your OrderItem model requires:
     *
     * productId String
     *
     * Therefore every DummyJSON product being ordered must exist
     * in our local Product table.
     *
     * We use:
     *
     * source   = DUMMYJSON
     * sourceId = DummyJSON product ID
     *
     * This allows us to safely find the same product again later.
     * ============================================================
     */

    const syncedProducts = [];

    for (const item of body.items) {
      const dummyProduct = dummyProductMap.get(item.id);

      if (!dummyProduct) {
        throw new Error(`Product ${item.id} was not found.`);
      }

      const product = await prisma.product.upsert({
        where: {
          source_sourceId: {
            source: "DUMMYJSON",
            sourceId: dummyProduct.id,
          },
        },

        update: {
          name: dummyProduct.title,
          description: dummyProduct.description,
          price: new Prisma.Decimal(dummyProduct.price),
          image:
            dummyProduct.thumbnail ||
            dummyProduct.images?.[0] ||
            null,
          category: dummyProduct.category,
          stock:
            typeof dummyProduct.stock === "number"
              ? dummyProduct.stock
              : 0,
        },

        create: {
          name: dummyProduct.title,
          description: dummyProduct.description,
          price: new Prisma.Decimal(dummyProduct.price),
          image:
            dummyProduct.thumbnail ||
            dummyProduct.images?.[0] ||
            null,
          category: dummyProduct.category,
          stock:
            typeof dummyProduct.stock === "number"
              ? dummyProduct.stock
              : 0,
          source: "DUMMYJSON",
          sourceId: dummyProduct.id,
        },
      });

      syncedProducts.push({
        cartItem: item,
        product,
      });
    }

    /*
     * ============================================================
     * CALCULATE ORDER TOTALS
     *
     * IMPORTANT:
     * Prices come from the server-side DummyJSON verification,
     * not from the browser.
     * ============================================================
     */

    let subtotal = new Prisma.Decimal(0);

    const orderItems = syncedProducts.map(({ cartItem, product }) => {
      const quantity = cartItem.quantity;
      const price = product.price;

      subtotal = subtotal.plus(price.mul(quantity));

      return {
        productId: product.id,
        quantity,
        price,
      };
    });

    /*
     * ============================================================
     * SHIPPING
     * ============================================================
     */

    const shipping =
      subtotal.greaterThanOrEqualTo(FREE_SHIPPING_THRESHOLD)
        ? new Prisma.Decimal(0)
        : new Prisma.Decimal(SHIPPING_FEE);

    /*
     * ============================================================
     * TAX
     * ============================================================
     */

    const tax = subtotal.mul(TAX_RATE);

    /*
     * ============================================================
     * FINAL TOTAL
     * ============================================================
     */

    const total = subtotal.plus(shipping).plus(tax);

    /*
     * ============================================================
     * CREATE ORDER
     * ============================================================
     */

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        status: "PENDING",

        items: {
          create: orderItems,
        },
      },
    });

    /*
     * ============================================================
     * RESPONSE
     * ============================================================
     */

    return res.status(201).json({
      orderId: order.id,
      subtotal: subtotal.toNumber(),
      shipping: shipping.toNumber(),
      tax: tax.toNumber(),
      total: total.toNumber(),
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      error: "Unable to create your order.",
    });
  }
}
