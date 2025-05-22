import cloudinary from "cloudinary";
import prisma from "@/lib/db";
import { Request, Response } from "express";
import fs from "fs";

async function editProfile(req: Request, res: Response) {
  const image = req.file;
  const { name, phone_number } = req.body;
  const userId = req.user && "id" in req.user ? (req.user.id as number) : null;
  let imageUrl = null;
  try {
    if (image) {
      const { url } = await cloudinary.v2.uploader.upload(image.path, {
        folder: "profileImages",
        public_id: userId ? userId.toString() : "",
      });
      imageUrl = url;
      fs.unlinkSync(image.path);
    }
    if (imageUrl) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          name,
          phoneNumber: phone_number,
          image: imageUrl,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          name,
          phoneNumber: phone_number,
        },
      });
    }
    res.status(200).json({ message: "Profile updated successfully" });
    return;
  } catch (err) {
    res.status(500).json({ message: "Could not update profile" });
    return;
  }
}
export default editProfile;
