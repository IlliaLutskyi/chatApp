-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Online', 'Offline');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Offline';
