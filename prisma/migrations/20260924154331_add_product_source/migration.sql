/*
  Warnings:

  - A unique constraint covering the columns `[source,sourceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductSource" AS ENUM ('SHOPORA', 'DUMMYJSON', 'FAKESTORE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "source" "ProductSource" NOT NULL DEFAULT 'SHOPORA',
ADD COLUMN     "sourceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Product_source_sourceId_key" ON "Product"("source", "sourceId");
