import prisma from "@/lib/db";
async function getMembers(req, res) {
    const { id } = req.params;
    try {
        const chat = await prisma.chat.findUniqueOrThrow({
            where: { id: Number(id) },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        res.status(200).json({ members: chat.users });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not get members", members: [] });
        return;
    }
}
export default getMembers;
