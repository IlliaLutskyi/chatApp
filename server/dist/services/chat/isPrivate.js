import prisma from "@/lib/db";
async function isPrivate(req, res) {
    const { id } = req.params;
    try {
        const chat = await prisma.chat.findUniqueOrThrow({
            where: { id: Number(id) },
            select: {
                private: true,
            },
        });
        res.status(200).json({ isPrivate: chat.private });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not get chat" });
        return;
    }
}
export default isPrivate;
