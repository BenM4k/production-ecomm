/*
  Warnings:

  - The values [SHIPPED,DELIVERED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING] on the enum `ShippingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PAID', 'CANCELLED');
ALTER TABLE "order" ALTER COLUMN "order_status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "order_status" TYPE "OrderStatus_new" USING ("order_status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "order" ALTER COLUMN "order_status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ShippingStatus_new" AS ENUM ('INPROGRESS', 'SHIPPED', 'DELIVERED');
ALTER TABLE "shipping" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "shipping" ALTER COLUMN "status" TYPE "ShippingStatus_new" USING ("status"::text::"ShippingStatus_new");
ALTER TYPE "ShippingStatus" RENAME TO "ShippingStatus_old";
ALTER TYPE "ShippingStatus_new" RENAME TO "ShippingStatus";
DROP TYPE "ShippingStatus_old";
ALTER TABLE "shipping" ALTER COLUMN "status" SET DEFAULT 'INPROGRESS';
COMMIT;

-- AlterTable
ALTER TABLE "shipping" ALTER COLUMN "status" SET DEFAULT 'INPROGRESS';
