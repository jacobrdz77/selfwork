/*
  Warnings:

  - You are about to drop the column `projectId` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Open', 'InProgress', 'InReview', 'Delayed', 'Done');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Active', 'OnTrack', 'OffTrack', 'OnHold', 'InTesting', 'Approved');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_sectionId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displaySequence" INTEGER;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "projectId",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'Open';

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
