/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_projectId_fkey";

-- DropTable
DROP TABLE "Links";

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
