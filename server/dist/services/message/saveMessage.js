import prisma from "@/lib/db";
async function saveMessage({ image, message, chatId, type, userId, }) {
    if (!chatId)
        return;
    try {
        await prisma.message.create({
            data: {
                image,
                content: message ? message : "",
                chatId,
                userId,
                type,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
}
export default saveMessage;
