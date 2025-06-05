import prisma from "@/lib/db";
async function getChat(req, res) {
    const { id } = req.params;
    const userId = req.user && "id" in req.user ? req.user.id : null;
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: Number(id),
                users: {
                    some: {
                        userId: Number(userId),
                    },
                },
            },
        });
        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }
        res.status(200).json({ chat });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not get chat" });
        return;
    }
}
export default getChat;
