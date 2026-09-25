import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const DUMMYJSON_ID_OFFSET = 100000;

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({
        error: "You must be logged in to place an order.",
      });
    }

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

    const productLookups = body.items.map((item) => {
      if (item.id >= DUMMYJSON_ID_OFFSET) {
        return {
          source: "DUMMYJSON" as const,
          sourceId: item.id - DUMMYJSON_ID_OFFSET,
        };
      }

      return {
        source: "FAKESTORE" as const,
        sourceId: item.id,
      };
    });

    const products = await prisma.product.findMany({
      where: {
        OR: productLookups,
      },
    });

    if (products.length !== body.items.length) {
      return res.status(400).json({
        error: "One or more products in your cart are no longer available.",
      });
    }

    const productMap = new Map(
      products.map((product) => [
        `${product.source}:${product.sourceId}`,
        product,
      ])
    );

    let subtotal = new Prisma.Decimal(0);

    const orderItems = body.items.map((item) => {
      const lookup =
        item.id >= DUMMYJSON_ID_OFFSET
          ? {
              source: "DUMMYJSON" as const,
              sourceId: item.id - DUMMYJSON_ID_OFFSET,
            }
          : {
              source: "FAKESTORE" as const,
              sourceId: item.id,
            };

      const product = productMap.get(
        `${lookup.source}:${lookup.sourceId}`
      );

      if (!product) {
        throw new Error(`Product ${item.id} was not found.`);
      }

      const quantity = item.quantity;
      const price = product.price;

      subtotal = subtotal.plus(price.mul(quantity));

      return {
        productId: product.id,
        quantity,
        price,
      };
    });

    const shipping =
      subtotal.greaterThanOrEqualTo(FREE_SHIPPING_THRESHOLD)
        ? new Prisma.Decimal(0)
        : new Prisma.Decimal(SHIPPING_FEE);

    const tax = subtotal.mul(TAX_RATE);
    const total = subtotal.plus(shipping).plus(tax);

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