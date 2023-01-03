-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_clientId_clientName_fkey";

-- AlterTable
ALTER TABLE "Website" ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "clientName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "Client"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
