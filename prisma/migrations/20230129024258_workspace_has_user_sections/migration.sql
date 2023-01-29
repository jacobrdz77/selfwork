/*
  Warnings:

  - You are about to drop the column `userId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `assignedTasksSectionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAssignedTasksSectionId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userAssignedTasksSectionId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_assignedTasksSectionId_fkey";

-- DropIndex
DROP INDEX "User_assignedTasksSectionId_key";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "userId",
ADD COLUMN     "userWorkspaceId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "assignedTasksSectionId";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "userAssignedTasksSectionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_userAssignedTasksSectionId_key" ON "Workspace"("userAssignedTasksSectionId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userAssignedTasksSectionId_fkey" FOREIGN KEY ("userAssignedTasksSectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userWorkspaceId_fkey" FOREIGN KEY ("userWorkspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
