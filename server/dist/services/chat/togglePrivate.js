import prisma from "@/lib/db";
async function togglePrivate(req, res) {
    const { id } = req.params;
    try {
        const chat = await prisma.chat.findUniqueOrThrow({
            where: { id: Number(id) },
        });
        await prisma.chat.update({
            where: { id: Number(id) },
            data: { private: !chat.private },
        });
        res.status(200).json({ message: "Private status updated successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not update private status" });
        return;
    }
}
export default togglePrivate;
