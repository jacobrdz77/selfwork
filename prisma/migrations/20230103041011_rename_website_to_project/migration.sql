/*
  Warnings:

  - You are about to drop the column `websiteId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `websiteId` on the `TaskList` table. All the data in the column will be lost.
  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,projectId]` on the table `TaskList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_clientId_clientName_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropIndex
DROP INDEX "TaskList_id_websiteId_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "websiteId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskList" DROP COLUMN "websiteId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Website";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lumpSum" INTEGER,
    "priority" "Priority" DEFAULT 'NONE',
    "dueDate" TIMESTAMP(3),
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "clientId" TEXT,
    "clientName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_name_key" ON "Project"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TaskList_id_projectId_key" ON "TaskList"("id", "projectId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "Client"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
