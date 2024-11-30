/*
  Warnings:

  - You are about to drop the column `catedoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catedoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "catedoryId",
DROP COLUMN "size",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[];

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
