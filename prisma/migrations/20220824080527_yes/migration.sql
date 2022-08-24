/*
  Warnings:

  - You are about to drop the column `businessAdress` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "businessAdress",
ADD COLUMN     "businessAddress" TEXT;
