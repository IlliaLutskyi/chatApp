import prisma from "@/lib/db";

async function editMessage(id: number, content: string) {
  try {
    await prisma.message.update({
      where: { id: id },
      data: {
        content,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
export default editMessage;
