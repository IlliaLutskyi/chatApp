import prisma from "@/lib/db";
async function deleteMessage(messages) {
    try {
        await prisma.message.deleteMany({ where: { id: { in: messages } } });
    }
    catch (err) {
        console.log(err);
    }
}
export default deleteMessage;
