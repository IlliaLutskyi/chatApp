import prisma from "@/lib/db";
import { Request, Response } from "express";
async function leaveChat(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user && "id" in req.user ? (req.user.id as number) : null;
  try {
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    await prisma.chatUsers.delete({
      where: {
        userId_chatId: {
          chatId: Number(id),
          userId: Number(userId),
        },
      },
    });
    res.status(200).json({ message: "Chat left successfully" });
    return;
  } catch (err) {
    res.status(500).json({ message: "Could not leave chat" });
    return;
  }
}

export default leaveChat;
