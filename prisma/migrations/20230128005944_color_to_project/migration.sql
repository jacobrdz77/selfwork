-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Classic', 'Maroon', 'Orange', 'Yellow', 'Forest', 'BlueGreen', 'Aqua', 'Blue', 'Purple', 'PinkPurple', 'Pink', 'Oat');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "iconColor" "Color" NOT NULL DEFAULT 'Classic';
