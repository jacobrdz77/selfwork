/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "clientName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_name_key" ON "Client"("id", "name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "Client"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
