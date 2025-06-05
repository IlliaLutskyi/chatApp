import prisma from "@/lib/db";
import { getImageString } from "@/utils/getImageString";
async function createChat(req, res) {
    const { title } = req.body;
    const image = req.file;
    let imageUrl = null;
    const userId = req.user && "id" in req.user ? req.user.id : null;
    try {
        if (image) {
            imageUrl = getImageString(image);
        }
        await prisma.chat.create({
            data: {
                title: title,
                image: imageUrl,
                userId: userId,
                users: {
                    create: {
                        user: {
                            connect: { id: userId },
                        },
                        role: "admin",
                    },
                },
            },
        });
        res.status(200).json({ message: "Group created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Could not create group" });
        return;
    }
}
export default createChat;
