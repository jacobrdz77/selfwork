-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "order" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "order" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "order" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Sketch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "elements" JSONB NOT NULL,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Sketch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
