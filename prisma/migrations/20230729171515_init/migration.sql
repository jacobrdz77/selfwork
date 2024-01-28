/*
  Warnings:

  - You are about to drop the column `displaySequence` on the `Section` table. All the data in the column will be lost.
  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Pending', 'Closed');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "order" SERIAL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "totalLumpSum" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "totalMonthly" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "monthlyPay" MONEY,
ADD COLUMN     "order" SERIAL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "displaySequence",
ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" "Color" NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "order" SERIAL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobilePhone" TEXT;
