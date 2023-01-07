/*
  Warnings:

  - The values [NONE,LOW,MEDIUM,HIGH] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Open', 'InProgress', 'Done', 'Closed');

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('None', 'Low', 'Medium', 'High');
ALTER TABLE "Project" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
ALTER TABLE "Project" ALTER COLUMN "priority" SET DEFAULT 'None';
ALTER TABLE "Task" ALTER COLUMN "priority" SET DEFAULT 'None';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "priority" SET DEFAULT 'None';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Open',
ALTER COLUMN "priority" SET DEFAULT 'None';
