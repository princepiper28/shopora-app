// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

/**
 * Next.js dev mode hot-reloads modules on every file change, which
 * would normally create a brand-new PrismaClient (and a brand-new
 * DB connection pool) on every save — quickly exhausting Postgres's
 * connection limit. Stashing the client on `globalThis` in dev
 * means hot reloads reuse the same instance instead of creating a
 * new one each time. In production, each serverless invocation gets
 * its own fresh module scope anyway, so this is a no-op there.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}