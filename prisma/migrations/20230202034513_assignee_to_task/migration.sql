/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userAssignedTasksSectionId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "userAssignedTasksSectionId" DROP NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userAssignedTasksSectionId_fkey" FOREIGN KEY ("userAssignedTasksSectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
