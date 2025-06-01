import prisma from "@/lib/db";
import { Request, Response } from "express";
import { getImageString } from "@/utils/getImageString";

async function createChat(req: Request, res: Response) {
  const { title } = req.body;
  const image = req.file;
  let imageUrl = null;
  const userId = req.user && "id" in req.user ? (req.user.id as number) : null;
  try {
    if (image) {
      imageUrl = getImageString(image);
    }
    await prisma.chat.create({
      data: {
        title: title,
        image: imageUrl,
        userId: userId as number,
        users: {
          create: {
            user: {
              connect: { id: userId as number },
            },
            role: "admin",
          },
        },
      },
    });
    res.status(200).json({ message: "Group created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not create group" });
    return;
  }
}
export default createChat;
