import fs from "fs";
import cloudinary from "cloudinary";
import { Request, Response } from "express";

async function sendFile(req: Request, res: Response) {
  const file = req.file;
  const userId = req.user && "id" in req.user ? (req.user.id as number) : null;
  try {
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    const { url } = await cloudinary.v2.uploader.upload(file.path, {
      folder: "Messages",
      public_id: userId + "_" + new Date().getTime(),
    });
    fs.unlinkSync(file.path);
    res.status(200).json({ message: "File uploaded successfully", url });
    return;
  } catch (err) {
    res.status(500).json({ message: "Could not upload file", url: null });
    return;
  }
}
export default sendFile;
