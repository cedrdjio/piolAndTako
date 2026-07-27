import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton — avoids exhausting DB connections during dev HMR.
 * The in-memory repository in `lib/data/listings.ts` mirrors these models, so
 * swapping the mock accessors for real queries is a drop-in change.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
