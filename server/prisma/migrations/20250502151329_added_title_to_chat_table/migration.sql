/*
  Warnings:

  - Added the required column `title` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "title" VARCHAR(50) NOT NULL,
ALTER COLUMN "private" SET DEFAULT false;
