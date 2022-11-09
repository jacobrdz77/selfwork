/*
  Warnings:

  - A unique constraint covering the columns `[id,name,userId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_projectId_projectName_fkey";

-- DropIndex
DROP INDEX "Project_id_name_key";

-- AlterTable
ALTER TABLE "TaskList" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_name_userId_key" ON "Project"("id", "name", "userId");

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_projectId_projectName_userId_fkey" FOREIGN KEY ("projectId", "projectName", "userId") REFERENCES "Project"("id", "name", "userId") ON DELETE CASCADE ON UPDATE CASCADE;
