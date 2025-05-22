import prisma from "@/lib/db";
import { Request, Response } from "express";

async function getChats(req: Request, res: Response) {
  const userId = req.user && "id" in req.user ? (req.user.id as number) : null;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId: Number(userId),
          },
        },
      },
    });

    res.status(200).json({ message: "Groups fetched successfully", chats });
    return;
  } catch (err) {
    res.status(500).json({ message: "Could not get groups", groups: [] });
    return;
  }
}
export default getChats;
