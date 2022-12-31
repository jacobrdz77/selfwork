/*
  Warnings:

  - You are about to drop the column `description` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `TaskList` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `TaskList` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `TaskList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskList` table. All the data in the column will be lost.
  - You are about to drop the `LogTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,websiteId]` on the table `TaskList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LogTime" DROP CONSTRAINT "LogTime_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_clientName_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskListId_projectId_projectName_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_projectId_projectName_userId_fkey";

-- DropIndex
DROP INDEX "TaskList_id_projectId_projectName_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "description",
DROP COLUMN "website",
ADD COLUMN     "companyName" TEXT;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endDate",
DROP COLUMN "projectId",
DROP COLUMN "projectName",
DROP COLUMN "startDate",
DROP COLUMN "userId",
ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TaskList" DROP COLUMN "notes",
DROP COLUMN "projectId",
DROP COLUMN "projectName",
DROP COLUMN "userId",
ADD COLUMN     "websiteId" TEXT NOT NULL;

-- DropTable
DROP TABLE "LogTime";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lumpSum" INTEGER,
    "priority" "Priority" DEFAULT 'NONE',
    "dueDate" TIMESTAMP(3),
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_id_name_key" ON "Website"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TaskList_id_websiteId_key" ON "TaskList"("id", "websiteId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "Client"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
