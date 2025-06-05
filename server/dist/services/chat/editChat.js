import prisma from "@/lib/db";
import { getImageString } from "@/utils/getImageString";
async function editChat(req, res) {
    const file = req.file;
    const { chatId, title } = req.body;
    let imageUrl = "";
    try {
        if (file) {
            imageUrl = getImageString(file);
        }
        await prisma.chat.update({
            where: { id: Number(chatId) },
            data: { title: title, image: imageUrl },
        });
        res.status(200).json({ message: "Chat edited successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Could not edit chat" });
    }
}
export default editChat;
