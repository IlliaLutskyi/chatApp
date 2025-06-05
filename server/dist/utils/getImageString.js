import fs from "fs";
import mime from "mime";
export function getImageString(file) {
    const base64 = fs.readFileSync(file.path, { encoding: "base64" });
    const imageString = `data:${mime.getType(file.path)};base64,${base64}`;
    fs.unlinkSync(file.path);
    return imageString;
}
