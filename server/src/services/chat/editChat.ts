import cloudinary from "cloudinary";
import fs from "fs";
import prisma from "@/lib/db";
import { Request, Response } from "express";

async function editChat(req: Request, res: Response) {
  const file = req.file;
  const { chatId, title } = req.body;

  try {
    if (file) {
      const { url } = await cloudinary.v2.uploader.upload(file.path, {
        folder: "chatImages",
        public_id: chatId,
      });

      fs.unlinkSync(file.path);
      await prisma.chat.update({
        where: { id: Number(chatId) },
        data: { title: title, image: url },
      });
    }
    await prisma.chat.update({
      where: { id: Number(chatId) },
      data: { title: title },
    });
    res.status(200).json({ message: "Chat edited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not edit chat" });
  }
}
export default editChat;
