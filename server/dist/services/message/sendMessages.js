import prisma from "@/lib/db";
async function sendMessages(id) {
    if (id == null)
        return [];
    try {
        const messages = await prisma.message.findMany({
            where: {
                chatId: Number(id),
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return messages;
    }
    catch (err) {
        return [];
    }
}
export default sendMessages;
