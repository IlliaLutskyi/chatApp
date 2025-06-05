import prisma from "@/lib/db";
async function addMember(req, res) {
    const { phone_number, chat_id } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                phoneNumber: phone_number,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await prisma.chat.update({
            where: {
                id: Number(chat_id),
            },
            data: {
                users: {
                    create: {
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                },
            },
        });
        res.status(200).json({ message: "Member added successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not add member" });
        return;
    }
}
export default addMember;
