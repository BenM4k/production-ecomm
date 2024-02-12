/*
  Warnings:

  - You are about to drop the column `order_d` on the `order_detail` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_detail" DROP CONSTRAINT "order_detail_order_d_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "order_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order_detail" DROP COLUMN "order_d",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
