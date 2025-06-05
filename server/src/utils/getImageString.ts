import fs from "fs";

export function getImageString(file: Express.Multer.File) {
  const base64 = fs.readFileSync(file.path, { encoding: "base64" });
  const imageString = `data:${file.mimetype};base64,${base64}`;
  fs.unlinkSync(file.path);
  return imageString;
}
