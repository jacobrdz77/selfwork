/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,projectId,projectName]` on the table `TaskList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectName` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskListId_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_projectId_fkey";

-- DropIndex
DROP INDEX "TaskList_id_projectId_key";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "projectName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskList" ADD COLUMN     "projectName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_name_key" ON "Project"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TaskList_id_projectId_projectName_key" ON "TaskList"("id", "projectId", "projectName");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_projectId_projectName_fkey" FOREIGN KEY ("taskListId", "projectId", "projectName") REFERENCES "TaskList"("id", "projectId", "projectName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_projectId_projectName_fkey" FOREIGN KEY ("projectId", "projectName") REFERENCES "Project"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;
