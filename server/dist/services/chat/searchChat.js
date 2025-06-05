import prisma from "@/lib/db";
async function search(req, res) {
    const { keyword, limit } = req.query;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                title: {
                    contains: keyword,
                    mode: "insensitive",
                },
                private: false,
            },
            take: Number(limit),
        });
        if (!chats.length) {
            res.status(404).json({ message: "No results" });
            return;
        }
        res.status(200).json({ message: "Groups fetched successfully", chats });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not get groups", chats: [] });
        return;
    }
}
export default search;
