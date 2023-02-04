/*
  Warnings:

  - You are about to drop the column `userWorkspaceId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `userAssignedTasksSectionId` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAssignedTasksSectionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_userWorkspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userAssignedTasksSectionId_fkey";

-- DropIndex
DROP INDEX "Workspace_userAssignedTasksSectionId_key";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "userWorkspaceId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userAssignedTasksSectionId" TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "userAssignedTasksSectionId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userAssignedTasksSectionId_key" ON "User"("userAssignedTasksSectionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAssignedTasksSectionId_fkey" FOREIGN KEY ("userAssignedTasksSectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
