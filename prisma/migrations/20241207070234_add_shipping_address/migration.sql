/*
  Warnings:

  - Added the required column `shippingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- AlterTable
ALTER TABLE "Order" ADD COLUMN "shippingAddress" TEXT;

-- UpdateData
UPDATE "Order" SET "shippingAddress" = 'Address not provided' WHERE "shippingAddress" IS NULL;

-- AlterColumn
ALTER TABLE "Order" ALTER COLUMN "shippingAddress" SET NOT NULL;
