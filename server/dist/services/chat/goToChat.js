import prisma from "@/lib/db";
async function goToChat(req, res) {
    const { id } = req.params;
    const userId = req.user && "id" in req.user ? req.user.id : null;
    try {
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        await prisma.chat.update({
            where: { id: Number(id) },
            data: {
                users: {
                    create: {
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                },
            },
        });
        res.status(200).json({ message: "Chat joined successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not get chat" });
        return;
    }
}
export default goToChat;
