/*
  Warnings:

  - The values [Orange,Yellow] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('Classic', 'Maroon', 'OrangeYellow', 'YellowGreen', 'Forest', 'BlueGreen', 'Aqua', 'Blue', 'Purple', 'PinkPurple', 'Pink', 'Oat');
ALTER TABLE "Project" ALTER COLUMN "iconColor" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "iconColor" TYPE "Color_new" USING ("iconColor"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
ALTER TABLE "Project" ALTER COLUMN "iconColor" SET DEFAULT 'Classic';
COMMIT;
