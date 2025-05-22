/*
  Warnings:

  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'guest');

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- DropTable
DROP TABLE "_ChatToUser";

-- CreateTable
CREATE TABLE "chatUsers" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'guest',

    CONSTRAINT "chatUsers_pkey" PRIMARY KEY ("userId","chatId")
);

-- AddForeignKey
ALTER TABLE "chatUsers" ADD CONSTRAINT "chatUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatUsers" ADD CONSTRAINT "chatUsers_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
